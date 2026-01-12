import { ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";

type NewsArticle = {
  id: number;
  image: string;
  date: string;
  title: string;
  link: string;
};

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    image: "/images/rescuer_flood.jpg",
    date: "15/01/25",
    title: "ResQ Mientrung SOS hợp tác với Bộ Y tế để nâng cao khả năng ứng phó khẩn cấp y tế tại miền Trung",
    link: "#",
  },
  {
    id: 2,
    image: "/images/noodle_flood.jpg",
    date: "10/12/24",
    title: "ResQ ra mắt công nghệ AI để tối ưu hóa phản ứng cứu hộ và phân bổ tài nguyên tại Việt Nam",
    link: "#",
  },
  {
    id: 3,
    image: "/images/ghe_flood.jpg",
    date: "25/11/24",
    title: "ResQ và các tổ chức địa phương ký kết hợp tác phát triển hệ thống cảnh báo sớm thiên tai",
    link: "#",
  },
  {
    id: 4,
    image: "/images/rescuer_flood.jpg",
    date: "18/11/24",
    title: "ResQ hợp tác với Hiệp hội Cứu hộ để tăng mức hỗ trợ tối thiểu cho các nhân viên cứu hộ",
    link: "#",
  },
];

const Newsroom = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-sf-ui-display)" }}
        >
          Tin tức
        </h2>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg overflow-hidden flex flex-col group cursor-pointer"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100">
                {!imageErrors[article.id] ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => handleImageError(article.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                    <div className="text-center p-4">
                      <Calendar className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 text-emerald-500" />
                      <p className="text-gray-600 text-xs">Hình ảnh</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-gray-500 mb-3 font-medium">
                  {article.date}
                </p>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight line-clamp-3 flex-1">
                  {article.title}
                </h3>
                <a
                  href={article.link}
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors text-sm md:text-base"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* More News Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300">
            Xem thêm tin tức
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsroom;
