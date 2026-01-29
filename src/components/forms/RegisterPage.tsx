import { useRef, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { RegisterHero } from ".";
import { FAQs, WaysToBePartner, WhyUseUs } from "..";
import RescuerForm from "./RescuerForm";
import { ArrowRight } from "@phosphor-icons/react";

const RegisterPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formAnchorRef = useRef<HTMLDivElement | null>(null);

  const toggleForm = () => {
    setIsFormOpen((prev) => {
      const next = !prev;
      if (!prev && !next) {
        return next;
      }
      if (!prev && formAnchorRef.current) {
        // Defer scroll to after form mounts
        setTimeout(() => {
          formAnchorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 50);
      }
      return next;
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <RegisterHero />

      {/* Why Use Us & Testimonial Section */}
      <WhyUseUs />

      {/* Ways to be a Partner Section */}
      <WaysToBePartner />

      {/* FAQs Section */}
      <FAQs />

      {/* Bottom CTA - Nike Style */}
      <section className="bg-white">
        <div className="h-px bg-black" />
        
        {/* Main CTA Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Text */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-b lg:border-b-0 lg:border-r border-black/10">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
              Trở thành đối tác
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6">
              BẮT ĐẦU HÀNH TRÌNH
              <br />
              HỖ TRỢ CỘNG ĐỒNG
              <br />
              <span className="text-black/30">CÙNG RESQ.</span>
            </h2>
          </div>

          {/* Right - Action */}
          <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 bg-black text-white">
            <p className="text-sm sm:text-base text-white/60 mb-6 max-w-md">
              Đăng ký ngay để trở thành một phần của mạng lưới cứu hộ lớn nhất miền Trung.
            </p>
            <button
              type="button"
              onClick={toggleForm}
              className="px-6 sm:px-8 py-4 bg-[#FF5722] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2 w-fit group"
            >
              {isFormOpen ? "Ẩn form đăng ký" : "Đăng ký đội cứu hộ"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div ref={formAnchorRef}>
          {isFormOpen && (
            <div className="border-t border-black">
              <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
                <RescuerForm />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-[#FF5722]" />
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
