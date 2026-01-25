import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { contributions } from "@/constants";
import ContributionCard from "./ContributionCard";

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
