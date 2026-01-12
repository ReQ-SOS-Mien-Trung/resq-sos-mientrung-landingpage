import { Phone, Mail, ExternalLink, QrCode } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">ResQ Mientrung SOS</h3>
            <p className="text-gray-400 leading-relaxed">
              Hệ thống điều phối cứu hộ thông minh sử dụng AI để kết nối nạn nhân với đội cứu hộ trong thời gian thực.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary-red" />
                <a
                  href="tel:19001234"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Hotline: 1900-1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-blue" />
                <a
                  href="mailto:support@resq-sos.vn"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  support@resq-sos.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* App Download */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <QrCode className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-white font-semibold mb-1">Tải ứng dụng</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    App Store
                  </a>
                  <span className="text-gray-600">|</span>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google Play
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 ResQ Mientrung SOS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
