import { useRef, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { RegisterHero } from ".";
import { FAQs, WaysToBePartner, WhyUseUs } from "..";
import RescuerForm from "./RescuerForm";

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

      {/* Bottom CTA + Toggleable Rescuer Form */}
      <section className="mt-12">
        <div className="bg-linear-to-r from-emerald-500 to-green-500 text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <p className="text-lg md:text-xl font-semibold md:whitespace-nowrap md:pt-2">
                Trở thành đối tác cứu hộ ResQ
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight md:text-right md:max-w-3xl">
                Bắt đầu hành trình hỗ trợ cộng đồng cùng ResQ.
              </h2>
            </div>
          </div>
          <div className="bg-green-600">
            <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-4 flex justify-center">
              <button
                type="button"
                onClick={toggleForm}
                className="px-6 py-3 rounded-lg font-semibold text-white bg-white/10 border border-white/30 hover:bg-white/20 transition-colors"
              >
                {isFormOpen ? "Ẩn form đăng ký" : "Đăng ký đội cứu hộ"}
              </button>
            </div>
          </div>
        </div>

        <div
          ref={formAnchorRef}
          className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12"
        >
          {isFormOpen && (
            <div className="mt-6">
              <RescuerForm />
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
