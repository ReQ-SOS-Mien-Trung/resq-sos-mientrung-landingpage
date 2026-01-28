import { useState, useEffect, useRef } from "react";
import { testimonials } from "@/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyUseUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const features = [
    {
      number: "01",
      title: "ĐIỀU PHỐI THÔNG MINH",
      description: "Hệ thống AI tự động tìm đội cứu hộ gần nhất và phù hợp nhất với tình huống.",
    },
    {
      number: "02",
      title: "HỖ TRỢ 24/7",
      description: "Đường dây nóng và hỗ trợ kỹ thuật luôn sẵn sàng khi bạn cần.",
    },
    {
      number: "03",
      title: "ĐÀO TẠO MIỄN PHÍ",
      description: "Được đào tạo kỹ năng sơ cứu và cứu hộ từ các chuyên gia.",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      {/* Header */}
      <div className="border-b border-black/10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
            Lợi ích
          </p>
          <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
            TẠI SAO CHỌN
            <br />
            <span className="text-black/30">RESQ?</span>
          </h2>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 ${
              index !== features.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
            } border-black/10 group hover:bg-black hover:text-white transition-colors duration-300`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black/20 group-hover:text-white/20 transition-colors">
                {feature.number}
              </span>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg md:text-xl font-black mb-3 sm:mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-black/60 group-hover:text-white/60 leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Section */}
      <div className="border-t border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Label & Navigation */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 border-b lg:border-b-0 lg:border-r border-black/10">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/40 mb-6 sm:mb-8">
              Phản hồi từ đối tác
            </p>

            {/* Profile Avatars */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 overflow-hidden transition-all ${
                    activeTestimonial === index
                      ? "ring-2 ring-[#FF5722] ring-offset-2"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <span className="text-white font-black text-sm sm:text-base md:text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Name & Role */}
            <div className="mb-6">
              <p className="text-sm sm:text-base font-bold">
                {testimonials[activeTestimonial].name}
              </p>
              <p className="text-xs sm:text-sm text-black/50">
                {testimonials[activeTestimonial].role}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF5722] text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-xs sm:text-sm text-black/40 ml-3 sm:ml-4">
                {activeTestimonial + 1} / {testimonials.length}
              </span>
            </div>
          </div>

          {/* Right - Quote */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 flex items-center">
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black leading-[1.3] tracking-tight">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default WhyUseUs;
