import { ArrowRight, ArrowUpRight, Warning, House, Truck, Heart, Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-anim") || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Services animation
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            servicesRef.current?.querySelectorAll(".service-item") || [],
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: "power2.out" }
          );
        }
      });

      // Process animation
      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            processRef.current?.querySelectorAll(".process-item") || [],
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" }
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

  const mainServices = [
    {
      icon: Warning,
      title: "GỬI TÍN HIỆU SOS",
      desc: "Gửi yêu cầu cứu trợ khẩn cấp với vị trí GPS chính xác đến đội ngũ cứu hộ gần nhất.",
      color: "bg-red-500",
      features: ["Định vị GPS tự động", "Phân loại mức độ khẩn cấp", "Thông báo đến đội cứu hộ gần nhất"],
    },
    {
      icon: House,
      title: "TÌM NƠI TRÚ ẨN",
      desc: "Xác định các điểm sơ tán an toàn gần nhất trong vùng thiên tai.",
      color: "bg-blue-500",
      features: ["Bản đồ điểm sơ tán", "Thông tin sức chứa", "Chỉ đường an toàn"],
    },
    {
      icon: Truck,
      title: "TIẾP TẾ VẬT TƯ",
      desc: "Đăng ký nhu cầu về lương thực, nước uống, thuốc men và các nhu yếu phẩm.",
      color: "bg-amber-500",
      features: ["Đăng ký nhu cầu online", "Theo dõi đơn hàng", "Điểm phân phối gần nhất"],
    },
    {
      icon: Heart,
      title: "Y TẾ KHẨN CẤP",
      desc: "Tìm kiếm cơ sở y tế hoạt động và nhận hướng dẫn sơ cứu.",
      color: "bg-green-500",
      features: ["Cơ sở y tế gần nhất", "Hướng dẫn sơ cứu", "Kết nối bác sĩ trực tuyến"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Hero Section */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div ref={heroRef} className="lg:col-span-8 p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <div className="hero-anim flex items-center gap-3 mb-6">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50">
                DỊCH VỤ CỨU HỘ
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>
            <h1 className="hero-anim text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[1.2] mb-6">
              DỊCH VỤ
              <br />
              <span className="text-[#FF5722]">CỨU HỘ</span>
            </h1>
            <p className="hero-anim text-sm sm:text-base lg:text-lg text-black/60 max-w-xl leading-relaxed">
              Các dịch vụ hỗ trợ toàn diện cho người dân trong vùng thiên tai - 
              từ cứu hộ khẩn cấp đến tiếp tế vật tư và chăm sóc y tế.
            </p>
          </div>
          <div className="hero-anim lg:col-span-4 bg-[#FF5722] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <Phone className="w-12 h-12 mb-4" weight="fill" />
            <span className="text-[10px] font-mono tracking-widest text-white/60 block mb-2">ĐƯỜNG DÂY NÓNG</span>
            <span className="text-4xl font-black">1900 1234</span>
            <span className="text-sm text-white/60 mt-2">Hoạt động 24/7</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="border-b-2 border-black">
        {mainServices.map((service, index) => (
          <div 
            key={index}
            className={`service-item grid grid-cols-1 lg:grid-cols-12 ${index < mainServices.length - 1 ? 'border-b-2 border-black' : ''}`}
          >
            <div className={`lg:col-span-2 p-6 sm:p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-black ${service.color} text-white flex items-center justify-center`}>
              <service.icon className="w-12 h-12 sm:w-16 sm:h-16" weight="fill" />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
              <h2 className="text-xl sm:text-2xl font-black mb-4">{service.title}</h2>
              <p className="text-sm sm:text-base text-black/60 leading-relaxed">{service.desc}</p>
            </div>
            <div className="lg:col-span-4 p-6 sm:p-8 lg:p-12">
              <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-4">TÍNH NĂNG</span>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#FF5722]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section ref={processRef} className="border-b-2 border-black">
        <div className="p-8 sm:p-12 lg:p-16 border-b-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-2">QUY TRÌNH</span>
          <h2 className="text-2xl sm:text-3xl font-black">CÁCH HOẠT ĐỘNG</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {[
            { step: "01", title: "GỬI YÊU CẦU", desc: "Mở ứng dụng và gửi tín hiệu SOS với vị trí của bạn" },
            { step: "02", title: "XỬ LÝ TỰ ĐỘNG", desc: "Hệ thống AI phân loại và tìm đội cứu hộ phù hợp" },
            { step: "03", title: "NHẬN HỖ TRỢ", desc: "Đội cứu hộ được điều phối và liên hệ với bạn" },
          ].map((item, index) => (
            <div 
              key={index}
              className={`process-item p-6 sm:p-8 lg:p-12 ${index < 2 ? 'border-r-2' : ''} border-black`}
            >
              <span className="text-5xl font-black text-black/10 block mb-4">{item.step}</span>
              <h3 className="text-sm font-black tracking-wider mb-2">{item.title}</h3>
              <p className="text-xs text-black/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="cta-item p-8 sm:p-12 lg:p-16 bg-black text-white border-b-2 lg:border-b-0 lg:border-r-2 border-black">
          <h3 className="text-2xl sm:text-3xl font-black mb-4">TẢI ỨNG DỤNG</h3>
          <p className="text-sm text-white/60 mb-6">
            Tải ứng dụng ResQ SOS để sẵn sàng trong mọi tình huống khẩn cấp.
          </p>
          <Link 
            to="/download-app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5722] text-white font-bold text-sm hover:bg-white hover:text-black transition-colors"
          >
            TẢI NGAY
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="cta-item p-8 sm:p-12 lg:p-16">
          <h3 className="text-2xl sm:text-3xl font-black mb-4">TRỞ THÀNH ĐỘI CỨU HỘ</h3>
          <p className="text-sm text-black/60 mb-6">
            Tham gia mạng lưới cứu hộ tình nguyện của ResQ SOS Miền Trung.
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-sm hover:bg-[#FF5722] transition-colors"
          >
            ĐĂNG KÝ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
