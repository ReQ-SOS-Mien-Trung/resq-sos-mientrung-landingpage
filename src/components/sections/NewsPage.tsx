import { ArrowRight, Newspaper, Calendar } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { newsArticles, featuredNews, newsCategories } from "@/constants";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroElements = heroRef.current?.querySelectorAll('.hero-anim');
      if (heroElements) {
        gsap.fromTo(
          Array.from(heroElements),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
        );
      }

      // Categories slide in
      const categoryButtons = categoriesRef.current?.querySelectorAll('button');
      if (categoryButtons) {
        gsap.fromTo(
          Array.from(categoryButtons),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.4, ease: "power2.out" }
        );
      }

      // Featured news
      ScrollTrigger.create({
        trigger: featuredRef.current,
        start: "top 80%",
        onEnter: () => {
          const featuredElements = featuredRef.current?.querySelectorAll('.featured-anim');
          if (featuredElements) {
            gsap.fromTo(
              Array.from(featuredElements),
              { opacity: 0, x: -40 },
              { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
          }
        },
        once: true
      });

      // News grid
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => {
          const newsItems = gridRef.current?.querySelectorAll('.news-item');
          if (newsItems) {
            gsap.fromTo(
              Array.from(newsItems),
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
          }
        },
        once: true
      });

      // Newsletter
      ScrollTrigger.create({
        trigger: newsletterRef.current,
        start: "top 85%",
        onEnter: () => {
          const newsletterElements = newsletterRef.current?.querySelectorAll('.newsletter-anim');
          if (newsletterElements) {
            gsap.fromTo(
              Array.from(newsletterElements),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Hero Section */}
      <section className="border-b-2 border-black">
        <div ref={heroRef} className="p-8 sm:p-12 lg:p-16">
          <div className="hero-anim flex items-center gap-3 mb-6">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50">
              TIN TỨC & SỰ KIỆN
            </span>
            <div className="flex-1 h-px bg-black/20" />
          </div>
          <h1 className="hero-anim text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] mb-6">
            TIN TỨC
            <br />
            <span className="text-[#FF5722]">MỚI NHẤT</span>
          </h1>
          <p className="hero-anim text-sm sm:text-base lg:text-lg text-black/60 max-w-2xl leading-relaxed">
            Cập nhật những thông tin mới nhất về hoạt động cứu hộ, sản phẩm và cộng đồng ResQ SOS Miền Trung.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b-2 border-black overflow-x-auto">
        <div ref={categoriesRef} className="flex">
          {newsCategories.map((cat, index) => (
            <button
              key={index}
              className={`px-6 py-4 text-xs font-bold tracking-wider border-r-2 border-black last:border-r-0 hover:bg-black hover:text-white transition-colors ${index === 0 ? 'bg-black text-white' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured News */}
      <section ref={featuredRef} className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="featured-anim aspect-video lg:aspect-auto bg-black/10 border-b-2 lg:border-b-0 lg:border-r-2 border-black flex items-center justify-center">
            <Newspaper className="w-20 h-20 text-black/20" />
          </div>
          <div className="featured-anim p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-[#FF5722] text-white text-[10px] font-bold tracking-wider">
                {featuredNews.category}
              </span>
              <span className="text-xs text-black/50 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {featuredNews.date}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 leading-tight">
              {featuredNews.title}
            </h2>
            <p className="text-sm text-black/60 mb-6 leading-relaxed">
              {featuredNews.description}
            </p>
            <a 
              href="#"
              className="inline-flex items-center gap-2 text-sm font-bold hover:text-[#FF5722] transition-colors"
            >
              ĐỌC THÊM
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section ref={gridRef} className="border-b-2 border-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {newsArticles.map((article, index) => (
            <a
              key={article.id}
              href={article.link}
              className={`news-item p-6 sm:p-8 border-b-2 lg:border-b-0 ${index % 2 === 0 ? 'sm:border-r-2' : ''} lg:border-r-2 last:lg:border-r-0 border-black hover:bg-black hover:text-white transition-colors group`}
            >
              <div className="aspect-video bg-black/10 mb-4 flex items-center justify-center group-hover:bg-white/10">
                <Newspaper className="w-8 h-8 text-black/20 group-hover:text-white/20" />
              </div>
              <span className="text-[10px] text-black/40 group-hover:text-white/40 flex items-center gap-1 mb-2">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
              <h3 className="text-sm font-bold leading-tight line-clamp-3">
                {article.title}
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section ref={newsletterRef} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="newsletter-anim p-8 sm:p-12 lg:p-16 bg-black text-white border-b-2 lg:border-b-0 lg:border-r-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-white/40 block mb-4">ĐĂNG KÝ NHẬN TIN</span>
          <h3 className="text-2xl sm:text-3xl font-black mb-4">CẬP NHẬT MỚI NHẤT</h3>
          <p className="text-sm text-white/60 mb-6">
            Nhận thông tin về hoạt động cứu hộ và tin tức mới nhất từ ResQ SOS.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 bg-transparent border border-white/20 text-sm focus:outline-none focus:border-[#FF5722]"
            />
            <button className="px-6 py-3 bg-[#FF5722] text-white font-bold text-sm hover:bg-white hover:text-black transition-colors">
              ĐĂNG KÝ
            </button>
          </div>
        </div>
        <div className="newsletter-anim p-8 sm:p-12 lg:p-16">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-4">LIÊN KẾT NHANH</span>
          <div className="space-y-0">
            <Link 
              to="/about"
              className="flex items-center justify-between p-4 border-2 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-bold">VỀ CHÚNG TÔI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/register"
              className="flex items-center justify-between p-4 border-2 border-t-0 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-bold">THAM GIA CỘNG ĐỒNG</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
