import React from 'react';
import { GrammarCommonMistake } from '../../types/grammar';
import { XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface CommonMistakeCardProps {
  mistake: GrammarCommonMistake;
}

export const CommonMistakeCard: React.FC<CommonMistakeCardProps> = ({ mistake }) => {
  return (
    <div className="p-6 rounded-2xl bg-[#0D0A0A] border border-red-950/40 space-y-4">
      {/* Incorrect */}
      <div className="flex items-start gap-3">
        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">
            LỖI SAI PHỔ BIẾN (INCORRECT)
          </span>
          <p className="text-sm sm:text-base font-mono text-red-200 line-through decoration-red-500/60">
            {mistake.incorrect}
          </p>
        </div>
      </div>

      {/* Correct */}
      <div className="flex items-start gap-3 pt-2 border-t border-[#1C1414]">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
            CÁCH DÙNG CHUẨN XÁC (CORRECT)
          </span>
          <p className="text-sm sm:text-base font-mono text-emerald-300 font-bold">
            {mistake.correct}
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-3.5 rounded-xl bg-[#140D0D] border border-red-900/20 text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span><strong>Tại sao?</strong> {mistake.explanation}</span>
      </div>
    </div>
  );
};
