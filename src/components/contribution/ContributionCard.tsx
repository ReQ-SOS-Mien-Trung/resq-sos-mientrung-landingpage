import { ArrowRight, Image as ImageIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { ContributionCardProps } from "@type";

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

export default ContributionCard;
