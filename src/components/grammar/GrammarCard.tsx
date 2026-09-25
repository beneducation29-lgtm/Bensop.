import React, { useState } from 'react';
import { GrammarConcept } from '../../types/grammar';
import { grammarService } from '../../services/grammarService';
import { MasteryBadge } from '../learning/MasteryBadge';
import { ArrowRight, Bookmark } from 'lucide-react';

interface GrammarCardProps {
  concept: GrammarConcept;
  onSelect: (concept: GrammarConcept) => void;
  onToggleSave?: (conceptId: string) => void;
  isSaved?: boolean;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({
  concept,
  onSelect,
  onToggleSave,
  isSaved: propIsSaved
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(
    propIsSaved !== undefined ? propIsSaved : grammarService.isConceptSaved(concept.id)
  );

  const progress = grammarService.getProgress(concept.id, concept.language);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = grammarService.toggleSaveConcept(concept.id);
    setIsSaved(nextSaved);
    if (onToggleSave) onToggleSave(concept.id);
  };

  return (
    <div
      onClick={() => onSelect(concept)}
      className="p-6 sm:p-7 rounded-2xl bg-[#0C0C0C] border border-[#1E1E1E] hover:border-[#333] transition-all flex flex-col justify-between space-y-6 group cursor-pointer relative"
    >
      <div className="space-y-4">
        {/* Top Meta */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#181818] border border-[#2A2A2A] text-[#D9FF3F] font-bold">
              {concept.level}
            </span>
            <span className="text-[11px] font-mono text-[#777] uppercase truncate max-w-[140px]">
              {concept.topicName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MasteryBadge status={progress.status} score={progress.masteryScore} />
            <button
              type="button"
              onClick={handleBookmark}
              aria-label={isSaved ? 'Xóa ngữ pháp đã lưu' : 'Lưu điểm ngữ pháp'}
              className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#777] hover:text-[#D9FF3F] transition-colors border border-[#262626] cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D9FF3F] text-[#D9FF3F]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#D9FF3F] transition-colors leading-snug">
            {concept.title}
          </h3>
          <p className="text-xs text-[#888] mt-2 line-clamp-2 leading-relaxed">
            {concept.shortDescription}
          </p>
        </div>

        {/* Formula preview */}
        {concept.rules && concept.rules.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#121212] border border-[#202020] font-mono text-xs">
            <span className="text-[10px] text-[#666] block mb-1 uppercase tracking-wider">
              {concept.rules[0].title}:
            </span>
            <span className="text-[#D9FF3F] font-bold block truncate">
              {concept.rules[0].formula}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[#181818] flex items-center justify-between text-xs font-mono text-[#666]">
        <span>{concept.examples.length} VÍ DỤ MINH HỌA</span>
        <div className="flex items-center gap-1.5 text-white group-hover:text-[#D9FF3F] font-bold transition-colors">
          <span>Chi tiết ngữ pháp</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
