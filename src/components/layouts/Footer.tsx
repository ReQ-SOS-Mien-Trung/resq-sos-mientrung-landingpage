import { FacebookLogo, InstagramLogo, YoutubeLogo, MapPin, Phone, Envelope } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black lg:ml-16">
      {/* Top Border */}
      <div className="h-px bg-black" />

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left - Brand & Contact */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-black/10 p-6 sm:p-8 md:p-12">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4">
              ResQ SOS
              <br />
              <span className="text-black/40">Miền Trung</span>
            </h2>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-xs">
              Nền tảng cứu hộ khẩn cấp - Kết nối nạn nhân thiên tai với đội ngũ cứu trợ.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-black/40" />
              <p className="text-xs sm:text-sm text-black/60">
                123 Đường Trần Phú, TP. Đà Nẵng
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-black/40" />
              <p className="text-xs sm:text-sm text-black/60">1900 1234</p>
            </div>
            <div className="flex items-center gap-3">
              <Envelope className="w-4 h-4 text-black/40" />
              <p className="text-xs sm:text-sm text-black/60">contact@resq.vn</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-8 h-8 border border-black/20 flex items-center justify-center text-black/60 hover:border-[#FF5722] hover:text-[#FF5722] transition-colors"
              aria-label="Facebook"
            >
              <FacebookLogo className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 border border-black/20 flex items-center justify-center text-black/60 hover:border-[#FF5722] hover:text-[#FF5722] transition-colors"
              aria-label="Instagram"
            >
              <InstagramLogo className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 border border-black/20 flex items-center justify-center text-black/60 hover:border-[#FF5722] hover:text-[#FF5722] transition-colors"
              aria-label="YouTube"
            >
              <YoutubeLogo className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right - Links Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {/* Về ResQ */}
            <div className="p-6 sm:p-8 border-b sm:border-b-0 border-r border-black/10">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">Về ResQ</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/about" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/about#mission" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Sứ mệnh
                  </Link>
                </li>
                <li>
                  <Link to="/about#team" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Đội ngũ
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Tin tức
                  </Link>
                </li>
              </ul>
            </div>

            {/* Dịch vụ */}
            <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-black/10">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">Dịch vụ</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/services" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Gửi SOS
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Tìm nơi trú ẩn
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Tiếp tế
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Y tế khẩn cấp
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tham gia */}
            <div className="p-6 sm:p-8 border-r border-black/10">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">Tham gia</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/register" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Tình nguyện viên
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Đối tác
                  </Link>
                </li>
                <li>
                  <Link to="/donate" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Quyên góp
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hỗ trợ */}
            <div className="p-6 sm:p-8">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">Hỗ trợ</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/help-center" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link to="/help-center#guides" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Hướng dẫn
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Điều khoản
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-xs sm:text-sm text-black/50 hover:text-[#FF5722] transition-colors">
                    Bảo mật
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* App Download */}
          <div className="border-t border-black/10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs sm:text-sm text-black/40">Tải ứng dụng ResQ SOS</p>
              <div className="flex items-center gap-3">
                <Link
                  to="/download-app"
                  className="px-4 py-2 border border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                >
                  App Store
                </Link>
                <Link
                  to="/download-app"
                  className="px-4 py-2 border border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                >
                  Google Play
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black">
        <div className="px-6 sm:px-8 md:px-12 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[10px] sm:text-xs text-black/40">
            © {currentYear} ResQ SOS Miền Trung. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/terms-of-service" className="text-[10px] sm:text-xs text-black/40 hover:text-black transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link to="/privacy-policy" className="text-[10px] sm:text-xs text-black/40 hover:text-black transition-colors">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>

      {/* Orange Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </footer>
  );
};

export default Footer;
