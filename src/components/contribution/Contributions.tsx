import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contributions } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

const Contributions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      }

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, delay: index * 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      {/* Header Section */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 border-b border-black/10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black/40 mb-3 sm:mb-4 block">Đóng góp</span>
            <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]">
              HOẠT ĐỘNG CỨU TRỢ.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-sm md:text-right">
            Chúng tôi cam kết hỗ trợ đồng bào miền Trung vượt qua thiên tai với sự đoàn kết và yêu thương.
          </p>
        </div>
      </div>

      {/* Stats Row - Mobile Horizontal Scroll */}
      <div className="border-b border-black overflow-x-auto">
        <div className="flex min-w-max lg:min-w-0 lg:grid lg:grid-cols-3">
          {[
            { org: 'Hội Chữ thập đỏ', desc: 'Đối tác chiến lược' },
            { org: 'Bộ NN&PTNT', desc: 'Phối hợp cứu trợ' },
            { org: 'Quân khu 4', desc: 'Lực lượng hỗ trợ' },
          ].map((item, i) => (
            <div key={i} className={`px-4 sm:px-6 md:px-8 py-4 sm:py-6 ${i !== 2 ? 'border-r border-black/10' : ''} min-w-[200px] lg:min-w-0`}>
              <span className="block text-xs sm:text-sm font-bold">{item.org}</span>
              <span className="text-[10px] sm:text-xs text-black/50">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {contributions.map((contribution, index) => (
          <div
            key={contribution.id}
            ref={(el) => addCardRef(el, index)}
            className={`border-b border-black/10 ${index % 2 !== 1 ? 'sm:border-r' : ''} ${index % 3 !== 2 ? 'lg:border-r' : 'lg:border-r-0'} group`}
          >
            {/* Image */}
            <div className="aspect-[4/3] bg-black/5 relative overflow-hidden">
              <img
                src={contribution.image}
                alt={contribution.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Number Badge */}
              <div className="absolute top-0 left-0 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2">
                <span className="text-xs sm:text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#FF5722]/0 group-hover:bg-[#FF5722]/10 transition-all duration-500" />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-tight">
                {contribution.title}
              </h3>
              <p className="text-xs sm:text-sm text-black/50 leading-relaxed mb-4 sm:mb-6 line-clamp-2">
                {contribution.description}
              </p>
              <a href="#" className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-wider group/link">
                <span>Tìm hiểu thêm</span>
                <span className="ml-2 w-5 h-5 sm:w-6 sm:h-6 border border-black flex items-center justify-center group-hover/link:bg-[#FF5722] group-hover/link:border-[#FF5722] group-hover/link:text-white transition-all text-xs">
                  ↗
                </span>
              </a>
            </div>
          </div>
        ))}

        {/* Extra CTA Card */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-black/5 border-b border-black/10 sm:border-r lg:border-r-0">
          <span className="text-4xl sm:text-5xl md:text-6xl font-black text-black/10 mb-3 sm:mb-4">+</span>
          <h3 className="text-lg sm:text-xl font-bold mb-2">Tham gia cùng chúng tôi</h3>
          <p className="text-xs sm:text-sm text-black/50 mb-4 sm:mb-6">Trở thành một phần của sứ mệnh nhân đạo.</p>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FF5722] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors w-fit">
            Đăng ký ngay
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default Contributions;
