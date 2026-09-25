import React, { useState } from 'react';
import { LanguageCode } from '../types/vocabulary';
import { reviewService } from '../services/reviewService';
import { VocabularyCard } from '../components/vocabulary/VocabularyCard';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Flame,
  Target,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface VocabularyReviewPageProps {
  language: LanguageCode;
  onNavigate: (path: string) => void;
  onTakeQuiz?: (slug: string) => void;
}

export const VocabularyReviewPage: React.FC<VocabularyReviewPageProps> = ({
  language,
  onNavigate,
  onTakeQuiz
}) => {
  const languagePrefix = language === 'en' ? 'tieng-anh' : 'tieng-trung';
  const buckets = reviewService.getWordsToReview(language);

  const [activeTab, setActiveTab] = useState<'due' | 'needs-practice' | 'recent' | 'strong'>('due');

  const currentList =
    activeTab === 'due'
      ? buckets.dueToday
      : activeTab === 'needs-practice'
      ? buckets.needsPractice
      : activeTab === 'recent'
      ? buckets.recentlyLearned
      : buckets.strongWords;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(`/${languagePrefix}/vocabulary`)}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI VOCABULARY LAB</span>
          </button>

          <span className="text-xs font-mono text-[#D9FF3F] bg-[#141414] px-3 py-1 rounded-lg border border-[#242424]">
            SPACED REPETITION ENGINE
          </span>
        </div>

        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C0C0C] border border-[#202020] space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D9FF3F] uppercase tracking-wider">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>KHO TỪ CẦN ÔN TẬP ĐỊNH KỲ</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase leading-none">
                WORDS TO REVIEW
              </h1>
              <p className="text-sm text-[#888] mt-3 max-w-xl font-mono">
                Lặp lại ngắt quãng dựa trên lịch sử câu trả lời sai và độ bền ghi nhớ trong não bộ.
              </p>
            </div>

            <button
              onClick={() => onNavigate(`/${languagePrefix}/vocabulary/practice`)}
              className="px-6 py-3.5 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.25)] shrink-0"
            >
              <span>START REVIEW SESSION</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Tabs: Due Today / Needs Practice / Recently Learned / Strong Words */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#1E1E1E] pb-4">
          {[
            { id: 'due', label: `Hạn Hôm Nay (${buckets.dueToday.length})`, count: buckets.dueToday.length },
            { id: 'needs-practice', label: `Cần Củng Cố (${buckets.needsPractice.length})`, count: buckets.needsPractice.length },
            { id: 'recent', label: `Vừa Học (${buckets.recentlyLearned.length})`, count: buckets.recentlyLearned.length },
            { id: 'strong', label: `Đã Vững (${buckets.strongWords.length})`, count: buckets.strongWords.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#D9FF3F] text-black font-bold shadow-[0_0_15px_rgba(217,255,63,0.2)]'
                  : 'bg-[#121212] text-[#888] hover:text-white border border-[#222]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentList.map((word) => (
              <VocabularyCard
                key={word.id}
                word={word}
                onSelect={(w) => onNavigate(`/${languagePrefix}/vocabulary/${w.slug}`)}
              />
            ))}
          </div>

          {currentList.length === 0 && (
            <div className="p-16 rounded-3xl bg-[#0D0D0D] border border-[#202020] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-base font-bold text-white">Tuyệt vời! Không có từ nào trong danh mục này cần xem lại</p>
              <p className="text-xs text-[#888] font-mono">
                Bạn đã duy trì độ chính xác cao. Hãy tiếp tục học các từ vựng mới trong kho.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
