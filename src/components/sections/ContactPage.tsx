import { ArrowRight, ArrowUpRight, MapPin, Clock, Question } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactMethods } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-anim") || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Contact methods animation
      gsap.fromTo(
        methodsRef.current?.querySelectorAll(".method-item") || [],
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.3, ease: "power2.out" }
      );

      // Form animation
      ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            formRef.current?.querySelectorAll(".form-anim") || [],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
          );
        }
      });

      // Office info animation
      ScrollTrigger.create({
        trigger: officeRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            officeRef.current?.querySelectorAll(".office-anim") || [],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
          );
        }
      });

      // Quick links animation
      ScrollTrigger.create({
        trigger: linksRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            linksRef.current?.querySelectorAll(".link-item") || [],
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.2)" }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Hero Section */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div ref={heroRef} className="lg:col-span-7 p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <div className="hero-anim flex items-center gap-3 mb-6">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50">
                LIÊN HỆ
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>
            <h1 className="hero-anim text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
              LIÊN HỆ
              <br />
              <span className="text-[#FF5722]">VỚI CHÚNG TÔI</span>
            </h1>
            <p className="hero-anim text-sm sm:text-base lg:text-lg text-black/60 max-w-xl leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ qua 
              các kênh bên dưới hoặc gửi tin nhắn trực tiếp.
            </p>
          </div>
          <div ref={methodsRef} className="lg:col-span-5 grid grid-cols-1">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className={`method-item p-6 sm:p-8 ${method.color} text-white ${index < 2 ? 'border-b-2 border-black' : ''} hover:opacity-90 transition-opacity`}
              >
                <method.icon className="w-8 h-8 mb-3" />
                <span className="text-[10px] font-mono tracking-widest text-white/60 block">{method.title}</span>
                <span className="text-xl sm:text-2xl font-black block">{method.value}</span>
                <span className="text-xs text-white/60">{method.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div ref={formRef} className="p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <span className="form-anim text-[10px] font-mono tracking-widest text-black/40 block mb-4">GỬI TIN NHẮN</span>
            <h2 className="form-anim text-2xl sm:text-3xl font-black mb-6">LIÊN HỆ TRỰC TIẾP</h2>
            
            <form className="space-y-4">
              <div className="form-anim grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold tracking-wider block mb-2">HỌ TÊN</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider block mb-2">SỐ ĐIỆN THOẠI</label>
                  <input 
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722]"
                    placeholder="0901 234 567"
                  />
                </div>
              </div>
              <div className="form-anim">
                <label className="text-xs font-bold tracking-wider block mb-2">EMAIL</label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722]"
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-anim">
                <label className="text-xs font-bold tracking-wider block mb-2">CHỦ ĐỀ</label>
                <select className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722] bg-white">
                  <option>Chọn chủ đề</option>
                  <option>Hỗ trợ kỹ thuật</option>
                  <option>Đăng ký tình nguyện viên</option>
                  <option>Hợp tác đối tác</option>
                  <option>Góp ý / Phản hồi</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="form-anim">
                <label className="text-xs font-bold tracking-wider block mb-2">NỘI DUNG</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722] resize-none"
                  placeholder="Nhập nội dung tin nhắn..."
                />
              </div>
              <button 
                type="submit"
                className="form-anim w-full px-6 py-4 bg-black text-white font-bold text-sm hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2"
              >
                GỬI TIN NHẮN
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Office Info */}
          <div ref={officeRef} className="p-8 sm:p-12 lg:p-16">
            <span className="office-anim text-[10px] font-mono tracking-widest text-black/40 block mb-4">VĂN PHÒNG</span>
            <h2 className="office-anim text-2xl sm:text-3xl font-black mb-6">ĐỊA CHỈ</h2>
            
            <div className="space-y-6">
              <div className="office-anim flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#FF5722] flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Trụ sở chính</h3>
                  <p className="text-sm text-black/60">123 Đường Trần Phú, Quận Hải Châu, TP. Đà Nẵng</p>
                </div>
              </div>
              <div className="office-anim flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#FF5722] flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Giờ làm việc</h3>
                  <p className="text-sm text-black/60">
                    Thứ 2 - Thứ 6: 8:00 - 17:30<br />
                    Thứ 7: 8:00 - 12:00<br />
                    <span className="text-[#FF5722] font-bold">Đường dây nóng: 24/7</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="office-anim mt-8 aspect-video bg-black/10 border-2 border-black flex items-center justify-center">
              <span className="text-sm text-black/40">Bản đồ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section ref={linksRef} className="grid grid-cols-1 sm:grid-cols-3">
        <Link 
          to="/help-center"
          className="link-item p-8 sm:p-12 border-b-2 sm:border-b-0 sm:border-r-2 border-black hover:bg-black hover:text-white transition-colors group"
        >
          <Question className="w-8 h-8 mb-4 text-[#FF5722]" />
          <h3 className="font-black mb-2">TRUNG TÂM TRỢ GIÚP</h3>
          <p className="text-xs text-black/60 group-hover:text-white/60">Câu hỏi thường gặp và hướng dẫn sử dụng</p>
        </Link>
        <Link 
          to="/register"
          className="link-item p-8 sm:p-12 border-b-2 sm:border-b-0 sm:border-r-2 border-black hover:bg-black hover:text-white transition-colors group"
        >
          <ArrowUpRight className="w-8 h-8 mb-4 text-[#FF5722]" />
          <h3 className="font-black mb-2">THAM GIA CỘNG ĐỒNG</h3>
          <p className="text-xs text-black/60 group-hover:text-white/60">Đăng ký trở thành tình nguyện viên</p>
        </Link>
        <Link 
          to="/donate"
          className="link-item p-8 sm:p-12 hover:bg-black hover:text-white transition-colors group"
        >
          <ArrowUpRight className="w-8 h-8 mb-4 text-[#FF5722]" />
          <h3 className="font-black mb-2">QUYÊN GÓP</h3>
          <p className="text-xs text-black/60 group-hover:text-white/60">Đóng góp cho hoạt động cứu trợ</p>
        </Link>
      </section>
    </div>
  );
};

export default ContactPage;
