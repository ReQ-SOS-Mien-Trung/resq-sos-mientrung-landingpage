import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { privacyPolicySections } from "@/constants";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicyPage = () => {
  const lastUpdated = "15/01/2026";
  const sections = privacyPolicySections;

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelector("h1"),
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(
          heroRef.current.querySelector("p"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
        );
        const statsItems = heroRef.current.querySelectorAll(".lg\\:col-span-5 > div");
        if (statsItems.length > 0) {
          gsap.fromTo(
            Array.from(statsItems),
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: "back.out(1.7)" }
          );
        }
      }

      // Nav animations
      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll("a");
        if (navItems.length > 0) {
          gsap.fromTo(
            Array.from(navItems),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.6, ease: "power2.out" }
          );
        }
      }

      // Sections animations with ScrollTrigger
      if (sectionsRef.current) {
        const sectionItems = sectionsRef.current.querySelectorAll(":scope > div");
        sectionItems.forEach((section) => {
          const numberEl = section.querySelector(".lg\\:col-span-2 span");
          const contentEl = section.querySelector(".lg\\:col-span-10");

          if (numberEl) {
            gsap.fromTo(
              numberEl,
              { x: -50, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          if (contentEl) {
            gsap.fromTo(
              contentEl,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      }

      // Contact section animations
      if (contactRef.current) {
        const contactChildren = contactRef.current.querySelectorAll(":scope > div");
        contactChildren.forEach((child, index) => {
          gsap.fromTo(
            child,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contactRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section - Editorial/Swiss Style */}
      <section ref={heroRef} className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left - Title */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50">
                PHÁP LÝ / BẢO MẬT
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-6">
              CHÍNH
              <br />
              SÁCH
              <br />
              <span className="text-[#FF5722]">BẢO MẬT</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-black/60 max-w-xl leading-relaxed">
              ResQ SOS Miền Trung cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn.
            </p>
          </div>

          {/* Right - Stats */}
          <div className="lg:col-span-5 grid grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-10 border-b-2 border-r-2 border-black flex flex-col justify-center">
              <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-1">CẬP NHẬT</span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black">{lastUpdated}</span>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 border-b-2 border-black flex flex-col justify-center bg-black text-white">
              <span className="text-[10px] font-mono tracking-widest text-white/40 block mb-1">PHIÊN BẢN</span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black">V2.0</span>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 border-r-2 border-black flex flex-col justify-center">
              <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-1">BẢO VỆ</span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FF5722]">100%</span>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-1">MÃ HÓA</span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-black">256-BIT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section ref={navRef} className="border-b-2 border-black overflow-x-auto">
        <div className="flex min-w-max">
          {sections.map((section, index) => (
            <a
              key={index}
              href={`#privacy-${section.number}`}
              className="flex-1 min-w-[100px] p-4 sm:p-5 border-r-2 border-black last:border-r-0 hover:bg-black hover:text-white transition-colors group text-center"
            >
              <span className="text-2xl sm:text-3xl font-black block group-hover:text-[#FF5722]">
                {section.number}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-black/50 group-hover:text-white/50 line-clamp-1">
                {section.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionsRef}>
        {sections.map((section, index) => (
          <div
            key={index}
            id={`privacy-${section.number}`}
            className={`border-b-2 border-black ${section.isHighlight ? 'bg-black text-white' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Number Column */}
              <div className={`lg:col-span-2 p-6 sm:p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 ${section.isHighlight ? 'border-white/20' : 'border-black'}`}>
                <span className={`text-5xl sm:text-6xl lg:text-7xl font-black ${section.isHighlight ? 'text-white/20' : 'text-black/10'}`}>
                  {section.number}
                </span>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-10 p-6 sm:p-8 lg:p-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-4">
                  {section.title}
                </h2>
                
                {section.intro && (
                  <p className={`text-sm sm:text-base mb-6 ${section.isHighlight ? 'text-white/70' : 'text-black/60'}`}>
                    {section.intro}
                  </p>
                )}

                {/* Items Grid */}
                {section.items && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="border-2 border-black p-4 sm:p-5 hover:bg-black hover:text-white transition-colors group">
                        <span className="text-xs font-black tracking-wider block mb-2 group-hover:text-[#FF5722]">
                          {item.label}
                        </span>
                        <span className="text-xs sm:text-sm text-black/60 group-hover:text-white/60">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Content List */}
                {section.content && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {section.content.map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[10px] font-mono text-black/30 mt-1">0{i + 1}</span>
                        <span className="text-sm text-black/70">{text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Security Features */}
                {section.features && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {section.features.map((feature, i) => (
                      <div key={i} className="bg-white/10 p-4 sm:p-6 text-center">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-black block text-[#FF5722]">
                          {feature.stat}
                        </span>
                        <span className="text-[10px] font-mono tracking-wider text-white/50">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Shares */}
                {section.shares && (
                  <div className="space-y-3">
                    {section.shares.map((share, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 border-l-4 border-black bg-black/5">
                        <span className="text-xs font-black tracking-wider min-w-[140px]">{share.to}</span>
                        <span className="text-sm text-black/60">{share.reason}</span>
                      </div>
                    ))}
                    {section.warning && (
                      <div className="mt-6 p-4 bg-[#FF5722] text-white">
                        <span className="text-xs sm:text-sm font-bold">{section.warning}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Rights */}
                {section.rights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {section.rights.map((item, i) => (
                      <div key={i} className="border-2 border-black p-4 hover:bg-black hover:text-white transition-colors group">
                        <span className="text-xs font-black tracking-wider block mb-1 group-hover:text-[#FF5722]">
                          {item.right}
                        </span>
                        <span className="text-xs text-black/50 group-hover:text-white/50">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cookies */}
                {section.cookies && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.cookies.map((cookie, i) => (
                      <div key={i} className={`p-5 border-2 ${cookie.required ? 'border-black bg-black text-white' : 'border-black'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black tracking-wider">{cookie.type}</span>
                          <span className={`text-[10px] font-mono ${cookie.required ? 'text-[#FF5722]' : 'text-black/40'}`}>
                            {cookie.required ? 'BẮT BUỘC' : 'TÙY CHỌN'}
                          </span>
                        </div>
                        <span className={`text-xs ${cookie.required ? 'text-white/60' : 'text-black/60'}`}>{cookie.desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Timeline */}
                {section.timeline && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {section.timeline.map((item, i) => (
                      <div key={i} className="flex-1 p-5 border-2 border-black">
                        <span className="text-xs font-black tracking-wider block mb-2 text-[#FF5722]">{item.period}</span>
                        <span className="text-xs text-black/60">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Contact Section - Editorial Footer */}
      <section ref={contactRef} className="grid grid-cols-1 lg:grid-cols-2 border-b-2 border-black">
        {/* Contact */}
        <div className="p-8 sm:p-12 lg:p-16 bg-black text-white border-b-2 lg:border-b-0 lg:border-r-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-white/40 block mb-4">LIÊN HỆ VỀ BẢO MẬT</span>
          <h3 className="text-2xl sm:text-3xl font-black mb-6">CÓ CÂU HỎI?</h3>
          <div className="space-y-3">
            <a href="mailto:privacy@resq.vn" className="flex items-center justify-between p-4 border border-white/20 hover:border-[#FF5722] hover:bg-[#FF5722] transition-colors group">
              <span className="text-sm">privacy@resq.vn</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="flex items-center justify-between p-4 border border-white/20">
              <span className="text-sm">Hotline</span>
              <span className="text-xl font-black">1900 1234</span>
            </div>
            <div className="p-4 border border-white/20">
              <span className="text-xs text-white/50 block mb-1">Địa chỉ</span>
              <span className="text-sm">123 Đường Trần Phú, TP. Đà Nẵng</span>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="p-8 sm:p-12 lg:p-16">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-4">TÀI LIỆU LIÊN QUAN</span>
          <div className="space-y-0">
            <Link 
              to="/terms-of-service" 
              className="flex items-center justify-between p-4 border-2 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-black">ĐIỀU KHOẢN SỬ DỤNG</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <a 
              href="#" 
              className="flex items-center justify-between p-4 border-2 border-t-0 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-black">HƯỚNG DẪN SỬ DỤNG</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <a 
              href="#" 
              className="flex items-center justify-between p-4 border-2 border-t-0 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-black">CÂU HỎI THƯỜNG GẶP</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Update Notice */}
      <section className="p-6 sm:p-8 bg-black/5 text-center">
        <p className="text-xs sm:text-sm text-black/50 max-w-2xl mx-auto">
          Chính sách này có thể được cập nhật theo thời gian. Chúng tôi sẽ thông báo 
          về bất kỳ thay đổi quan trọng nào qua email hoặc thông báo trong ứng dụng.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
