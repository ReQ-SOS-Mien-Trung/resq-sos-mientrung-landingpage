import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const headlines = headlineRefs.current.filter(Boolean);
    const contents = contentRefs.current.filter(Boolean);

    const tl = gsap.timeline();

    // Animate headlines
    headlines.forEach((line, index) => {
      if (line) {
        gsap.set(line, { y: 60, opacity: 0 });
        tl.to(
          line,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.1 + 0.1 * index,
        );
      }
    });

    // Animate content
    contents.forEach((block, index) => {
      if (block) {
        gsap.set(block, { opacity: 0, y: 30 });
        tl.to(
          block,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.6 + index * 0.1,
        );
      }
    });
  }, []);

  const addHeadlineRef = (el: HTMLElement | null, index: number) => {
    if (el) headlineRefs.current[index] = el;
  };

  const addContentRef = (el: HTMLElement | null, index: number) => {
    if (el) contentRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100vh-4rem)] bg-white text-black"
    >
      {/* MAIN GRID */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
        {/* LEFT COLUMN - Headlines */}
        <div className="lg:col-span-7 flex flex-col lg:border-r border-black/10">
          {/* Headline Area */}
          <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 xl:py-20 flex flex-col justify-center">
            <div className="space-y-0 pt-2">
              {[
                { text: "CỨU HỘ." },
                { text: "KẾT NỐI." },
                { text: "ĐỒNG HÀNH." },
                { text: "MIỀN TRUNG." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => addHeadlineRef(el, idx)}
                  className="overflow-visible"
                >
                  <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] font-black tracking-tight leading-[1.1]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div
              ref={(el) => addContentRef(el, 0)}
              className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-black/10"
            >
              <p className="text-sm sm:text-base md:text-lg text-black/60 max-w-lg">
                Nền tảng cứu hộ khẩn cấp - Kết nối nạn nhân với đội ngũ cứu trợ
                trong thiên tai.
              </p>
            </div>
          </div>

          {/* BOTTOM INFO GRID */}
          <div className="border-t border-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-black/20">
              <div
                ref={(el) => addContentRef(el, 1)}
                className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8"
              >
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3">
                  Sứ mệnh
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-black/70">
                  ResQ là nền tảng nhân đạo được thiết kế để điều phối các hoạt
                  động cứu hộ trong thiên tai.
                </p>
              </div>
              <div
                ref={(el) => addContentRef(el, 2)}
                className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8"
              >
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3">
                  Cam kết
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-black/70">
                  Với công nghệ tiên tiến và mạng lưới tình nguyện viên rộng
                  khắp, ResQ cam kết không để ai bị bỏ lại.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Media & Stats */}
        <div className="lg:col-span-5 flex flex-col border-t lg:border-t-0 border-black/10">
          {/* Top Stats */}
          <div
            ref={(el) => addContentRef(el, 3)}
            className="grid grid-cols-2 border-b border-black/10"
          >
            <div className="px-4 sm:px-6 py-4 sm:py-6 border-r border-black/10">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-black">
                500+
              </span>
              <span className="text-[10px] sm:text-xs text-black/50 uppercase tracking-wider">
                Tình nguyện viên
              </span>
            </div>
            <div className="px-4 sm:px-6 py-4 sm:py-6">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-black">
                24/7
              </span>
              <span className="text-[10px] sm:text-xs text-black/50 uppercase tracking-wider">
                Hỗ trợ liên tục
              </span>
            </div>
          </div>

          {/* Media Area */}
          <div
            ref={(el) => addContentRef(el, 4)}
            className="flex-1 relative overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"
          >
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-black/10 bg-black/5" />
              <div className="border-b border-black/10 bg-black/[0.03]" />
              <div className="border-r border-black/10 bg-black/[0.02]" />
              <div className="bg-black/5" />
            </div>
            <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-black/20 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black/40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-[10px] sm:text-xs text-black/40 uppercase tracking-wider">
                  Xem video giới thiệu
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="border-t border-black">
            <div className="grid grid-cols-2">
              <button
                onClick={() => navigate("/download-app")}
                ref={(el) => addContentRef(el, 5)}
                className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 text-left border-r border-black/20 hover:bg-[#FF5722] hover:text-white transition-all duration-300 group"
              >
                <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Tải ứng dụng
                </span>
                <span className="block text-[10px] sm:text-xs text-black/50 group-hover:text-white/70 mt-0.5 sm:mt-1">
                  iOS & Android ↗
                </span>
              </button>
              <button
                ref={(el) => addContentRef(el, 6)}
                className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 text-left hover:bg-[#FF5722] hover:text-white transition-all duration-300 group"
              >
                <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Đăng ký cứu hộ
                </span>
                <span className="block text-[10px] sm:text-xs text-black/50 group-hover:text-white/70 mt-0.5 sm:mt-1">
                  Tình nguyện viên ↗
                </span>
              </button>
            </div>
          </div>

          {/* Accent Bar */}
          <div
            ref={(el) => addContentRef(el, 7)}
            className="h-1 bg-[#FF5722]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
