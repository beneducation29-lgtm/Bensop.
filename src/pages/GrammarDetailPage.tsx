import React, { useState, useEffect } from 'react';
import { LanguageCode } from '../types/vocabulary';
import { GrammarConcept } from '../types/grammar';
import { grammarService } from '../services/grammarService';
import { quizService } from '../services/quizService';
import { MasteryBadge } from '../components/learning/MasteryBadge';
import { CommonMistakeCard } from '../components/grammar/CommonMistakeCard';
import { GrammarComparison } from '../components/grammar/GrammarComparison';
import { RelatedLearning } from '../components/learning/RelatedLearning';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  AlertCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface GrammarDetailPageProps {
  slug: string;
  language: LanguageCode;
  onNavigate: (path: string) => void;
  onTakeQuiz?: (slug: string) => void;
}

export const GrammarDetailPage: React.FC<GrammarDetailPageProps> = ({
  slug,
  language,
  onNavigate,
  onTakeQuiz
}) => {
  const languagePrefix = language === 'en' ? 'tieng-anh' : 'tieng-trung';
  const concept = grammarService.getConceptBySlug(slug, language) || grammarService.getAllConcepts(language)[0];

  const [isSaved, setIsSaved] = useState<boolean>(grammarService.isConceptSaved(concept.id));

  // Mark as viewed on mount
  useEffect(() => {
    grammarService.markAsViewed(concept.id, concept.language);
  }, [concept.id, concept.language]);

  const progress = grammarService.getProgress(concept.id, concept.language);

  const handleToggleSave = () => {
    const next = grammarService.toggleSaveConcept(concept.id);
    setIsSaved(next);
  };

  const handleTakeQuiz = () => {
    const quizSlug = quizService.createQuizFromGrammar(concept);
    if (onTakeQuiz) onTakeQuiz(quizSlug);
    else onNavigate(`/quiz/${quizSlug}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(`/${languagePrefix}/grammar`)}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI GRAMMAR LAB</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#666]">CHỦ ĐỀ:</span>
            <span className="text-xs font-mono text-[#D9FF3F] bg-[#141414] px-3 py-1 rounded-lg border border-[#242424]">
              {concept.topicName}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0C0C0C] border border-[#202020] relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D9FF3F]/5 blur-[90px] pointer-events-none -mr-20 -mt-20" />

          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A1A1A] pb-6">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg font-mono text-xs uppercase bg-[#181818] border border-[#2A2A2A] text-[#D9FF3F] font-bold">
                {concept.level}
              </span>
              <span className="px-3 py-1 rounded-lg font-mono text-xs uppercase bg-[#141414] border border-[#252525] text-[#888]">
                {concept.topicName}
              </span>
              <MasteryBadge status={progress.status} score={progress.masteryScore} showScore={true} />
            </div>

            <button
              type="button"
              onClick={handleToggleSave}
              className="px-3.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-xs font-mono text-[#AAA] hover:text-white border border-[#262626] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D9FF3F] text-[#D9FF3F]' : ''}`} />
              <span>{isSaved ? 'ĐÃ LƯU ĐIỂM NGỮ PHÁP' : 'LƯU NGỮ PHÁP'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight uppercase leading-tight">
              {concept.title}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-3xl">
              {concept.shortDescription}
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="pt-6 border-t border-[#1C1C1C] flex flex-wrap items-center gap-3">
            <button
              onClick={handleTakeQuiz}
              className="px-6 py-3 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.2)]"
            >
              <Award className="w-4 h-4 text-black" />
              <span>LÀM BÀI QUIZ ({concept.title})</span>
            </button>
            <button
              onClick={() => onNavigate('/luyen-tap')}
              className="px-5 py-3 rounded-xl bg-[#141414] hover:bg-[#202020] text-white font-mono text-xs font-bold border border-[#2B2B2B] hover:border-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D9FF3F]" />
              <span>LUYỆN TẬP TỔNG HỢP</span>
            </button>
          </div>
        </div>

        {/* Section 1: THE IDEA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] uppercase tracking-widest">
            <Lightbulb className="w-4 h-4" />
            <span>01 — THE IDEA (BẢN CHẤT TƯ DUY)</span>
          </div>
          <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-sans">
            {concept.theIdea}
          </p>
        </div>

        {/* Section 2: WHEN TO USE */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest">
              02 — WHEN TO USE (KHI NÀO SỬ DỤNG?)
            </span>
            <span className="text-xs font-mono text-[#666]">{concept.whenToUse.length} TRƯỜNG HỢP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.whenToUse.map((scenario, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#121212] border border-[#1E1E1E] flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-lg bg-[#181818] border border-[#2B2B2B] text-xs font-mono text-[#D9FF3F] flex items-center justify-center shrink-0 font-bold">
                  {idx + 1}
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed">{scenario}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: STRUCTURE & RULES */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-6">
          <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest block">
            03 — STRUCTURE & RULES (CÔNG THỨC & CẤU TRÚC CÂU)
          </span>

          <div className="space-y-4">
            {concept.rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121212] border border-[#242424] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#888] uppercase tracking-wider font-bold">
                    {rule.title}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#080808] border border-[#1A1A1A] font-mono text-sm sm:text-base text-[#D9FF3F] font-bold tracking-wide overflow-x-auto">
                  {rule.formula}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {rule.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: EXAMPLES */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest">
              04 — EXAMPLES (VÍ DỤ MINH HỌA ĐA DẠNG)
            </span>
            <span className="text-xs font-mono text-[#666]">{concept.examples.length} CÂU MẪU</span>
          </div>

          <div className="space-y-4">
            {concept.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121212] border border-[#1E1E1E] space-y-3 hover:border-[#2D2D2D] transition-colors"
              >
                <p className="text-lg sm:text-xl text-white font-serif leading-relaxed">
                  “{ex.sentence}”
                </p>
                <p className="text-sm text-[#888] font-sans">
                  {ex.translation}
                </p>
                {ex.explanation && (
                  <div className="p-3 rounded-lg bg-[#161616] text-xs font-mono text-[#AAA] border border-[#242424]">
                    💡 {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: COMMON MISTAKES */}
        {concept.commonMistakes && concept.commonMistakes.length > 0 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest block mb-1">
                05 — COMMON MISTAKES (CÁC BẪY LỖI SAI THƯỜNG GẶP)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white uppercase">
                TRÁNH CÁC LỖI KINH ĐIỂN
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {concept.commonMistakes.map((mistake, idx) => (
                <CommonMistakeCard key={idx} mistake={mistake} />
              ))}
            </div>
          </div>
        )}

        {/* Section 6: COMPARISON */}
        {concept.comparison && (
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest block">
              06 — GRAMMAR COMPARISON (ĐỐI CHIẾU SO SÁNH)
            </span>
            <GrammarComparison
              comparison={concept.comparison}
              onNavigateToCompared={(cmpSlug) => onNavigate(`/${languagePrefix}/grammar/${cmpSlug}`)}
            />
          </div>
        )}

        {/* Section 7 & 8: PRACTICE & QUIZ (Learning Connections) */}
        <div className="space-y-4">
          <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest block">
            07 & 08 — PRACTICE & QUIZ
          </span>
          <RelatedLearning
            relatedLessonSlug={concept.relatedLessonSlug}
            relatedCourseSlug={concept.relatedCourseSlug}
            relatedArticleSlug={concept.relatedArticleSlug}
            relatedQuizSlug={concept.relatedQuizSlug || `quiz-grammar-${concept.slug}`}
            relatedGrammarConcepts={concept.relatedConcepts}
            onNavigate={onNavigate}
            onTakeQuiz={onTakeQuiz}
            languagePrefix={languagePrefix}
          />
        </div>

      </div>
    </div>
  );
};
