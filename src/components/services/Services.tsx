import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from '@phosphor-icons/react';
import { services, regions } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [activeRegion, setActiveRegion] = useState(regions[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, [activeRegion]);

  return (
    <section ref={sectionRef} id="services" className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      <div className="flex flex-col lg:flex-row">
        {/* LEFT - Title Section with Diagonal Lines */}
        <div ref={headerRef} className="lg:w-[45%] xl:w-[40%] relative overflow-hidden border-b lg:border-b-0 lg:border-r border-black/10">
          {/* Diagonal Stripes Background */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[200%] h-16 bg-black/20 -rotate-45"
                style={{ top: `${i * 80 - 100}px`, left: '-50%' }}
              />
            ))}
          </div>

          <div className="relative p-6 sm:p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] mb-6 sm:mb-8">
              DỊCH VỤ
              <br />
              CỨU TRỢ
            </h2>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-sm mb-8 sm:mb-12">
              Nền tảng hỗ trợ toàn diện trong thiên tai, kết nối nạn nhân với đội ngũ cứu hộ và nguồn lực cần thiết.
            </p>

            {/* Region Tabs */}
            <div className="flex flex-col gap-0 border-t border-black">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider border-b border-black/10 transition-all duration-300 flex items-center justify-between ${
                    activeRegion === region.id ? 'text-black' : 'text-black/40 hover:text-black'
                  }`}
                >
                  <span>{region.name}</span>
                  {activeRegion === region.id && <span className="w-2 h-2 bg-[#FF5722]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - Services Grid */}
        <div className="lg:flex-1" ref={contentRef}>
          {/* Featured Region Card */}
          <div className="border-b border-black/10">
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="sm:w-1/2 aspect-video sm:aspect-auto relative overflow-hidden bg-black/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-black/20 mx-auto mb-2" />
                    <span className="text-xs sm:text-sm text-black/30 uppercase tracking-wider">
                      {regions.find(r => r.id === activeRegion)?.name}
                    </span>
                  </div>
                </div>
                {/* Vertical Label */}
                <div className="absolute top-0 left-0 h-full flex items-center">
                  <span 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 px-2"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Khu vực hoạt động
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="sm:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-black/10">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FF5722] mb-2">ResQ</span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2">Trung tâm điều phối</h3>
                <p className="text-xs sm:text-sm text-black/50 mb-4">
                  {regions.find(r => r.id === activeRegion)?.name}, Việt Nam
                </p>
                <button className="inline-flex items-center text-xs sm:text-sm font-bold group">
                  <span>Xem chi tiết</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`p-4 sm:p-6 border-b border-black/10 ${
                    index % 2 !== 1 ? 'sm:border-r' : ''
                  } ${
                    index % 3 !== 2 ? 'lg:border-r' : 'lg:border-r-0'
                  } group hover:bg-black/5 transition-colors cursor-pointer`}
                >
                  {/* Region Tag */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/30 mb-2 sm:mb-3 block">
                    {service.region}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border border-black/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:border-[#FF5722] group-hover:text-[#FF5722] transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">{service.title}</h4>
                  <p className="text-xs text-black/50 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black">
            {[
              { num: '500+', label: 'Tình nguyện viên' },
              { num: '24/7', label: 'Hỗ trợ liên tục' },
              { num: '10K+', label: 'Người được giúp' },
              { num: '50+', label: 'Đối tác' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`p-4 sm:p-6 ${
                  i % 2 !== 1 ? 'border-r' : ''
                } ${
                  i < 2 ? 'lg:border-r border-b lg:border-b-0' : 'lg:border-r'
                } border-black/10 last:border-r-0`}
              >
                <span className="block text-xl sm:text-2xl md:text-3xl font-black">{stat.num}</span>
                <span className="text-[10px] sm:text-xs text-black/40 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default Services;
