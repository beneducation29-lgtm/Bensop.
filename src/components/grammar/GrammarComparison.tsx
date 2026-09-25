import React from 'react';
import { GrammarComparisonItem } from '../../types/grammar';
import { ArrowLeftRight, Check, Tag } from 'lucide-react';

interface GrammarComparisonProps {
  comparison: GrammarComparisonItem;
  onNavigateToCompared?: (slug: string) => void;
}

export const GrammarComparison: React.FC<GrammarComparisonProps> = ({
  comparison,
  onNavigateToCompared
}) => {
  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#0B0B0B] border border-[#222] space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E1E1E]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#262626] flex items-center justify-center text-[#D9FF3F]">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#D9FF3F] uppercase tracking-widest block">
              BẢNG ĐỐI CHIẾU NGỮ PHÁP (COMPARISON)
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display text-white uppercase">
              {comparison.targetConcept} <span className="text-[#666] font-normal">vs</span> {comparison.comparedConcept}
            </h3>
          </div>
        </div>

        {comparison.comparedSlug && onNavigateToCompared && (
          <button
            onClick={() => onNavigateToCompared(comparison.comparedSlug!)}
            className="text-xs font-mono text-[#D9FF3F] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Xem chi tiết {comparison.comparedConcept}</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* Comparison Grid (Responsive: 2-column on desktop, stacked on mobile) */}
      <div className="space-y-6">
        {comparison.aspects.map((aspect, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#121212] border border-[#1E1E1E] space-y-4"
          >
            <h4 className="text-xs font-mono text-[#888] uppercase tracking-wider font-bold border-b border-[#1A1A1A] pb-2">
              {idx + 1}. {aspect.title}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Target Concept */}
              <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-[#D9FF3F] uppercase block">
                  {comparison.targetConcept}
                </span>
                <p className="text-zinc-200 leading-relaxed">{aspect.targetUsage}</p>
              </div>

              {/* Compared Concept */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#222] space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase block">
                  {comparison.comparedConcept}
                </span>
                <p className="text-zinc-300 leading-relaxed">{aspect.comparedUsage}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Signal Words Comparison */}
        <div className="p-5 rounded-2xl bg-[#101010] border border-[#1E1E1E] space-y-4">
          <span className="text-xs font-mono text-[#888] uppercase tracking-wider font-bold block">
            DẤU HIỆU NHẬN BIẾT & TỪ CHỈ THỊ (SIGNAL WORDS):
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#D9FF3F] font-bold block">
                {comparison.targetConcept}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {comparison.signalWordsTarget.map((w) => (
                  <span
                    key={w}
                    className="px-2.5 py-1 rounded-lg bg-[#182012] border border-[#D9FF3F]/30 text-xs font-mono text-[#D9FF3F]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 font-bold block">
                {comparison.comparedConcept}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {comparison.signalWordsCompared.map((w) => (
                  <span
                    key={w}
                    className="px-2.5 py-1 rounded-lg bg-[#181818] border border-[#2A2A2A] text-xs font-mono text-zinc-300"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
