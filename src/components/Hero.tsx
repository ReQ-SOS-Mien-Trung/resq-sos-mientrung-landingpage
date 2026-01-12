import { Download, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-20"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              ResQ Mientrung SOS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-red to-primary-orange mt-2">
                Kết nối Cứu hộ Thông minh bằng AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Hệ thống điều phối khẩn cấp sử dụng Google Gemini để phân tích tin nhắn
              và định vị nạn nhân thời gian thực.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {}}
                className="bg-primary-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Tải App (Người dân)
              </button>
              <button
                onClick={() => scrollToSection('register')}
                className="bg-primary-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Đăng ký Đội cứu hộ
              </button>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-primary-blue/20 to-primary-teal/20 rounded-2xl p-8 flex items-center justify-center">
              {/* Abstract Map Visualization */}
              <div className="relative w-full h-full">
                {/* Connection Points */}
                <motion.div
                  className="absolute top-10 left-10 w-4 h-4 bg-primary-red rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute top-32 right-20 w-4 h-4 bg-primary-orange rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-20 left-32 w-4 h-4 bg-primary-blue rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-32 right-16 w-4 h-4 bg-primary-teal rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.5,
                    ease: 'easeInOut',
                  }}
                />

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.line
                    x1="10%"
                    y1="10%"
                    x2="60%"
                    y2="30%"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                  <motion.line
                    x1="20%"
                    y1="70%"
                    x2="80%"
                    y2="80%"
                    stroke="#0284C7"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                </svg>

                {/* Center Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-red to-primary-orange rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
