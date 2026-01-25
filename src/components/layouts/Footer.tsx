import { Facebook, Instagram, Youtube, Linkedin, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      {/* Upper Section - Light Gray */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 md:gap-12">
            {/* Left Column - Company Info */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">R</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    ResQ Mientrung SOS
                  </span>
                </div>
                <p className="text-gray-700 font-medium text-lg mb-6">
                  Cùng nhau tiến về phía trước
                </p>
              </div>

              {/* Address */}
              <div className="mb-6">
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">
                    123 Đường Trần Phú, Thành phố Đà Nẵng, Việt Nam
                  </p>
                </div>
              </div>

              {/* Follow Us */}
              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-4">
                  Theo dõi chúng tôi để cập nhật!
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {/* About */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">
                  Về chúng tôi
                </h3>
                <ul className="space-y-3">
                  {[
                    "Giới thiệu",
                    "Bên trong ResQ",
                    "Địa điểm",
                    "Bền vững",
                    "Tin tức",
                    "Tài chính",
                    "Tuyển dụng",
                    "Quỹ ResQ",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consumer */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">
                  Người dùng
                </h3>
                <ul className="space-y-3">
                  {[
                    "Hướng dẫn",
                    "Cứu hộ",
                    "Thực phẩm",
                    "Cửa hàng",
                    "Giao hàng",
                    "Dịch vụ tài chính",
                    "ResQ Gia đình",
                    "Tin mới",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Driver/Rescuer */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">
                  Đội cứu hộ
                </h3>
                <ul className="space-y-3">
                  {[
                    "Trung tâm trợ giúp",
                    "Tin mới",
                    "Lái xe với chúng tôi",
                    "Giao hàng",
                    "Dịch vụ tài chính",
                    "Trung tâm cứu hộ",
                    "Học viện ResQ",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Merchant/Partner */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">
                  Đối tác
                </h3>
                <ul className="space-y-3">
                  {[
                    "Trung tâm trợ giúp",
                    "Tin mới",
                    "Hợp tác",
                    "Dịch vụ tài chính",
                    "Tài nguyên",
                    "Giao hàng",
                    "Giải pháp thanh toán",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">
                  Liên kết nhanh
                </h3>
                <ul className="space-y-3">
                  {[
                    "Trung tâm trợ giúp",
                    "Thực đơn",
                    "Developer Portal",
                    "Tech Blog",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Dark Gray */}
      <div className="bg-gray-800 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left - Terms */}
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Điều khoản và Chính sách
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-white transition-colors">
                Thông báo Bảo mật
              </a>
            </div>

            {/* Center - Copyright */}
            <div className="text-sm">
              © ResQ {currentYear - 16} - {currentYear}
            </div>

            {/* Right - App Downloads */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded hover:bg-black/30 transition-colors"
                aria-label="Download on App Store"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-xs font-medium">App Store</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded hover:bg-black/30 transition-colors"
                aria-label="Get it on Google Play"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,14.5L14.54,12.85L17.19,11.19L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <span className="text-xs font-medium">Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
