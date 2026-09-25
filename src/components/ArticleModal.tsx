import React, { useEffect, useState } from 'react';
import { X, Clock, Calendar, Bookmark, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectCategory: (slug: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectCategory,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md overflow-y-auto flex flex-col justify-start">
      
      {/* Sticky Reader Utility Bar */}
      <div className="sticky top-0 z-20 bg-[#050505]/90 backdrop-blur-md border-b border-[#1E1E1E] py-4 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI TRANG CHỦ</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                bookmarked
                  ? 'border-[#D9FF3F] text-[#D9FF3F] bg-[#D9FF3F]/10'
                  : 'border-[#262626] text-[#888] hover:text-white'
              }`}
              title="Lưu bài viết"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-[#262626] text-[#888] hover:text-white transition-colors cursor-pointer"
              title="Chia sẻ bài viết"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#181818] border border-[#2A2A2A] text-white hover:bg-[#252525] transition-colors cursor-pointer ml-2"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content Layout */}
      <article className="max-w-3xl mx-auto w-full px-5 sm:px-8 py-12 sm:py-16 flex-1">
        
        {/* Category & Metadata Kickers */}
        <div className="flex items-center gap-3 mb-6 text-xs font-mono">
          <span className="text-[#D9FF3F] font-bold uppercase tracking-widest">
            {article.categoryName}
          </span>
          <span className="text-[#444]">·</span>
          <span className="text-[#888] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTime}
          </span>
          <span className="text-[#444]">·</span>
          <span className="text-[#888] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedAt}
          </span>
        </div>

        {/* Big Editorial Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-8 font-display">
          {article.title}
        </h1>

        {/* Author Bio Deck */}
        <div className="flex items-center gap-4 py-4 mb-8 border-y border-[#1E1E1E]">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center font-bold text-sm text-[#D9FF3F]">
            {article.author.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{article.author.name}</div>
            <div className="text-xs text-[#777] font-mono">{article.author.role}</div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#121212] mb-10 border border-[#222]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-6 bg-[#0E0E0E] border-l-2 border-[#D9FF3F] rounded-r-xl mb-10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Điểm cốt lõi rút ra:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D0D0D0] leading-relaxed">
              {article.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#D9FF3F] font-mono mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Paragraphs with Editorial Drop-Cap */}
        <div className="space-y-6 text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-normal">
          {article.content.map((paragraph, index) => {
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="first-letter:text-5xl first-letter:font-black first-letter:font-display first-letter:text-[#D9FF3F] first-letter:float-left first-letter:mr-3 first-letter:mt-1 text-[#E5E5E5] leading-relaxed"
                >
                  {paragraph}
                </p>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Bottom Editorial Quote */}
        <div className="my-12 p-8 border-y border-[#202020] text-center">
          <blockquote className="text-xl sm:text-2xl font-display italic text-white mb-3">
            "Không chỉ là một website học tập, mà là một hệ sinh thái giúp con người học hỏi, phát triển và sống tốt hơn."
          </blockquote>
          <span className="text-xs font-mono tracking-widest text-[#888] uppercase">
            BENSOP EDITORIAL MANIFESTO
          </span>
        </div>

        {/* Article Footer Actions */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1E1E1E]">
          <span className="text-xs text-[#777] font-mono">
            Bạn đã hoàn thành bài viết này.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white hover:bg-[#D9FF3F] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer"
          >
            Đóng bài viết
          </button>
        </div>

      </article>
    </div>
  );
};
