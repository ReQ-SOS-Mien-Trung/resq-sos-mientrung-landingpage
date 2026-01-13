import { useState } from "react";
import { testimonials } from "../constants";

const WhyUseUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="bg-white pt-0">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Border Line */}
        <div className="border-t border-gray-500 mb-10 md:mb-16"></div>

        {/* Why use us Section */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-gray-400 text-sm md:text-base font-medium mb-8 md:mb-12 uppercase tracking-wide">
            Tại sao chọn chúng tôi
          </h2>
          <div className="space-y-0">
            {[
              {
                number: "1",
                title: "Thanh toán tức thì",
                description:
                  "Dễ dàng chuyển khoản thu nhập của bạn vào tài khoản ngân hàng.",
              },
              {
                number: "2",
                title: "Hỗ trợ 24/7",
                description:
                  "Hỗ trợ đối tác cứu hộ và công cụ an toàn bất cứ khi nào bạn cần.",
              },
              {
                number: "3",
                title: "Thông tin thu nhập",
                description: (
                  <>
                    Để giúp bạn{" "}
                    <span className="text-emerald-600 font-semibold">
                      tối đa hóa thu nhập
                    </span>{" "}
                    và lập kế hoạch tài chính tốt hơn.
                  </>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`py-6 md:py-8 ${
                  index !== 2 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="text-2xl md:text-3xl font-bold text-gray-300 flex-shrink-0">
                    {feature.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-gray-400 text-sm md:text-base font-medium mb-4 uppercase tracking-wide">
              Phản hồi từ đối tác
            </h2>
            <div className="w-full max-w-2xl mx-auto border-t border-gray-200"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Side - Profile Pictures and Name */}
            <div className="flex flex-col items-start">
              {/* Profile Pictures */}
              <div className="flex items-center gap-4 md:gap-6 mb-6">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    onClick={() => setActiveTestimonial(index)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all ${
                      activeTestimonial === index
                        ? "border-emerald-400 scale-110"
                        : "border-transparent hover:border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm md:text-base">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Name and Role - Below first profile picture */}
              <div className="pl-0 lg:pl-0">
                <p className="text-gray-900 font-medium text-sm md:text-base mb-1">
                  {testimonials[activeTestimonial].name}
                </p>
                <p className="text-gray-600 text-sm">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>

            {/* Right Side - Quote */}
            <div className="flex-1 lg:pt-0">
              <blockquote className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Bottom Border Line */}
        <div className="border-t border-gray-500 mt-12 md:mt-16"></div>
      </div>
    </section>
  );
};

export default WhyUseUs;
