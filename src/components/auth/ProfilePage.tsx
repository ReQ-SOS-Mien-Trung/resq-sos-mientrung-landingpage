import { useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
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
  CheckCircle,
  Lightning,
  ArrowLeft,
} from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import { rescueSkillCategories } from "@/constants";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, onboardingStatus, logout, isLoading: authLoading } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated or onboarding not complete
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/auth/register");
      return;
    }
    if (!onboardingStatus.isComplete) {
      navigate("/auth/personal-info");
      return;
    }
  }, [authLoading, user, onboardingStatus.isComplete, navigate]);

  // GSAP animation
  useEffect(() => {
    if (authLoading) return;
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(
        ".hero-text",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "back.out(1.7)" }
      );
      // Cards animation
      gsap.fromTo(
        ".skill-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.5, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [authLoading]);

  // Load saved data from localStorage
  const personalInfo = JSON.parse(localStorage.getItem("personalInfo") || "{}");
  const selectedSkills = JSON.parse(localStorage.getItem("selectedSkills") || "[]");

  // Get skills by category
  const getSkillsByCategory = () => {
    return rescueSkillCategories.map((category) => {
      const categorySkillIds = category.subgroups.flatMap((sg) =>
        sg.skills.map((s) => s.id)
      );
      const selectedInCategory = selectedSkills.filter((id: string) =>
        categorySkillIds.includes(id)
      );
      const skillLabels = selectedInCategory.map((id: string) => {
        for (const subgroup of category.subgroups) {
          const skill = subgroup.skills.find((s) => s.id === id);
          if (skill) return skill.label;
        }
        return id;
      });
      return {
        id: category.id,
        title: category.title,
        titleEn: category.titleEn,
        count: selectedInCategory.length,
        total: categorySkillIds.length,
        skills: skillLabels,
      };
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!user || !onboardingStatus.isComplete) {
    return null;
  }

  const skillsByCategory = getSkillsByCategory();
  const totalSkills = selectedSkills.length;
  const categoryIcons = [Shield, FirstAid, Car, Certificate];
  const fullName = `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim() || "Rescuer";
  
  // Generate stable IDs
  const volunteerId = useMemo(() => String(Date.now()).slice(-6), []);
  const profileId = useMemo(() => String(Date.now()).slice(-8), []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="h-16 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-3 text-black hover:text-[#FF5722] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Trang chủ</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors"
            >
              <SignOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Editorial Style */}
      <section className="pt-16 min-h-screen relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
            
            {/* Left - Avatar & Visual */}
            <div className="lg:col-span-5 relative bg-black flex items-end justify-center overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 border border-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/20 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
              
              {/* Avatar */}
              <div className="relative z-10 w-full max-w-md mx-auto px-8 pb-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={fullName}
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center">
                    <User className="w-32 h-32 text-white/20" weight="thin" />
                  </div>
                )}
                
                {/* Overlay Text on Image */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-2">
                    Volunteer ID
                  </p>
                  <p className="text-2xl font-black text-white tracking-tight">
                    #{volunteerId}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 left-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 -rotate-90 origin-left">
                  ResQ SOS Member
                </p>
              </div>
            </div>

            {/* Right - Info */}
            <div className="lg:col-span-7 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
              {/* Badge */}
              <div className="hero-text mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A650] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <CheckCircle className="w-3 h-3" weight="fill" />
                  Verified Rescuer
                </span>
              </div>

              {/* Name - Editorial Typography */}
              <div className="hero-text mb-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[-0.03em] leading-[0.85]">
                  {personalInfo.firstName?.toUpperCase() || "RESCUER"}
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[-0.03em] leading-[0.85] text-black/20">
                  {personalInfo.lastName?.toUpperCase() || "NAME"}
                </h1>
              </div>

              {/* Contact Info */}
              <div className="hero-text space-y-3 mb-12">
                <p className="flex items-center gap-4 text-sm text-black/60">
                  <Envelope className="w-4 h-4" />
                  {user.email}
                </p>
                {personalInfo.phone && (
                  <p className="flex items-center gap-4 text-sm text-black/60">
                    <Phone className="w-4 h-4" />
                    0{personalInfo.phone}
                  </p>
                )}
                {personalInfo.city && (
                  <p className="flex items-center gap-4 text-sm text-black/60">
                    <MapPin className="w-4 h-4" />
                    {[personalInfo.district, personalInfo.city].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 lg:gap-12">
                <div className="stat-item">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-black">{totalSkills}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mt-1">Skills</p>
                </div>
                <div className="stat-item">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-black">0</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mt-1">Missions</p>
                </div>
                <div className="stat-item">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#FF5722]">A+</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mt-1">Rating</p>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="hero-text mt-12 pt-12 border-t border-black/10">
                <p className="text-xs text-black/40 uppercase tracking-[0.2em]">
                  Member since {new Date(user.registeredAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 lg:py-32 bg-[#F5F5F0]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="mb-16 lg:mb-24">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5722] mb-4">
                  Capabilities
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.02em] leading-[0.9]">
                  YOUR RESCUE
                  <br />
                  <span className="text-black/20">SKILL SET</span>
                </h2>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <p className="text-sm text-black/60 max-w-xs lg:ml-auto">
                  Những kỹ năng bạn đã đăng ký sẽ giúp hệ thống phân công nhiệm vụ phù hợp nhất.
                </p>
              </div>
            </div>
            <div className="h-px bg-black/20 mt-8" />
          </div>

          {/* Skills Grid - Magazine Layout */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {skillsByCategory.map((category, index) => {
              const Icon = categoryIcons[index] || Shield;
              const hasSkills = category.count > 0;
              
              return (
                <div 
                  key={category.id} 
                  className={`skill-card group relative bg-white border-2 border-black overflow-hidden transition-all duration-300 ${
                    hasSkills ? 'hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]' : 'opacity-50'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-6 lg:p-8 border-b-2 border-black">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 flex items-center justify-center ${hasSkills ? 'bg-black text-white' : 'bg-black/5 text-black/30'}`}>
                          <Icon className="w-7 h-7" weight="bold" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
                            0{index + 1}
                          </p>
                          <h3 className="text-lg font-black tracking-tight">
                            {category.title.replace(/^[IVX]+\.\s*/, "")}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-4 py-2 text-sm font-black ${
                          hasSkills ? 'bg-[#FF5722] text-white' : 'bg-black/5 text-black/30'
                        }`}>
                          {category.count}/{category.total}
                        </div>
                        {/* Arrow */}
                        {hasSkills && (
                          <div className="w-10 h-10 bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="p-6 lg:p-8 min-h-[160px]">
                    {hasSkills ? (
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill: string, skillIndex: number) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider"
                          >
                            <Lightning className="w-3 h-3" weight="fill" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-sm text-black/30 italic">
                          No skills registered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Marquee Style */}
      <section className="relative bg-[#FF5722] overflow-hidden">
        {/* Marquee Banner */}
        <div className="py-6 border-y-4 border-black overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-6xl sm:text-7xl lg:text-8xl font-black text-black mx-8 flex items-center gap-8">
                SẴN SÀNG CỨU HỘ
                <span className="w-4 h-4 bg-black rounded-full" />
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="py-16 lg:py-24 grid lg:grid-cols-3 gap-12 lg:gap-8">
            {/* Col 1 */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 mb-4">
                Status
              </p>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#00A650] rounded-full animate-pulse" />
                <span className="text-xl font-black text-black uppercase">Online & Ready</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 mb-4">
                Next Step
              </p>
              <p className="text-sm text-black/80 leading-relaxed">
                Tải ứng dụng ResQ SOS để nhận thông báo cứu hộ real-time và kết nối với mạng lưới tình nguyện viên.
              </p>
            </div>

            {/* Col 3 - Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors group"
              >
                Về trang chủ
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-black text-black text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                Tải App
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="h-2 bg-black" />
      </section>

      {/* Add marquee animation style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Footer */}
      <footer className="py-8 border-t border-black/10">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
              © 2026 ResQ SOS — Central Vietnam Rescue Network
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
              Profile ID: {profileId}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
