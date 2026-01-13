import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

type DriverType = {
  id: string;
  label: string;
};

type BenefitSection = {
  title: string;
  benefits: string[];
  links?: {
    text: string;
    href: string;
  }[];
};

const driverTypes: DriverType[] = [
  { id: "car", label: "Xe ô tô" },
  { id: "taxi", label: "Taxi" },
  { id: "boat", label: "Thuyền" },
  { id: "rescue_team", label: "Đội cứu hộ" },
];

const benefitSections: Record<string, BenefitSection> = {
  car: {
    title: "Giữ cho phương tiện của bạn hoạt động",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và giảm giá nhiên liệu với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Xe ô tô (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Xe ô tô (English)", href: "#" },
    ],
  },
  taxi: {
    title: "Giữ cho đồng hồ của bạn hoạt động",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và giảm giá nhiên liệu với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Taxi (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Taxi (English)", href: "#" },
    ],
  },
  boat: {
    title: "Giữ cho thuyền của bạn sẵn sàng",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và hỗ trợ nhiên liệu với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Thuyền (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Thuyền (English)", href: "#" },
    ],
  },
  rescue_team: {
    title: "Giữ cho đội của bạn sẵn sàng",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và hỗ trợ trang thiết bị với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Đội cứu hộ (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Đội cứu hộ (English)", href: "#" },
    ],
  },
};

const WaysToBePartner = () => {
  const [activeType, setActiveType] = useState("taxi");
  const currentSection = benefitSections[activeType];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-2 md:px-8 lg:px-12">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12"
          style={{ fontFamily: "var(--font-sf-ui-display)" }}
        >
          Cách trở thành đối tác cứu hộ
        </h2>

        {/* Driver Type Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-12">
          {driverTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition-colors ${
                activeType === type.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-gray-900 font-medium text-base md:text-lg mb-6 md:mb-8">
            Lợi ích
          </h3>

          {/* Keep your meter running section */}
          <div className="mb-8 md:mb-12">
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              {currentSection.title}
            </h4>
            <ul className="space-y-3 md:space-y-4 mb-6">
              {currentSection.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gray-900 mt-1">•</span>
                  <span className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {benefit.includes("Chương trình Khách hàng Thân thiết") ? (
                      <>
                        {benefit.split("Chương trình Khách hàng Thân thiết")[0]}
                        <a
                          href="#"
                          className="text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                          Chương trình Khách hàng Thân thiết
                        </a>
                        {benefit.split("Chương trình Khách hàng Thân thiết")[1]}
                      </>
                    ) : (
                      benefit
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {/* Links */}
            {currentSection.links && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Tham gia ngay với chúng tôi:
                </p>
                <div className="flex flex-wrap gap-3">
                  {currentSection.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm md:text-base"
                    >
                      {link.text}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Border Line */}
          <div className="border-t border-gray-200 mb-8 md:mb-12"></div>

          {/* All-in-one app section */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              Ứng dụng đối tác cứu hộ all-in-one
            </h4>
            <ul className="space-y-3 md:space-y-4 mb-6">
              {[
                "Nhận yêu cầu cứu hộ và theo dõi thu nhập của bạn",
                "Rút tiền tức thì vào tài khoản ngân hàng của bạn",
                "Thông tin thu nhập để giúp bạn lập kế hoạch tài chính tốt hơn",
                "Điều hướng trong ứng dụng từ điểm đón đến điểm đến",
                "Hỗ trợ đối tác cứu hộ 24/7 và bộ công cụ an toàn",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gray-900 mt-1">•</span>
                  <span className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-base md:text-lg"
            >
              Khám phá ứng dụng ResQ Đối tác Cứu hộ
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaysToBePartner;
