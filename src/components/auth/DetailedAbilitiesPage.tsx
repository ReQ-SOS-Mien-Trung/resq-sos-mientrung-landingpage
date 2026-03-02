import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, LockSimple, Warning } from "@phosphor-icons/react";
import { rescueSkillCategories } from "@/constants";
import {
  ALL_SKILLS_FLAT,
  getSkillLabel,
  getDominantsFor,
  computeImplied,
  VEHICLE_SKILL_IDS,
} from "@/constants/skillConflicts";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitRescuerAbilities } from "@/services/abilities/hooks";

// Inline type definition
interface RescueSkillSubgroup {
  subtitle: string;
  singleSelect?: boolean;
  skills: { id: number; label: string }[];
}

const DetailedAbilitiesPage = () => {
  const navigate = useNavigate();
  const { completeOnboarding, isAuthenticated, onboardingStatus, isLoading: authLoading } = useAuth();
  const submitAbilitiesMutation = useSubmitRescuerAbilities();

  // Manually selected skills (what the user explicitly clicked)
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  // Tooltip state for implied skill badges
  const [hoveredImplied, setHoveredImplied] = useState<number | null>(null);

  const [currentCategory, setCurrentCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Derived: skills auto-included by conflict rules
  const impliedSkills = computeImplied(selectedSkills);
  // All skills for submission & display (manual + implied)
  const allSelectedSkills = [...selectedSkills, ...impliedSkills];

  // Redirect if not authenticated or already completed onboarding
  useEffect(() => {
    if (authLoading) return; // Wait until auth state is loaded

    if (!isAuthenticated) {
      navigate("/auth/register");
      return;
    }
    if (onboardingStatus.isComplete) {
      navigate("/profile");
      return;
    }
  }, [authLoading, isAuthenticated, onboardingStatus.isComplete, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [currentCategory]);

  const toggleSkill = (skillId: number, subgroup?: RescueSkillSubgroup) => {
    // Cannot toggle an implied skill (auto-checked by a dominant)
    if (impliedSkills.includes(skillId)) return;

    // Deselect if already manually selected
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(prev => prev.filter(id => id !== skillId));
      return;
    }

    // Add to manual selection
    if (subgroup?.singleSelect) {
      const subgroupSkillIds = subgroup.skills.map((s) => s.id);
      setSelectedSkills(prev => [...prev.filter(id => !subgroupSkillIds.includes(id)), skillId]);
    } else {
      setSelectedSkills(prev => [...prev, skillId]);
    }
  };

  const handleBack = () => {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
    }
  };

  const handleContinue = () => {

    if (currentCategory < rescueSkillCategories.length - 1) {
      // Move to next category
      setCurrentCategory((prev) => prev + 1);
    } else {
      // Last category, submit abilities via API
      setIsLoading(true);
      submitAbilitiesMutation.mutate(
        { abilities: allSelectedSkills.map((id) => ({ abilityId: id, level: 1 })) },
        {
          onSuccess: () => {
            completeOnboarding();
            setIsLoading(false);
            navigate("/profile");
          },
          onError: () => {
            setIsLoading(false);
          },
        }
      );
    }
  };

  const currentCat = rescueSkillCategories[currentCategory];
  const categoryProgress = ((currentCategory + 1) / rescueSkillCategories.length) * 100;
  const allCategorySkills = currentCat.subgroups.flatMap(sg => sg.skills);
  const categorySkills = allCategorySkills.filter(skill => allSelectedSkills.includes(skill.id)).length;

  // Show loading while checking auth
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

  return (
    <div ref={containerRef} className="min-h-screen bg-white">

      {/* Header */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="hover:opacity-70 transition-opacity">
          <img
            src="/resq_typo_logo.svg"
            alt="ResQ SOS"
            className="h-12 sm:h-14 lg:h-16 w-auto"
          />
        </Link>
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60">
          Bước 3/3 - Kỹ năng chi tiết
        </span>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left - Skills Selection */}
        <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-black/10">

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black/60">
                Phần {currentCategory + 1}/{rescueSkillCategories.length}
              </span>
              <span className="text-xs font-bold text-black">
                {categorySkills}/{allCategorySkills.length} kỹ năng
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
            {/* Header */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-4">
              KỸ NĂNG
              <br />
              <span className="text-black/30">CHI TIẾT</span>
            </h1>
            <p className="text-sm sm:text-base text-black/60 mb-8">
              Chọn các kỹ năng bạn có. Bạn có thể chọn nhiều kỹ năng.
            </p>

            {/* Skills Categories */}
            <div className="space-y-8">
              {/* Category Header */}
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight text-black">
                  {currentCat.title}
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-black/40">
                  {currentCat.titleEn}
                </p>
              </div>

              {/* Subgroups */}
              {currentCat.subgroups.map((subgroup, subIndex) => (
                <div key={subIndex} className="space-y-3">
                  {/* Subtitle */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-black/80">
                      {subgroup.subtitle}
                    </h3>
                    {subgroup.singleSelect && (
                      <span className="text-xs font-medium text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded-full">
                        Chọn 1
                      </span>
                    )}
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subgroup.skills.map((skill) => {
                      const isManual = selectedSkills.includes(skill.id);
                      const isImplied = impliedSkills.includes(skill.id);
                      const activeDominants = getDominantsFor(skill.id).filter(d => selectedSkills.includes(d));

                      // Special-conditions gate: skills 43 & 44 require at least 1 vehicle selected
                      const isVehicleGated = [43, 44].includes(skill.id);
                      const hasVehicle = allSelectedSkills.some(id => VEHICLE_SKILL_IDS.includes(id));
                      const isGatedDisabled = isVehicleGated && !hasVehicle;

                      const isDisabled = isImplied || isGatedDisabled;

                      return (
                        <div key={skill.id} className="relative">
                          <button
                            onClick={() => toggleSkill(skill.id, subgroup)}
                            disabled={isDisabled}
                            className={`relative w-full px-4 py-3 border-2 rounded-full text-left text-sm font-medium transition-all ${
                              isImplied
                                ? "border-[#00A650]/40 bg-[#00A650]/5 text-black/45 cursor-not-allowed"
                                : isGatedDisabled
                                  ? "border-black/10 bg-black/3 text-black/25 cursor-not-allowed"
                                  : isManual
                                    ? "border-[#00A650] bg-[#00A650]/10 text-black"
                                    : "border-black/20 hover:border-black/40 text-black/70"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex-1">{skill.label}</span>

                              {/* Implied skill: lock badge with tooltip */}
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
                                      <span className="font-medium">{activeDominants.map(id => getSkillLabel(id)).join(', ')}</span>
                                      <div className="absolute top-full right-3 border-4 border-transparent border-t-black" />
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Vehicle-gated: show lock + tooltip */}
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

                              {/* Manually selected checkmark */}
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
              ))}
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
                disabled={isLoading}
                className="px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                {isLoading ? (
                  <>Đang xử lý...</>
                ) : currentCategory < rescueSkillCategories.length - 1 ? (
                  <>
                    Tiếp tục
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Hoàn tất
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
              Thông tin này giúp chúng tôi phân công nhiệm vụ phù hợp với khả năng của bạn, đảm bảo an toàn và hiệu quả trong công tác cứu hộ.
            </p>

            {/* Selected Skills Preview */}
            {allSelectedSkills.length > 0 && (
              <div className="p-6 bg-white/10 rounded-lg">
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
                    const skill = ALL_SKILLS_FLAT.find((s) => s.id === skillId);
                    const isAuto = impliedSkills.includes(skillId);
                    return skill ? (
                      <span
                        key={skillId}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isAuto ? "bg-[#00A650]/30 text-[#4ade80]" : "bg-white/20"
                        }`}
                      >
                        {isAuto && "🔒 "}{skill.label}
                      </span>
                    ) : null;
                  })}
                  {allSelectedSkills.length > 8 && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                      +{allSelectedSkills.length - 8} kỹ năng khác
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Category Progress Cards */}
            <div className="space-y-3 mt-8">
              {rescueSkillCategories.map((cat, index) => {
                const catAllSkills = cat.subgroups.flatMap(sg => sg.skills);
                const catSkills = catAllSkills.filter(skill => allSelectedSkills.includes(skill.id)).length;
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
                        <p className="text-xs opacity-60">{catSkills}/{catAllSkills.length} kỹ năng</p>
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
