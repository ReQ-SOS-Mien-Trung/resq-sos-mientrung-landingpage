import { useState, useEffect, useRef } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { faqs } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQs = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
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

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section ref={sectionRef} className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Intro Text */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-black/10">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
              Câu hỏi thường gặp
            </p>
            <h3 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6">
              CÓ CÂU HỎI?
              <br />
              <span className="text-black/30">CHÚNG TÔI CÓ CÂU TRẢ LỜI.</span>
            </h3>
            <p className="text-sm sm:text-base text-black/60 leading-relaxed mb-6 sm:mb-8 max-w-md">
              Tìm hiểu thêm về dịch vụ cứu hộ của chúng tôi và cách chúng tôi hỗ trợ cộng đồng.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors group"
            >
              Trung tâm trợ giúp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column - FAQ List */}
        <div>
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(faq.id);
            return (
              <div key={faq.id} className="border-b border-black/10 last:border-b-0">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-start justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-5 sm:py-6 md:py-8 text-left hover:bg-black/5 transition-colors group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 pr-4">
                    <span className="text-xs sm:text-sm font-bold text-black/20 mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-bold leading-tight group-hover:text-[#FF5722] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                </button>
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8">
                    <div className="pl-7 sm:pl-8 md:pl-10">
                      <p className="text-sm sm:text-base text-black/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default FAQs;
