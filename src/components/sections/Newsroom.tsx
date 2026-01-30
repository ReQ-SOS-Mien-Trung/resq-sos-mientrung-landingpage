import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { newsArticles } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

const Newsroom = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const articlesRef = useRef<(HTMLElement | null)[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [expandedIndex, setExpandedIndex] = useState<number>(0); // Mặc định bài đầu tiên mở

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleArticleClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      }

      articlesRef.current.forEach((article, index) => {
        if (article) {
          gsap.fromTo(article, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addArticleRef = (el: HTMLElement | null, index: number) => {
    if (el) articlesRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      {/* Header */}
      <div className="border-b border-black">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black/40 mb-2 sm:mb-4 block">Tin tức</span>
              <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight">
                TIN TỨC MỚI NHẤT
              </h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black/10">{String(newsArticles.length).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-black/40">Bài viết</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Articles */}
      <LayoutGroup>
        <div className="">
          {newsArticles.map((article, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <article
                key={article.id}
                ref={(el) => addArticleRef(el, index)}
                className="border-b border-black/10"
              >
                {/* Collapsed View - Clickable Header */}
                <div
                  onClick={() => handleArticleClick(index)}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 cursor-pointer transition-colors ${
                    isExpanded ? 'bg-black/5' : 'hover:bg-black/5'
                  }`}
                >
                  {/* Number */}
                  <span className="text-xs sm:text-sm font-bold text-black/20 w-6 sm:w-8 shrink-0 hidden sm:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Title - morphs to expanded position */}
                  {!isExpanded && (
                    <motion.h3 
                      layoutId={`title-${article.id}`}
                      className="flex-1 text-base sm:text-lg md:text-xl font-bold leading-tight"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    >
                      {article.title}
                    </motion.h3>
                  )}
                  
                  {/* Spacer when expanded */}
                  {isExpanded && <div className="flex-1" />}
                  
                  {/* Date & Arrow */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-[10px] sm:text-xs text-black/40 uppercase tracking-wider shrink-0">
                      {article.date}
                    </span>
                    <span className={`w-6 h-6 sm:w-8 sm:h-8 border flex items-center justify-center shrink-0 transition-all duration-300 text-xs sm:text-sm ${
                      isExpanded 
                        ? 'border-[#FF5722] bg-[#FF5722] text-white rotate-90' 
                        : 'border-black/20'
                    }`}>
                      ↗
                    </span>
                  </div>
                </div>

              {/* Expanded View */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col lg:flex-row border-t border-black/10">
                      {/* Image */}
                      <div className="lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[350px] relative overflow-hidden bg-black/5">
                        {!imageErrors[article.id] ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(article.id)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-5xl sm:text-6xl md:text-8xl font-black text-black/10">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Content - with morphed title */}
                      <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-black/10">
                        <motion.h3 
                          layoutId={`title-${article.id}`}
                          className="text-xl sm:text-2xl md:text-3xl font-black leading-tight mb-4 sm:mb-6 text-[#FF5722]"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        >
                          {article.title}
                        </motion.h3>
                        <p className="text-sm sm:text-base text-black/60 leading-relaxed mb-6 sm:mb-8">
                          Cập nhật mới nhất về các hoạt động cứu trợ và hỗ trợ cộng đồng của ResQ SOS Miền Trung.
                        </p>
                        <a 
                          href={article.link} 
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider group"
                        >
                          <span>Đọc bài viết</span>
                          <span className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black flex items-center justify-center group-hover:bg-[#FF5722] group-hover:border-[#FF5722] group-hover:text-white transition-all">
                            ↗
                          </span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
        </div>
      </LayoutGroup>

      {/* Bottom CTA */}
      <div className="border-t border-black">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-1 bg-[#FF5722]" />
            <span className="text-xs sm:text-sm text-black/40">Cập nhật tin tức mới nhất</span>
          </div>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors w-full sm:w-auto text-center">
            Xem tất cả tin tức ↗
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default Newsroom;
