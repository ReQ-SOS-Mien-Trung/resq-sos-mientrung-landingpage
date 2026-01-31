import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { termsOfServiceSections, termsOfServiceAdditionalTerms } from "@/constants";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TermsOfServicePage = () => {
  const lastUpdated = "15/01/2026";
  const sections = termsOfServiceSections;
  const additionalTerms = termsOfServiceAdditionalTerms;

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement>(null);
  const additionalRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

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
        const metaItems = heroRef.current.querySelectorAll(".lg\\:col-span-4 > div");
        if (metaItems.length > 0) {
          gsap.fromTo(
            Array.from(metaItems),
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.4, ease: "power3.out" }
          );
        }
      }

      // Nav animations
      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll(":scope > div > a");
        if (navItems.length > 0) {
          gsap.fromTo(
            Array.from(navItems),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.5, ease: "power2.out" }
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
              { scale: 0.5, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          if (contentEl) {
            gsap.fromTo(
              contentEl,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      }

      // Additional terms animations
      if (additionalRef.current) {
        const termItems = additionalRef.current.querySelectorAll(":scope > div > div");
        if (termItems.length > 0) {
          gsap.fromTo(
            Array.from(termItems),
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: additionalRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // Footer section animations
      if (footerRef.current) {
        const footerChildren = footerRef.current.querySelectorAll(":scope > div");
        footerChildren.forEach((child, index) => {
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
                trigger: footerRef.current,
                start: "top 85%",
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
      {/* Hero Section - Editorial Style */}
      <section ref={heroRef} className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left - Title */}
          <div className="lg:col-span-8 p-6 sm:p-10 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50">
                PHÁP LÝ / ĐIỀU KHOẢN
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-6">
              ĐIỀU
              <br />
              KHOẢN
              <br />
              <span className="text-[#FF5722]">SỬ DỤNG</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-black/60 max-w-xl leading-relaxed">
              Vui lòng đọc kỹ các điều khoản và điều kiện dưới đây trước khi sử dụng 
              dịch vụ ResQ SOS Miền Trung.
            </p>
          </div>

          {/* Right - Meta Info */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="p-6 sm:p-10 lg:p-12 border-b-2 border-black flex-1">
              <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-2">CẬP NHẬT</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black">{lastUpdated}</span>
            </div>
            <div className="p-6 sm:p-10 lg:p-12 bg-black text-white flex-1">
              <span className="text-[10px] font-mono tracking-widest text-white/40 block mb-2">PHIÊN BẢN</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black">V2.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav - Swiss Grid */}
      <section ref={navRef} className="border-b-2 border-black">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {sections.slice(0, 6).map((section, index) => (
            <a
              key={index}
              href={`#section-${section.number}`}
              className="p-4 sm:p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black last:border-r-0 hover:bg-black hover:text-white transition-colors group"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black block mb-1 group-hover:text-[#FF5722]">
                {section.number}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-black/50 group-hover:text-white/50 line-clamp-1">
                {section.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content - Neo-Brutalist Layout */}
      <section ref={sectionsRef}>
        {sections.map((section, index) => (
          <div
            key={index}
            id={`section-${section.number}`}
            className={`border-b-2 border-black ${section.isEmergency ? 'bg-[#FF5722] text-white' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Number Column */}
              <div className={`lg:col-span-2 p-6 sm:p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 ${section.isEmergency ? 'border-white/30' : 'border-black'}`}>
                <span className={`text-6xl sm:text-7xl lg:text-8xl font-black ${section.isEmergency ? 'text-white/30' : 'text-black/10'}`}>
                  {section.number}
                </span>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-10 p-6 sm:p-8 lg:p-12">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-6 ${section.isEmergency ? 'text-white' : ''}`}>
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.content.map((text, i) => (
                    <p 
                      key={i} 
                      className={`text-sm sm:text-base lg:text-lg leading-relaxed ${section.isEmergency ? 'text-white/80' : 'text-black/70'}`}
                    >
                      {text}
                    </p>
                  ))}
                </div>

                {/* Service List */}
                {section.list && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {section.list.map((item, i) => (
                      <div key={i} className="border-2 border-black p-4 hover:bg-black hover:text-white transition-colors group">
                        <span className="text-xs font-black tracking-wider block mb-1 group-hover:text-[#FF5722]">
                          {item.label}
                        </span>
                        <span className="text-xs text-black/50 group-hover:text-white/50">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Warnings List */}
                {section.warnings && (
                  <div className="mt-8 space-y-2">
                    {section.warnings.map((warning, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-black/5 border-l-4 border-black">
                        <span className="text-xs font-mono text-black/40">0{i + 1}</span>
                        <span className="text-sm text-black/80">{warning}</span>
                      </div>
                    ))}
                    {section.footer && (
                      <p className="text-xs font-bold uppercase tracking-wider mt-4 text-black/60">
                        {section.footer}
                      </p>
                    )}
                  </div>
                )}

                {/* Emergency Numbers */}
                {section.emergency && (
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {section.emergency.map((item, i) => (
                      <div key={i} className="bg-white text-black p-4 sm:p-6 text-center">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black block">{item.number}</span>
                        <span className="text-[10px] font-mono tracking-widest text-black/50">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Additional Terms - Grid Layout */}
      <section ref={additionalRef} className="border-b-2 border-black">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {additionalTerms.map((term, index) => (
            <div 
              key={index} 
              className={`p-6 sm:p-8 lg:p-12 border-b-2 sm:border-b-0 ${index % 2 === 0 ? 'sm:border-r-2' : ''} ${index < 2 ? 'sm:border-b-2' : ''} border-black`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl font-black text-black/10">{term.number}</span>
                <div>
                  <h3 className="text-sm font-black tracking-wider mb-2">{term.title}</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{term.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA - Editorial */}
      <section ref={footerRef} className="grid grid-cols-1 lg:grid-cols-2">
        {/* Contact */}
        <div className="p-8 sm:p-12 lg:p-16 bg-black text-white border-b-2 lg:border-b-0 lg:border-r-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-white/40 block mb-4">LIÊN HỆ HỖ TRỢ</span>
          <h3 className="text-2xl sm:text-3xl font-black mb-6">CÓ CÂU HỎI?</h3>
          <div className="space-y-3">
            <a href="mailto:support@resq.vn" className="flex items-center justify-between p-4 border border-white/20 hover:border-[#FF5722] hover:bg-[#FF5722] transition-colors group">
              <span className="text-sm">support@resq.vn</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="flex items-center justify-between p-4 border border-white/20">
              <span className="text-sm">Hotline</span>
              <span className="text-xl font-black">1900 1234</span>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="p-8 sm:p-12 lg:p-16">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-4">TÀI LIỆU LIÊN QUAN</span>
          <div className="space-y-0">
            <Link 
              to="/privacy-policy" 
              className="flex items-center justify-between p-4 border-2 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-black">CHÍNH SÁCH BẢO MẬT</span>
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

      {/* Agreement Bar */}
      <section className="border-t-2 border-black bg-black/5 p-6 sm:p-8">
        <p className="text-xs sm:text-sm text-center text-black/60 max-w-3xl mx-auto">
          Bằng việc sử dụng ứng dụng ResQ SOS Miền Trung, bạn xác nhận rằng bạn đã đọc, 
          hiểu và đồng ý với tất cả các điều khoản và điều kiện được nêu trong tài liệu này.
        </p>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
