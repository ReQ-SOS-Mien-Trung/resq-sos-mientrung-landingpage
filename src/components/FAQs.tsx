import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Tôi có thể rút tiền thu nhập bao lâu một lần?",
    answer:
      "Bạn có thể rút tiền thu nhập của mình bất cứ lúc nào thông qua ứng dụng ResQ. Chúng tôi hỗ trợ rút tiền tức thì vào tài khoản ngân hàng của bạn.",
  },
  {
    id: 2,
    question: "Những phương tiện nào được phép cho ResQ?",
    answer:
      "ResQ chấp nhận nhiều loại phương tiện bao gồm xe ô tô, taxi, thuyền máy, ghe nhỏ, và xe gầm cao. Mỗi loại phương tiện phù hợp với các tình huống cứu hộ khác nhau.",
  },
  {
    id: 3,
    question: "Tôi có thể thực hiện nhiều điểm dừng trong một yêu cầu cứu hộ không?",
    answer:
      "Có, bạn có thể thực hiện nhiều điểm dừng trong một yêu cầu cứu hộ nếu cần thiết. Ứng dụng sẽ hỗ trợ bạn điều hướng đến từng điểm một cách hiệu quả.",
  },
  {
    id: 4,
    question: "Trẻ em có được phép trên phương tiện cứu hộ không?",
    answer:
      "Có, trẻ em hoàn toàn được phép trên phương tiện cứu hộ. Chúng tôi khuyến khích các gia đình có trẻ em sử dụng dịch vụ cứu hộ của ResQ trong các tình huống khẩn cấp.",
  },
  {
    id: 5,
    question: "Hành khách có thể đứng trên phương tiện cứu hộ không?",
    answer:
      "Để đảm bảo an toàn, chúng tôi khuyến khích tất cả hành khách ngồi xuống trong quá trình cứu hộ. Tuy nhiên, trong các tình huống đặc biệt, hành khách có thể đứng nếu phương tiện cho phép và điều kiện an toàn.",
  },
];

const FAQs = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Border Line */}
        <div className="border-t border-gray-200 mb-12 md:mb-16"></div>

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
            {faqs.map((faq, index) => {
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
