import { ArrowRight } from "@phosphor-icons/react";
import type { CTABannerProps } from "../../../type";

const CTABanner = ({ onSignUpClick }: CTABannerProps) => {
  return (
    <section className="bg-white text-black">
      {/* Top Border */}
      <div className="h-px bg-black" />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Text Content */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-b lg:border-b-0 lg:border-r border-black/10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
            Trở thành đối tác
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]">
            BẮT ĐẦU HÀNH TRÌNH
            <br />
            NHƯ MỘT ĐỐI TÁC
            <br />
            <span className="text-black/30">CỨU HỘ.</span>
          </h2>
        </div>

        {/* Right - CTA */}
        <div className="bg-black text-white px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 flex flex-col justify-center">
          <p className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8 max-w-md">
            Tham gia cùng hàng trăm tình nguyện viên đang hỗ trợ cộng đồng miền Trung vượt qua thiên tai.
          </p>
          <button
            onClick={onSignUpClick}
            className="px-6 sm:px-8 py-4 bg-[#FF5722] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2 w-fit group"
          >
            Đăng ký ngay
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </section>
  );
};

export default CTABanner;
