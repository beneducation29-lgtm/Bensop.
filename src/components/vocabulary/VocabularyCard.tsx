import React, { useState } from 'react';
import { VocabularyWord, LanguageCode } from '../../types/vocabulary';
import { vocabularyService } from '../../services/vocabularyService';
import { MasteryBadge } from '../learning/MasteryBadge';
import { Volume2, Bookmark, ArrowRight, Check } from 'lucide-react';

interface VocabularyCardProps {
  word: VocabularyWord;
  onSelect: (word: VocabularyWord) => void;
  onToggleSave?: (wordId: string) => void;
  isSaved?: boolean;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  onSelect,
  onToggleSave,
  isSaved: propIsSaved
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean>(
    propIsSaved !== undefined ? propIsSaved : vocabularyService.isWordSaved(word.id)
  );

  const progress = vocabularyService.getProgress(word.id, word.language);

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    // Simple Web Speech API fallback or tone simulation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = word.language === 'zh' ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = vocabularyService.toggleSaveWord(word.id);
    setIsSaved(nextSaved);
    if (onToggleSave) onToggleSave(word.id);
  };

  return (
    <div
      onClick={() => onSelect(word)}
      className="p-6 rounded-2xl bg-[#0C0C0C] border border-[#1E1E1E] hover:border-[#333] transition-all flex flex-col justify-between space-y-6 group cursor-pointer relative overflow-hidden"
    >
      <div className="space-y-4">
        {/* Top Meta row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#161616] border border-[#282828] text-[#888]">
              {word.level}
            </span>
            <span className="text-[11px] font-mono text-[#666] uppercase truncate max-w-[120px]">
              {word.partOfSpeech}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MasteryBadge status={progress.status} score={progress.masteryScore} />
            <button
              type="button"
              onClick={handleBookmark}
              aria-label={isSaved ? 'Xóa từ đã lưu' : 'Lưu từ vựng'}
              className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#777] hover:text-[#D9FF3F] transition-colors border border-[#262626] cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D9FF3F] text-[#D9FF3F]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Word and Phonetic */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-[#D9FF3F] transition-colors tracking-tight">
              {word.word}
            </h3>

            <button
              type="button"
              onClick={handleAudio}
              aria-label="Phát âm từ vựng"
              className={`p-2 rounded-xl transition-all border ${
                isPlayingAudio
                  ? 'bg-[#D9FF3F] text-black border-[#D9FF3F]'
                  : 'bg-[#141414] text-[#888] hover:text-white border-[#242424]'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
            </button>
          </div>

          <div className="text-xs font-mono text-[#777] mt-1">
            {word.pronunciation}
          </div>
        </div>

        {/* Meaning */}
        <p className="text-sm text-zinc-300 font-medium leading-relaxed">
          {word.meaning}
        </p>

        {/* First Example if available */}
        {word.examples && word.examples.length > 0 && (
          <div className="p-3 rounded-xl bg-[#121212] border border-[#1C1C1C] text-xs space-y-1">
            <p className="text-white italic">"{word.examples[0].sentence}"</p>
            <p className="text-[#777] text-[11px]">{word.examples[0].translation}</p>
          </div>
        )}
      </div>

      {/* Footer info & Hover CTA */}
      <div className="pt-4 border-t border-[#181818] flex items-center justify-between text-xs font-mono text-[#666]">
        <span>{word.topicName}</span>
        <div className="flex items-center gap-1.5 text-white group-hover:text-[#D9FF3F] font-bold transition-colors">
          <span>Chi tiết từ</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
