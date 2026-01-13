import {
  Download,
  ArrowRight,
  Droplets,
  Waves,
  CloudRain,
  LifeBuoy,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Helper function to generate random values
const generateRainDrops = () =>
  Array.from({ length: 50 }).map(() => ({
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 2,
    left: Math.random() * 100,
  }));

const generateDebrisItems = (width: number, height: number) =>
  Array.from({ length: 8 }).map(() => ({
    initialX: Math.random() * width,
    initialY: height + 50,
    size: Math.random() * 30 + 20,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    animateX: Math.random() * width,
  }));

const generateWaterDroplets = (width: number, height: number) =>
  Array.from({ length: 20 }).map(() => ({
    initialY: Math.random() * height,
    initialX: Math.random() * width,
    animateY: Math.random() * height,
    animateX: Math.random() * width,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

const generateLightningFlashes = () =>
  Array.from({ length: 3 }).map(() => {
    const x = Math.random() * 100;
    const y = Math.random() * 30;
    const r1 = Math.random();
    const r2 = Math.random();
    const r3 = Math.random();
    const r4 = Math.random();
    const r5 = Math.random();
    const r6 = Math.random();
    const r7 = Math.random();
    const r8 = Math.random();
    const r9 = Math.random();
    const r10 = Math.random();

    // Main lightning bolt path with more zigzag points
    const mainPoints = [
      { x: 100, y: 0 },
      { x: 80 + r1 * 40, y: 40 },
      { x: 90 + r2 * 20, y: 80 },
      { x: 70 + r3 * 60, y: 120 },
      { x: 85 + r4 * 30, y: 160 },
      { x: 75 + r5 * 50, y: 200 },
      { x: 90 + r6 * 20, y: 240 },
      { x: 100, y: 300 },
    ];

    // Branch 1 - splits from main bolt
    const branch1Points = [
      { x: 70 + r3 * 60, y: 120 },
      { x: 50 + r7 * 40, y: 140 },
      { x: 40 + r8 * 30, y: 180 },
    ];

    // Branch 2 - splits from main bolt
    const branch2Points = [
      { x: 85 + r4 * 30, y: 160 },
      { x: 110 + r9 * 30, y: 180 },
      { x: 120 + r10 * 20, y: 220 },
    ];

    const mainPath = mainPoints
      .map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");

    const branch1Path = branch1Points
      .map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");

    const branch2Path = branch2Points
      .map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");

    return {
      delay: Math.random() * 8 + 3,
      duration: Math.random() * 0.15 + 0.1,
      intensity: Math.random() * 0.3 + 0.2,
      repeatDelay: Math.random() * 5 + 3,
      x,
      y,
      mainPath,
      branch1Path,
      branch2Path,
    };
  });

const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [rainDrops] = useState(() => generateRainDrops());
  const [debrisItems, setDebrisItems] = useState<
    Array<{
      initialX: number;
      initialY: number;
      size: number;
      duration: number;
      delay: number;
      animateX: number;
    }>
  >([]);
  const [waterDroplets, setWaterDroplets] = useState<
    Array<{
      initialY: number;
      initialX: number;
      animateY: number;
      animateX: number;
      duration: number;
      delay: number;
    }>
  >([]);
  const [lightningFlashes] = useState(() => generateLightningFlashes());

  useEffect(() => {
    const updateDimensions = () => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setDimensions(newDimensions);
      setDebrisItems(
        generateDebrisItems(newDimensions.width, newDimensions.height)
      );
      setWaterDroplets(
        generateWaterDroplets(newDimensions.width, newDimensions.height)
      );
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col pt-20 overflow-hidden bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900"
    >
      {/* Animated Rain Drops */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {rainDrops.map((drop, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-8 bg-blue-400/30 rounded-full"
            initial={{
              y: -50,
              opacity: drop.opacity,
            }}
            animate={{
              y: dimensions.height + 100,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              delay: drop.delay,
              ease: "linear",
            }}
            style={{
              left: `${drop.left}%`,
            }}
          />
        ))}
      </div>

      {/* Animated Water Waves */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1/2 overflow-hidden">
        {/* Wave Layer 1 - Deep Blue */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-full"
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z"
              fill="url(#waveGradient1)"
              opacity="0.8"
            />
            <defs>
              <linearGradient
                id="waveGradient1"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Wave Layer 2 - Medium Blue */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-full"
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0,250 Q300,200 600,250 T1200,250 L1200,400 L0,400 Z"
              fill="url(#waveGradient2)"
              opacity="0.7"
            />
            <defs>
              <linearGradient
                id="waveGradient2"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Wave Layer 3 - Light Blue */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-full"
          animate={{
            x: [0, -80, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0,300 Q300,250 600,300 T1200,300 L1200,400 L0,400 Z"
              fill="url(#waveGradient3)"
              opacity="0.6"
            />
            <defs>
              <linearGradient
                id="waveGradient3"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Floating Debris/Objects */}
      <div className="absolute inset-0 z-15">
        {debrisItems.map((debris, i) => (
          <motion.div
            key={`debris-${i}`}
            className="absolute"
            initial={{
              x: debris.initialX,
              y: debris.initialY,
              rotate: 0,
              opacity: 0.3,
            }}
            animate={{
              y: -100,
              rotate: 360,
              x: debris.animateX,
            }}
            transition={{
              duration: debris.duration,
              repeat: Infinity,
              delay: debris.delay,
              ease: "linear",
            }}
          >
            <div
              className="bg-amber-600/40 rounded"
              style={{
                width: `${debris.size}px`,
                height: `${debris.size}px`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Rescue Boat Animation */}
      <motion.div
        className="absolute bottom-1/3 left-1/4 z-30"
        initial={{ x: -200, opacity: 0 }}
        animate={{
          x: [0, 50, 0],
          y: [0, -10, 0],
        }}
        transition={{
          x: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Boat */}
          <div className="relative w-32 h-20 md:w-40 md:h-24">
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-lg shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-amber-600 rounded-t-sm" />
            </div>
            <LifeBuoy className="absolute top-2 right-2 w-6 h-6 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Rescue Icons */}
      <motion.div
        className="absolute top-1/4 right-1/4 z-25"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/80 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-4 border-white/30">
          <LifeBuoy className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>
      </motion.div>

      {/* Water Droplets Effect */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {waterDroplets.map((droplet, i) => (
          <motion.div
            key={`droplet-${i}`}
            className="absolute"
            initial={{
              y: droplet.initialY,
              x: droplet.initialX,
              scale: 0,
              opacity: 0.6,
            }}
            animate={{
              y: droplet.animateY,
              x: droplet.animateX,
              scale: [0, 1, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: droplet.duration,
              repeat: Infinity,
              delay: droplet.delay,
              ease: "easeInOut",
            }}
          >
            <Droplets className="w-4 h-4 text-blue-400" />
          </motion.div>
        ))}
      </div>

      {/* Lightning Flashes */}
      <div className="absolute inset-0 z-18 pointer-events-none">
        {lightningFlashes.map((flash, i) => (
          <motion.div
            key={`lightning-${i}`}
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, flash.intensity, 0],
            }}
            transition={{
              duration: flash.duration,
              repeat: Infinity,
              delay: flash.delay,
              ease: "easeInOut",
              repeatDelay: flash.repeatDelay,
            }}
          />
        ))}
      </div>

      {/* Lightning Bolts - Main bolts with branches */}
      <div className="absolute inset-0 z-19 pointer-events-none overflow-hidden">
        {lightningFlashes.map((flash, i) => (
          <motion.div
            key={`bolt-${i}`}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: flash.duration * 0.8,
              repeat: Infinity,
              delay: flash.delay,
              ease: "easeInOut",
              repeatDelay: flash.repeatDelay,
            }}
            style={{
              left: `${flash.x}%`,
              top: `${flash.y}%`,
            }}
          >
            <svg
              width="200"
              height="300"
              viewBox="0 0 200 300"
              className="text-yellow-300"
              style={{
                filter:
                  "drop-shadow(0 0 15px rgba(255, 255, 100, 1)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.8))",
              }}
            >
              <defs>
                <filter id={`lightning-glow-${i}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient
                  id={`lightning-gradient-main-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffff00" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffcc" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient
                  id={`lightning-gradient-branch-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffaa" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffcc" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Main lightning bolt - thick white/yellow core */}
              <path
                d={flash.mainPath}
                stroke={`url(#lightning-gradient-main-${i})`}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="1"
                filter={`url(#lightning-glow-${i})`}
              />

              {/* Branch 1 */}
              <path
                d={flash.branch1Path}
                stroke={`url(#lightning-gradient-branch-${i})`}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
                filter={`url(#lightning-glow-${i})`}
              />

              {/* Branch 2 */}
              <path
                d={flash.branch2Path}
                stroke={`url(#lightning-gradient-branch-${i})`}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
                filter={`url(#lightning-glow-${i})`}
              />

              {/* Inner bright core */}
              <path
                d={flash.mainPath}
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="1"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-30 flex-1 flex flex-col justify-end pb-24 md:pb-32">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Waves className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm md:text-base uppercase tracking-wider">
                Cứu hộ khẩn cấp
              </span>
            </motion.div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-sf-ui-display)" }}
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block"
              >
                ResQ Mientrung
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="block text-emerald-400"
              >
                SOS.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="block mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal"
              >
                Khi lũ lụt ập đến,
                <br />
                <span className="text-yellow-300 font-bold">
                  chúng tôi có mặt.
                </span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Stats or Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-6 mb-8"
          >
            <div className="flex items-center gap-2 text-white/90">
              <CloudRain className="w-5 h-5 text-emerald-400" />
              <span className="text-sm md:text-base">24/7 Sẵn sàng cứu hộ</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <LifeBuoy className="w-5 h-5 text-emerald-400" />
              <span className="text-sm md:text-base">
                Mạng lưới cứu hộ rộng khắp
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-30">
        {/* First CTA - Emergency Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          onClick={() => scrollToSection("features")}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-5 md:py-6 font-bold text-lg md:text-xl transition-all duration-300 flex items-center justify-start gap-3 group px-4 md:px-8 lg:px-12 xl:px-16 shadow-2xl"
        >
          <LifeBuoy className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span>Tìm hiểu thêm về chúng tôi</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ml-auto" />
        </motion.button>

        {/* Second CTA - Download App */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          onClick={() => {}}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-5 md:py-6 font-bold text-lg md:text-xl transition-all duration-300 flex items-center justify-start gap-3 px-4 md:px-8 lg:px-12 xl:px-16 shadow-2xl"
        >
          <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>Tải App ngay</span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
