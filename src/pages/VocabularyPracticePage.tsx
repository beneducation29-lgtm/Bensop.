import React, { useState } from 'react';
import { LanguageCode, VocabularyWord } from '../types/vocabulary';
import { vocabularyService } from '../services/vocabularyService';
import { quizService } from '../services/quizService';
import { MasteryBadge } from '../components/learning/MasteryBadge';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Award
} from 'lucide-react';

interface VocabularyPracticePageProps {
  language: LanguageCode;
  onNavigate: (path: string) => void;
  onTakeQuiz?: (slug: string) => void;
}

export const VocabularyPracticePage: React.FC<VocabularyPracticePageProps> = ({
  language,
  onNavigate,
  onTakeQuiz
}) => {
  const languagePrefix = language === 'en' ? 'tieng-anh' : 'tieng-trung';
  const allWords = vocabularyService.getAllWords(language);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ known: 0, learning: 0, later: 0 });
  const [completed, setCompleted] = useState(false);

  const currentWord: VocabularyWord = allWords[currentIndex] || allWords[0];
  const progress = vocabularyService.getProgress(currentWord.id, language);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAction = (type: 'know' | 'still-learning' | 'later') => {
    if (type === 'know') {
      vocabularyService.updateWordMastery(currentWord.id, language, true);
      setStats((prev) => ({ ...prev, known: prev.known + 1 }));
    } else if (type === 'still-learning') {
      vocabularyService.updateWordMastery(currentWord.id, language, false);
      setStats((prev) => ({ ...prev, learning: prev.learning + 1 }));
    } else {
      setStats((prev) => ({ ...prev, later: prev.later + 1 }));
    }

    setIsFlipped(false);
    if (currentIndex < Math.min(20, allWords.length) - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const totalCards = Math.min(20, allWords.length);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Top Nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(`/${languagePrefix}/vocabulary`)}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI VOCABULARY LAB</span>
          </button>

          <div className="text-xs font-mono text-[#666]">
            FLASHCARD MODE · {currentIndex + 1} / {totalCards}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D9FF3F] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>

        {!completed ? (
          <div className="space-y-8">
            
            {/* Flashcard Card Arena */}
            <div
              onClick={handleFlip}
              className="min-h-[420px] p-8 sm:p-14 rounded-3xl bg-[#0D0D0D] border border-[#222] hover:border-[#383838] transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden select-none shadow-2xl group"
            >
              {/* Top card meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono uppercase bg-[#161616] border border-[#262626] text-[#D9FF3F] font-bold">
                    {currentWord.level}
                  </span>
                  <span className="text-xs font-mono text-[#777] uppercase">
                    {currentWord.topicName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MasteryBadge status={progress.status} score={progress.masteryScore} showScore={true} />
                  <button
                    type="button"
                    onClick={handleAudio}
                    className="p-2 rounded-xl bg-[#161616] hover:bg-[#D9FF3F] text-[#888] hover:text-black border border-[#2A2A2A] transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Center Content */}
              <div className="py-8 text-center space-y-4">
                {!isFlipped ? (
                  /* FRONT: Word and Pronunciation */
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <h2 className="text-5xl sm:text-7xl font-black font-display text-white tracking-tight uppercase">
                      {currentWord.word}
                    </h2>
                    <div className="text-sm sm:text-base font-mono text-[#888]">
                      {currentWord.pronunciation}
                    </div>
                    <div className="text-xs font-mono text-[#555] uppercase tracking-widest pt-4">
                      [ NHẤP VÀO THẺ ĐỂ LẬT XEM NGHĨA ]
                    </div>
                  </div>
                ) : (
                  /* BACK: Meaning, Examples & Collocations */
                  <div className="space-y-6 text-left animate-in fade-in duration-200">
                    <div>
                      <span className="text-[10px] font-mono text-[#888] uppercase block mb-1">
                        Ý NGHĨA TIẾNG VIỆT:
                      </span>
                      <div className="text-2xl sm:text-3xl font-bold text-[#D9FF3F]">
                        {currentWord.meaning}
                      </div>
                    </div>

                    {currentWord.examples && currentWord.examples.length > 0 && (
                      <div className="p-4 rounded-2xl bg-[#141414] border border-[#222] space-y-1">
                        <span className="text-[10px] font-mono text-[#777] uppercase block">VÍ DỤ:</span>
                        <p className="text-white italic text-sm">“{currentWord.examples[0].sentence}”</p>
                        <p className="text-[#888] text-xs">{currentWord.examples[0].translation}</p>
                      </div>
                    )}

                    {currentWord.collocations && currentWord.collocations.length > 0 && (
                      <div>
                        <span className="text-[10px] font-mono text-[#777] uppercase block mb-1">
                          COLLOCATIONS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentWord.collocations.map((c) => (
                            <span key={c} className="px-2 py-0.5 rounded text-xs font-mono bg-[#181818] border border-[#2A2A2A] text-zinc-300">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom hint */}
              <div className="pt-4 border-t border-[#181818] text-center text-xs font-mono text-[#555]">
                {isFlipped ? 'CHỌN MỨC ĐỘ THÔNG THẠO BÊN DƯỚI:' : 'NHẤP VÀO ĐÂY ĐỂ LẬT MẶT SAU'}
              </div>
            </div>

            {/* Action Buttons: I KNOW / STILL LEARNING / REVIEW LATER */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleAction('still-learning')}
                className="py-4 rounded-2xl bg-[#141010] hover:bg-[#1E1212] text-red-300 font-mono text-xs font-bold border border-red-900/40 hover:border-red-500/70 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-5 h-5 text-red-400" />
                <span>STILL LEARNING</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('later')}
                className="py-4 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] text-zinc-300 font-mono text-xs font-bold border border-[#2A2A2A] hover:border-[#444] transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-5 h-5 text-amber-400" />
                <span>REVIEW LATER</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('know')}
                className="py-4 rounded-2xl bg-[#111A0E] hover:bg-[#182613] text-[#D9FF3F] font-mono text-xs font-bold border border-[#D9FF3F]/40 hover:border-[#D9FF3F] transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(217,255,63,0.1)]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#D9FF3F]" />
                <span>I KNOW THIS</span>
              </button>
            </div>

          </div>
        ) : (
          /* Completion Screen */
          <div className="p-10 rounded-3xl bg-[#0D0D0D] border border-[#222] text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#1A2612] border border-[#D9FF3F]/40 flex items-center justify-center text-[#D9FF3F] mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                HOÀN THÀNH PHIÊN LUYỆN TẬP
              </span>
              <h2 className="text-3xl font-black font-display text-white uppercase">
                TUYỆT VỜI! BẠN ĐÃ DUYỆT QUA {totalCards} TỪ VỰNG
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#121212] border border-[#222]">
                <span className="text-[#888] block mb-1">ĐÃ THUỘC:</span>
                <span className="text-xl font-bold text-emerald-400">{stats.known}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#121212] border border-[#222]">
                <span className="text-[#888] block mb-1">CẦN ÔN:</span>
                <span className="text-xl font-bold text-red-400">{stats.learning}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#121212] border border-[#222]">
                <span className="text-[#888] block mb-1">XEM LẠI SAU:</span>
                <span className="text-xl font-bold text-amber-400">{stats.later}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-[#1C1C1C]">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setStats({ known: 0, learning: 0, later: 0 });
                  setCompleted(false);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#141414] hover:bg-[#202020] text-white font-mono text-xs font-bold border border-[#2B2B2B] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>LUYỆN LẠI VÒNG MỚI</span>
              </button>

              <button
                onClick={() => {
                  const quizSlug = language === 'en' ? 'phrasal-verbs-cong-so' : 'hsk-phan-xa-tu-vung-thanh-dieu';
                  if (onTakeQuiz) onTakeQuiz(quizSlug);
                  else onNavigate(`/quiz/${quizSlug}`);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D9FF3F] text-black font-mono text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.2)]"
              >
                <Award className="w-4 h-4 text-black" />
                <span>LÀM BÀI QUIZ TỔNG HỢP</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
