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
        <div className="lg:col-span-7 flex flex-col lg:border-r border-black/20">
          {/* Headline Area */}
          <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 xl:py-20 flex flex-col justify-center">
            <div className="space-y-0 pt-2">
              {[
                { text: "CỨU HỘ.", highlight: true },
                { text: "KẾT NỐI.", highlight: false },
                { text: "ĐỒNG HÀNH.", highlight: false },
                { text: "MIỀN TRUNG.", highlight: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => addHeadlineRef(el, idx)}
                  className="overflow-visible group cursor-default"
                >
                  <span
                    className={`block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] font-black tracking-tight leading-[1.1] transition-all duration-300 ${
                      item.highlight
                        ? "hover:text-[#FF5722]"
                        : "hover:text-black/70"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div
              ref={(el) => addContentRef(el, 0)}
              className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-black/20"
            >
              <p className="text-sm sm:text-base md:text-lg text-black/60 max-w-lg">
                Nền tảng cứu hộ khẩn cấp - Kết nối nạn nhân với đội ngũ cứu trợ
                trong thiên tai.
              </p>
            </div>
          </div>

          {/* BOTTOM INFO GRID */}
          <div className="border-t border-black/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-black/10">
              <div
                ref={(el) => addContentRef(el, 1)}
                className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 hover:bg-black hover:text-white transition-colors duration-300 group"
              >
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3 text-[#FF5722] group-hover:text-white">
                  Sứ mệnh
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  ResQ là nền tảng nhân đạo được thiết kế để điều phối các hoạt
                  động cứu hộ trong thiên tai.
                </p>
              </div>
              <div
                ref={(el) => addContentRef(el, 2)}
                className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 hover:bg-black hover:text-white transition-colors duration-300 group"
              >
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3 text-[#FF5722] group-hover:text-white">
                  Cam kết
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  Với công nghệ tiên tiến và mạng lưới tình nguyện viên rộng
                  khắp, ResQ cam kết không để ai bị bỏ lại.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Media & Stats */}
        <div className="lg:col-span-5 flex flex-col border-t lg:border-t-0 border-black/20">
          {/* Top Stats */}
          <div
            ref={(el) => addContentRef(el, 3)}
            className="grid grid-cols-2 border-b border-black/20"
          >
            <div className="px-4 sm:px-6 py-4 sm:py-6 border-r border-black/20 hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-black">
                500+
              </span>
              <span className="text-[10px] sm:text-xs opacity-60 uppercase tracking-wider">
                Tình nguyện viên
              </span>
            </div>
            <div className="px-4 sm:px-6 py-4 sm:py-6 hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-black">
                24/7
              </span>
              <span className="text-[10px] sm:text-xs opacity-60 uppercase tracking-wider">
                Hỗ trợ liên tục
              </span>
            </div>
          </div>

          {/* Media Area */}
          <div
            ref={(el) => addContentRef(el, 4)}
            className="flex-1 relative overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/baoYagi.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 h-full flex items-end justify-start p-4 sm:p-6 md:p-8">
              <p className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider">
                Video giới thiệu
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="border-t border-black/20">
            <div className="grid grid-cols-2">
              <button
                onClick={() => navigate("/download-app")}
                ref={(el) => addContentRef(el, 5)}
                className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 text-left border-r border-black/20 bg-[#FF5722] text-white hover:bg-black transition-all duration-300 group"
              >
                <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Tải ứng dụng
                </span>
                <span className="block text-[10px] sm:text-xs text-white/70 group-hover:text-white/90 mt-0.5 sm:mt-1">
                  iOS & Android ↗
                </span>
              </button>
              <button
                ref={(el) => addContentRef(el, 6)}
                className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 text-left hover:bg-black/5 transition-all duration-300 group"
              >
                <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Đăng ký cứu hộ
                </span>
                <span className="block text-[10px] sm:text-xs text-black/50 mt-0.5 sm:mt-1">
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
