import { ArrowRight, Heart, Wallet, Package, Users, ShieldCheck } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { donationOptions, impactStats } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const DonatePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsHeroRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-anim") || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Stats hero animation
      gsap.fromTo(
        statsHeroRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.2)" }
      );

      // Options animation
      ScrollTrigger.create({
        trigger: optionsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            optionsRef.current?.querySelectorAll(".option-item") || [],
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" }
          );
        }
      });

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

      // Payment animation
      ScrollTrigger.create({
        trigger: paymentRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            paymentRef.current?.querySelectorAll(".payment-anim") || [],
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
          );
        }
      });

      // Impact stats animation
      ScrollTrigger.create({
        trigger: impactRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            impactRef.current?.querySelectorAll(".impact-item") || [],
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
          );
        }
      });

      // CTA animation
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current?.querySelectorAll(".cta-item") || [],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power2.out" }
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
                QUYÊN GÓP
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>
            <h1 className="hero-anim text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] mb-6">
              CHUNG TAY
              <br />
              <span className="text-[#FF5722]">CỨU TRỢ</span>
            </h1>
            <p className="hero-anim text-sm sm:text-base lg:text-lg text-black/60 max-w-xl leading-relaxed">
              Mỗi đóng góp của bạn đều có ý nghĩa. Hãy cùng ResQ SOS hỗ trợ 
              người dân miền Trung vượt qua thiên tai.
            </p>
          </div>
          <div ref={statsHeroRef} className="lg:col-span-5 bg-[#FF5722] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <Heart className="w-16 h-16 mb-4" weight="fill" />
            <span className="text-[10px] font-mono tracking-widest text-white/60 block mb-2">TỔNG QUYÊN GÓP 2024</span>
            <span className="text-4xl sm:text-5xl font-black">2.5 TỶ</span>
            <span className="text-sm text-white/60 mt-2">VNĐ đã được quyên góp</span>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section ref={optionsRef} className="border-b-2 border-black">
        <div className="p-8 sm:p-12 lg:p-16 border-b-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-2">ĐÓNG GÓP</span>
          <h2 className="text-2xl sm:text-3xl font-black">CHỌN MỨC ĐÓNG GÓP</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {donationOptions.map((option, index) => (
            <button
              key={index}
              className={`option-item p-6 sm:p-8 lg:p-10 ${index < 3 ? 'border-r-2' : ''} border-black hover:bg-black hover:text-white transition-colors group text-left`}
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black block text-[#FF5722] group-hover:text-[#FF5722]">
                {option.amount}
              </span>
              <span className="text-sm font-bold">{option.label}</span>
              <p className="text-xs text-black/50 group-hover:text-white/50 mt-2">{option.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Donation Form */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div ref={formRef} className="p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <span className="form-anim text-[10px] font-mono tracking-widest text-black/40 block mb-4">THÔNG TIN</span>
            <h2 className="form-anim text-2xl sm:text-3xl font-black mb-6">THÔNG TIN NGƯỜI ĐÓNG GÓP</h2>
            
            <form className="space-y-4">
              <div className="form-anim">
                <label className="text-xs font-bold tracking-wider block mb-2">HỌ TÊN</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722]"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="form-anim grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold tracking-wider block mb-2">EMAIL</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722]"
                    placeholder="email@example.com"
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
                <label className="text-xs font-bold tracking-wider block mb-2">SỐ TIỀN ĐÓNG GÓP</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722]"
                  placeholder="500,000 VNĐ"
                />
              </div>
              <div className="form-anim">
                <label className="text-xs font-bold tracking-wider block mb-2">LỜI NHẮN (TÙY CHỌN)</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-black text-sm focus:outline-none focus:border-[#FF5722] resize-none"
                  placeholder="Gửi lời chúc đến người dân vùng thiên tai..."
                />
              </div>
              <button 
                type="submit"
                className="form-anim w-full px-6 py-4 bg-[#FF5722] text-white font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                ĐÓNG GÓP NGAY
                <Heart className="w-4 h-4" weight="fill" />
              </button>
            </form>
          </div>

          {/* Payment Methods */}
          <div ref={paymentRef} className="p-8 sm:p-12 lg:p-16">
            <span className="payment-anim text-[10px] font-mono tracking-widest text-black/40 block mb-4">THANH TOÁN</span>
            <h2 className="payment-anim text-2xl sm:text-3xl font-black mb-6">PHƯƠNG THỨC</h2>
            
            <div className="space-y-4">
              <div className="payment-anim p-4 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <Wallet className="w-6 h-6 mb-2" />
                <h3 className="font-bold text-sm">Chuyển khoản ngân hàng</h3>
                <p className="text-xs text-black/50">Vietcombank, Techcombank, BIDV...</p>
              </div>
              <div className="payment-anim p-4 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <Package className="w-6 h-6 mb-2" />
                <h3 className="font-bold text-sm">Ví điện tử</h3>
                <p className="text-xs text-black/50">MoMo, ZaloPay, VNPay</p>
              </div>
            </div>

            <div className="payment-anim mt-8 p-4 bg-black/5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Bảo mật & Minh bạch</h4>
                  <p className="text-xs text-black/60 mt-1">
                    Mọi giao dịch đều được bảo mật và báo cáo công khai. 
                    Bạn sẽ nhận được biên lai qua email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section ref={impactRef} className="border-b-2 border-black">
        <div className="p-8 sm:p-12 lg:p-16 border-b-2 border-black bg-black text-white">
          <span className="text-[10px] font-mono tracking-widest text-white/40 block mb-2">TÁC ĐỘNG</span>
          <h2 className="text-2xl sm:text-3xl font-black">NHỮNG CON SỐ Ý NGHĨA</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <div 
              key={index}
              className={`impact-item p-6 sm:p-8 lg:p-10 ${index < 3 ? 'border-r-2' : ''} border-black text-center`}
            >
              <span className="text-3xl sm:text-4xl font-black text-[#FF5722] block">{stat.number}</span>
              <span className="text-xs text-black/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Other ways to help */}
      <section ref={ctaRef} className="grid grid-cols-1 lg:grid-cols-2">
        <Link 
          to="/register"
          className="cta-item p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black hover:bg-black hover:text-white transition-colors group"
        >
          <Users className="w-10 h-10 mb-4 text-[#FF5722]" />
          <h3 className="text-xl font-black mb-2">THAM GIA TÌNH NGUYỆN</h3>
          <p className="text-sm text-black/60 group-hover:text-white/60 mb-4">
            Không chỉ tiền bạc, thời gian và công sức của bạn cũng rất quý giá.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-bold">
            ĐĂNG KÝ NGAY
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </span>
        </Link>
        <Link 
          to="/contact"
          className="cta-item p-8 sm:p-12 lg:p-16 hover:bg-black hover:text-white transition-colors group"
        >
          <Package className="w-10 h-10 mb-4 text-[#FF5722]" />
          <h3 className="text-xl font-black mb-2">ĐÓNG GÓP VẬT PHẨM</h3>
          <p className="text-sm text-black/60 group-hover:text-white/60 mb-4">
            Quyên góp nhu yếu phẩm, quần áo, thuốc men cho người dân vùng thiên tai.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-bold">
            LIÊN HỆ
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </span>
        </Link>
      </section>
    </div>
  );
};

export default DonatePage;
