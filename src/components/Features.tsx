import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, WifiOff } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Phân loại Priority',
      description:
        'Tự động phát hiện P1 (Nguy hiểm tính mạng) vs P3 (Cần nhu yếu phẩm)',
      color: 'text-primary-red',
      bgColor: 'bg-red-50',
    },
    {
      icon: MapPin,
      title: 'Bản đồ Thời gian thực',
      description: 'Theo dõi trực tiếp vị trí các đội cứu hộ trên bản đồ',
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
    },
    {
      icon: WifiOff,
      title: 'Hoạt động Offline',
      description: 'Các tính năng cơ bản hoạt động với kết nối internet không ổn định',
      color: 'text-primary-teal',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Công nghệ tiên tiến phục vụ cứu hộ khẩn cấp
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
