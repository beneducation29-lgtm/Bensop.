import React, { useState } from 'react';
import { BookOpen, HelpCircle, Mic, Headphones, FileText, CheckCircle2, RotateCw, Volume2 } from 'lucide-react';
import { LAB_MODULES, VOCABULARY_SAMPLE, GRAMMAR_SAMPLE } from '../data/learningLab';

interface LearningLabProps {
  onStartQuiz: (quizId: string) => void;
}

export const LearningLab: React.FC<LearningLabProps> = ({ onStartQuiz }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vocab' | 'grammar'>('overview');
  const [vocabIndex, setVocabIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [speakingPracticed, setSpeakingPracticed] = useState(false);

  const currentVocab = VOCABULARY_SAMPLE[vocabIndex];

  const handleNextVocab = () => {
    setShowTranslation(false);
    setVocabIndex((prev) => (prev + 1) % VOCABULARY_SAMPLE.length);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-b border-[#1A1A1A] relative overflow-hidden">
      
      {/* Decorative hairline backdrop */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#D9FF3F]" />
              <span className="text-xs font-mono tracking-widest text-[#888888] uppercase">
                LEARNING LAB
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display leading-[1.02]">
              HỌC.<br />
              LUYỆN TẬP.<br />
              <span className="text-[#D9FF3F]">TIẾN BỘ.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed mb-6 font-normal">
              Bensop không chỉ cung cấp nội dung đọc đơn thuần. Chúng tôi xây dựng các phòng thực hành tương tác giúp người học biến lý thuyết thành bản năng.
            </p>

            {/* Filter buttons to switch view */}
            <div className="inline-flex items-center gap-1 p-1 bg-[#121212] border border-[#222222] rounded-lg">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                Tổng quan Lab
              </button>
              <button
                onClick={() => setActiveTab('vocab')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'vocab'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                Thử thẻ Flashcard
              </button>
              <button
                onClick={() => setActiveTab('grammar')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'grammar'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                Khám phá Ngữ pháp
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAB_MODULES.map((item) => (
              <div
                key={item.id}
                className="p-8 bg-[#0E0E0E] border border-[#202020] hover:border-[#383838] rounded-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D9FF3F] uppercase">
                      {item.title}
                    </span>
                    <span className="text-xs font-mono text-[#666666]">
                      {item.itemsCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D9FF3F] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs font-medium text-[#888888] mb-4">
                    {item.tagline}
                  </p>

                  <p className="text-xs text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1A1A1A] flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (item.type === 'vocabulary') setActiveTab('vocab');
                      else if (item.type === 'grammar') setActiveTab('grammar');
                      else if (item.type === 'quiz') onStartQuiz('quiz-zh-01');
                      else setActiveTab('vocab');
                    }}
                    className="text-xs font-bold text-white group-hover:text-[#D9FF3F] transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <span>{item.actionText}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Flashcard Tab */}
        {activeTab === 'vocab' && (
          <div className="max-w-2xl mx-auto p-6 sm:p-10 bg-[#0F0F0F] border border-[#262626] rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#202020]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D9FF3F]" />
                <span className="text-xs font-mono tracking-widest text-[#A0A0A0] uppercase">
                  FLASHCARD TƯƠNG TÁC (SPACED REPETITION)
                </span>
              </div>
              <span className="text-xs font-mono text-[#777]">
                Từ {vocabIndex + 1} / {VOCABULARY_SAMPLE.length}
              </span>
            </div>

            <div className="text-center py-6">
              <span className="inline-block text-xs font-mono font-semibold text-[#888888] mb-3 uppercase tracking-wider">
                {currentVocab.category} · Cấp độ: {currentVocab.level}
              </span>

              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3 font-display">
                {currentVocab.word}
              </div>

              <div className="text-base sm:text-lg font-mono text-[#D9FF3F] mb-6">
                {currentVocab.phonetic}
              </div>

              {/* Translation reveal button */}
              <div className="min-h-[100px] flex flex-col items-center justify-center">
                {showTranslation ? (
                  <div className="animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-lg sm:text-xl font-bold text-white mb-2">
                      {currentVocab.meaning}
                    </p>
                    <p className="text-xs sm:text-sm text-[#999999] italic max-w-md mx-auto">
                      "{currentVocab.example}"
                    </p>
                    <p className="text-xs text-[#666666] mt-1">
                      → {currentVocab.exampleTranslation}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowTranslation(true)}
                    className="px-6 py-2.5 bg-[#181818] hover:bg-[#222222] border border-[#333] rounded-lg text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    Xem nghĩa & câu ví dụ
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-[#202020] mt-4">
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs text-[#777] hover:text-white transition-colors"
              >
                ← Quay lại danh mục
              </button>

              <button
                onClick={handleNextVocab}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded-md transition-all cursor-pointer"
              >
                <span>Từ tiếp theo</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Interactive Grammar Tab */}
        {activeTab === 'grammar' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {GRAMMAR_SAMPLE.map((g) => (
              <div
                key={g.id}
                className="p-6 sm:p-8 bg-[#0F0F0F] border border-[#242424] rounded-xl"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#D9FF3F] mb-3 uppercase">
                  <span>{g.category}</span>
                  <span className="text-[#666]">Mẫu câu chuẩn</span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {g.title}
                </h4>

                <div className="p-4 bg-[#141414] rounded-lg border border-[#2A2A2A] font-mono text-xs sm:text-sm text-[#E0E0E0] mb-4">
                  <span className="text-[#D9FF3F] font-bold">Công thức: </span>
                  {g.formula}
                </div>

                <p className="text-xs sm:text-sm text-[#9A9A9A] mb-4 leading-relaxed">
                  {g.explanation}
                </p>

                <div className="pt-3 border-t border-[#1C1C1C] text-xs text-[#777]">
                  <strong className="text-white">Ví dụ áp dụng: </strong>
                  <span className="italic text-[#BBB]">{g.example}</span>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs text-[#777] hover:text-white underline underline-offset-4"
              >
                Quay lại tổng quan Lab
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
