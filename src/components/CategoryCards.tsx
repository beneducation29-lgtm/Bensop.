import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface CategoryCardsProps {
  onSelectCategory: (slug: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories-section" className="py-24 sm:py-32 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#D9FF3F]" />
              <span className="text-xs font-mono tracking-widest text-[#888888] uppercase">
                KHÁM PHÁ BENSOP
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display leading-[1.05]">
              4 LĨNH VỰC.<br />
              <span className="text-[#A0A0A0]">1 HÀNH TRÌNH PHÁT TRIỂN.</span>
            </h2>
          </div>

          <div className="max-w-md text-sm sm:text-base text-[#9A9A9A] leading-relaxed border-l border-[#222222] pl-6 font-normal">
            Học một ngôn ngữ. Nâng cấp tư duy. Chăm sóc bản thân. Xây dựng một cuộc sống tốt hơn và bền vững trong thế giới biến động.
          </div>
        </div>

        {/* 4 Editorial Poster Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group relative flex flex-col justify-between bg-[#101010] border border-[#222222] hover:border-[#D9FF3F] transition-all duration-300 cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {/* Card Poster Image (Occupies 55% height) */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#161616]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-90" />

                {/* Big Editorial Number Overlay */}
                <div className="absolute top-4 left-5 text-4xl sm:text-5xl font-black font-mono tracking-tighter text-white/80 group-hover:text-[#D9FF3F] transition-colors">
                  {cat.number}
                </div>

                {/* Hover Arrow Badge */}
                <div className="absolute top-4 right-5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-[#D9FF3F] group-hover:text-black group-hover:border-[#D9FF3F] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* English Subtitle on Image */}
                <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest text-[#B0B0B0] uppercase">
                    {cat.englishTitle}
                  </span>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#101010]">
                <div>
                  {/* Category Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-[#D9FF3F] transition-colors font-display">
                    {cat.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed mb-6 font-normal">
                    {cat.shortDescription}
                  </p>

                  {/* Topics List: Clean typographic layout without pill boxes */}
                  <div className="space-y-2 border-t border-[#1F1F1F] pt-4 mb-6">
                    <div className="text-[11px] font-mono uppercase text-[#666666] tracking-wider mb-2">
                      Nội dung trọng tâm:
                    </div>
                    <ul className="text-xs text-[#8E8E8E] space-y-1.5">
                      {cat.topics.slice(0, 4).map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 group-hover:text-[#CCCCCC] transition-colors">
                          <span className="w-1 h-1 rounded-full bg-[#3A3A3A] group-hover:bg-[#D9FF3F]" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-bold text-white group-hover:text-[#D9FF3F] transition-colors">
                  <span className="uppercase tracking-wider">Khám phá chi tiết</span>
                  <span className="font-mono text-sm">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
