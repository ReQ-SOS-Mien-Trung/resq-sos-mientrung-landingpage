import { Download, ArrowRight, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col pt-20 overflow-hidden"
    >
      {/* Background Image Scene */}
      <div className="absolute inset-0 z-0">
        {/* Background with realistic scene elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 via-transparent to-emerald-500/50" />

          {/* Scene elements - simulating rescue scene */}
          <div className="absolute inset-0">
            {/* Left side - Building/Wall */}
            <div className="absolute left-0 bottom-0 w-1/3 h-2/3 bg-gradient-to-t from-amber-800/40 to-amber-700/20">
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-amber-900/30" />
            </div>

            {/* Center - People/Rescue scene representation */}
            <div className="absolute bottom-0 left-1/3 right-1/3 h-3/4 flex items-end justify-center">
              {/* Rescuer representation */}
              <div className="relative mb-8">
                {/* Helmet */}
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/30">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                {/* Uniform */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-emerald-600/80 rounded-b-lg" />
              </div>

              {/* Person being rescued */}
              <div className="relative ml-8 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-xl flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Right side - Nature/Greenery */}
            <div className="absolute right-0 bottom-0 w-1/3 h-2/3">
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-emerald-600/40 to-transparent">
                {/* Trees/bushes representation */}
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-700/50 rounded-full blur-xl" />
                <div className="absolute bottom-32 right-20 w-24 h-24 bg-emerald-600/40 rounded-full blur-lg" />
              </div>
            </div>

            {/* Foreground elements */}
            <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-amber-700/30 rounded-lg transform rotate-12" />
            <div className="absolute bottom-8 right-1/4 w-12 h-12 bg-blue-500/30 rounded-lg transform -rotate-12" />
          </div>

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>
      </div>

      {/* Text Overlay - Bottom Left */}
      <div className="relative z-10 flex-1 flex items-end pb-24 md:pb-28 lg:pb-32">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight mb-2"
              style={{ fontFamily: "var(--font-sf-ui-display)" }}
            >
              ResQ Mientrung SOS.
              <br />
              <span className="block mt-2">Làm cho mỗi</span>
              <span className="text-yellow-300">ngày tốt hơn.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* CTA Bars - Aligned Left with Text */}
      <div className="relative z-20">
        {/* First CTA Bar - Dark Green */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => scrollToSection("features")}
          className="w-full bg-[#0D7377] hover:bg-[#0a5d61] text-white py-5 md:py-6 font-semibold text-lg md:text-xl transition-all duration-300 flex items-center justify-start gap-3 group px-4 md:px-8 lg:px-12 xl:px-16"
        >
          <span>Tìm hiểu thêm về chúng tôi</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Second CTA Bar - Bright Green */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => {}}
          className="w-full bg-[#14B8A6] hover:bg-[#0d9488] text-white py-5 md:py-6 font-semibold text-lg md:text-xl transition-all duration-300 flex items-center justify-start gap-3 px-4 md:px-8 lg:px-12 xl:px-16"
        >
          <Download className="w-5 h-5" />
          <span>Tải App</span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
