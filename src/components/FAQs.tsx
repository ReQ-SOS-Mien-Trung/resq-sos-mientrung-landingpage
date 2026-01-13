import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/constants";

const FAQs = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white ">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Border Line */}
        <div className="border-t border-gray-500 mb-12 md:mb-12"></div>

        {/* FAQs Label */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-gray-400 text-sm md:text-base font-medium uppercase tracking-wide">
            FAQs
          </h2>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Intro Text */}
          <div>
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
              style={{ fontFamily: "var(--font-sf-ui-display)" }}
            >
              Có câu hỏi? Chúng tôi có câu trả lời.
            </h3>
            <p className="text-gray-700 text-base md:text-lg">
              Để biết thêm câu hỏi, vui lòng truy cập{" "}
              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Trung tâm Trợ giúp
              </a>{" "}
              của chúng tôi.
            </p>
          </div>

          {/* Right Column - FAQ List */}
          <div className="space-y-0">
            {faqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              return (
                <div key={faq.id}>
                  {/* Border line above each item */}
                  <div className="border-t border-gray-200"></div>
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between py-4 md:py-6 text-left hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-900 font-medium text-base md:text-lg pr-4 flex-1">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pb-4 md:pb-6 px-0">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            {/* Border line below last item */}
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
