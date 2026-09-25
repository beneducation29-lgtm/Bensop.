import React from 'react';
import { ArrowRight, BookOpen, Share2, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onStartLearningClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onStartLearningClick,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'BENSOP — Học mỗi ngày. Sống tốt hơn.',
        text: 'Nền tảng nội dung và phát triển cá nhân dành cho người Việt.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen bg-[#050505] flex flex-col justify-between pt-24 sm:pt-28 pb-6 overflow-hidden border-b border-[#1A1A1A]">
      {/* Background Subtle Gradient Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 my-auto">
        
        {/* Left Column: Bold Editorial Typography */}
        <div className="w-full lg:w-[56%] flex flex-col justify-center text-left pt-6 lg:pt-0">
          
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-8 h-[2px] bg-[#D9FF3F]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#A0A0A0] uppercase">
              BENSOP / LEARN • GROW • LIVE / 2026
            </span>
          </div>

          {/* Massive Editorial Heading */}
          <h1 className="text-[44px] sm:text-[68px] lg:text-[88px] xl:text-[98px] font-black tracking-[-0.04em] leading-[0.92] text-white uppercase font-display mb-6">
            BENSOP.<br />
            HỌC MỖI NGÀY.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EFEFEF] to-[#A0A0A0]">
              SỐNG TỐT HƠN.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-[#B3B3B3] leading-relaxed max-w-xl mb-8 font-normal">
            Một không gian dành cho những người muốn học hỏi, phát triển bản thân và xây dựng một cuộc sống tốt hơn qua ngôn ngữ, tư duy và sức khỏe.
          </p>

          {/* Proof / Engagement Lockup (Inspired by reference campaign card) */}
          <div className="mb-8 p-3 sm:p-4 rounded-xl bg-[#0F0F0F] border border-[#222222] max-w-lg flex flex-wrap items-center gap-4 sm:gap-6 shadow-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A0A0A0] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
              <span>Cộng đồng học tập</span>
            </div>
            <div className="h-4 w-[1px] bg-[#2A2A2A] hidden sm:block" />
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white">
                4.128.719
              </span>
              <span className="text-xs text-[#888888] uppercase tracking-wide">
                Lượt tương tác & học viên
              </span>
            </div>
          </div>

          {/* CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D9FF3F] hover:bg-[#c9ef32] text-black font-extrabold text-sm sm:text-base tracking-tight rounded-none transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer shadow-[0_0_30px_rgba(217,255,63,0.2)]"
            >
              <span>KHÁM PHÁ BENSOP</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={onStartLearningClick}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#141414] hover:bg-[#202020] text-white font-semibold text-sm sm:text-base tracking-tight border border-[#2A2A2A] hover:border-[#404040] rounded-none transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#A0A0A0]" />
              <span>BẮT ĐẦU HỌC</span>
            </button>
          </div>
        </div>

        {/* Right Column: Dramatic Monochrome Hero Visual */}
        <div className="w-full lg:w-[44%] relative mt-4 lg:mt-0 flex justify-center">
          <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden rounded-2xl border border-[#222222] bg-[#111111] shadow-2xl group">
            {/* Real High-Contrast Monochrome Image */}
            <img
              src="/src/assets/images/bensop_hero_bw_1790320756330.jpg"
              alt="Bensop Học mỗi ngày sống tốt hơn"
              className="w-full h-full object-cover grayscale contrast-125 object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlays blending into black */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-60 lg:opacity-80" />

            {/* Floating Visual Caption Tag */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-[#E0E0E0] border-t border-white/10 pt-3">
              <span className="font-mono text-[11px] tracking-wider text-[#A0A0A0]">
                ED. 2026 / TRI THỨC BỀN VỮNG
              </span>
              <span className="text-[#D9FF3F] text-[11px] font-mono">
                BENSOP PLATFORM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Utility Bar (matching reference campaign layout) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-8 sm:pt-10 flex items-center justify-between border-t border-[#161616] text-xs font-mono tracking-wider text-[#888888]">
        
        {/* Scroll Indicator */}
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 hover:text-[#D9FF3F] transition-colors cursor-pointer group"
        >
          <span className="uppercase">Cuộn để tiếp tục</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#D9FF3F]" />
        </button>

        {/* Share Action */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Đã sao chép link!' : 'CHIA SẺ'}</span>
          </button>

          {/* Quick Jump */}
          <button
            onClick={onExploreClick}
            className="hidden sm:inline hover:text-[#D9FF3F] transition-colors cursor-pointer uppercase"
          >
            Đến 4 lĩnh vực ↗
          </button>
        </div>
      </div>
    </section>
  );
};
