import { useState, useEffect, useRef, useCallback } from "react";
import {
  Funnel,
  SortAscending,
  SortDescending,
  ArrowClockwise,
  MagnifyingGlass,
  EyeSlash,
  CaretLeft,
  CaretRight,
  Spinner,
  RadioButton,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { getPublicDonations } from "@/services/donation/api";
import type { PublicDonation } from "@/services/donation/type";
import {
  useGetCampaignsMetadata,
  useGetPublicCampaignSpending,
} from "@/services/campaign/hooks";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { subscribePublicDonationHub } from "@/services/donation/publicDonationHub";

/* ── helpers ──────────────────────────────────────────── */
const formatVND = (n: number) => {
  if (n >= 1_000_000_000)
    return `${(n / 1_000_000_000).toFixed(1).replace(".0", "")} tỷ`;
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(".0", "")} triệu`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString("vi-VN");
};

const formatVNDLong = (n: number) => `${n.toLocaleString("vi-VN")} VNĐ`;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const maskEmail = (email?: string) => {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return `${local.slice(0, 2)}***@${domain}`;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

type SortField = "createdAt" | "amount";
type SortDir = "desc" | "asc";
type HubStatus = "connected" | "connecting" | "disconnected";

/* ════════════════════════════════════════════════════════ */
const DonationFeedPage = () => {
  const [donations, setDonations] = useState<PublicDonation[]>([]);
  const [newIds, setNewIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterCampaign, setFilterCampaign] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [hubStatus, setHubStatus] = useState<HubStatus>("connecting");

  const knownDonationIdsRef = useRef<Set<number>>(new Set());

  const { data: campaigns } = useGetCampaignsMetadata();
  const {
    data: campaignSpending,
    isLoading: spendingLoading,
    refetch: refetchCampaignSpending,
  } = useGetPublicCampaignSpending(filterCampaign, {
    pageNumber: 1,
    pageSize: 10,
  });

  /* ── debounce search ── */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  /* ── reset to page 1 on filter/sort/pageSize change ── */
  useEffect(() => {
    setPage(1);
  }, [sortField, sortDir, filterCampaign, debouncedSearch, pageSize]);

  const markNewDonations = useCallback((fresh: PublicDonation[]) => {
    if (fresh.length === 0) return;

    setNewIds((prev) => {
      const next = new Set(prev);
      fresh.forEach((d) => next.add(d.id));
      return next;
    });

    setTimeout(() => {
      setNewIds((prev) => {
        const cleaned = new Set(prev);
        fresh.forEach((d) => cleaned.delete(d.id));
        return cleaned;
      });
    }, 8000);
  }, []);

  const rememberDonation = useCallback((donation: PublicDonation) => {
    if (knownDonationIdsRef.current.has(donation.id)) return false;

    knownDonationIdsRef.current.add(donation.id);
    return true;
  }, []);

  /* ── fetch ── */
  const fetchDonations = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getPublicDonations({
        PageNumber: page,
        PageSize: pageSize,
        ...(filterCampaign ? { FundCampaignId: filterCampaign } : {}),
        ...(debouncedSearch.trim() ? { Search: debouncedSearch.trim() } : {}),
      });
      const incoming: PublicDonation[] = res.items ?? [];
      setTotalCount(res.totalCount ?? incoming.length);
      setTotalPages(
        res.totalPages ??
          Math.ceil((res.totalCount ?? incoming.length) / pageSize),
      );
      setDonations(incoming);
      incoming.forEach((d) => knownDonationIdsRef.current.add(d.id));
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, filterCampaign, debouncedSearch]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const matchesCurrentSearch = useCallback(
    (donation: PublicDonation) => {
      const query = debouncedSearch.trim().toLowerCase();
      if (!query) return true;

      return [
        donation.receiptCode,
        donation.donorName,
        String(donation.amount),
        donation.displayText,
      ].some((value) => value?.toLowerCase().includes(query));
    },
    [debouncedSearch],
  );

  /* ── realtime donations via public SignalR hub ── */
  useEffect(() => {
    return subscribePublicDonationHub({
      campaignId: filterCampaign,
      onStatusChange: setHubStatus,
      onDonation: (donation) => {
        if (
          typeof filterCampaign === "number" &&
          donation.fundCampaignId !== filterCampaign
        ) {
          return;
        }

        const isFresh = rememberDonation(donation);
        if (!isFresh) return;
        if (!matchesCurrentSearch(donation)) return;

        markNewDonations([donation]);
        setTotalCount((n) => n + 1);

        if (page === 1) {
          setDonations((prev) =>
            [donation, ...prev.filter((d) => d.id !== donation.id)].slice(
              0,
              pageSize,
            ),
          );
        }

        if (filterCampaign) {
          void refetchCampaignSpending();
        }
      },
    });
  }, [
    filterCampaign,
    markNewDonations,
    matchesCurrentSearch,
    page,
    pageSize,
    refetchCampaignSpending,
    rememberDonation,
  ]);

  /* ── client-side sort ── */
  const displayList = (() => {
    const list = [...donations];
    list.sort((a, b) => {
      if (sortField === "amount") {
        return sortDir === "desc" ? b.amount - a.amount : a.amount - b.amount;
      }
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sortDir === "desc" ? tb - ta : ta - tb;
    });
    return list;
  })();

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <CaretDown className="w-3 h-3 text-white/30" />;
    return sortDir === "desc" ? (
      <CaretDown className="w-3 h-3 text-[#FF5722]" weight="bold" />
    ) : (
      <CaretUp className="w-3 h-3 text-[#FF5722]" weight="bold" />
    );
  };

  const pageNumbers = (() => {
    const total = totalPages;
    const cur = page;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (cur <= 4) return [1, 2, 3, 4, 5, -1, total];
    if (cur >= total - 3)
      return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
    return [1, -1, cur - 1, cur, cur + 1, -1, total];
  })();

  const getDonationSubtitle = (donation: PublicDonation) => {
    if (donation.donorEmail) {
      return donation.isPrivate
        ? maskEmail(donation.donorEmail)
        : donation.donorEmail;
    }

    if (donation.displayText) return donation.displayText;
    if (donation.paidAt) return `Thanh toán: ${formatDate(donation.paidAt)}`;
    return "Đóng góp công khai";
  };

  /* ══════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-348 mx-auto px-4 sm:px-8 py-4 sm:py-8">
        {/* Page header */}
        <div className="mb-8 border-b-2 border-black pb-6">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <p className="flex w-fit items-center gap-2 text-xs font-mono tracking-[0.35em] text-[#FF5722] uppercase mb-2">
            <span>Cập nhật tự động</span>
            <span
              title={`Realtime ${hubStatus}`}
              className={`h-2 w-2 rounded-full ${
                hubStatus === "connected"
                  ? "bg-emerald-500"
                  : hubStatus === "connecting"
                    ? "bg-amber-500"
                    : "bg-black/25"
              }`}
            />
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            DANH SÁCH ĐÓNG GÓP
          </h1>
        </div>

        {/* Toolbar */}
        <div className="mb-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
          <div className="relative flex-1 min-w-0">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã biên nhận, tên, số tiền..."
              className="w-full pl-9 pr-4 py-2.5 border-2 border-black/15 text-sm focus:outline-none focus:border-[#FF5722] transition-colors"
            />
          </div>

          <div className="relative">
            <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/35 pointer-events-none" />
            <select
              value={filterCampaign ?? ""}
              onChange={(e) =>
                setFilterCampaign(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="pl-9 pr-8 py-2.5 border-2 border-black/15 text-sm appearance-none focus:outline-none focus:border-[#FF5722] transition-colors bg-white cursor-pointer"
            >
              <option value="">Tất cả chiến dịch</option>
              {campaigns?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="pl-3 pr-8 py-2.5 border-2 border-black/15 text-sm appearance-none focus:outline-none focus:border-[#FF5722] transition-colors bg-white cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} hàng / trang
              </option>
            ))}
          </select>

          <div className="flex border-2 border-black/15 overflow-hidden">
            <button
              onClick={() => toggleSort("createdAt")}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-black border-r border-black/15 transition-colors ${
                sortField === "createdAt"
                  ? "bg-black text-white"
                  : "hover:bg-black/5"
              }`}
            >
              {sortDir === "desc" && sortField === "createdAt" ? (
                <SortDescending className="w-4 h-4" weight="bold" />
              ) : (
                <SortAscending className="w-4 h-4" weight="bold" />
              )}
              Thời gian
            </button>
            <button
              onClick={() => toggleSort("amount")}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-black transition-colors ${
                sortField === "amount"
                  ? "bg-black text-white"
                  : "hover:bg-black/5"
              }`}
            >
              {sortDir === "desc" && sortField === "amount" ? (
                <SortDescending className="w-4 h-4" weight="bold" />
              ) : (
                <SortAscending className="w-4 h-4" weight="bold" />
              )}
              Số tiền
            </button>
          </div>

          <button
            onClick={() => {
              void fetchDonations();
              if (filterCampaign) {
                void refetchCampaignSpending();
              }
            }}
            disabled={isLoading}
            title="Làm mới"
            className="p-2.5 border-2 border-black/15 hover:border-[#FF5722] hover:text-[#FF5722] transition-colors disabled:opacity-40"
          >
            <ArrowClockwise
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              weight="bold"
            />
          </button>

          {/* <span className="ml-auto text-xs text-black/35 font-mono hidden sm:block">
            {totalCount.toLocaleString()} lượt đóng góp
          </span> */}
        </div>

        {/* Campaign spending summary */}
        {filterCampaign && (
          <div className="mb-5 border-2 border-black overflow-hidden">
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between gap-3">
              <p className="text-xs font-mono tracking-widest uppercase">
                Tổng quan giải ngân chiến dịch
              </p>
              {spendingLoading && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-white/70">
                  <Spinner className="w-3.5 h-3.5 animate-spin" /> Đang tải...
                </span>
              )}
            </div>

            {campaignSpending ? (
              <>
                <div className="px-4 py-4 border-b border-black/10">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    {campaignSpending.campaignName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-black/10">
                  {[
                    {
                      label: "Tổng quyên góp",
                      value: formatVNDLong(campaignSpending.totalRaised),
                    },
                    {
                      label: "Đã giải ngân",
                      value: formatVNDLong(campaignSpending.totalDisbursed),
                    },
                    {
                      label: "Số dư còn lại",
                      value: formatVNDLong(campaignSpending.remainingBalance),
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.label}
                      className={`px-4 py-3 ${idx < 2 ? "sm:border-r border-black/10" : ""}`}
                    >
                      <p className="text-xs font-mono tracking-widest uppercase text-black/45 mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base font-black text-[#FF5722]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-black/3">
                        <th className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase">
                          Kho nhận
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase">
                          Số tiền
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase hidden md:table-cell">
                          Mục đích
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase">
                          Thời gian
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignSpending.disbursements.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-8 text-center text-sm text-black/35"
                          >
                            Chưa có dữ liệu giải ngân.
                          </td>
                        </tr>
                      ) : (
                        campaignSpending.disbursements.map((row) => (
                          <tr key={row.id} className="border-t border-black/8">
                            <td className="px-4 py-3.5">
                              <p className="font-bold text-sm">
                                {row.depotName}
                              </p>
                              <p className="text-[11px] text-black/40">
                                {row.type}
                              </p>
                            </td>
                            <td className="px-4 py-3.5 text-right whitespace-nowrap font-black text-[#FF5722]">
                              {formatVNDLong(row.amount)}
                            </td>
                            <td className="px-4 py-3.5 text-xs text-black/60 hidden md:table-cell">
                              {row.purpose || "—"}
                            </td>
                            <td className="px-4 py-3.5 text-xs text-black/45 font-mono whitespace-nowrap">
                              {formatDate(row.createdAt)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              !spendingLoading && (
                <div className="px-4 py-8 text-center text-sm text-black/35">
                  Không tải được dữ liệu giải ngân chiến dịch.
                </div>
              )
            )}
          </div>
        )}

        {/* Table */}
        <div className="border-2 border-black overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal w-12">
                    #
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase">
                    Người đóng góp
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase">
                    Chiến dịch
                  </th>
                  <th
                    className="text-right px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase cursor-pointer hover:text-[#FF5722] transition-colors select-none"
                    onClick={() => toggleSort("amount")}
                  >
                    <span className="inline-flex items-center gap-1 justify-end">
                      Số tiền <SortIcon field="amount" />
                    </span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase hidden md:table-cell">
                    Lời nhắn
                  </th>
                  <th
                    className="text-left px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase cursor-pointer hover:text-[#FF5722] transition-colors select-none"
                    onClick={() => toggleSort("createdAt")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Thời gian <SortIcon field="createdAt" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-black/30">
                        <Spinner className="w-7 h-7 animate-spin text-[#FF5722]" />
                        <p className="text-xs font-mono tracking-widest uppercase">
                          Đang tải...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : displayList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-20 text-center text-sm text-black/35"
                    >
                      Không có kết quả nào.
                    </td>
                  </tr>
                ) : (
                  displayList.map((d, idx) => (
                    <tr
                      key={d.id}
                      className={`border-b border-black/8 transition-colors ${
                        newIds.has(d.id)
                          ? "bg-[#FF5722]/8"
                          : idx % 2 === 0
                            ? "bg-white hover:bg-black/2"
                            : "bg-black/1.5 hover:bg-black/[0.035]"
                      }`}
                    >
                      <td className="px-4 py-3.5 text-black/30 text-xs font-mono">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center shrink-0">
                            {d.isPrivate ? (
                              <EyeSlash
                                className="w-4 h-4 text-[#FF5722]/50"
                                weight="bold"
                              />
                            ) : (
                              <span className="text-[#FF5722] font-black text-xs">
                                {d.donorName.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm">
                              {d.isPrivate ? "Ẩn danh" : d.donorName}
                            </p>
                            <p className="text-xs text-black/75">
                              {getDonationSubtitle(d)}
                            </p>
                          </div>
                          {newIds.has(d.id) && (
                            <span className="inline-flex items-center gap-1 text-xs font-black text-[#FF5722] border border-[#FF5722]/40 px-1.5 py-0.5 shrink-0">
                              <RadioButton className="w-2 h-2" weight="fill" />
                              MỚI
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-black/65 whitespace-nowrap">
                          {d.fundCampaignName}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <span className="font-black text-[#FF5722] text-base">
                          {formatVND(d.amount)}
                        </span>
                        <span className="text-[10px] text-black/35 ml-0.5">
                          VNĐ
                        </span>
                      </td>
                      <td className="px-4 py-3.5 max-w-55 hidden md:table-cell">
                        {d.note ? (
                          <p className="text-sm text-black/50 italic line-clamp-2">
                            &ldquo;{d.note}&rdquo;
                          </p>
                        ) : (
                          <span className="text-sm text-black/20">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-xs text-black/45 font-mono">
                        {formatDate(d.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-black/40 font-mono">
              Trang {page} / {totalPages} — {totalCount.toLocaleString()} kết
              quả
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 border-2 border-black/15 hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <CaretLeft className="w-4 h-4" weight="bold" />
              </button>
              {pageNumbers.map((p, i) =>
                p === -1 ? (
                  <span
                    key={`e-${i}`}
                    className="w-9 h-9 flex items-center justify-center text-black/30 text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 text-sm font-black border-2 transition-colors ${
                      p === page
                        ? "border-[#FF5722] bg-[#FF5722] text-white"
                        : "border-black/15 hover:border-black"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 border-2 border-black/15 hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <CaretRight className="w-4 h-4" weight="bold" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationFeedPage;
