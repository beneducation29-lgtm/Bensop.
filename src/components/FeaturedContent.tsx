import React from 'react';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';

interface FeaturedContentProps {
  onSelectArticle: (article: Article) => void;
  onExploreCategory: (path: string) => void;
}

export const FeaturedContent: React.FC<FeaturedContentProps> = ({
  onSelectArticle,
  onExploreCategory,
}) => {
  const featuredArticles = ARTICLES.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#090909] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#D9FF3F]" />
              <span className="text-xs font-mono tracking-widest text-[#888888] uppercase">
                ĐANG ĐƯỢC QUAN TÂM
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-display">
              NHỮNG ĐIỀU ĐÁNG ĐỂ HỌC.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#9A9A9A] max-w-md font-normal leading-relaxed">
            Các bài viết phân tích chiều sâu, phương pháp luận thực chứng và cẩm nang cô đọng từ các chuyên gia Bensop.
          </p>
        </div>

        {/* 2-Tier Salience Grid: Lead Story + Secondary List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Lead Story (Left 7 Cols) */}
          {featuredArticles[0] && (
            <div
              onClick={() => onSelectArticle(featuredArticles[0])}
              className="lg:col-span-7 bg-[#121212] border border-[#222222] hover:border-[#3A3A3A] rounded-xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#161616]">
                <img
                  src={featuredArticles[0].image}
                  alt={featuredArticles[0].title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
                
                {/* Category kicker on top */}
                <div className="absolute top-5 left-5 text-xs font-mono tracking-wider font-semibold text-[#D9FF3F] uppercase">
                  {featuredArticles[0].categoryName}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#777777] mb-3 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticles[0].readingTime}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticles[0].publishedAt}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#D9FF3F] transition-colors mb-4 font-display">
                    {featuredArticles[0].title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed mb-6 font-normal">
                    {featuredArticles[0].excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#1F1F1F] flex items-center justify-between">
                  <div className="text-xs text-[#888888]">
                    Tác giả: <strong className="text-white font-medium">{featuredArticles[0].author.name}</strong>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#D9FF3F] transition-colors uppercase tracking-wider">
                    Đọc toàn bộ bài viết <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Features Column (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {featuredArticles.slice(1, 4).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="p-6 bg-[#121212] border border-[#222222] hover:border-[#383838] rounded-xl cursor-pointer group transition-all duration-200 flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#777777] mb-2.5">
                    <span className="text-[#D9FF3F] font-semibold uppercase">{art.categoryName}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readingTime}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#D9FF3F] transition-colors mb-2 leading-snug">
                    {art.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1C1C1C] flex items-center justify-between text-xs text-[#666666]">
                  <span>{art.publishedAt}</span>
                  <span className="font-semibold text-white group-hover:text-[#D9FF3F] flex items-center gap-1">
                    Đọc tiếp →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-12 pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#777777] font-mono">
            HƠN 120+ BÀI VIẾT VÀ TÀI LIỆU HỌC TẬP MIỄN PHÍ ĐƯỢC CẬP NHẬT LIÊN TỤC
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onExploreCategory('/tieng-anh')}
              className="text-xs font-mono text-[#A0A0A0] hover:text-[#D9FF3F] transition-colors"
            >
              Tiếng Anh →
            </button>
            <button
              onClick={() => onExploreCategory('/tieng-trung')}
              className="text-xs font-mono text-[#A0A0A0] hover:text-[#D9FF3F] transition-colors"
            >
              Tiếng Trung →
            </button>
            <button
              onClick={() => onExploreCategory('/phat-trien-ban-than')}
              className="text-xs font-mono text-[#A0A0A0] hover:text-[#D9FF3F] transition-colors"
            >
              Phát triển bản thân →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
