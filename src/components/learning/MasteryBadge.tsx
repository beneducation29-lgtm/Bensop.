import React from 'react';
import { MasteryStatus } from '../../types/vocabulary';

interface MasteryBadgeProps {
  status: MasteryStatus;
  score?: number;
  showScore?: boolean;
}

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({ status, score, showScore = false }) => {
  let colorStyle = 'bg-[#181818] border-[#333] text-[#888]';

  switch (status) {
    case 'MASTERED':
      colorStyle = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]';
      break;
    case 'STRONG':
      colorStyle = 'bg-[#1A2612] border-[#D9FF3F]/70 text-[#D9FF3F] shadow-[0_0_10px_rgba(217,255,63,0.15)]';
      break;
    case 'FAMILIAR':
      colorStyle = 'bg-blue-950/50 border-blue-500/60 text-blue-300';
      break;
    case 'LEARNING':
      colorStyle = 'bg-amber-950/50 border-amber-500/60 text-amber-300';
      break;
    case 'NEW':
    default:
      colorStyle = 'bg-[#141414] border-[#2A2A2A] text-[#777]';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider border ${colorStyle}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{status}</span>
      {showScore && typeof score === 'number' && (
        <span className="opacity-70 ml-0.5">({score}%)</span>
      )}
    </span>
  );
};
