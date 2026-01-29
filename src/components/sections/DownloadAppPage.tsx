import { QrCode } from "lucide-react";
import { appStoreItems, badges } from "@/constants";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animation variants for consistent staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "backOut" as const,
    },
  },
};

const storeItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const DownloadAppPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orangePanelRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const orangeTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orange panel content animation on scroll
      if (orangeTextRef.current) {
        gsap.fromTo(
          orangeTextRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: orangePanelRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Mockup float animation
      if (mockupRef.current) {
        gsap.fromTo(
          mockupRef.current,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: orangePanelRef.current,
              start: "top 80%",
            },
          },
        );

        // Continuous floating animation
        gsap.to(mockupRef.current, {
          y: -10,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[calc(100vh-80px)] bg-white">
      {/* Split screen wrapper */}
      <div className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="bg-gray-50 relative overflow-hidden">
          {/* Decorative background elements */}
          <motion.div
            className="absolute top-20 -left-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="container mx-auto px-4 lg:px-12 pt-16 md:pt-24 pb-10 md:pb-14 relative z-10">
            <motion.div
              className="max-w-2xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-[44px] leading-[1.05] md:text-[64px] md:leading-[1.05] font-black tracking-tight text-slate-900"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Tải ứng dụng
                </motion.span>
                <br />
                <motion.span
                  className="text-[#FF5722]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  ResQ SOS Miền Trung
                </motion.span>
                <br />
                <motion.span
                  className="text-slate-900/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  ngay!
                </motion.span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-base md:text-lg text-slate-600 max-w-xl leading-relaxed"
              >
                Cảnh báo mưa lũ theo thời gian thực, gửi tín hiệu SOS chỉ với
                một chạm và định vị nhanh để đội cứu hộ hỗ trợ kịp thời.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                variants={containerVariants}
              >
                {badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    variants={badgeVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-slate-200 px-4 py-2.5 text-sm text-slate-700 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <span className={`w-2 h-2 rounded-full ${badge.color}`} />
                    {badge.text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white border-l border-black/10">
          <div className="h-full flex flex-col">
            {/* top-right stores */}
            <div className="container mx-auto px-4 lg:px-12 pt-16 md:pt-16">
              <motion.div
                className="max-w-3xl mx-auto mt-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5722]">
                    App Stores
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    QR
                  </span>
                </motion.div>

                <div className="mt-6 space-y-6">
                  {appStoreItems.map((store, index) => (
                    <motion.div
                      key={store.key}
                      variants={storeItemVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 + index * 0.15 }}
                      whileHover={{ x: 5 }}
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-6 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors"
                        >
                          <img
                            src={store.iconSrc}
                            alt={store.iconAlt}
                            className={store.iconClassName}
                          />
                        </motion.div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {store.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Sắp ra mắt
                          </div>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        disabled
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center rounded-full bg-orange-50 px-6 py-2.5 text-sm font-bold text-orange-700 cursor-not-allowed border border-orange-100"
                        title="Bản phát hành đang được chuẩn bị"
                      >
                        Coming Soon
                      </motion.button>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 flex items-center justify-center text-slate-300 group-hover:text-slate-400 transition-colors"
                      >
                        <QrCode className="w-10 h-10" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* bottom-right orange panel */}
            <div
              ref={orangePanelRef}
              className="mt-8 md:mt-10 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 flex-1 relative overflow-hidden"
            >
              {/* Decorative animated elements */}
              <motion.div
                className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="container mx-auto px-4 lg:px-12 py-10 md:py-14 h-full relative z-10">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-10 h-full">
                  <div ref={orangeTextRef} className="text-white/95">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                      className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4"
                    >
                      Tính năng nổi bật
                    </motion.p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.2]">
                      Một chạm gửi SOS.
                      <br />
                      <span className="text-white/70">
                        Một hệ thống cùng phản ứng.
                      </span>
                    </h2>
                    <p className="mt-4 text-white/80 leading-relaxed max-w-xl text-base md:text-lg">
                      Khi có lũ, bạn có thể gửi vị trí và tình trạng ngay lập
                      tức để đội cứu hộ tiếp cận nhanh hơn. Dữ liệu được tổng
                      hợp giúp ưu tiên những trường hợp khẩn cấp.
                    </p>

                    {/* Feature list */}
                    <motion.div
                      className="mt-6 space-y-3"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                      }}
                    >
                      {[
                        "Gửi SOS chỉ với một chạm",
                        "Định vị GPS chính xác",
                        "Kết nối đội cứu hộ 24/7",
                      ].map((feature, idx) => (
                        <motion.div
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span className="text-sm text-white/90">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <div
                    ref={mockupRef}
                    className="relative h-full flex items-end"
                  >
                    <div className="relative mx-auto w-full max-w-xs md:max-w-sm lg:max-w-md">
                      {/* Glow effect behind phone */}
                      <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full transform scale-75" />

                      <motion.img
                        src="/images/app_mockup.png"
                        alt="Giao diện ứng dụng ResQ SOS Miền Trung"
                        className="w-full h-auto relative z-10 drop-shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent - matching other sections */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default DownloadAppPage;
