import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { benefitSections, driverTypes } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WaysToBePartner = () => {
  const [activeType, setActiveType] = useState("boat");
  const currentSection = benefitSections[activeType];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate content when activeType changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeType]);

  return (
    <section ref={sectionRef} className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      {/* Header - Swiss Style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black">
        {/* Left - Big Number */}
        <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-black p-6 lg:p-8 flex items-end">
          <span className="text-[80px] sm:text-[100px] lg:text-[120px] font-black leading-none text-black/10">
            03
          </span>
        </div>

        {/* Right - Title */}
        <div className="lg:col-span-10 p-6 sm:p-8 lg:p-12">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#FF5722] mb-4">
            Hướng dẫn
          </p>
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
            CÁCH THAM GIA
            <br />
            <span className="text-black/30">MẠNG LƯỚI CỨU HỘ</span>
          </h2>
        </div>
      </div>

      {/* Driver Type Tabs - Editorial Style */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-black">
        {driverTypes.map((type, index) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`relative py-5 sm:py-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-r border-black last:border-r-0 transition-all duration-300 ${
              activeType === type.id
                ? "bg-black text-white"
                : "bg-white text-black/50 hover:text-black"
            }`}
          >
            <span className="block text-[10px] text-current/50 mb-1">0{index + 1}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Content Grid - Swiss Layout */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column - Benefits */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-black">
          {/* Section Label */}
          <div className="border-b border-black/10 px-6 sm:px-8 lg:px-12 py-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">
              Lợi ích khi tham gia
            </span>
          </div>

          {/* Title */}
          <div className="px-6 sm:px-8 lg:px-12 py-6 sm:py-8 border-b border-black/10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              {currentSection.title}
            </h3>
          </div>

          {/* Benefits List */}
          <div className="divide-y divide-black/10">
            {currentSection.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="px-6 sm:px-8 lg:px-12 py-5 sm:py-6 flex items-start gap-4 sm:gap-6 hover:bg-black/5 transition-colors group"
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-black/10 group-hover:text-[#FF5722] transition-colors leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-sm sm:text-base text-black/70 leading-relaxed pt-1">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Links */}
          {currentSection.links && (
            <div className="px-6 sm:px-8 lg:px-12 py-6 sm:py-8 bg-black/5">
              <div className="flex flex-wrap gap-3">
                {currentSection.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="px-5 sm:px-6 py-3 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center gap-2"
                  >
                    {link.text}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - App Features */}
        <div className="lg:col-span-5">
          {/* Section Label */}
          <div className="border-b border-black/10 px-6 sm:px-8 lg:px-10 py-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">
              Ứng dụng di động
            </span>
          </div>

          {/* Title */}
          <div className="px-6 sm:px-8 lg:px-10 py-6 sm:py-8 border-b border-black/10">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              ỨNG DỤNG
              <br />
              <span className="text-black/30">TÌNH NGUYỆN VIÊN</span>
            </h3>
          </div>

          {/* Features List */}
          <div className="divide-y divide-black/10">
            {[
              "Nhận thông báo yêu cầu cứu hộ trong khu vực",
              "Xem chi tiết tình huống và vị trí nạn nhân",
              "Điều hướng GPS đến địa điểm cứu hộ",
              "Báo cáo tình trạng theo thời gian thực",
              "Kết nối đường dây nóng 24/7",
            ].map((feature, index) => (
              <div 
                key={index} 
                className="px-6 sm:px-8 lg:px-10 py-4 sm:py-5 flex items-center gap-4 hover:bg-black/5 transition-colors group"
              >
                <span className="w-1.5 h-1.5 bg-[#FF5722] group-hover:scale-150 transition-transform" />
                <span className="text-sm text-black/60 group-hover:text-black transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Download CTA */}
          <div className="px-6 sm:px-8 lg:px-10 py-6 sm:py-8 border-t border-black">
            <a
              href="/download-app"
              className="flex items-center justify-between py-4 border-b-2 border-black hover:border-[#FF5722] transition-colors group"
            >
              <span className="text-sm sm:text-base font-bold uppercase tracking-wider group-hover:text-[#FF5722] transition-colors">
                Tải ứng dụng ResQ
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:text-[#FF5722] transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default WaysToBePartner;
