import { Download } from "lucide-react";
import { motion } from "framer-motion";

const RegisterHero = () => {
  return (
    <section className="min-h-screen flex pb-16 md:pb-20">
      {/* Left Section - Text Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <p className="text-gray-600 text-sm md:text-base mb-2 font-medium">
            Đội cứu hộ
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
            style={{ fontFamily: "var(--font-sf-ui-display)" }}
          >
            Trở thành đối tác cứu hộ của ResQ
          </h1>
          <button className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-lg font-semibold text-base md:text-lg transition-colors shadow-lg hover:shadow-xl">
            <Download className="w-5 h-5" />
            <span>Tải ứng dụng ResQ</span>
          </button>
        </motion.div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="/images/hero_registered.jpg"
          alt="ResQ rescuer partner"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default RegisterHero;
