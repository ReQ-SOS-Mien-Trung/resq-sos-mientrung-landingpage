import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqs } from "@/constants";

const FAQs = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Border Line */}
        <div className="border-t border-gray-300 mb-12 md:mb-16"></div>

        {/* FAQs Label */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h2 className="text-emerald-600 text-sm md:text-base font-semibold uppercase tracking-wider">
              Câu hỏi thường gặp
            </h2>
          </div>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Intro Text */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
              style={{ fontFamily: "var(--font-sf-ui-display)" }}
            >
              Có câu hỏi? Chúng tôi có câu trả lời.
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              Tìm hiểu thêm về dịch vụ cứu hộ của chúng tôi và cách chúng tôi hỗ
              trợ cộng đồng.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-base md:text-lg transition-colors group"
            >
              <span>Xem thêm tại Trung tâm Trợ giúp</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>

          {/* Right Column - FAQ List */}
          <div className="space-y-0">
            {faqs.map((faq, index) => {
              const isOpen = openItems.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="group"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Border line above each item */}
                  <div className="border-t border-gray-200 transition-colors group-hover:border-gray-300"></div>
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-start justify-between py-5 md:py-6 text-left hover:bg-gray-50 transition-all duration-200 rounded-lg -mx-2 px-2 group/button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="text-gray-900 font-semibold text-base md:text-lg pr-4 flex-1 leading-relaxed group-hover/button:text-emerald-600 transition-colors">
                      {faq.question}
                    </span>
                    <div className="shrink-0 mt-1">
                      <div
                        className={`transform transition-all duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-emerald-600 transition-colors" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-500 group-hover/button:text-emerald-600 transition-colors" />
                        )}
                      </div>
                    </div>
                  </button>
                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-5 md:pb-6 pl-0 pr-2">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Border line below last item */}
            <div className="border-t border-gray-200 mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
