import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  Envelope,
  Shield,
  Certificate,
  Car,
  FirstAid,
  SignOut,
  ArrowUpRight,
  Lightning,
  CheckCircle,
  Clock,
  Eye,
  X,
  FilePdf,
  CalendarBlank,
  IdentificationBadge,
  ArrowLeft,
} from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import { useGetAbilities, useGetRescuerAbilities } from "@/services/abilities/hooks";
import { buildSkillCategories } from "@/services/abilities/utils";
import { useUserMe } from "@/services/user/hooks";
import { useDocumentFileTypes } from "@/services/form/hooks";
import RescuerScoreRadar from "./RescuerScoreRadar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, rescuerStep, getNextOnboardingPath, logout, isLoading: authLoading } = useAuth();
  const { data: rescuerAbilities } = useGetRescuerAbilities();
  const { data: abilitiesData } = useGetAbilities();
  const { data: userProfile } = useUserMe();
  const { data: docFileTypes = [] } = useDocumentFileTypes();
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/auth/login"); return; }
    if (rescuerStep < 3) { navigate(getNextOnboardingPath()); return; }
  }, [authLoading, getNextOnboardingPath, navigate, rescuerStep, user]);

  useEffect(() => {
    if (authLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".ed-fade", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, [authLoading]);

  const selectedAbilityIds = useMemo(() => rescuerAbilities?.abilities?.map((a) => a.abilityId) || [], [rescuerAbilities]);
  const profileId = useMemo(() => userProfile?.id?.replace(/-/g, "").slice(-8).toUpperCase() ?? "--------", [userProfile?.id]);

  const apiSkillCategories = useMemo(() => {
    if (!abilitiesData?.items) return [];
    return buildSkillCategories(abilitiesData.items);
  }, [abilitiesData]);

  const getSkillsByCategory = () => {
    return apiSkillCategories.map((category) => {
      const categorySkillIds = category.subgroups.flatMap((sg) => sg.skills.map((s) => s.id));
      const selectedInCategory = selectedAbilityIds.filter((id: number) => categorySkillIds.includes(id));
      const skillLabels = selectedInCategory.map((id: number) => {
        const apiAbility = rescuerAbilities?.abilities?.find((a) => a.abilityId === id);
        if (apiAbility) return apiAbility.description;
        for (const subgroup of category.subgroups) {
          const skill = subgroup.skills.find((s) => s.id === id);
          if (skill) return skill.label;
        }
        return String(id);
      });
      return { id: category.id, title: category.title, count: selectedInCategory.length, total: categorySkillIds.length, skills: skillLabels };
    });
  };

  const handleLogout = () => { logout(); navigate("/auth/login"); };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || rescuerStep < 3) return null;

  const skillsByCategory = getSkillsByCategory();
  const totalSkills = selectedAbilityIds.length;
  const categoryIcons = [Shield, FirstAid, Car, Certificate];
  const fullName = `${userProfile?.firstName || ""} ${userProfile?.lastName || ""}`.trim() || user?.name || "Tình nguyện viên";
  const memberDate = new Date(userProfile?.createdAt || user.registeredAt).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const docs = userProfile?.rescuerApplicationDocuments || [];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF9F6]">
      {/* ══════ NEWSPAPER MASTHEAD ══════ */}
      <header className="border-b border-black">
        {/* Top utility bar */}
        <div className="border-b border-black/15">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="h-10 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-black/50 font-medium">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-black/50 font-medium hover:text-[#FF5722] transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Trang chủ
              </Link>
              <div className="flex items-center gap-6">
                <span>Mã: {profileId}</span>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-black/50 hover:text-[#FF5722] transition-colors">
                  <SignOut className="w-3 h-3" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Masthead title */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between">
            {/* <Link to="/" className="hover:opacity-60 transition-opacity">
              <img src="/resq_typo_logo.svg" alt="ResQ SOS" className="h-8 w-auto" />
            </Link> */}
            <p className="text-center flex-1">
              <span className="text-[40px] sm:text-[54px] lg:text-[70px] font-black tracking-[-0.04em] leading-none">
                HỒ SƠ CỨU HỘ VIÊN
              </span>
            </p>
            <div className="w-20" />
          </div>
        </div>

        {/* Sub-masthead rule + edition info */}
        <div className="border-t border-black">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="h-8 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold">
              <span>Ấn bản số {profileId}</span>
              <span>ResQ SOS — Mạng lưới cứu hộ miền Trung</span>

            </div>
          </div>
        </div>
      </header>

      {/* ══════ HERO — ABOVE THE FOLD ══════ */}
      <section className="border-b border-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-0">

            {/* Main headline column */}
            <div className="lg:col-span-8 lg:border-r lg:border-black lg:pr-10 py-6 lg:py-10">
              {/* Verification badge */}
              <div className="ed-fade mb-6">
                {userProfile?.isEligibleRescuer ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[#00A650] text-[#00A650] text-[10px] font-black uppercase tracking-[0.2em]">
                    <CheckCircle className="w-3.5 h-3.5" weight="fill" />
                    Đã xác thực
                  </span>
                ) : (userProfile?.rescuerStep ?? 0) >= 3 ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[#FF9800] text-[#FF9800] text-[10px] font-black uppercase tracking-[0.2em]">
                    <Clock className="w-3.5 h-3.5" weight="fill" />
                    Chờ xác thực
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-black/30 text-black/40 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Clock className="w-3.5 h-3.5" weight="fill" />
                    Chưa hoàn thành
                  </span>
                )}
              </div>

              {/* Name — editorial headline */}
              <div className="ed-fade mb-8">
                <h1 className="text-[48px] sm:text-[64px] lg:text-[72px] xl:text-[80px] font-black leading-[0.88] tracking-[-0.04em]">
                  {(userProfile?.lastName || fullName.split(" ").slice(-1)[0])?.toUpperCase()}
                </h1>
                <h2 className="text-[56px] sm:text-[64px] lg:text-[72px] font-black leading-[0.88] tracking-[-0.03em] text-black/25 mt-2">
                  {(userProfile?.firstName || fullName.split(" ").slice(0, -1).join(" "))?.toUpperCase() || "TÌNH NGUYỆN VIÊN"}
                </h2>
              </div>

              {/* Lead paragraph / pull-quote style */}
              <div className="ed-fade border-l-4 border-[#FF5722] pl-5 mb-8 max-w-xl">
                <p className="text-lg sm:text-xl leading-relaxed text-black/70">
                  Thành viên hệ thống cứu hộ khẩn cấp với <strong className="text-black">{totalSkills} kỹ năng</strong> đã đăng ký và <strong className="text-black">{docs.length} chứng chỉ</strong> được xác minh.
                </p>
              </div>

              {/* Contact details — small text block */}
              <div className="ed-fade grid sm:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <p className="flex items-center gap-3 text-base text-black/60">
                    <Envelope className="w-4 h-4 text-black/30 shrink-0" />
                    {userProfile?.email || user.email}
                  </p>
                  {userProfile?.phone && (
                    <p className="flex items-center gap-3 text-base text-black/60">
                      <Phone className="w-4 h-4 text-black/30 shrink-0" />
                      {userProfile.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2.5">
                  {userProfile?.city && (
                    <p className="flex items-center gap-3 text-base text-black/60">
                      <MapPin className="w-4 h-4 text-black/30 shrink-0" />
                      {[userProfile.ward, userProfile.city].filter(Boolean).join(", ")}
                    </p>
                  )}
                  <p className="flex items-center gap-3 text-base text-black/60">
                    <CalendarBlank className="w-4 h-4 text-black/30 shrink-0" />
                    Tham gia từ {memberDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar — stats & avatar */}
            <div className="lg:col-span-4 lg:pl-10 py-6 lg:py-10 flex flex-col">
              {/* Avatar */}
              <div className="ed-fade mb-8">
                <div className="w-full max-w-[320px] lg:ml-auto lg:mr-0 mx-auto aspect-4/5 bg-black overflow-hidden relative">
                  {(userProfile?.avatarUrl || user.avatar) ? (
                    <img src={userProfile?.avatarUrl || user.avatar} alt={fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black to-black/80">
                      <User className="w-24 h-24 text-white/15" weight="thin" />
                    </div>
                  )}
                  {/* Overlay badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">
                      <IdentificationBadge className="inline w-3 h-3 mr-1.5" weight="fill" />
                      #{profileId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats — editorial number blocks */}
              <div className="ed-fade w-full max-w-[320px] lg:ml-auto lg:mr-0 mx-auto grid grid-cols-2 border border-black">
                <div className="p-4 lg:p-3 border-r border-black text-center">
                  <p className="text-3xl lg:text-4xl font-black leading-none">
                    {totalSkills}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-black/40 mt-1.5">Kỹ năng</p>
                </div>
                <div className="p-4 lg:p-3 text-center">
                  <p className="text-3xl lg:text-4xl font-black leading-none text-[#FF5722]">
                    {docs.length}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-black/40 mt-1.5">Chứng chỉ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RescuerScoreRadar rescuerScore={userProfile?.rescuerScore} />

      {/* ══════ SKILLS — MULTI-COLUMN GRID ══════ */}
      <section className="border-b border-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Section header */}
          <div className="py-6 border-b border-black/15">
            <div className="flex items-end justify-between">
              <div className="ed-fade">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF5722] mb-1">Mục III</p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em]">
                  Năng lực cứu hộ
                </h2>
              </div>
              <p className="ed-fade text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                {totalSkills} / {apiSkillCategories.reduce((acc, c) => acc + c.subgroups.reduce((a, sg) => a + sg.skills.length, 0), 0)} kỹ năng
              </p>
            </div>
          </div>

          {/* Skills grid — newspaper columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {skillsByCategory.map((category, index) => {
              const Icon = categoryIcons[index] || Shield;
              const hasSkills = category.count > 0;
              const isLast = index === skillsByCategory.length - 1;

              return (
                <div
                  key={category.id}
                  className={`ed-fade py-8 ${!isLast ? "md:border-r border-black/15 md:pr-6 lg:pr-8" : ""} ${index > 0 ? "md:pl-6 lg:pl-8" : ""} ${index >= 2 ? "lg:border-t-0" : ""} ${index === 1 ? "md:border-r-0 lg:border-r" : ""} border-b border-black/15 md:border-b-0`}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 flex items-center justify-center ${hasSkills ? "bg-black text-white" : "bg-black/5 text-black/25"}`}>
                      <Icon className="w-5 h-5" weight="bold" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/35">0{index + 1}</p>
                      <h3 className="text-sm font-black tracking-tight leading-tight">{category.title}</h3>
                    </div>
                  </div>

                  {/* Fraction */}
                  <div className="mb-4">
                    <span className={`text-2xl font-black ${hasSkills ? "text-[#FF5722]" : "text-black/15"}`}>
                      {category.count}
                    </span>
                    <span className="text-base font-black text-black/20">/{category.total}</span>
                  </div>

                  {/* Skills list */}
                  {hasSkills ? (
                    <div className="space-y-1.5">
                      {category.skills.map((skill: string, si: number) => (
                        <div key={si} className="flex items-start gap-2">
                          <Lightning className="w-3 h-3 text-[#FF5722] shrink-0 mt-0.5" weight="fill" />
                          <span className="text-xs text-black/70 leading-relaxed">{skill}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-black/25 italic">
                      Không có kỹ năng đã đăng ký
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ DOCUMENTS — EDITORIAL GALLERY ══════ */}
      {docs.length > 0 && (
        <section className="border-b border-black">
          <div className="max-w-350 mx-auto px-6 lg:px-10">
            {/* Section header */}
            <div className="py-6 border-b border-black/15">
              <div className="flex items-end justify-between">
                <div className="ed-fade">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF5722] mb-1">Mục IV</p>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em]">
                    Chứng chỉ & Tài liệu
                  </h2>
                </div>
                <p className="ed-fade text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                  {docs.length} tài liệu đã nộp
                </p>
              </div>
            </div>

            {/* Documents grid */}
            <div className="py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {docs.map((doc, index) => {
                const docType = docFileTypes.find((dt) => dt.id === doc.fileTypeId);
                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.fileUrl);

                return (
                  <div key={doc.id} className="ed-fade group">
                    {/* Image / PDF preview */}
                    <div className="border border-black/20 overflow-hidden mb-4">
                      {isImage ? (
                        <button
                          type="button"
                          onClick={() => setPreviewUrl(doc.fileUrl)}
                          className="w-full h-56 overflow-hidden relative block"
                        >
                          <img
                            src={doc.fileUrl}
                            alt={docType?.name || `Chứng chỉ #${doc.id}`}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" weight="bold" />
                          </div>
                        </button>
                      ) : (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-56 bg-[#F0EDE8] flex flex-col items-center justify-center gap-3 hover:bg-[#E8E4DE] transition-colors block"
                        >
                          <FilePdf className="w-14 h-14 text-red-600" weight="duotone" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Nhấn để xem PDF</span>
                        </a>
                      )}
                    </div>

                    {/* Caption — newspaper style */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5722] mb-1">
                        Tài liệu {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-base font-black tracking-tight leading-tight mb-1">
                        {docType?.name || `Loại chứng chỉ #${doc.fileTypeId}`}
                      </h3>
                      {docType?.description && (
                        <p className="text-xs text-black/50 leading-relaxed line-clamp-2 mb-2">
                          {docType.description}
                        </p>
                      )}
                      <p className="text-[9px] uppercase tracking-[0.2em] text-black/30">
                        Tải lên {new Date(doc.uploadedAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════ FOOTER STRIP ══════ */}
      <section className="bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="py-12 lg:py-16 grid sm:grid-cols-3 gap-10">
            {/* Status */}
            <div className="ed-fade">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Trạng thái</p>
              <div className="flex items-center gap-2.5">
                {userProfile?.isEligibleRescuer ? (
                  <>
                    <span className="w-2.5 h-2.5 bg-[#00A650] rounded-full animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-wider">Đã xác thực</span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 bg-[#FF9800] rounded-full animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-wider">Chờ xác thực</span>
                  </>
                )}
              </div>
            </div>

            {/* Next step */}
            <div className="ed-fade">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Bước tiếp theo</p>
              <p className="text-sm text-white/60 leading-relaxed">
                Tải ứng dụng ResQ SOS để nhận thông báo cứu hộ real-time và kết nối với mạng lưới tình nguyện viên.
              </p>
            </div>

            {/* Actions */}
            <div className="ed-fade flex flex-col gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-[#FF5722] hover:text-white transition-colors group"
              >
                Về trang chủ
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/download-app"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:border-[#FF5722] hover:text-[#FF5722] transition-all"
              >
                Tải App
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom colophon */}
        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="h-10 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-white/25 font-medium">
              <span>© 2026 ResQ SOS</span>
              <span>Mã hồ sơ: {profileId}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ IMAGE PREVIEW LIGHTBOX ══════ */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
            onClick={() => setPreviewUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewUrl(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-red-50 hover:text-red-500 transition-colors z-10"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[90vh] object-contain"
                style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
