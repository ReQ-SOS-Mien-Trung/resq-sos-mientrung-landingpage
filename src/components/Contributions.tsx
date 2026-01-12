import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

type ContributionCard = {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
};

const contributions: ContributionCard[] = [
  {
    id: 1,
    image: "/images/rescuer_flood.jpg",
    title: "Tác động của ResQ Mientrung SOS đến cộng đồng",
    description:
      "Dịch vụ cứu hộ và hỗ trợ khẩn cấp của ResQ đã hỗ trợ hơn 50,000 trường hợp khẩn cấp tại miền Trung trong năm 2024, tạo ra hơn 5,000 cơ hội việc làm cho các nhân viên cứu hộ và tình nguyện viên, đồng thời góp phần nâng cao nhận thức về an toàn và ứng phó khẩn cấp trong cộng đồng.",
    link: "#",
  },
  {
    id: 2,
    image: "/images/noodle_flood.jpg",
    title: "ResQ ra mắt Trung tâm Đào tạo Cứu hộ và Ứng phó Khẩn cấp",
    description:
      "ResQ chính thức khai trương Trung tâm Đào tạo Cứu hộ và Ứng phó Khẩn cấp đầu tiên với sự hỗ trợ từ các tổ chức địa phương. Trung tâm nhằm mục tiêu đẩy nhanh các giải pháp cứu hộ hiện đại, nâng cao khả năng ứng phó khẩn cấp, và đóng góp vào việc xây dựng cộng đồng an toàn hơn tại miền Trung Việt Nam.",
    link: "#",
  },
  {
    id: 3,
    image: "/images/ghe_flood.jpg",
    title:
      "ResQ Mientrung SOS đạt chứng nhận An toàn Thông tin và Bảo mật Dữ liệu",
    description:
      "ResQ Mientrung SOS đã được chính thức công nhận đạt tiêu chuẩn An toàn Thông tin và Bảo mật Dữ liệu. Chứng nhận này phản ánh cam kết của ResQ trong việc tăng cường niềm tin số và đảm bảo dữ liệu cá nhân luôn được bảo vệ an toàn cho tất cả người dùng trên nền tảng.",
    link: "#",
  },
];

type ContributionCardProps = {
  contribution: ContributionCard;
};

const ContributionCard = ({ contribution }: ContributionCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="w-full aspect-square relative overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={contribution.image}
            alt={contribution.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
            <div className="text-center p-8">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <ImageIcon className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <p className="text-gray-600 text-xs md:text-sm">
                Hình ảnh minh họa
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {contribution.title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-1">
          {contribution.description}
        </p>
        <a
          href={contribution.link}
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
        >
          Tìm hiểu thêm
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const Contributions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = contributions.length - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = contributions.length - 1;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-sf-ui-display)" }}
        >
          Đóng góp của ResQ Mientrung SOS
        </h2>

        <div className="relative">
          {/* Navigation Arrows - Only show on mobile */}
          <button
            onClick={prevSlide}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-8 md:px-12">
            {/* Mobile: Single card carousel */}
            <div className="md:hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className="min-w-full px-2 shrink-0"
                  >
                    <ContributionCard contribution={contribution} />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid with 3 cards visible */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {contributions.map((contribution) => (
                <ContributionCard
                  key={contribution.id}
                  contribution={contribution}
                />
              ))}
            </div>
          </div>

          {/* Dots Indicator - Only show on mobile */}
          <div className="md:hidden flex justify-center gap-2 mt-8">
            {contributions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-emerald-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contributions;
