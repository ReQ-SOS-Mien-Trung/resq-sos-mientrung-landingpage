import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Warning, MapPin, Users, Phone, Shield, Bell, ArrowRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    step: '01',
    title: 'GỬI TÍN HIỆU SOS',
    subtitle: 'Khi bạn cần giúp đỡ',
    description: 'Chỉ với một chạm, gửi ngay tín hiệu cứu trợ khẩn cấp kèm vị trí GPS chính xác đến đội ngũ cứu hộ gần nhất.',
    features: [
      { icon: Warning, text: 'Gửi SOS một chạm' },
      { icon: MapPin, text: 'Định vị GPS tự động' },
      { icon: Bell, text: 'Thông báo đến đội cứu hộ' },
    ],
    image: '/images/sos.jpg',
  },
  {
    step: '02',
    title: 'ĐIỀU PHỐI THÔNG MINH',
    subtitle: 'AI tìm đội cứu hộ phù hợp',
    description: 'Hệ thống AI phân tích mức độ khẩn cấp (P1/P2/P3) và tự động tìm đội cứu hộ có phương tiện phù hợp trong bán kính gần nhất.',
    features: [
      { icon: Shield, text: 'Phân loại mức độ ưu tiên' },
      { icon: Users, text: 'Matching đội cứu hộ' },
      { icon: MapPin, text: 'Tính toán tuyến đường' },
    ],
    image: '/images/rescue.jpg',
  },
  {
    step: '03',
    title: 'KẾT NỐI CỨU HỘ',
    subtitle: 'Đội cứu hộ đang đến',
    description: 'Theo dõi vị trí đội cứu hộ theo thời gian thực trên bản đồ. Liên lạc trực tiếp qua ứng dụng hoặc gọi điện.',
    features: [
      { icon: MapPin, text: 'Theo dõi realtime' },
      { icon: Phone, text: 'Liên lạc trực tiếp' },
      { icon: Bell, text: 'Cập nhật trạng thái' },
    ],
    image: '/images/shelter.jpg',
  },
  {
    step: '04',
    title: 'AN TOÀN & HỖ TRỢ',
    subtitle: 'Bạn đã được cứu',
    description: 'Sau khi được cứu hộ, tiếp tục nhận hỗ trợ về nơi trú ẩn, y tế, nhu yếu phẩm và các dịch vụ cần thiết khác.',
    features: [
      { icon: Shield, text: 'Nơi trú ẩn an toàn' },
      { icon: Users, text: 'Hỗ trợ y tế' },
      { icon: Bell, text: 'Tiếp tế nhu yếu phẩm' },
    ],
    image: '/images/supply.jpg',
  },
];

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // Kill any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());

    const ctx = gsap.context(() => {
      const panelElements = gsap.utils.toArray<HTMLElement>('.panel');
      const totalPanels = panelElements.length;

      // Calculate total scroll distance
      const getScrollAmount = () => {
        return -(wrapper.scrollWidth - window.innerWidth);
      };

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const step = Math.min(Math.floor(progress * totalPanels), totalPanels - 1);
            setCurrentStep(step);
          },
        },
      });
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Step Indicator - Fixed at top */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        {panels.map((panel, index) => (
          <button
            key={panel.step}
            className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
              currentStep === index
                ? 'bg-black text-white'
                : currentStep > index
                ? 'bg-black/10 text-black'
                : 'bg-white text-black/30 border border-black/10'
            }`}
          >
            <span className="text-sm font-black">{panel.step}</span>
            {currentStep === index && (
              <span className="text-xs font-medium hidden sm:block">{panel.title}</span>
            )}
          </button>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-black/40">
        <span className="text-[10px] uppercase tracking-wider">Scroll để khám phá</span>
        <div className="w-6 h-10 border-2 border-black/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#FF5722] animate-bounce" />
        </div>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div ref={wrapperRef} className="flex h-screen will-change-transform">
        {panels.map((panel, index) => (
          <div
            key={panel.step}
            className="panel flex-shrink-0 w-screen h-screen flex items-center bg-white border-r border-black/10"
            style={{ minWidth: '100vw' }}
          >
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
              {/* Left - Content */}
              <div className="panel-content flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-0">
                <div className="max-w-xl">
                  {/* Step Number */}
                  <span className="text-7xl sm:text-8xl lg:text-9xl font-black text-black/5">
                    {panel.step}
                  </span>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-2 sm:mb-3 -mt-4">
                    {panel.subtitle}
                  </p>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4 sm:mb-6 text-black">
                    {panel.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg text-black/60 leading-relaxed mb-6 sm:mb-8">
                    {panel.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 sm:space-y-4">
                    {panel.features.map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <span className="text-sm sm:text-base font-medium text-black">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  {index === panels.length - 1 && (
                    <button className="mt-8 sm:mt-10 px-6 sm:px-8 py-3 sm:py-4 bg-[#FF5722] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-2">
                      Tải ứng dụng ngay
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right - Image */}
              <div className="hidden lg:block relative overflow-hidden border-l border-black/10">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${panel.image})` }}
                />
                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF5722]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
