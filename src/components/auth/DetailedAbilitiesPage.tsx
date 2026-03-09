import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  LockSimple,
  Warning,
  Plus,
  X,
  CaretDown,
  Certificate,
  SpinnerGap,
  CheckCircle,
  FilePdf,
  Image as ImageIcon,
  File as FileIcon,
  Eye,
} from "@phosphor-icons/react";
import {
  getDominantsFor,
  computeImplied,
  VEHICLE_SKILL_IDS,
} from "@/constants/skillConflicts";
import { useAuth } from "@/hooks/useAuth";
import { useGetAbilities, useSubmitRescuerAbilities } from "@/services/abilities/hooks";
import { useDocumentFileTypes, useSubmitDocuments } from "@/services/form/hooks";
import { buildSkillCategories } from "@/services/abilities/utils";
import type { SkillSubgroup } from "@/services/abilities/utils";
import { uploadFile } from "@/utils/uploadFile";
import { toast } from "sonner";
import { useOnboardingStore } from "@/stores/onboardingStore";

// Subgroup IDs that should be single-select (e.g. professional medical roles)
const SINGLE_SELECT_SUBGROUP_IDS = [4]; // PROFESSIONAL_MEDICAL

// Map ability category code → document file type category code
const CATEGORY_DOC_MAP: Record<string, string> = {
  RESCUE: "RESCUE",
  MEDICAL: "MEDICAL",
  TRANSPORTATION: "TRANSPORTATION",
  EXPERIENCE: "OTHER",
};

/* ── File icon helper ─────────────────────────────────────────── */
const FileTypeIcon = ({ name }: { name: string }) => {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return <FilePdf className="w-5 h-5 text-red-500" weight="duotone" />;
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
    return <ImageIcon className="w-5 h-5 text-blue-500" weight="duotone" />;
  return <FileIcon className="w-5 h-5 text-black/40" weight="duotone" />;
};

const isImageFile = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
};

const DetailedAbilitiesPage = () => {
  const navigate = useNavigate();
  const { completeOnboarding, isAuthenticated, onboardingStatus, isLoading: authLoading } = useAuth();
  const submitAbilitiesMutation = useSubmitRescuerAbilities();
  const submitDocsMutation = useSubmitDocuments();
  const { data: abilitiesData, isLoading: abilitiesLoading } = useGetAbilities();
  const { data: docFileTypes = [], isLoading: docTypesLoading } = useDocumentFileTypes();

  // Build categories from API data
  const apiSkillCategories = useMemo(() => {
    if (!abilitiesData?.items) return [];
    return buildSkillCategories(abilitiesData.items);
  }, [abilitiesData]);

  // Build label map from API
  const apiLabelMap = useMemo(() => {
    const map = new Map<number, string>();
    abilitiesData?.items.forEach(a => map.set(a.id, a.description));
    return map;
  }, [abilitiesData]);

  const getApiSkillLabel = (id: number): string =>
    apiLabelMap.get(id) ?? `Skill #${id}`;

  // ── Abilities state ──
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [hoveredImplied, setHoveredImplied] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Document state từ Zustand store ──
  const { certEntries, addCertEntry, removeCertEntry, updateCertEntry, clearCertEntries } = useOnboardingStore();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [pendingCertType, setPendingCertType] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ── Refs ──
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Derived: skills auto-included by conflict rules
  const impliedSkills = computeImplied(selectedSkills);
  const allSelectedSkills = [...selectedSkills, ...impliedSkills];

  // ── Current category info ──
  const currentCat = apiSkillCategories[currentCategory];
  const currentCatCode = currentCat?.code ?? "";
  const docCategoryCode = CATEGORY_DOC_MAP[currentCatCode] ?? currentCatCode;
  const isLastPage = currentCategory === apiSkillCategories.length - 1;
  const isUploadRequired = currentCatCode !== "EXPERIENCE"; // pages 1-3 required

  // Filter document types for current category
  const currentDocTypes = useMemo(() => {
    return docFileTypes.filter(
      (dt) => dt.documentFileTypeCategory?.code === docCategoryCode
    );
  }, [docFileTypes, docCategoryCode]);

  // Documents for current page
  const currentPageCerts = certEntries.filter((e) => e.categoryCode === currentCatCode);
  const isAnyUploading = certEntries.some((e) => e.isUploading);

  // Có thể tiếp tục nếu không yêu cầu hoặc đã chọn >=1 file
  const canProceed = !isUploadRequired || currentPageCerts.length > 0;

  // ── Guards ──
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) { navigate("/auth/register"); return; }
    if (onboardingStatus.isComplete) { navigate("/profile"); return; }
  }, [authLoading, isAuthenticated, onboardingStatus.isComplete, navigate]);

  // ── Page animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
    }, containerRef);
    return () => ctx.revert();
  }, [currentCategory]);

  // ── Close popover on outside click ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        addBtnRef.current && !addBtnRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Skill toggle ──
  const toggleSkill = (skillId: number, subgroup?: SkillSubgroup) => {
    if (impliedSkills.includes(skillId)) return;
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(prev => prev.filter(id => id !== skillId));
      return;
    }
    const isSingleSelect = subgroup && SINGLE_SELECT_SUBGROUP_IDS.includes(subgroup.id);
    if (isSingleSelect && subgroup) {
      const subgroupSkillIds = subgroup.skills.map((s) => s.id);
      setSelectedSkills(prev => [...prev.filter(id => !subgroupSkillIds.includes(id)), skillId]);
    } else {
      setSelectedSkills(prev => [...prev, skillId]);
    }
  };

  // ── Document upload handlers ──
  const handleCertTypeSelect = (value: string) => {
    setPendingCertType(value);
    setPopoverOpen(false);
    setTimeout(() => fileInputRef.current?.click(), 50);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingCertType) return;

    const certType = docFileTypes.find((t) => t.code === pendingCertType);
    if (!certType) return;

    const entryId = crypto.randomUUID();
    // Tạo preview URL tạm thời cho ảnh (PDF không cần)
    const isImg = isImageFile(file.name);
    const localPreviewUrl = isImg ? URL.createObjectURL(file) : undefined;

    addCertEntry({
      id: entryId,
      certType: certType.code,
      certTypeId: certType.id,
      certTypeLabel: certType.name,
      fileUrl: "",
      fileName: file.name,
      isUploading: false,
      categoryCode: currentCatCode,
      file,
      localPreviewUrl,
    });

    setPendingCertType(null);
    e.target.value = "";
  };

  const handleRemoveCert = (id: string) => removeCertEntry(id);

  // ── Navigation ──
  const handleBack = () => {
    if (currentCategory > 0) setCurrentCategory((prev) => prev - 1);
  };

  const handleContinue = async () => {
    if (!canProceed) return;

    if (!isLastPage) {
      // Trang giữa: chỉ chuyển trang, không upload
      setCurrentCategory((prev) => prev + 1);
      return;
    }

    // Trang cuối — upload TẤT CẢ file từ store rồi submit
    setIsSubmitting(true);

    const allPending = certEntries.filter((e) => !e.fileUrl && e.file);
    const uploadedUrlMap = new Map<string, string>();

    for (const entry of allPending) {
      updateCertEntry(entry.id, { isUploading: true });
      try {
        const result = await uploadFile(entry.file!);
        uploadedUrlMap.set(entry.id, result.url);
        updateCertEntry(entry.id, { fileUrl: result.url, isUploading: false });
      } catch {
        toast.error(`Tải lên thất bại: ${entry.fileName}. Vui lòng thử lại.`);
        updateCertEntry(entry.id, { isUploading: false });
        setIsSubmitting(false);
        return;
      }
    }

    // Gom tất cả URL (cứ + mới) để submit
    const documents = certEntries.map((e) => ({
      fileUrl: e.fileUrl || uploadedUrlMap.get(e.id) || "",
      fileTypeId: e.certTypeId,
    })).filter((d) => d.fileUrl);

    const abilitiesPayload = {
      abilities: allSelectedSkills.map((id) => ({ abilityId: id, level: 1 })),
    };

    try {
      await Promise.all([
        submitDocsMutation.mutateAsync({ documents }),
        submitAbilitiesMutation.mutateAsync(abilitiesPayload),
      ]);
      clearCertEntries();
      completeOnboarding();
      navigate("/profile");
    } catch {
      // Error toasts handled by global axios interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading ──
  if (authLoading || abilitiesLoading || docTypesLoading || apiSkillCategories.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-black/60">Đang tải...</p>
        </div>
      </div>
    );
  }

  const categoryProgress = ((currentCategory + 1) / apiSkillCategories.length) * 100;
  const allCategorySkills = currentCat.subgroups.flatMap(sg => sg.skills);
  const categorySkillsCount = allCategorySkills.filter(skill => allSelectedSkills.includes(skill.id)).length;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Image preview modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setPreviewUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-3xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewUrl(null)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors z-10"
              >
                <X className="w-4 h-4 text-black" weight="bold" />
              </button>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="hover:opacity-70 transition-opacity">
          <img src="/resq_typo_logo.svg" alt="ResQ SOS" className="h-12 sm:h-14 lg:h-16 w-auto" />
        </Link>
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60">
          Bước 3/3 - Kỹ năng & Chứng chỉ
        </span>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left - Form Section */}
        <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-black/10 overflow-y-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black/60">
                Phần {currentCategory + 1}/{apiSkillCategories.length}
              </span>
              <span className="text-xs font-bold text-black">
                {categorySkillsCount}/{allCategorySkills.length} kỹ năng
              </span>
            </div>
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF5722]"
                initial={{ width: 0 }}
                animate={{ width: `${categoryProgress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <div ref={formRef} className="flex-1">
            {/* Page Header */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-2">
              {currentCat.title.toUpperCase()}
            </h1>
            <p className="text-sm sm:text-base text-black/60 mb-6">
              Tải lên chứng chỉ{isUploadRequired ? " (bắt buộc)" : " (không bắt buộc)"} và chọn các kỹ năng bạn có.
            </p>

            {/* ═══════ DOCUMENT UPLOAD SECTION ═══════ */}
            <div className="mb-8 p-5 bg-black/[0.02] border-2 border-dashed border-black/15 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Certificate className="w-5 h-5 text-[#FF5722]" weight="duotone" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70">
                  Chứng chỉ & Tài liệu
                </h3>
                {isUploadRequired ? (
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded-full">
                    Bắt buộc
                  </span>
                ) : (
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-black/40 bg-black/5 px-2 py-0.5 rounded-full">
                    Tùy chọn
                  </span>
                )}
              </div>

              {/* Cert entries list */}
              {currentPageCerts.length > 0 && (
                <div className="space-y-2 mb-3">
                  <AnimatePresence initial={false}>
                    {currentPageCerts.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 ${entry.isUploading
                          ? "border-black/10 bg-white"
                          : "border-[#00A650]/30 bg-[#00A650]/5"
                          }`}
                      >
                        {/* Thumbnail / Icon */}
                        <div className="shrink-0">
                          {entry.isUploading ? (
                            <SpinnerGap className="w-5 h-5 text-[#FF5722] animate-spin" weight="bold" />
                          ) : isImageFile(entry.fileName) && (entry.localPreviewUrl || entry.fileUrl) ? (
                            <button
                              type="button"
                              onClick={() => setPreviewUrl(entry.localPreviewUrl || entry.fileUrl)}
                              className="w-10 h-10 rounded-lg overflow-hidden border border-black/10 hover:ring-2 hover:ring-[#FF5722] transition-all relative group"
                            >
                              <img
                                src={entry.localPreviewUrl || entry.fileUrl}
                                alt={entry.fileName}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                              </div>
                            </button>
                          ) : (
                            <CheckCircle className="w-5 h-5 text-[#00A650]" weight="fill" />
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

                        {/* Preview & Remove */}
                        {!entry.isUploading && (
                          <div className="flex items-center gap-1 shrink-0">
                            {isImageFile(entry.fileName) && (entry.localPreviewUrl || entry.fileUrl) && (
                              <button
                                type="button"
                                onClick={() => setPreviewUrl(entry.localPreviewUrl || entry.fileUrl)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-black/30 hover:text-[#FF5722] hover:bg-[#FF5722]/10 transition-colors"
                              >
                                <Eye className="w-4 h-4" weight="bold" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveCert(entry.id)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-black/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <X className="w-4 h-4" weight="bold" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Add cert button + popover */}
              <div className="relative">
                <button
                  ref={addBtnRef}
                  type="button"
                  onClick={() => setPopoverOpen((o) => !o)}
                  disabled={isAnyUploading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-black/15 rounded-xl text-sm font-semibold text-black/50 hover:border-[#FF5722] hover:text-[#FF5722] hover:bg-[#FF5722]/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" weight="bold" />
                  Thêm chứng chỉ
                  <CaretDown
                    className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${popoverOpen ? "rotate-180" : ""}`}
                    weight="bold"
                  />
                </button>

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
                      <div className="px-4 py-2.5 border-b border-black/5 bg-black/[0.02]">
                        <p className="text-xs font-bold uppercase tracking-wider text-black/40">
                          Chọn loại chứng chỉ
                        </p>
                      </div>
                      <ul className="py-1 max-h-64 overflow-y-auto">
                        {currentDocTypes.length === 0 ? (
                          <li className="px-4 py-3 text-sm text-black/40">
                            Không có loại chứng chỉ cho danh mục này
                          </li>
                        ) : (
                          currentDocTypes.map((ct) => (
                            <li key={ct.code}>
                              <button
                                type="button"
                                onClick={() => handleCertTypeSelect(ct.code)}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-black/80 hover:bg-[#FF5722]/[0.08] hover:text-[#FF5722] transition-colors flex items-center gap-3"
                              >
                                <Certificate className="w-4 h-4 shrink-0 text-[#FF5722]/60" weight="duotone" />
                                <div>
                                  <p className="font-medium">{ct.name}</p>
                                  <p className="text-xs text-black/40 mt-0.5">{ct.description}</p>
                                </div>
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Upload status note */}
              {isUploadRequired && (
                <div className={`flex gap-2 mt-3 p-3 rounded-lg text-xs ${currentPageCerts.length > 0
                  ? "bg-[#00A650]/8 text-[#00A650]"
                  : "bg-amber-50 text-amber-600"
                  }`}>
                  {currentPageCerts.length > 0 ? (
                    <CheckCircle className="w-4 h-4 shrink-0" weight="fill" />
                  ) : (
                    <Warning className="w-4 h-4 shrink-0" weight="fill" />
                  )}
                  <span>
                    {currentPageCerts.length > 0
                      ? `Đã chọn ${currentPageCerts.length} chứng chỉ. Bấm Tiếp tục để tải lên.`
                      : "Vui lòng chọn ít nhất 1 chứng chỉ để tiếp tục."}
                  </span>
                </div>
              )}
            </div>

            {/* ═══════ ABILITIES SELECTION ═══════ */}
            <div className="space-y-8">
              <div className="mb-4">
                <h3 className="text-base font-black tracking-tight text-black flex items-center gap-2">
                  Chọn kỹ năng
                </h3>
              </div>

              {/* Subgroups */}
              {currentCat.subgroups.map((subgroup) => {
                const isSingleSelect = SINGLE_SELECT_SUBGROUP_IDS.includes(subgroup.id);
                return (
                  <div key={subgroup.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-black/80">
                        {subgroup.subtitle}
                      </h3>
                      {isSingleSelect && (
                        <span className="text-xs font-medium text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded-full">
                          Chọn 1
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subgroup.skills.map((skill) => {
                        const isManual = selectedSkills.includes(skill.id);
                        const isImplied = impliedSkills.includes(skill.id);
                        const activeDominants = getDominantsFor(skill.id).filter(d => selectedSkills.includes(d));

                        const isVehicleGated = [43, 44].includes(skill.id);
                        const hasVehicle = allSelectedSkills.some(id => VEHICLE_SKILL_IDS.includes(id));
                        const isGatedDisabled = isVehicleGated && !hasVehicle;
                        const isDisabled = isImplied || isGatedDisabled;

                        return (
                          <div key={skill.id} className="relative">
                            <button
                              onClick={() => toggleSkill(skill.id, subgroup)}
                              disabled={isDisabled}
                              className={`relative w-full px-4 py-3 border-2 rounded-full text-left text-sm font-medium transition-all ${isImplied
                                ? "border-[#00A650]/40 bg-[#00A650]/5 text-black/45 cursor-not-allowed"
                                : isGatedDisabled
                                  ? "border-black/10 bg-black/[0.03] text-black/25 cursor-not-allowed"
                                  : isManual
                                    ? "border-[#00A650] bg-[#00A650]/10 text-black"
                                    : "border-black/20 hover:border-black/40 text-black/70"
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="flex-1">{skill.label}</span>

                                {isImplied && (
                                  <div
                                    className="relative shrink-0"
                                    onMouseEnter={() => setHoveredImplied(skill.id)}
                                    onMouseLeave={() => setHoveredImplied(null)}
                                  >
                                    <div className="w-5 h-5 bg-[#00A650]/40 rounded-full flex items-center justify-center">
                                      <LockSimple className="w-3 h-3 text-[#00A650]" weight="fill" />
                                    </div>
                                    {hoveredImplied === skill.id && (
                                      <div className="absolute bottom-full right-0 mb-2 z-50 w-60 bg-black text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
                                        <span className="text-[#4ade80] font-bold">Tự động bao gồm bởi:</span>
                                        <br />
                                        <span className="font-medium">{activeDominants.map(id => getApiSkillLabel(id)).join(', ')}</span>
                                        <div className="absolute top-full right-3 border-4 border-transparent border-t-black" />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {isGatedDisabled && (
                                  <div
                                    className="relative shrink-0"
                                    onMouseEnter={() => setHoveredImplied(skill.id)}
                                    onMouseLeave={() => setHoveredImplied(null)}
                                  >
                                    <Warning className="w-4 h-4 text-black/25" weight="fill" />
                                    {hoveredImplied === skill.id && (
                                      <div className="absolute bottom-full right-0 mb-2 z-50 w-64 bg-black text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
                                        <span className="text-amber-400 font-bold">Yêu cầu phương tiện</span>
                                        <br />
                                        <span>Chọn ít nhất 1 loại phương tiện ở trên để mở khóa kỹ năng này.</span>
                                        <div className="absolute top-full right-3 border-4 border-transparent border-t-black" />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {isManual && (
                                  <div className="w-5 h-5 bg-[#00A650] rounded-full flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" weight="bold" />
                                  </div>
                                )}
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-8 border-t border-black/10 flex items-center justify-between gap-4">
              <div>
                {currentCategory > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm font-bold text-black/60 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại
                  </button>
                )}
              </div>

              <button
                onClick={handleContinue}
                disabled={isSubmitting || isAnyUploading || !canProceed}
                className="px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : isLastPage ? (
                  <>
                    Hoàn tất
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Tiếp tục
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right - Info Section */}
        <div className="hidden lg:flex flex-col bg-black text-white">
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-16 py-16">
            <h2 className="text-3xl xl:text-4xl font-black tracking-tight leading-[1.1] mb-6">
              CHỌN
              <br />
              KỸ NĂNG
              <br />
              <span className="text-white/40">CỦA BẠN.</span>
            </h2>
            <p className="text-base text-white/80 max-w-md leading-relaxed mb-8">
              Tải lên chứng chỉ liên quan và chọn kỹ năng phù hợp. Thông tin này giúp chúng tôi phân công nhiệm vụ phù hợp nhất với bạn.
            </p>

            {/* Selected Skills Preview */}
            {allSelectedSkills.length > 0 && (
              <div className="p-6 bg-white/10 rounded-lg mb-6">
                <p className="text-sm font-bold uppercase tracking-wider mb-3">
                  ĐÃ CHỌN ({allSelectedSkills.length} TỔNG)
                  {impliedSkills.length > 0 && (
                    <span className="ml-2 text-[#4ade80]/80 font-normal normal-case tracking-normal">
                      (gồm {impliedSkills.length} tự động)
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {allSelectedSkills.slice(0, 8).map((skillId) => {
                    const isAuto = impliedSkills.includes(skillId);
                    return (
                      <span
                        key={skillId}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${isAuto ? "bg-[#00A650]/30 text-[#4ade80]" : "bg-white/20"
                          }`}
                      >
                        {isAuto && "🔒 "}{getApiSkillLabel(skillId)}
                      </span>
                    );
                  })}
                  {allSelectedSkills.length > 8 && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                      +{allSelectedSkills.length - 8} kỹ năng khác
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Docs summary */}
            {certEntries.length > 0 && (
              <div className="p-4 bg-[#FF5722]/20 rounded-lg mb-6">
                <p className="text-xs font-bold uppercase tracking-wider mb-2">
                  📄 Chứng chỉ đã chọn ({certEntries.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {certEntries.map((cert) => (
                    <span key={cert.id} className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded text-[11px] font-medium truncate max-w-[180px]">
                      {cert.fileUrl ? "" : <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                      {cert.certTypeLabel}
                    </span>
                  ))}
                </div>
                {certEntries.some(e => !e.fileUrl) && (
                  <p className="text-[10px] text-white/50 mt-2">● chưa upload • sẽ đẩy lên khi Hoàn tất</p>
                )}
              </div>
            )}

            {/* Category Progress Cards */}
            <div className="space-y-3">
              {apiSkillCategories.map((cat, index) => {
                const catAllSkills = cat.subgroups.flatMap(sg => sg.skills);
                const catSkills = catAllSkills.filter(skill => allSelectedSkills.includes(skill.id)).length;
                const catDocs = certEntries.filter(e => e.categoryCode === cat.code).length;
                return (
                  <div
                    key={cat.id}
                    className={`p-4 rounded-lg transition-all ${index === currentCategory
                      ? "bg-[#FF5722] text-white"
                      : index < currentCategory
                        ? "bg-white/10 text-white/80"
                        : "bg-white/5 text-white/40"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded ${index < currentCategory ? "bg-[#00A650] text-white" : "bg-white/10"
                        }`}>
                        {index < currentCategory ? <Check className="w-4 h-4" weight="bold" /> : index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{cat.title}</p>
                        <p className="text-xs opacity-60">
                          {catSkills}/{catAllSkills.length} kỹ năng • {catDocs} chứng chỉ
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-black" />
    </div>
  );
};

export default DetailedAbilitiesPage;
