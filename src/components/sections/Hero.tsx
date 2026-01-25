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
import { useNavigate } from "react-router-dom";

type StickPersonProps = {
  src: string;
  alt: string;
  /** Tailwind size classes, e.g. "w-16 h-16 md:w-20 md:h-20" */
  sizeClassName: string;
  /** Optional extra classes for the face container (borders/rings/bg) */
  faceClassName?: string;
  /** Show/hide stick body under the face */
  showBody?: boolean;
  /** Body color classes for stick parts */
  bodyColorClassName?: string;
  /** Scale the body relative to the face */
  bodyScaleClassName?: string;
};

const StickPerson = ({
  src,
  alt,
  sizeClassName,
  faceClassName = "",
  showBody = true,
  bodyColorClassName = "bg-white/85",
  bodyScaleClassName = "scale-100",
}: StickPersonProps) => {
  return (
    <div className={`relative flex flex-col items-center ${bodyScaleClassName}`}>
      {/* Face (cropped from the real photo) */}
      <div
        className={`rounded-full overflow-hidden ${sizeClassName} ${faceClassName}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Stick body */}
      {showBody && (
        <div className="relative -mt-1 flex flex-col items-center pointer-events-none">
          {/* Neck */}
          <div className={`w-1 h-2 rounded-full ${bodyColorClassName}`} />

          {/* Torso */}
          <div className={`w-1 h-8 rounded-full ${bodyColorClassName}`} />

          {/* Arms (1 tay mỗi bên) */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-4">
            <div
              className={`absolute left-0 top-1 w-6 h-1 rounded-full ${bodyColorClassName} -rotate-25`}
            />
            <div
              className={`absolute right-0 top-1 w-6 h-1 rounded-full ${bodyColorClassName} rotate-25`}
            />
          </div>

          {/* Legs (1 chân mỗi bên) */}
          <div className="relative mt-1 w-10 h-6">
            <div
              className={`absolute left-1 top-0 w-6 h-1 rounded-full ${bodyColorClassName} -rotate-35`}
            />
            <div
              className={`absolute right-1 top-0 w-6 h-1 rounded-full ${bodyColorClassName} rotate-35`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

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
  const navigate = useNavigate();
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
          className="absolute bottom-0 h-full"
          style={{ width: "300%" }}
          animate={{
            x: [0, "-66.666%"],
            opacity: [0.75, 0.85, 0.75],
          }}
          transition={{
            x: {
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 3600 400"
            preserveAspectRatio="none"
          >
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
            {/* Pattern repeats 3 times for seamless loop */}
            <motion.path
              fill="url(#waveGradient1)"
              opacity="0.8"
              d="M0,200 Q150,140 300,180 Q450,160 600,200 Q750,180 900,190 Q1050,200 1200,200 L1200,400 L0,400 Z"
              animate={{
                d: [
                  "M0,200 Q150,140 300,180 Q450,160 600,200 Q750,180 900,190 Q1050,200 1200,200 L1200,400 L0,400 Z",
                  "M0,200 Q150,160 300,200 Q450,180 600,220 Q750,200 900,210 Q1050,220 1200,200 L1200,400 L0,400 Z",
                  "M0,200 Q150,140 300,180 Q450,160 600,200 Q750,180 900,190 Q1050,200 1200,200 L1200,400 L0,400 Z",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient1)"
              opacity="0.8"
              d="M1200,200 Q1350,140 1500,180 Q1650,160 1800,200 Q1950,180 2100,190 Q2250,200 2400,200 L2400,400 L1200,400 Z"
              animate={{
                d: [
                  "M1200,200 Q1350,140 1500,180 Q1650,160 1800,200 Q1950,180 2100,190 Q2250,200 2400,200 L2400,400 L1200,400 Z",
                  "M1200,200 Q1350,160 1500,200 Q1650,180 1800,220 Q1950,200 2100,210 Q2250,220 2400,200 L2400,400 L1200,400 Z",
                  "M1200,200 Q1350,140 1500,180 Q1650,160 1800,200 Q1950,180 2100,190 Q2250,200 2400,200 L2400,400 L1200,400 Z",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient1)"
              opacity="0.8"
              d="M2400,200 Q2550,140 2700,180 Q2850,160 3000,200 Q3150,180 3300,190 Q3450,200 3600,200 L3600,400 L2400,400 Z"
              animate={{
                d: [
                  "M2400,200 Q2550,140 2700,180 Q2850,160 3000,200 Q3150,180 3300,190 Q3450,200 3600,200 L3600,400 L2400,400 Z",
                  "M2400,200 Q2550,160 2700,200 Q2850,180 3000,220 Q3150,200 3300,210 Q3450,220 3600,200 L3600,400 L2400,400 Z",
                  "M2400,200 Q2550,140 2700,180 Q2850,160 3000,200 Q3150,180 3300,190 Q3450,200 3600,200 L3600,400 L2400,400 Z",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* Wave Layer 2 - Medium Blue */}
        <motion.div
          className="absolute bottom-0 h-full"
          style={{ width: "300%" }}
          animate={{
            x: [0, "-66.666%"],
            opacity: [0.65, 0.75, 0.65],
          }}
          transition={{
            x: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 3600 400"
            preserveAspectRatio="none"
          >
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
            <motion.path
              fill="url(#waveGradient2)"
              opacity="0.7"
              d="M0,250 Q200,200 400,240 Q600,220 800,250 Q1000,240 1200,250 L1200,400 L0,400 Z"
              animate={{
                d: [
                  "M0,250 Q200,200 400,240 Q600,220 800,250 Q1000,240 1200,250 L1200,400 L0,400 Z",
                  "M0,250 Q200,220 400,260 Q600,240 800,270 Q1000,260 1200,250 L1200,400 L0,400 Z",
                  "M0,250 Q200,200 400,240 Q600,220 800,250 Q1000,240 1200,250 L1200,400 L0,400 Z",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient2)"
              opacity="0.7"
              d="M1200,250 Q1400,200 1600,240 Q1800,220 2000,250 Q2200,240 2400,250 L2400,400 L1200,400 Z"
              animate={{
                d: [
                  "M1200,250 Q1400,200 1600,240 Q1800,220 2000,250 Q2200,240 2400,250 L2400,400 L1200,400 Z",
                  "M1200,250 Q1400,220 1600,260 Q1800,240 2000,270 Q2200,260 2400,250 L2400,400 L1200,400 Z",
                  "M1200,250 Q1400,200 1600,240 Q1800,220 2000,250 Q2200,240 2400,250 L2400,400 L1200,400 Z",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient2)"
              opacity="0.7"
              d="M2400,250 Q2600,200 2800,240 Q3000,220 3200,250 Q3400,240 3600,250 L3600,400 L2400,400 Z"
              animate={{
                d: [
                  "M2400,250 Q2600,200 2800,240 Q3000,220 3200,250 Q3400,240 3600,250 L3600,400 L2400,400 Z",
                  "M2400,250 Q2600,220 2800,260 Q3000,240 3200,270 Q3400,260 3600,250 L3600,400 L2400,400 Z",
                  "M2400,250 Q2600,200 2800,240 Q3000,220 3200,250 Q3400,240 3600,250 L3600,400 L2400,400 Z",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* Wave Layer 3 - Light Blue */}
        <motion.div
          className="absolute bottom-0 h-full"
          style={{ width: "300%" }}
          animate={{
            x: [0, "-66.666%"],
            opacity: [0.55, 0.65, 0.55],
          }}
          transition={{
            x: {
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 3600 400"
            preserveAspectRatio="none"
          >
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
            <motion.path
              fill="url(#waveGradient3)"
              opacity="0.6"
              d="M0,300 Q120,260 240,280 Q360,270 480,290 Q600,280 720,295 Q840,290 960,300 Q1080,295 1200,300 L1200,400 L0,400 Z"
              animate={{
                d: [
                  "M0,300 Q120,260 240,280 Q360,270 480,290 Q600,280 720,295 Q840,290 960,300 Q1080,295 1200,300 L1200,400 L0,400 Z",
                  "M0,300 Q120,280 240,300 Q360,290 480,310 Q600,300 720,315 Q840,310 960,320 Q1080,315 1200,300 L1200,400 L0,400 Z",
                  "M0,300 Q120,260 240,280 Q360,270 480,290 Q600,280 720,295 Q840,290 960,300 Q1080,295 1200,300 L1200,400 L0,400 Z",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient3)"
              opacity="0.6"
              d="M1200,300 Q1320,260 1440,280 Q1560,270 1680,290 Q1800,280 1920,295 Q2040,290 2160,300 Q2280,295 2400,300 L2400,400 L1200,400 Z"
              animate={{
                d: [
                  "M1200,300 Q1320,260 1440,280 Q1560,270 1680,290 Q1800,280 1920,295 Q2040,290 2160,300 Q2280,295 2400,300 L2400,400 L1200,400 Z",
                  "M1200,300 Q1320,280 1440,300 Q1560,290 1680,310 Q1800,300 1920,315 Q2040,310 2160,320 Q2280,315 2400,300 L2400,400 L1200,400 Z",
                  "M1200,300 Q1320,260 1440,280 Q1560,270 1680,290 Q1800,280 1920,295 Q2040,290 2160,300 Q2280,295 2400,300 L2400,400 L1200,400 Z",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient3)"
              opacity="0.6"
              d="M2400,300 Q2520,260 2640,280 Q2760,270 2880,290 Q3000,280 3120,295 Q3240,290 3360,300 Q3480,295 3600,300 L3600,400 L2400,400 Z"
              animate={{
                d: [
                  "M2400,300 Q2520,260 2640,280 Q2760,270 2880,290 Q3000,280 3120,295 Q3240,290 3360,300 Q3480,295 3600,300 L3600,400 L2400,400 Z",
                  "M2400,300 Q2520,280 2640,300 Q2760,290 2880,310 Q3000,300 3120,315 Q3240,310 3360,320 Q3480,315 3600,300 L3600,400 L2400,400 Z",
                  "M2400,300 Q2520,260 2640,280 Q2760,270 2880,290 Q3000,280 3120,295 Q3240,290 3360,300 Q3480,295 3600,300 L3600,400 L2400,400 Z",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* Wave Layer 4 - Additional depth layer */}
        <motion.div
          className="absolute bottom-0 h-full"
          style={{ width: "300%" }}
          animate={{
            x: [0, "-66.666%"],
            opacity: [0.4, 0.5, 0.4],
          }}
          transition={{
            x: {
              duration: 16,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 3600 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="waveGradient4"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <motion.path
              fill="url(#waveGradient4)"
              opacity="0.5"
              d="M0,320 Q100,300 200,310 Q300,305 400,315 Q500,310 600,320 Q700,315 800,325 Q900,320 1000,330 Q1100,325 1200,320 L1200,400 L0,400 Z"
              animate={{
                d: [
                  "M0,320 Q100,300 200,310 Q300,305 400,315 Q500,310 600,320 Q700,315 800,325 Q900,320 1000,330 Q1100,325 1200,320 L1200,400 L0,400 Z",
                  "M0,320 Q100,310 200,320 Q300,315 400,325 Q500,320 600,330 Q700,325 800,335 Q900,330 1000,340 Q1100,335 1200,320 L1200,400 L0,400 Z",
                  "M0,320 Q100,300 200,310 Q300,305 400,315 Q500,310 600,320 Q700,315 800,325 Q900,320 1000,330 Q1100,325 1200,320 L1200,400 L0,400 Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient4)"
              opacity="0.5"
              d="M1200,320 Q1300,300 1400,310 Q1500,305 1600,315 Q1700,310 1800,320 Q1900,315 2000,325 Q2100,320 2200,330 Q2300,325 2400,320 L2400,400 L1200,400 Z"
              animate={{
                d: [
                  "M1200,320 Q1300,300 1400,310 Q1500,305 1600,315 Q1700,310 1800,320 Q1900,315 2000,325 Q2100,320 2200,330 Q2300,325 2400,320 L2400,400 L1200,400 Z",
                  "M1200,320 Q1300,310 1400,320 Q1500,315 1600,325 Q1700,320 1800,330 Q1900,325 2000,335 Q2100,330 2200,340 Q2300,335 2400,320 L2400,400 L1200,400 Z",
                  "M1200,320 Q1300,300 1400,310 Q1500,305 1600,315 Q1700,310 1800,320 Q1900,315 2000,325 Q2100,320 2200,330 Q2300,325 2400,320 L2400,400 L1200,400 Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              fill="url(#waveGradient4)"
              opacity="0.5"
              d="M2400,320 Q2500,300 2600,310 Q2700,305 2800,315 Q2900,310 3000,320 Q3100,315 3200,325 Q3300,320 3400,330 Q3500,325 3600,320 L3600,400 L2400,400 Z"
              animate={{
                d: [
                  "M2400,320 Q2500,300 2600,310 Q2700,305 2800,315 Q2900,310 3000,320 Q3100,315 3200,325 Q3300,320 3400,330 Q3500,325 3600,320 L3600,400 L2400,400 Z",
                  "M2400,320 Q2500,310 2600,320 Q2700,315 2800,325 Q2900,320 3000,330 Q3100,325 3200,335 Q3300,330 3400,340 Q3500,335 3600,320 L3600,400 L2400,400 Z",
                  "M2400,320 Q2500,300 2600,310 Q2700,305 2800,315 Q2900,310 3000,320 Q3100,315 3200,325 Q3300,320 3400,330 Q3500,325 3600,320 L3600,400 L2400,400 Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
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

      {/* Rescue Boat with 2 Rescuers */}
      <motion.div
        className="absolute bottom-[22%] left-1/2 z-[28]"
        style={{ x: "-50%" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, 2, -2, 0],
          opacity: 1,
        }}
        transition={{
          y: {
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 1,
            delay: 0.5,
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
          <div className="relative w-56 h-32 md:w-64 md:h-36">
            {/* Boat hull - more realistic shape */}
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
            >
              {/* Main hull */}
              <path
                d="M 0 80 Q 20 60 40 70 Q 60 75 80 72 Q 100 70 120 72 Q 140 75 160 70 Q 180 60 200 80 L 200 100 L 0 100 Z"
                fill="url(#boatGradient)"
                className="drop-shadow-2xl"
              />
              {/* Inner hull line for depth */}
              <path
                d="M 10 85 Q 30 68 50 75 Q 70 78 90 76 Q 110 73 130 76 Q 150 78 170 75 Q 190 68 200 85"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="1"
                fill="none"
              />
              <defs>
                <linearGradient id="boatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#b45309" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#92400e" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Boat interior/deck */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-600/80 to-amber-700/90 rounded-t-xl border-t-2 border-amber-800/50">
              {/* Deck planks */}
              <div className="absolute top-0 left-0 right-0 h-full flex flex-col gap-0.5 opacity-30">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-0.5 bg-amber-900/40"
                    style={{ width: `${100 - i * 5}%`, marginLeft: `${i * 2.5}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Bow (front) of boat */}
            <div className="absolute bottom-12 left-0 w-8 h-6 bg-gradient-to-r from-amber-800 to-amber-700 rounded-r-full border-r-2 border-amber-900/50" />

            {/* Stern (back) of boat */}
            <div className="absolute bottom-12 right-0 w-6 h-6 bg-gradient-to-l from-amber-800 to-amber-700 rounded-l-full border-l-2 border-amber-900/50" />

            {/* Life buoy on side */}
            <div className="absolute top-1 right-2">
              <LifeBuoy className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
            </div>

            {/* Rescuer 1 - Left side */}
            <motion.div
              className="absolute -top-5 left-3 md:left-4"
              animate={{
                y: [0, -3, 0],
                rotate: [0, 1.5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
              }}
            >
              <div className="relative">
                {/* Rescuer (face + stick body) */}
                <StickPerson
                  src="/images/cuong.jpg"
                  alt="Rescuer 1"
                  sizeClassName="w-16 h-16 md:w-20 md:h-20"
                  faceClassName="border-[3px] border-white shadow-xl bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-emerald-400/50"
                  bodyColorClassName="bg-white/85"
                />
                {/* Paddle - đặt sát tay phải người chèo */}
                <motion.div
                  className="absolute -right-1 top-[60%] transform -translate-y-1/2 origin-top"
                  animate={{
                    rotate: [-20, 20, -20],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                  }}
                >
                  {/* Paddle handle */}
                  <div className="w-0.5 h-12 bg-amber-900 rounded-full shadow-md" />
                  {/* Paddle blade */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-b from-amber-700 to-amber-800 rounded-sm shadow-lg" />
                </motion.div>
              </div>
            </motion.div>

            {/* Rescuer 2 - Right side */}
            <motion.div
              className="absolute -top-5 right-3 md:right-4"
              animate={{
                y: [0, -3, 0],
                rotate: [0, -1.5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
                delay: 0.5,
              }}
            >
              <div className="relative">
                {/* Rescuer (face + stick body) */}
                <StickPerson
                  src="/images/thao.jpg"
                  alt="Rescuer 2"
                  sizeClassName="w-16 h-16 md:w-20 md:h-20"
                  faceClassName="border-[3px] border-white shadow-xl bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-emerald-400/50"
                  bodyColorClassName="bg-white/85"
                />
                {/* Paddle - đặt sát tay trái người chèo */}
                <motion.div
                  className="absolute -left-1 top-[60%] transform -translate-y-1/2 origin-top"
                  animate={{
                    rotate: [20, -20, 20],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                    delay: 0.9,
                  }}
                >
                  {/* Paddle handle */}
                  <div className="w-0.5 h-10 bg-amber-900 rounded-full shadow-md" />
                  {/* Paddle blade */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-b from-amber-700 to-amber-800 rounded-sm shadow-lg" />
                </motion.div>
              </div>
            </motion.div>

            {/* Water splash effect around boat */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-blue-400/30 rounded-full blur-sm" />
          </div>
        </motion.div>
      </motion.div>

      {/* Victim 1 - Floating in water */}
      <motion.div
        className="absolute bottom-[25%] right-[30%] z-[28]"
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: [0, 30, 0],
          y: [0, 15, 0],
          rotate: [0, 5, -5, 0],
          opacity: 1,
        }}
        transition={{
          x: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 1,
            delay: 0.7,
          },
        }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Avatar placeholder */}
          <div className="relative z-10">
            <StickPerson
              src="/images/chu.jpg"
              alt="Victim 1"
              sizeClassName="w-16 h-16 md:w-20 md:h-20"
              faceClassName="border-4 border-white shadow-2xl bg-gradient-to-br from-slate-400 to-slate-600 ring-4 ring-yellow-300/30"
              bodyColorClassName="bg-white/80"
              bodyScaleClassName="scale-90 md:scale-95"
            />
          </div>
          {/* Life jacket indicator */}
          <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-10 md:w-28 md:h-12 bg-orange-500 rounded-full border-2 border-white shadow-lg z-0"></div>
          {/* Help signal */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Victim 2 - Floating in water */}
      <motion.div
        className="absolute bottom-[20%] left-[30%] z-[28]"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0],
          opacity: 1,
        }}
        transition={{
          x: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 1,
            delay: 0.9,
          },
        }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {/* Avatar placeholder */}
          <div className="relative z-10">
            <StickPerson
              src="/images/an.png"
              alt="Victim 2"
              sizeClassName="w-16 h-16 md:w-20 md:h-20"
              faceClassName="border-4 border-white shadow-2xl bg-gradient-to-br from-slate-400 to-slate-600 ring-4 ring-yellow-300/30"
              bodyColorClassName="bg-white/80"
              bodyScaleClassName="scale-90 md:scale-95"
            />
          </div>
          {/* Life jacket indicator */}
          <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-10 md:w-28 md:h-12 bg-orange-500 rounded-full border-2 border-white shadow-lg z-0"></div>
          {/* Help signal */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rescue Helicopter */}
      <motion.div
        className="absolute top-[15%] right-[15%] z-[28]"
        initial={{ opacity: 0, y: -50 }}
        animate={{
          y: [0, -15, 0],
          opacity: 1,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 1,
            delay: 1,
          },
        }}
      >
        <div className="relative">
          {/* Main rotor - with motion blur effect (để z thấp hơn người trong buồng lái) */}
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Rotor hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600 z-20" />

            {/* Rotor blades with blur effect */}
            <div className="relative w-32 h-1 md:w-40 md:h-1.5">
              {/* Blade 1 */}
              <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-r from-transparent via-gray-200/80 to-gray-300/90 rounded-full transform -translate-y-1/2 blur-[0.5px]" />
              {/* Blade 2 */}
              <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-transparent via-gray-200/80 to-gray-300/90 rounded-full transform -translate-y-1/2 -translate-x-1/2 rotate-90 blur-[0.5px]" />
              {/* Blade 3 */}
              <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-transparent via-gray-200/80 to-gray-300/90 rounded-full transform -translate-y-1/2 -translate-x-1/2 rotate-45 blur-[0.5px]" />
              {/* Blade 4 */}
              <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-transparent via-gray-200/80 to-gray-300/90 rounded-full transform -translate-y-1/2 -translate-x-1/2 -rotate-45 blur-[0.5px]" />
            </div>
          </motion.div>

          {/* Helicopter body - more realistic shape */}
          <div className="relative w-36 h-20 md:w-44 md:h-24" style={{ height: '5.5rem' }}>
            {/* Main fuselage */}
            <div className="relative w-full h-full bg-gradient-to-b from-slate-700 via-gray-800 to-slate-900 rounded-xl shadow-2xl border-2 border-gray-700/80">
              {/* Top curve for realistic helicopter shape */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-slate-600 to-transparent rounded-t-xl" />

              {/* Side panels with depth */}
              <div className="absolute top-2 left-0 w-1 h-full bg-gray-900/50" />
              <div className="absolute top-2 right-0 w-1 h-full bg-gray-900/50" />

              {/* Cockpit window - more realistic */}
              <div className="absolute top-1 left-1 right-1 h-9 bg-gradient-to-b from-sky-900/60 via-blue-800/50 to-blue-900/40 rounded-t-xl border border-blue-400/40 shadow-inner">
                {/* Window frame */}
                <div className="absolute inset-0 border-2 border-blue-300/30 rounded-t-xl" />
                {/* Window reflection */}
                <div className="absolute top-1 left-2 w-8 h-2 bg-white/20 rounded-full blur-sm" />
                {/* Rescuer in cockpit (face + tiny stick body) */}
                <div className="absolute top-[120%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <StickPerson
                    src="/images/khoa.jpg"
                    alt="Helicopter Rescuer"
                    sizeClassName="w-10 h-10 md:w-12 md:h-12"
                    faceClassName="border-2 border-white shadow-xl bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-emerald-400/50"
                    bodyColorClassName="bg-white/80"
                    bodyScaleClassName="scale-90 md:scale-95"
                  />
                </div>
              </div>

              {/* Side windows */}
              <div className="absolute top-4 left-2 w-3 h-4 bg-blue-900/50 rounded border border-blue-400/30" />
              <div className="absolute top-4 right-2 w-3 h-4 bg-blue-900/50 rounded border border-blue-400/30" />

              {/* Door/panel lines */}
              <div className="absolute top-10 left-3 right-3 h-0.5 bg-gray-700/50" />
              <div className="absolute top-14 left-3 right-3 h-0.5 bg-gray-700/50" />
            </div>

            {/* Tail boom - more realistic */}
            <div className="absolute top-6 -right-8 w-16 h-2.5 bg-gradient-to-r from-gray-800 via-slate-800 to-gray-900 rounded-r-full border-r-2 border-gray-700 shadow-lg">
              {/* Tail rotor */}
              <motion.div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="relative w-3 h-0.5">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300/70 rounded-full transform -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gray-300/70 rounded-full transform -translate-y-1/2 -translate-x-1/2 rotate-90" />
                </div>
              </motion.div>
            </div>

            {/* Landing skids - more realistic */}
            <div className="absolute -bottom-3 left-0 right-0 h-3 flex justify-between items-end">
              {/* Left skid */}
              <div className="relative">
                {/* Vertical support */}
                <div className="absolute bottom-0 left-2 w-1 h-3 bg-gray-600 rounded-t" />
                {/* Horizontal skid */}
                <div className="w-10 h-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full shadow-md" />
              </div>
              {/* Right skid */}
              <div className="relative">
                {/* Vertical support */}
                <div className="absolute bottom-0 right-2 w-1 h-3 bg-gray-600 rounded-t" />
                {/* Horizontal skid */}
                <div className="w-10 h-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full shadow-md" />
              </div>
            </div>

            {/* Rescue equipment/antenna */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gray-600 rounded-full" />
          </div>

          {/* Rescue rope/cable */}
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 origin-top shadow-lg"
            initial={{ height: 0 }}
            animate={{
              height: [0, 150, 150],
            }}
            transition={{
              height: {
                duration: 2,
                delay: 1.5,
                ease: "easeOut",
              },
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                x: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3.5,
              }}
            />
          </motion.div>

          {/* Rescue hook at end of rope */}
          <motion.div
            className="absolute top-[calc(100%+150px)] left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1],
              y: [10, 0],
            }}
            transition={{
              opacity: {
                duration: 0.5,
                delay: 3.5,
              },
              y: {
                duration: 0.5,
                delay: 3.5,
              },
            }}
          >
            <div className="relative w-7 h-9 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg border-2 border-gray-800 shadow-xl">
              {/* Hook opening */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-5 h-3 border-2 border-gray-800 rounded-t-full border-b-0" />
              {/* Hook point */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gray-800 rounded-full" />
              {/* Attachment ring */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-yellow-400 rounded-full bg-gray-800" />
            </div>
          </motion.div>
        </div>
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
          <span>Khám phá ứng dụng ResQ SOS miền Trung</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ml-auto" />
        </motion.button>

        {/* Second CTA - Download App */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          onClick={() => navigate("/download-app")}
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
