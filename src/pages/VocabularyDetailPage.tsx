import React, { useState } from 'react';
import { LanguageCode, VocabularyWord } from '../types/vocabulary';
import { vocabularyService } from '../services/vocabularyService';
import { quizService } from '../services/quizService';
import { MasteryBadge } from '../components/learning/MasteryBadge';
import { RelatedLearning } from '../components/learning/RelatedLearning';
import {
  Volume2,
  Bookmark,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';

interface VocabularyDetailPageProps {
  slug: string;
  language: LanguageCode;
  onNavigate: (path: string) => void;
  onTakeQuiz?: (slug: string) => void;
}

export const VocabularyDetailPage: React.FC<VocabularyDetailPageProps> = ({
  slug,
  language,
  onNavigate,
  onTakeQuiz
}) => {
  const languagePrefix = language === 'en' ? 'tieng-anh' : 'tieng-trung';
  const word = vocabularyService.getWordBySlug(slug, language) || vocabularyService.getAllWords(language)[0];

  const [isSaved, setIsSaved] = useState<boolean>(vocabularyService.isWordSaved(word.id));
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showMeaning, setShowMeaning] = useState(true);
  const [showExamples, setShowExamples] = useState(true);
  const [isLearned, setIsLearned] = useState<boolean>(
    vocabularyService.getProgress(word.id, word.language).isMarkedLearned
  );

  const progress = vocabularyService.getProgress(word.id, word.language);

  const handleAudio = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = word.language === 'zh' ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleToggleSave = () => {
    const next = vocabularyService.toggleSaveWord(word.id);
    setIsSaved(next);
  };

  const handleMarkAsLearned = () => {
    vocabularyService.markAsLearned(word.id, word.language);
    setIsLearned(true);
  };

  const handleStartPractice = () => {
    onNavigate(`/${languagePrefix}/vocabulary/practice?word=${word.slug}`);
  };

  const handleTakeQuiz = () => {
    const quizSlug = quizService.createQuizFromVocabulary(word);
    if (onTakeQuiz) onTakeQuiz(quizSlug);
    else onNavigate(`/quiz/${quizSlug}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(`/${languagePrefix}/vocabulary`)}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI VOCABULARY LAB</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#666]">CHỦ ĐỀ:</span>
            <span className="text-xs font-mono text-[#D9FF3F] bg-[#141414] px-3 py-1 rounded-lg border border-[#242424]">
              {word.topicName}
            </span>
          </div>
        </div>

        {/* Word Learning Hero Experience */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0C0C0C] border border-[#202020] relative overflow-hidden shadow-2xl space-y-8">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D9FF3F]/5 blur-[90px] pointer-events-none -mr-20 -mt-20" />

          {/* Top badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A1A1A] pb-6">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg font-mono text-xs uppercase bg-[#181818] border border-[#2A2A2A] text-[#D9FF3F] font-bold">
                {word.level}
              </span>
              <span className="px-3 py-1 rounded-lg font-mono text-xs uppercase bg-[#141414] border border-[#252525] text-[#888]">
                {word.partOfSpeech}
              </span>
              <MasteryBadge status={progress.status} score={progress.masteryScore} showScore={true} />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleSave}
                className="px-3.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-xs font-mono text-[#AAA] hover:text-white border border-[#262626] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D9FF3F] text-[#D9FF3F]' : ''}`} />
                <span>{isSaved ? 'ĐÃ LƯU TỪ' : 'LƯU TỪ VỰNG'}</span>
              </button>
            </div>
          </div>

          {/* Main Giant Word Title */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display text-white tracking-tight uppercase">
                {word.word}
              </h1>

              <button
                type="button"
                onClick={handleAudio}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-black transition-all cursor-pointer ${
                  isPlayingAudio ? 'bg-white scale-95 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-[#D9FF3F] hover:bg-[#cbf532]'
                }`}
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className={`w-7 h-7 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              </button>
            </div>

            <div className="text-lg sm:text-xl font-mono text-[#888] tracking-widest">
              {word.pronunciation}
            </div>

            {/* Vietnamese Meaning (Toggleable) */}
            {showMeaning && (
              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-bold text-[#D9FF3F] font-sans">
                  {word.meaning}
                </div>
              </div>
            )}
          </div>

          {/* Action Toolbar for Learning Interactions */}
          <div className="pt-6 border-t border-[#1C1C1C] flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] text-xs font-mono text-[#888] hover:text-white border border-[#282828] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {showMeaning ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showMeaning ? 'ẨN NGHĨA' : 'HIỆN NGHĨA'}</span>
            </button>

            <button
              onClick={() => setShowExamples(!showExamples)}
              className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] text-xs font-mono text-[#888] hover:text-white border border-[#282828] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{showExamples ? 'ẨN VÍ DỤ' : 'HIỆN VÍ DỤ'}</span>
            </button>

            <button
              onClick={handleAudio}
              className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] text-xs font-mono text-[#888] hover:text-white border border-[#282828] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#D9FF3F]" />
              <span>PHÁT ÂM</span>
            </button>

            <button
              onClick={handleMarkAsLearned}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                isLearned
                  ? 'bg-emerald-950/60 border-emerald-500/70 text-emerald-300'
                  : 'bg-[#181818] border-[#303030] text-white hover:border-[#D9FF3F]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isLearned ? 'ĐÃ ĐÁNH DẤU THUỘC' : 'ĐÁNH DẤU ĐÃ HỌC'}</span>
            </button>

            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={handleStartPractice}
                className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] text-white font-mono text-xs font-bold border border-[#333] hover:border-[#D9FF3F] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D9FF3F]" />
                <span>PRACTICE THIS WORD</span>
              </button>

              <button
                onClick={handleTakeQuiz}
                className="px-5 py-2.5 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(217,255,63,0.2)]"
              >
                <Award className="w-3.5 h-3.5 text-black" />
                <span>TAKE A QUIZ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Definitions & Examples */}
          <div className="md:col-span-8 space-y-8">
            
            {/* Meaning Section */}
            {word.definitions && word.definitions.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-4">
                <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                  ĐỊNH NGHĨA CHUẨN (DEFINITIONS)
                </span>
                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans list-disc list-inside">
                  {word.definitions.map((def, i) => (
                    <li key={i}>{def}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples Section */}
            {showExamples && word.examples && word.examples.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                  <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                    VÍ DỤ NGỮ CẢNH THỰC TẾ (EXAMPLES)
                  </span>
                  <span className="text-xs font-mono text-[#666]">{word.examples.length} VÍ DỤ</span>
                </div>

                <div className="space-y-4">
                  {word.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#121212] border border-[#1E1E1E] space-y-2 hover:border-[#2D2D2D] transition-colors"
                    >
                      <p className="text-base sm:text-lg text-white font-serif leading-relaxed">
                        “{ex.sentence}”
                      </p>
                      <p className="text-xs sm:text-sm text-[#888] font-sans">
                        {ex.translation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Collocations Section */}
            {word.collocations && word.collocations.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-5">
                <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                  CỤM TỪ CỐ ĐỊNH PHỔ BIẾN (COLLOCATIONS)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {word.collocations.map((col, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#141414] border border-[#222] font-mono text-xs text-white flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
                      <span>{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Related Words & Synonyms */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Related Words */}
            {word.relatedWords && word.relatedWords.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-4">
                <span className="text-xs font-mono text-[#888] uppercase tracking-wider block">
                  TỪ CÙNG GỐC (WORD FAMILY)
                </span>
                <div className="space-y-2.5">
                  {word.relatedWords.map((rw, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#121212] border border-[#1E1E1E] flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white font-mono">{rw.word}</span>
                        {rw.partOfSpeech && (
                          <span className="text-[10px] font-mono text-[#666] uppercase">{rw.partOfSpeech}</span>
                        )}
                      </div>
                      <span className="text-xs text-[#888]">{rw.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synonyms & Antonyms */}
            {(word.synonyms?.length || word.antonyms?.length) && (
              <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-5">
                {word.synonyms && word.synonyms.length > 0 && (
                  <div>
                    <span className="text-[11px] font-mono text-[#888] uppercase block mb-2">
                      TỪ ĐỒNG NGHĨA (SYNONYMS)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {word.synonyms.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#242424] text-xs font-mono text-[#D9FF3F]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {word.antonyms && word.antonyms.length > 0 && (
                  <div>
                    <span className="text-[11px] font-mono text-[#888] uppercase block mb-2">
                      TỪ TRÁI NGHĨA (ANTONYMS)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {word.antonyms.map((a) => (
                        <span key={a} className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#242424] text-xs font-mono text-red-300">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quick Practice Prompt */}
            <div className="p-6 rounded-3xl bg-[#101010] border border-[#222] space-y-3">
              <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                MẸO GHI NHỚ BENSOP
              </span>
              <p className="text-xs text-[#888] leading-relaxed">
                Đừng học từ vựng riêng lẻ. Hãy ghi nhớ từ thông qua cụm collocation và tự đặt ít nhất một câu ví dụ liên quan đến cuộc sống cá nhân của bạn.
              </p>
            </div>

          </div>

        </div>

        {/* Learning Connections Module */}
        <RelatedLearning
          relatedLessonSlug={word.relatedLessonSlug}
          relatedCourseSlug={word.relatedCourseSlug}
          relatedArticleSlug={word.relatedArticleSlug}
          relatedQuizSlug={word.relatedQuizSlug}
          onNavigate={onNavigate}
          onTakeQuiz={onTakeQuiz}
          languagePrefix={languagePrefix}
        />

      </div>
    </div>
  );
};
