import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutStats, aboutValues, aboutTeam } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroElements = heroRef.current?.querySelectorAll('.hero-anim');
      if (heroElements) {
        gsap.fromTo(
          Array.from(heroElements),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
        );
      }

      // Stats animation with counter
      const statElements = statsRef.current?.querySelectorAll('.stat-item');
      if (statElements) {
        gsap.fromTo(
          Array.from(statElements),
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: "back.out(1.7)",
            delay: 0.5
          }
        );
      }

      // Mission section
      ScrollTrigger.create({
        trigger: missionRef.current,
        start: "top 80%",
        onEnter: () => {
          const missionElements = missionRef.current?.querySelectorAll('.mission-anim');
          if (missionElements) {
            gsap.fromTo(
              Array.from(missionElements),
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
          }
        },
        once: true
      });

      // Values section
      ScrollTrigger.create({
        trigger: valuesRef.current,
        start: "top 80%",
        onEnter: () => {
          const valueElements = valuesRef.current?.querySelectorAll('.value-item');
          if (valueElements) {
            gsap.fromTo(
              Array.from(valueElements),
              { opacity: 0, y: 40, rotateX: -15 },
              { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
        },
        once: true
      });

      // Team section
      ScrollTrigger.create({
        trigger: teamRef.current,
        start: "top 80%",
        onEnter: () => {
          const teamElements = teamRef.current?.querySelectorAll('.team-item');
          if (teamElements) {
            gsap.fromTo(
              Array.from(teamElements),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
          }
        },
        once: true
      });

      // CTA section
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 85%",
        onEnter: () => {
          const ctaElements = ctaRef.current?.querySelectorAll('.cta-anim');
          if (ctaElements) {
            gsap.fromTo(
              Array.from(ctaElements),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
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
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div ref={heroRef} className="p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <div className="hero-anim flex items-center gap-3 mb-6">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50">
                VỀ CHÚNG TÔI
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>
            <h1 className="hero-anim text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
              KẾT NỐI
              <br />
              <span className="text-[#FF5722]">NHÂN ÁI</span>
            </h1>
            <p className="hero-anim text-sm sm:text-base lg:text-lg text-black/60 max-w-xl leading-relaxed mb-8">
              ResQ SOS Miền Trung là nền tảng công nghệ kết nối người dân gặp nạn 
              trong thiên tai với đội ngũ cứu hộ tình nguyện, giúp việc cứu trợ 
              diễn ra nhanh chóng và hiệu quả hơn.
            </p>
            <Link 
              to="/register"
              className="hero-anim inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-sm hover:bg-[#FF5722] transition-colors"
            >
              THAM GIA NGAY
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div ref={statsRef} className="grid grid-cols-2">
            {aboutStats.map((stat, index) => (
              <div 
                key={index}
                className={`stat-item p-6 sm:p-8 lg:p-10 flex flex-col justify-center ${index % 2 === 0 ? 'border-r-2' : ''} ${index < 2 ? 'border-b-2' : ''} border-black`}
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FF5722]">{stat.number}</span>
                <span className="text-[10px] font-mono tracking-widest text-black/50 mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" ref={missionRef} className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="mission-anim lg:col-span-4 p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-black text-white">
            <span className="text-[10px] font-mono tracking-widest text-white/40 block mb-4">SỨ MỆNH</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6">
              KHÔNG AI
              <br />
              BỊ BỎ LẠI
              <br />
              <span className="text-[#FF5722]">PHÍA SAU</span>
            </h2>
          </div>
          <div className="mission-anim lg:col-span-8 p-8 sm:p-12 lg:p-16">
            <p className="text-base sm:text-lg lg:text-xl text-black/70 leading-relaxed mb-6">
              Chúng tôi tin rằng trong những thời khắc khó khăn nhất, công nghệ có thể 
              trở thành cầu nối giữa những người cần giúp đỡ và những tấm lòng sẵn sàng 
              hỗ trợ.
            </p>
            <p className="text-sm sm:text-base text-black/60 leading-relaxed">
              ResQ SOS Miền Trung ra đời với sứ mệnh đảm bảo mọi người dân trong vùng 
              thiên tai đều có thể tiếp cận được sự trợ giúp kịp thời. Chúng tôi xây dựng 
              một hệ sinh thái cứu hộ thông minh, nơi công nghệ AI giúp phân loại mức độ 
              khẩn cấp, điều phối lực lượng cứu hộ và tối ưu hóa nguồn lực.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="border-b-2 border-black">
        <div className="p-8 sm:p-12 lg:p-16 border-b-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-2">GIÁ TRỊ CỐT LÕI</span>
          <h2 className="text-2xl sm:text-3xl font-black">NHỮNG GÌ CHÚNG TÔI TIN TƯỞNG</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((value, index) => (
            <div 
              key={index}
              className={`value-item p-6 sm:p-8 lg:p-10 border-b-2 sm:border-b-0 ${index % 2 === 0 ? 'sm:border-r-2' : ''} lg:border-r-2 last:lg:border-r-0 border-black hover:bg-black hover:text-white transition-colors group`}
            >
              <value.icon className="w-8 h-8 mb-4 text-[#FF5722]" weight="fill" />
              <h3 className="text-sm font-black tracking-wider mb-2">{value.title}</h3>
              <p className="text-xs text-black/60 group-hover:text-white/60">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" ref={teamRef} className="border-b-2 border-black">
        <div className="p-8 sm:p-12 lg:p-16 border-b-2 border-black">
          <span className="text-[10px] font-mono tracking-widest text-black/40 block mb-2">ĐỘI NGŨ</span>
          <h2 className="text-2xl sm:text-3xl font-black">NHỮNG NGƯỜI ĐỨNG SAU RESQ</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {aboutTeam.map((member, index) => (
            <div 
              key={index}
              className={`team-item p-4 sm:p-6 lg:p-8 border-b-2 lg:border-b-0 ${index % 2 === 0 ? 'border-r-2' : ''} lg:border-r-2 last:lg:border-r-0 border-black`}
            >
              <div className="aspect-square bg-black/10 mb-4 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm font-black">{member.name}</h3>
              <p className="text-xs text-black/50">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="cta-anim p-8 sm:p-12 lg:p-16 bg-[#FF5722] text-white border-b-2 lg:border-b-0 lg:border-r-2 border-black">
          <h3 className="text-2xl sm:text-3xl font-black mb-4">SẴN SÀNG THAM GIA?</h3>
          <p className="text-sm text-white/80 mb-6">
            Trở thành một phần của cộng đồng cứu hộ. Mỗi đóng góp của bạn đều có ý nghĩa.
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-colors"
          >
            ĐĂNG KÝ NGAY
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="cta-anim p-8 sm:p-12 lg:p-16">
          <h3 className="text-2xl sm:text-3xl font-black mb-4">LIÊN HỆ</h3>
          <div className="space-y-3 text-sm">
            <p><span className="text-black/50">Email:</span> contact@resq.vn</p>
            <p><span className="text-black/50">Hotline:</span> 1900 1234</p>
            <p><span className="text-black/50">Địa chỉ:</span> 123 Đường Trần Phú, TP. Đà Nẵng</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
