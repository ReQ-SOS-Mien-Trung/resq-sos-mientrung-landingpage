import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { benefitSections, driverTypes } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WaysToBePartner = () => {
  const [activeType, setActiveType] = useState("boat");
  const currentSection = benefitSections[activeType];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      {/* Header */}
      <div className="border-b border-black/10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
            Hướng dẫn
          </p>
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
          >
            CÁCH THAM GIA
            <br />
            MẠNG LƯỚI CỨU HỘ
          </h2>
        </div>
      </div>

      {/* Driver Type Tabs */}
      <div className="border-b border-black/10 overflow-x-auto">
        <div className="flex">
          {driverTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-wider border-r border-black/10 last:border-r-0 transition-colors whitespace-nowrap ${
                activeType === type.id
                  ? "bg-black text-white"
                  : "bg-white text-black/60 hover:text-black hover:bg-black/5"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Benefits */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 border-b lg:border-b-0 lg:border-r border-black/10">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/40 mb-6 sm:mb-8">
            Lợi ích
          </h3>

          <h4 className="text-lg sm:text-xl md:text-2xl font-black mb-6">
            {currentSection.title}
          </h4>

          <ul className="space-y-4 sm:space-y-5">
            {currentSection.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 sm:gap-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#FF5722] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] sm:text-xs font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-sm sm:text-base text-black/70 leading-relaxed">
                  {benefit.includes("Chương trình Khách hàng Thân thiết") ? (
                    <>
                      {benefit.split("Chương trình Khách hàng Thân thiết")[0]}
                      <a
                        href="#"
                        className="text-[#FF5722] font-bold hover:underline"
                      >
                        Chương trình Khách hàng Thân thiết
                      </a>
                      {benefit.split("Chương trình Khách hàng Thân thiết")[1]}
                    </>
                  ) : (
                    benefit
                  )}
                </span>
              </li>
            ))}
          </ul>

          {/* Links */}
          {currentSection.links && (
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-black/10">
              <p className="text-xs sm:text-sm text-black/40 mb-4">
                Tham gia ngay:
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {currentSection.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="px-4 sm:px-5 py-2 sm:py-3 border border-black text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                  >
                    {link.text}
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right - App Features */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/40 mb-6 sm:mb-8">
            Ứng dụng
          </h3>

          <h4 className="text-lg sm:text-xl md:text-2xl font-black mb-6">
            Ứng dụng tình nguyện viên cứu hộ
          </h4>

          <ul className="space-y-4 sm:space-y-5 mb-8">
            {[
              "Nhận thông báo yêu cầu cứu hộ trong khu vực của bạn",
              "Xem thông tin chi tiết về tình huống và vị trí nạn nhân",
              "Điều hướng GPS đến địa điểm cứu hộ",
              "Báo cáo tình trạng cứu hộ theo thời gian thực",
              "Kết nối với đường dây nóng hỗ trợ 24/7",
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-3 sm:gap-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF5722] flex-shrink-0 mt-2" />
                <span className="text-sm sm:text-base text-black/70 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="/download-app"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-black hover:text-[#FF5722] transition-colors group"
          >
            Tải ứng dụng ResQ ngay
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default WaysToBePartner;
