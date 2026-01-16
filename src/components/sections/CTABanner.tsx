import { ArrowRight } from "lucide-react";

type CTABannerProps = {
  onSignUpClick: () => void;
};

const CTABanner = ({ onSignUpClick }: CTABannerProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Top Section - Light Green (2/3) */}
      <div className="bg-emerald-400 py-12 md:py-16 lg:py-20 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left - Small Text */}
            <p className="text-gray-700 font-medium text-sm md:text-base">
              Trở thành đối tác của chúng tôi
            </p>

            {/* Right - Main Headline */}
            <div className="flex-1 text-right">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-sf-ui-display)" }}
              >
                Bắt đầu hành trình của bạn
                <br />
                như một đối tác cứu hộ.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Dark Green (1/3) with Sign Up Button */}
      <div className="bg-emerald-600 py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex justify-start">
            <button
              onClick={onSignUpClick}
              className="bg-white text-emerald-600 font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              Đăng ký
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
