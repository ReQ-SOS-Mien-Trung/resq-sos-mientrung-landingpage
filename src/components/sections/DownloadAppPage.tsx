import { useEffect, useRef } from "react";
import { appStoreItems } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon, ArrowUpRightIcon, BellIcon, MapTrifoldIcon, PhoneIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(ScrollTrigger);

const DownloadAppPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: BellIcon, label: "Cảnh báo thời gian thực" },
    { icon: ShieldCheckIcon, label: "SOS một chạm" },
    { icon: MapTrifoldIcon, label: "Bản đồ điểm ngập" },
    { icon: PhoneIcon, label: "Hoạt động offline" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Label animation
      tl.fromTo(
        ".hero-label",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 }
      );

      // Hero title animation - stagger each line
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current.children,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          "-=0.3"
        );
      }

      // Description
      tl.fromTo(
        ".hero-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );

      // Stats row
      tl.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      );

      // Phone mockup animation - appears from right
      if (phoneRef.current) {
        tl.fromTo(
          phoneRef.current,
          { x: 100, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 1 },
          "-=0.8"
        );
      }

      // Big number background
      tl.fromTo(
        ".big-number",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // Diagonal background
      tl.fromTo(
        ".diagonal-bg",
        { xPercent: 100 },
        { xPercent: 0, duration: 1.2, ease: "power2.out" },
        0 // Start at the beginning
      );

      // Features strip animation - after hero
      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll(".feature-item");
        tl.fromTo(
          items,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        );
      }

      // Store cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".store-card");
        tl.fromTo(
          cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          "-=0.2"
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section - Full Width */}
      <div ref={heroRef} className="relative min-h-[70vh] lg:min-h-[80vh] flex flex-col">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="diagonal-bg absolute top-0 right-0 w-[60%] h-full bg-[#FF5722] clip-diagonal" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute w-px h-full bg-white" style={{ left: `${i * 10}%` }} />
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full h-px bg-white" style={{ top: `${i * 20}%` }} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col lg:flex-row">
          {/* Left - Typography */}
          <div className="lg:w-[55%] p-6 sm:p-10 lg:p-16 xl:p-20 flex flex-col justify-center">
            {/* Label */}
            <div className="hero-label flex items-center gap-4 mb-6 sm:mb-8">
              <span className="w-8 sm:w-12 h-px bg-[#FF5722]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#FF5722]">
                Ứng dụng di động
              </span>
            </div>

            {/* Title */}
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight pt-6 overflow-hidden">
              <span className="block">TẢI</span>
              <span className="block text-white/20">NGAY</span>
              <span className="relative inline-block">
                RESQ
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF5722]" />
              </span>
            </h1>

            {/* Description */}
            <p className="hero-desc mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg text-white/50 max-w-md leading-relaxed">
              Ứng dụng cứu hộ thông minh — Cảnh báo lũ, gửi SOS, định vị và kết nối với đội cứu hộ trong tích tắc.
            </p>

            {/* Stats Row */}
            <div className="mt-8 sm:mt-12 flex items-end gap-8 sm:gap-12">
              <div className="stat-item group cursor-default">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FF5722] group-hover:scale-110 inline-block transition-transform">50K+</span>
                <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider mt-1">Downloads</p>
              </div>
              <div className="stat-item group cursor-default">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white/20 group-hover:text-white/40 transition-colors">4.8★</span>
                <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider mt-1">Rating</p>
              </div>
              <div className="stat-item hidden sm:block group cursor-default">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white/20 group-hover:text-white/40 transition-colors">24/7</span>
                <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider mt-1">Support</p>
              </div>
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="lg:w-[45%] relative flex items-center justify-center p-6 sm:p-10 lg:p-0">
            {/* Big Number Background */}
            <span className="big-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] sm:text-[300px] lg:text-[400px] font-black text-white/5 select-none pointer-events-none">
              04
            </span>
            
            {/* Phone */}
            <div ref={phoneRef} className="relative z-10 w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px]">
              <img
                src="/images/app_mockup.png"
                alt="ResQ App"
                className="w-full h-auto drop-shadow-2xl"
              />
              {/* Glow effect */}
              <div className="absolute -inset-10 bg-[#FF5722]/20 blur-3xl rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-white text-black">
        {/* Features Strip */}
        <div ref={featuresRef} className="border-b border-black overflow-x-auto">
          <div className="flex min-w-max">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="feature-item flex-1 min-w-[200px] flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 border-r border-black/10 last:border-r-0 hover:bg-black/5 transition-colors group cursor-default"
                >
                  <Icon className="w-5 h-5 text-[#FF5722] group-hover:scale-125 transition-transform" weight="bold" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Store Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2">
          {appStoreItems.map((store, index) => (
            <div
              key={store.key}
              className={`store-card group relative p-8 sm:p-10 lg:p-14 border-b md:border-b-0 ${
                index === 0 ? 'md:border-r' : ''
              } border-black hover:bg-black hover:text-white transition-colors duration-500`}
            >
              {/* Number */}
              <span className="absolute top-6 right-6 sm:top-8 sm:right-8 text-6xl sm:text-7xl lg:text-8xl font-black text-black/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-500 origin-top-right">
                0{index + 1}
              </span>

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black group-hover:border-white flex items-center justify-center mb-6 sm:mb-8 transition-all duration-500 group-hover:rotate-3">
                  <img
                    src={store.iconSrc}
                    alt={store.iconAlt}
                    className={`${store.iconClassName} group-hover:brightness-0 group-hover:invert transition-all duration-500`}
                  />
                </div>

                {/* Store Name */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">{store.name}</h3>
                <p className="text-xs sm:text-sm text-black/40 group-hover:text-white/40 uppercase tracking-wider mb-6 sm:mb-8 transition-colors duration-500">
                  {store.key === "app-store" ? "Available on iOS" : "Available on Android"}
                </p>

                {/* Button */}
                <button
                  disabled
                  className="inline-flex items-center gap-3 text-sm sm:text-base font-bold uppercase tracking-wider group/btn"
                >
                  <span className="relative">
                    Sắp ra mắt
                    <span className="absolute -bottom-1 left-0 w-0 group-hover/btn:w-full h-0.5 bg-[#FF5722] transition-all duration-300" />
                  </span>
                  <ArrowUpRightIcon className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left - Message */}
            <div className="lg:col-span-8 p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-black">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
                  SẴN SÀNG CHO MÙA MƯA BÃO?
                </h2>
                <div className="flex items-center gap-2 text-sm text-black/50">
                  <span className="w-2 h-2 bg-[#FF5722] animate-pulse" />
                  Ứng dụng sẽ ra mắt sớm
                </div>
              </div>
            </div>

            {/* Right - CTA Button */}
            <div className="lg:col-span-4 p-6 sm:p-8 lg:p-12 bg-[#FF5722] group cursor-pointer hover:bg-black transition-colors duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                    Đăng ký nhận thông báo
                  </p>
                  <span className="text-lg sm:text-xl font-black text-white">Nhận tin sớm nhất</span>
                </div>
                <ArrowRightIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .clip-diagonal {
          clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </section>
  );
};

export default DownloadAppPage;

