import { Fragment, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowClockwise,
  CaretLeft,
  CaretRight,
  Funnel,
  Spinner,
} from "@phosphor-icons/react";
import { ArrowLeft } from "lucide-react";
import {
  useGetCampaignsMetadata,
  useGetPublicCampaignSpending,
} from "@/services/campaign/hooks";

const PAGE_SIZE = 10;

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

const formatDateOnly = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const DisbursementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const campaignIdParam = Number(searchParams.get("campaignId"));
  const initialCampaignId =
    Number.isFinite(campaignIdParam) && campaignIdParam > 0
      ? campaignIdParam
      : null;

  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(
    initialCampaignId,
  );
  const [expandedDepot, setExpandedDepot] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const { data: campaigns } = useGetCampaignsMetadata();
  const rawFirstCampaignId = campaigns?.[0]?.key
    ? Number(campaigns[0].key)
    : null;
  const firstCampaignId =
    rawFirstCampaignId &&
    Number.isFinite(rawFirstCampaignId) &&
    rawFirstCampaignId > 0
      ? rawFirstCampaignId
      : null;
  const effectiveCampaignId = selectedCampaign ?? firstCampaignId;
  const {
    data: spending,
    isLoading,
    refetch,
  } = useGetPublicCampaignSpending(effectiveCampaignId, {
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.max(
    1,
    Math.ceil((spending?.totalCount ?? 0) / PAGE_SIZE),
  );

  const pageNumbers = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 4) return [1, 2, 3, 4, 5, -1, totalPages];
    if (page >= totalPages - 3) {
      return [
        1,
        -1,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [1, -1, page - 1, page, page + 1, -1, totalPages];
  })();

  const handleCampaignChange = (campaignId: number | null) => {
    setSelectedCampaign(campaignId);
    setPage(1);
    setExpandedDepot(null);

    if (campaignId) {
      setSearchParams({ campaignId: String(campaignId) });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-348 mx-auto px-4 sm:px-8 py-4 sm:py-8">
        <div className="mb-8 border-b-2 border-black pb-6">
          <Link
            to="/donations"
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách đóng góp
          </Link>
          <p className="w-fit text-xs font-mono tracking-[0.35em] text-[#FF5722] uppercase mb-2">
            Minh bạch tài chính
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            BÁO CÁO GIẢI NGÂN
          </h1>
        </div>

        <div className="mb-5 flex w-full gap-3 items-stretch">
          <div className="relative flex-1 min-w-0">
            <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/35 pointer-events-none" />
            <select
              value={effectiveCampaignId ?? ""}
              onChange={(e) =>
                handleCampaignChange(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full h-12 pl-9 pr-8 border-2 border-black/15 text-sm appearance-none focus:outline-none focus:border-[#FF5722] transition-colors bg-white cursor-pointer"
            >
              <option value="">Chọn chiến dịch</option>
              {campaigns?.map((c) => (
                <option key={c.key} value={Number(c.key)}>
                  {c.value}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => void refetch()}
            disabled={isLoading || !effectiveCampaignId}
            title="Làm mới"
            className="h-12 w-12 shrink-0 border-2 border-black/15 hover:border-[#FF5722] hover:text-[#FF5722] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ArrowClockwise
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              weight="bold"
            />
          </button>
        </div>

        <div className="border-2 border-black overflow-hidden">
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-xs font-mono tracking-widest uppercase">
              Tổng quan giải ngân chiến dịch
            </p>
            {isLoading && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white/70">
                <Spinner className="w-3.5 h-3.5 animate-spin" /> Đang tải...
              </span>
            )}
          </div>

          {!effectiveCampaignId ? (
            <div className="px-4 py-10 text-center text-sm text-black/35">
              Vui lòng chọn chiến dịch để xem dữ liệu giải ngân.
            </div>
          ) : spending ? (
            <>
              <div className="px-4 py-4 border-b border-black/10">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">
                  {spending.campaignName}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-black/10">
                {[
                  {
                    label: "Tổng quyên góp",
                    value: formatVNDLong(spending.totalRaised),
                  },
                  {
                    label: "Đã giải ngân",
                    value: formatVNDLong(spending.totalDisbursed),
                  },
                  {
                    label: "Số dư còn lại",
                    value: formatVNDLong(spending.remainingBalance),
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
                        Đã cấp
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase">
                        Đã chi
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-mono tracking-widest font-normal uppercase hidden sm:table-cell">
                        Hoá đơn
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {spending.depots.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-8 text-center text-sm text-black/35"
                        >
                          Chưa có dữ liệu giải ngân.
                        </td>
                      </tr>
                    ) : (
                      spending.depots.map((depot) => {
                        const isExpanded = expandedDepot === depot.depotId;

                        return (
                          <Fragment key={depot.depotId}>
                            <tr
                              className={`border-t border-black/8 cursor-pointer hover:bg-black/2 transition-colors ${isExpanded ? "bg-black/2" : ""}`}
                              onClick={() =>
                                setExpandedDepot(
                                  isExpanded ? null : depot.depotId,
                                )
                              }
                            >
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-black/30 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                                  >
                                    ▶
                                  </span>
                                  <div>
                                    <p className="font-bold text-sm">
                                      {depot.depotName}
                                    </p>
                                    <p className="text-xs text-black/40">
                                      Depot #{depot.depotId} ·{" "}
                                      {depot.allocations.length} lần cấp quỹ
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3.5 text-right whitespace-nowrap text-base font-black text-[#FF5722]">
                                {formatVNDLong(depot.totalAllocated)}
                              </td>
                              <td className="px-4 py-3.5 text-right whitespace-nowrap text-base font-black text-black">
                                {formatVNDLong(depot.totalSpent)}
                              </td>
                              <td className="px-4 py-3.5 text-right text-xs text-black/45 font-mono whitespace-nowrap hidden sm:table-cell">
                                {depot.imports.length.toLocaleString("vi-VN")}
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr className="bg-black/[0.015]">
                                <td colSpan={4} className="px-4 sm:px-6 py-4">
                                  <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.8fr)_minmax(420px,1.2fr)]">
                                    <div>
                                      <p className="text-xs font-mono tracking-widest uppercase text-black/40 mb-2">
                                        Lịch sử cấp quỹ
                                      </p>
                                      <div className="border border-black/10">
                                        {depot.allocations.length === 0 ? (
                                          <p className="px-3 py-4 text-xs text-black/35">
                                            Chưa có khoản cấp quỹ.
                                          </p>
                                        ) : (
                                          depot.allocations.map(
                                            (allocation) => (
                                              <div
                                                key={allocation.id}
                                                className="px-3 py-3 border-b border-black/8 last:border-b-0"
                                              >
                                                <div className="flex items-start justify-between gap-3">
                                                  <div>
                                                    <p className="text-xs font-bold text-black">
                                                      {allocation.purpose ||
                                                        "Cấp quỹ"}
                                                    </p>
                                                    <p className="mt-1 text-xs text-black/45">
                                                      {allocation.type}
                                                      {allocation.fundingRequestId
                                                        ? ` · Yêu cầu #${allocation.fundingRequestId}`
                                                        : ""}
                                                    </p>
                                                  </div>
                                                  <p className="text-sm sm:text-base font-black text-[#FF5722] whitespace-nowrap">
                                                    {formatVNDLong(
                                                      allocation.amount,
                                                    )}
                                                  </p>
                                                </div>
                                                <p className="mt-2 text-xs font-mono text-black/35">
                                                  {formatDate(
                                                    allocation.allocatedAt,
                                                  )}
                                                </p>
                                              </div>
                                            ),
                                          )
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <p className="text-xs font-mono tracking-widest uppercase text-black/40 mb-2">
                                        Hoá đơn nhập hàng
                                      </p>
                                      <div className="h-[420px] lg:h-[560px] overflow-y-auto pr-2 space-y-3">
                                        {depot.imports.length === 0 ? (
                                          <div className="border border-black/10 px-3 py-4 text-xs text-black/35">
                                            Chưa có hoá đơn nhập hàng.
                                          </div>
                                        ) : (
                                          depot.imports.map((invoice) => (
                                            <div
                                              key={`${invoice.depotFundId}-${invoice.vatInvoiceId}-${invoice.invoiceNumber}`}
                                              className="border border-black/10 bg-white"
                                            >
                                              <div className="px-3 py-3 border-b border-black/8">
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                  <div>
                                                    <p className="text-xs font-black text-black">
                                                      {invoice.invoiceSerial} -{" "}
                                                      {invoice.invoiceNumber}
                                                    </p>
                                                    <p className="mt-1 text-xs text-black/50">
                                                      {invoice.supplierName}
                                                    </p>
                                                  </div>
                                                  <div className="text-left sm:text-right">
                                                    <p className="text-sm sm:text-base font-black text-[#FF5722]">
                                                      {formatVNDLong(
                                                        invoice.totalSpent,
                                                      )}
                                                    </p>
                                                    <p className="mt-1 text-xs font-mono text-black/35">
                                                      HĐ{" "}
                                                      {formatDateOnly(
                                                        invoice.invoiceDate,
                                                      )}{" "}
                                                      · Nhập{" "}
                                                      {formatDate(
                                                        invoice.importedAt,
                                                      )}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="overflow-x-auto">
                                                <table className="w-full min-w-[560px] text-xs border-collapse">
                                                  <thead>
                                                    <tr className="border-b border-black/8">
                                                      <th className="text-left px-3 py-2 font-mono tracking-wider font-normal text-black/40 uppercase">
                                                        Tên hàng
                                                      </th>
                                                      <th className="text-center px-3 py-2 font-mono tracking-wider font-normal text-black/40 uppercase">
                                                        Đơn vị
                                                      </th>
                                                      <th className="text-right px-3 py-2 font-mono tracking-wider font-normal text-black/40 uppercase">
                                                        SL
                                                      </th>
                                                      <th className="text-right px-3 py-2 font-mono tracking-wider font-normal text-black/40 uppercase">
                                                        Đơn giá
                                                      </th>
                                                      <th className="text-right px-3 py-2 font-mono tracking-wider font-normal text-black/40 uppercase">
                                                        Thành tiền
                                                      </th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {invoice.items.map(
                                                      (item, i) => (
                                                        <tr
                                                          key={`${item.itemName}-${i}`}
                                                          className="border-b border-black/5 last:border-b-0"
                                                        >
                                                          <td className="px-3 py-2 text-black/70">
                                                            <p className="font-bold text-black">
                                                              {item.itemName}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-black/35">
                                                              {item.itemType} ·
                                                              HSD{" "}
                                                              {formatDateOnly(
                                                                item.expiredDate,
                                                              )}
                                                            </p>
                                                          </td>
                                                          <td className="px-3 py-2 text-center text-black/45">
                                                            {item.unit}
                                                          </td>
                                                          <td className="px-3 py-2 text-right text-black/70">
                                                            {item.quantity.toLocaleString(
                                                              "vi-VN",
                                                            )}
                                                          </td>
                                                          <td className="px-3 py-2 text-right text-black/70">
                                                            {formatVNDLong(
                                                              item.unitPrice,
                                                            )}
                                                          </td>
                                                          <td className="px-3 py-2 text-right text-sm font-black text-black">
                                                            {formatVNDLong(
                                                              item.totalPrice,
                                                            )}
                                                          </td>
                                                        </tr>
                                                      ),
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          ))
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {spending.totalCount > PAGE_SIZE && (
                <div className="px-4 py-3 border-t border-black/10 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-black/40 font-mono">
                    Trang {page} / {totalPages} — {spending.totalCount} kho
                    nhận quỹ
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setPage((p) => Math.max(1, p - 1));
                        setExpandedDepot(null);
                      }}
                      disabled={page <= 1}
                      className="p-1.5 border border-black/15 hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <CaretLeft className="w-3.5 h-3.5" weight="bold" />
                    </button>
                    {pageNumbers.map((p, i) =>
                      p === -1 ? (
                        <span
                          key={`e-${i}`}
                          className="w-7 h-7 flex items-center justify-center text-black/30 text-xs"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => {
                            setPage(p);
                            setExpandedDepot(null);
                          }}
                          className={`w-7 h-7 text-xs font-black border transition-colors ${
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
                      onClick={() => {
                        setPage((p) => Math.min(totalPages, p + 1));
                        setExpandedDepot(null);
                      }}
                      disabled={page >= totalPages}
                      className="p-1.5 border border-black/15 hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <CaretRight className="w-3.5 h-3.5" weight="bold" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            !isLoading && (
              <div className="px-4 py-10 text-center text-sm text-black/35">
                Không tải được dữ liệu giải ngân chiến dịch.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DisbursementPage;
