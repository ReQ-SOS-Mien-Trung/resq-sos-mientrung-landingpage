import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight } from "@phosphor-icons/react";

const RegisterHero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(headlineRef.current, 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(contentRef.current, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[calc(100vh-4rem)] bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left Section - Text Content */}
        <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 border-b lg:border-b-0 lg:border-r border-black/10">
          {/* Tag */}
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4 sm:mb-6">
            Đội cứu hộ
          </p>

          {/* Headline */}
          <h1 ref={headlineRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] mb-6 sm:mb-8">
            TRỞ THÀNH
            <br />
            ĐỐI TÁC CỨU HỘ
            <br />
            <span className="text-black/30">CỦA RESQ.</span>
          </h1>

          {/* Description */}
          <div ref={contentRef}>
            <p className="text-sm sm:text-base md:text-lg text-black/60 max-w-md mb-8 sm:mb-10 leading-relaxed">
              Tham gia cùng hàng trăm tình nguyện viên đang hỗ trợ cộng đồng miền Trung vượt qua thiên tai.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => navigate("/download-app")}
                className="px-6 sm:px-8 py-4 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group"
              >
                Tải ứng dụng
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="px-6 sm:px-8 py-4 border border-black text-black text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Image Grid */}
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-black/10 relative overflow-hidden">
              <img 
                src="/images/hero_registered.jpg" 
                alt="Cứu hộ 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="border-b border-black/10 bg-[#FF5722] flex items-center justify-center">
              <div className="text-center text-white p-4">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black">500+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider">Tình nguyện viên</span>
              </div>
            </div>
            <div className="border-r border-black/10 bg-black flex items-center justify-center">
              <div className="text-center text-white p-4">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black">24/7</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider">Hỗ trợ liên tục</span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img 
                src="/images/rescuer_flood.jpg" 
                alt="Cứu hộ 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default RegisterHero;
