import { ArrowRight, Question, Book, Video, ChatCircle, Phone, MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { faqs } from "@/constants";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HelpCenterPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const faqsRef = useRef<HTMLElement>(null);
  const guidesRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-anim") || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Categories animation
      ScrollTrigger.create({
        trigger: categoriesRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            categoriesRef.current?.querySelectorAll(".category-item") || [],
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" }
          );
        }
      });

      // FAQs animation
      ScrollTrigger.create({
        trigger: faqsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            faqsRef.current?.querySelectorAll(".faq-item") || [],
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
          );
        }
      });

      // Guides animation
      ScrollTrigger.create({
        trigger: guidesRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            guidesRef.current?.querySelectorAll(".guide-item") || [],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
          );
        }
      });

      // Support section animation
      ScrollTrigger.create({
        trigger: supportRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            supportRef.current?.querySelectorAll(".support-anim") || [],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power2.out" }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const categories = [
    { icon: Question, title: "CÂU HỎI THƯỜNG GẶP", count: 12, link: "#faqs" },
    { icon: Book, title: "HƯỚNG DẪN SỬ DỤNG", count: 8, link: "#guides" },
    { icon: Video, title: "VIDEO HƯỚNG DẪN", count: 5, link: "#videos" },
    { icon: ChatCircle, title: "LIÊN HỆ HỖ TRỢ", count: null, link: "/contact" },
  ];

  const guides = [
    { title: "Cách gửi tín hiệu SOS", desc: "Hướng dẫn chi tiết cách gửi yêu cầu cứu hộ khẩn cấp" },
    { title: "Đăng ký tài khoản", desc: "Các bước tạo tài khoản trên ứng dụng ResQ SOS" },
    { title: "Tìm nơi trú ẩn an toàn", desc: "Sử dụng bản đồ để tìm điểm sơ tán gần nhất" },
    { title: "Đăng ký làm tình nguyện viên", desc: "Quy trình đăng ký và xác minh đội cứu hộ" },
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Hero Section */}
      <section className="border-b-2 border-black">
        <div ref={heroRef} className="p-8 sm:p-12 lg:p-16">
          <div className="hero-anim flex items-center gap-3 mb-6">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50">
              HỖ TRỢ
            </span>
            <div className="flex-1 h-px bg-black/20" />
          </div>
          <h1 className="hero-anim text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
            TRUNG TÂM
            <br />
            <span className="text-[#FF5722]">TRỢ GIÚP</span>
          </h1>
          <p className="hero-anim text-sm sm:text-base lg:text-lg text-black/60 max-w-2xl leading-relaxed mb-8">
            Tìm câu trả lời cho các câu hỏi thường gặp, hướng dẫn sử dụng và 
            cách liên hệ với đội ngũ hỗ trợ của chúng tôi.
          </p>
          
          {/* Search */}
          <div className="hero-anim max-w-xl flex">
            <input 
              type="text"
              placeholder="Tìm kiếm câu hỏi hoặc hướng dẫn..."
              className="flex-1 px-4 py-3 border-2 border-black border-r-0 text-sm focus:outline-none"
            />
            <button className="px-6 py-3 bg-black text-white hover:bg-[#FF5722] transition-colors">
              <MagnifyingGlass className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section ref={categoriesRef} className="border-b-2 border-black">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className={`category-item p-6 sm:p-8 lg:p-10 border-b-2 lg:border-b-0 ${index % 2 === 0 ? 'border-r-2' : ''} lg:border-r-2 last:lg:border-r-0 border-black hover:bg-black hover:text-white transition-colors group`}
            >
              <cat.icon className="w-8 h-8 mb-4 text-[#FF5722]" />
              <h3 className="text-xs font-black tracking-wider mb-1">{cat.title}</h3>
              {cat.count && (
                <span className="text-xs text-black/50 group-hover:text-white/50">{cat.count} bài viết</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section ref={faqsRef} id="faqs" className="border-b-2 border-black">
        <div className="p-8 sm:p-12 lg:p-16 border-b-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-2">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-black">CÂU HỎI THƯỜNG GẶP</h2>
        </div>
        <div>
          {faqs.map((faq, index) => (
            <details 
              key={faq.id}
              className={`faq-item group ${index < faqs.length - 1 ? 'border-b-2 border-black' : ''}`}
            >
              <summary className="p-6 sm:p-8 cursor-pointer hover:bg-black/5 transition-colors list-none">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-black text-black/20">0{faq.id}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base">{faq.question}</h3>
                  </div>
                  <span className="text-xl font-bold text-[#FF5722] group-open:rotate-45 transition-transform">+</span>
                </div>
              </summary>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 ml-12">
                <p className="text-sm text-black/60 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section ref={guidesRef} id="guides" className="border-b-2 border-black">
        <div className="p-8 sm:p-12 lg:p-16 border-b-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-2">HƯỚNG DẪN</span>
          <h2 className="text-2xl sm:text-3xl font-black">HƯỚNG DẪN SỬ DỤNG</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {guides.map((guide, index) => (
            <a
              key={index}
              href="#"
              className={`guide-item p-6 sm:p-8 border-b-2 last:border-b-0 sm:last:border-b-2 ${index % 2 === 0 ? 'sm:border-r-2' : ''} border-black hover:bg-black hover:text-white transition-colors group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold mb-2">{guide.title}</h3>
                  <p className="text-xs text-black/60 group-hover:text-white/60">{guide.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-2 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section ref={supportRef} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="support-anim p-8 sm:p-12 lg:p-16 bg-black text-white border-b-2 lg:border-b-0 lg:border-r-2 border-black">
          <Phone className="w-10 h-10 mb-4 text-[#FF5722]" />
          <h3 className="text-2xl sm:text-3xl font-black mb-4">VẪN CẦN HỖ TRỢ?</h3>
          <p className="text-sm text-white/60 mb-6">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7.
          </p>
          <div className="space-y-3">
            <a 
              href="tel:19001234"
              className="flex items-center justify-between p-4 border border-white/20 hover:bg-[#FF5722] hover:border-[#FF5722] transition-colors"
            >
              <span className="text-sm">Đường dây nóng</span>
              <span className="font-black">1900 1234</span>
            </a>
            <Link 
              to="/contact"
              className="flex items-center justify-between p-4 border border-white/20 hover:bg-[#FF5722] hover:border-[#FF5722] transition-colors"
            >
              <span className="text-sm">Gửi tin nhắn</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="support-anim p-8 sm:p-12 lg:p-16">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-4">TÀI LIỆU</span>
          <div className="space-y-0">
            <Link 
              to="/terms-of-service"
              className="flex items-center justify-between p-4 border-2 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-bold">ĐIỀU KHOẢN SỬ DỤNG</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/privacy-policy"
              className="flex items-center justify-between p-4 border-2 border-t-0 border-black hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-bold">CHÍNH SÁCH BẢO MẬT</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;
