import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  SpinnerGap,
  Certificate,
  Plus,
  X,
  FilePdf,
  Image as ImageIcon,
  File as FileIcon,
  CaretDown,
  CheckCircle,
  Info,
} from "@phosphor-icons/react";
import { uploadFile } from "@/utils/uploadFile";
import { useSubmitDocuments, useDocumentFileTypes } from "@/services/form/hooks";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

/* ── Types ───────────────────────────────────────────────────── */
interface CertEntry {
  id: string;
  certType: string;
  certTypeId: number;
  certTypeLabel: string;
  fileUrl: string;
  fileName: string;
  isUploading: boolean;
}


/* ── File icon helper ─────────────────────────────────────────── */
const FileTypeIcon = ({ name }: { name: string }) => {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return <FilePdf className="w-5 h-5 text-red-500" weight="duotone" />;
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
    return <ImageIcon className="w-5 h-5 text-blue-500" weight="duotone" />;
  return <FileIcon className="w-5 h-5 text-black/40" weight="duotone" />;
};

/* ═══════════════════════════════════════════════════════════════ */
const DocumentsUploadPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const submitDocsMutation = useSubmitDocuments();
  const { data: certTypes = [], isLoading: certTypesLoading } = useDocumentFileTypes();

  /* State */
  const [certEntries, setCertEntries] = useState<CertEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* "Add cert" popover */
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [pendingCertType, setPendingCertType] = useState<string | null>(null);

  /* Refs */
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  /* ── Guards ── */
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) { navigate("/auth/login"); return; }
  }, [authLoading, isAuthenticated, navigate]);

  /* ── Entrance animation ── */
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [authLoading]);

  /* ── Close popover on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        addBtnRef.current &&
        !addBtnRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Select cert type → trigger file input ── */
  const handleCertTypeSelect = (value: string) => {
    setPendingCertType(value);
    setPopoverOpen(false);
    setTimeout(() => fileInputRef.current?.click(), 50);
  };

  /* ── File chosen → upload ── */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingCertType) return;

    const certType = certTypes.find((t) => t.code === pendingCertType);
    if (!certType) return;

    const entryId = crypto.randomUUID();

    /* Add placeholder while uploading */
    setCertEntries((prev) => [
      ...prev,
      {
        id: entryId,
        certType: certType.code,
        certTypeId: certType.id,
        certTypeLabel: certType.name,
        fileUrl: "",
        fileName: file.name,
        isUploading: true,
      },
    ]);

    setPendingCertType(null);
    e.target.value = "";

    try {
      const result = await uploadFile(file);
      setCertEntries((prev) =>
        prev.map((entry) =>
          entry.id === entryId
            ? { ...entry, fileUrl: result.url, isUploading: false }
            : entry
        )
      );
      toast.success("Tải lên thành công!");
    } catch {
      toast.error("Tải lên thất bại. Vui lòng thử lại.");
      setCertEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    }
  };

  /* ── Remove entry ── */
  const handleRemove = (id: string) => {
    setCertEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  /* ── Submit ── */
  const handleSubmit = (skipDocuments = false) => {
    setIsSubmitting(true);

    const payload = {
      documents: skipDocuments
        ? []
        : certEntries
            .filter((e) => e.fileUrl)
            .map((e) => ({ fileUrl: e.fileUrl, fileTypeId: e.certTypeId })),
    };
    submitDocsMutation.mutate(
      payload,
      {
        onSuccess: () => {
          setIsSubmitting(false);
          navigate("/auth/detailed-abilities");
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const isAnyUploading = certEntries.some((e) => e.isUploading);

  /* ── Loading screen ── */
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-black/60">Đang tải...</p>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════ */
  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hidden file input (shared) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ── Header ── */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="hover:opacity-70 transition-opacity">
          <img src="/resq_typo_logo.svg" alt="ResQ SOS" className="h-12 sm:h-14 lg:h-16 w-auto" />
        </Link>
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60">
          Chứng chỉ &amp; Tài liệu
        </span>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* ── Left – Form ── */}
        <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-black/10">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black/60">
                Bước 3/4 — Chứng chỉ &amp; Tài liệu
              </span>
            </div>
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF5722]"
                initial={{ width: "50%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <div ref={contentRef} className="flex-1">
            {/* Back */}
            <button
              type="button"
              onClick={() => navigate("/auth/ability-check")}
              className="flex items-center gap-1.5 text-sm text-black/50 hover:text-black transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Quay lại
            </button>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-3">
              CHỨNG CHỈ
              <br />
              <span className="text-black/30">&amp; TÀI LIỆU</span>
            </h1>
            <p className="text-sm sm:text-base text-black/60 mb-8">
              Tải lên các chứng chỉ, bằng cấp hoặc giấy phép liên quan đến kỹ năng cứu hộ của bạn.
            </p>

            {/* ── Cert list ── */}
            <div className="space-y-3 mb-4">
              <AnimatePresence initial={false}>
                {certEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                      entry.isUploading
                        ? "border-black/10 bg-black/3"
                        : "border-[#FF5722]/30 bg-[#FF5722]/4"
                    }`}
                  >
                    {/* Status icon */}
                    <div className="shrink-0">
                      {entry.isUploading ? (
                        <SpinnerGap className="w-5 h-5 text-[#FF5722] animate-spin" weight="bold" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-[#FF5722]" weight="fill" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#FF5722] truncate">
                        {entry.certTypeLabel}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <FileTypeIcon name={entry.fileName} />
                        <p className="text-sm text-black/60 truncate">
                          {entry.isUploading ? "Đang tải lên..." : entry.fileName}
                        </p>
                      </div>
                    </div>

                    {/* Remove */}
                    {!entry.isUploading && (
                      <button
                        type="button"
                        onClick={() => handleRemove(entry.id)}
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-black/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <X className="w-4 h-4" weight="bold" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Add cert button + popover ── */}
            <div className="relative mb-8">
              <button
                ref={addBtnRef}
                type="button"
                onClick={() => setPopoverOpen((o) => !o)}
                disabled={isAnyUploading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-dashed border-black/20 rounded-xl text-sm font-semibold text-black/50 hover:border-[#FF5722] hover:text-[#FF5722] hover:bg-[#FF5722]/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" weight="bold" />
                Thêm chứng chỉ / tài liệu
                <CaretDown
                  className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${
                    popoverOpen ? "rotate-180" : ""
                  }`}
                  weight="bold"
                />
              </button>

              {/* Cert type popover */}
              <AnimatePresence>
                {popoverOpen && (
                  <motion.div
                    ref={popoverRef}
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-2.5 border-b border-black/5 bg-black/2">
                      <p className="text-xs font-bold uppercase tracking-wider text-black/40">
                        Chọn loại chứng chỉ
                      </p>
                    </div>
                    <ul className="py-1 max-h-64 overflow-y-auto">
                      {certTypesLoading ? (
                        <li className="px-4 py-3 text-sm text-black/40 flex items-center gap-2">
                          <SpinnerGap className="w-4 h-4 animate-spin" weight="bold" />
                          Đang tải...
                        </li>
                      ) : (
                        certTypes.map((ct) => (
                          <li key={ct.code}>
                            <button
                              type="button"
                              onClick={() => handleCertTypeSelect(ct.code)}
                              className="w-full text-left px-4 py-2.5 text-sm font-medium text-black/80 hover:bg-[#FF5722]/8 hover:text-[#FF5722] transition-colors flex items-center gap-3"
                            >
                              <Certificate
                                className="w-4 h-4 shrink-0 text-[#FF5722]/60"
                                weight="duotone"
                              />
                              {ct.name}
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info note */}
            <div className="flex gap-3 p-4 bg-[#FF5722]/5 border border-[#FF5722]/20 rounded-xl mb-8">
              <Info className="w-5 h-5 text-[#FF5722] shrink-0 mt-0.5" weight="duotone" />
              <p className="text-xs text-black/60 leading-relaxed">
                Bước này{" "}
                <span className="font-semibold text-black/80">không bắt buộc</span>.
                Bạn có thể bỏ qua và bổ sung chứng chỉ sau khi được chấp thuận.
                Hỗ trợ định dạng <span className="font-semibold">JPG, PNG, PDF</span>.
              </p>
            </div>

            {/* ── Actions ── */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                disabled={isSubmitting || isAnyUploading}
                onClick={() => handleSubmit(false)}
                className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin" />
                    Đang nộp hồ sơ...
                  </>
                ) : (
                  <>
                    {certEntries.filter((e) => e.fileUrl).length > 0
                      ? `Tiếp tục với ${certEntries.filter((e) => e.fileUrl).length} chứng chỉ`
                      : "Tiếp tục"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit(true)}
                className="w-full px-6 py-3 border-2 border-black/20 text-sm font-medium text-black/60 hover:border-black hover:text-black transition-colors rounded-xl"
              >
                Bỏ qua, nộp hồ sơ không có chứng chỉ
              </button>
            </div>
          </div>
        </div>

        {/* ── Right – Info panel ── */}
        <div className="hidden lg:flex flex-col bg-[#FF5722] text-white">
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-16 py-16">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8">
              <Certificate className="w-8 h-8 text-white" weight="duotone" />
            </div>
            <h2 className="text-3xl xl:text-4xl font-black tracking-tight leading-[1.1] mb-6">
              HOÀN TẤT
              <br />
              HỒ SƠ
              <br />
              <span className="text-white/40">CỦA BẠN.</span>
            </h2>
            <p className="text-base text-white/80 max-w-md leading-relaxed mb-8">
              Chứng chỉ giúp chúng tôi đánh giá năng lực và ưu tiên phân công nhiệm vụ phù hợp với bạn.
            </p>

            {/* Steps */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-[#00A650] text-white flex items-center justify-center font-black rounded shrink-0">
                  ✓
                </div>
                <div>
                  <p className="font-bold">Thông tin cá nhân</p>
                  <p className="text-sm text-white/60">Đã hoàn thành</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-[#00A650] text-white flex items-center justify-center font-black rounded shrink-0">
                  ✓
                </div>
                <div>
                  <p className="font-bold">Câu hỏi tiên quyết</p>
                  <p className="text-sm text-white/60">Đã hoàn thành</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                <div className="w-10 h-10 bg-white text-[#FF5722] flex items-center justify-center font-black rounded shrink-0">
                  3
                </div>
                <div>
                  <p className="font-bold">Chứng chỉ &amp; Tài liệu</p>
                  <p className="text-sm text-white/60">Đang thực hiện</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-white/20 flex items-center justify-center font-black rounded shrink-0">
                  4
                </div>
                <div>
                  <p className="font-bold">Kỹ năng chi tiết</p>
                  <p className="text-sm text-white/60">Đánh giá năng lực</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-black" />
    </div>
  );
};

export default DocumentsUploadPage;
