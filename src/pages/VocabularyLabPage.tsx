import React, { useState } from 'react';
import { LanguageCode, VocabularyWord } from '../types/vocabulary';
import { vocabularyService } from '../services/vocabularyService';
import { getVocabularyTopics } from '../data/vocabularyTopics';
import { VocabularyCard } from '../components/vocabulary/VocabularyCard';
import {
  Sparkles,
  BookOpen,
  Filter,
  Search,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Layers,
  RotateCcw
} from 'lucide-react';

interface VocabularyLabPageProps {
  language: LanguageCode;
  onNavigate: (path: string) => void;
  onSelectWord: (word: VocabularyWord) => void;
}

export const VocabularyLabPage: React.FC<VocabularyLabPageProps> = ({
  language,
  onNavigate,
  onSelectWord
}) => {
  const languagePrefix = language === 'en' ? 'tieng-anh' : 'tieng-trung';
  const languageTitle = language === 'en' ? 'TIẾNG ANH' : 'TIẾNG TRUNG';

  const topics = getVocabularyTopics(language);
  const allWords = vocabularyService.getAllWords(language);

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = language === 'en'
    ? ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    : ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];

  const filteredWords = allWords.filter((w) => {
    if (selectedTopic !== 'all' && w.topicId !== selectedTopic && !w.tags.includes(selectedTopic)) return false;
    if (selectedLevel !== 'all' && w.level !== selectedLevel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchWord = w.word.toLowerCase().includes(q);
      const matchMeaning = w.meaning.toLowerCase().includes(q);
      const matchPron = w.pronunciation.toLowerCase().includes(q);
      if (!matchWord && !matchMeaning && !matchPron) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="border-b border-[#1E1E1E] pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#262626] text-xs font-mono text-[#D9FF3F] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
            <span>BENSOP VOCABULARY LAB — {languageTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs font-mono tracking-widest text-[#888] uppercase block">
                VOCABULARY LAB
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white uppercase leading-none">
                BUILD YOUR<br />
                <span className="text-[#D9FF3F]">WORD POWER.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#999] max-w-2xl font-normal leading-relaxed">
                Học từ vựng theo ngữ cảnh thực tế, luyện tập phản xạ và ghi nhớ dài hạn thông qua chu trình lặp lại ngắt quãng (Spaced Repetition).
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate(`/${languagePrefix}/vocabulary/practice`)}
                  className="px-6 py-3.5 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.25)]"
                >
                  <span>START LEARNING</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={() => onNavigate(`/${languagePrefix}/vocabulary/practice`)}
                  className="px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-white font-mono text-xs font-bold border border-[#2B2B2B] hover:border-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D9FF3F]" />
                  <span>PRACTICE VOCABULARY</span>
                </button>

                <button
                  onClick={() => onNavigate(`/${languagePrefix}/vocabulary/review`)}
                  className="px-5 py-3.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-[#AAA] hover:text-white font-mono text-xs border border-[#262626] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>WORDS TO REVIEW</span>
                </button>
              </div>
            </div>

            {/* Platform Stats Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">TỔNG TỪ VỰNG</span>
                <span className="text-2xl font-bold font-display text-white">1,000+ WORDS</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">CHUYÊN ĐỀ</span>
                <span className="text-2xl font-bold font-display text-[#D9FF3F]">50+ TOPICS</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">CẤP ĐỘ PHỦ RỘNG</span>
                <span className="text-xl font-bold font-display text-white">
                  {language === 'en' ? 'A1 — C2' : 'HSK 1 — 6'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">LUYỆN TẬP</span>
                <span className="text-xl font-bold font-display text-emerald-400">INTERACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vocabulary Topics Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                CHỦ ĐỀ TỪ VỰNG THEO NGỮ CẢNH
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                TOPIC DIRECTORY
              </h2>
            </div>
            <span className="text-xs font-mono text-[#888]">
              {topics.length} CHỦ ĐỀ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((t) => {
              const isSelected = selectedTopic === t.slug || selectedTopic === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(isSelected ? 'all' : t.slug)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isSelected
                      ? 'bg-[#181818] border-[#D9FF3F] shadow-[0_0_20px_rgba(217,255,63,0.1)]'
                      : 'bg-[#0D0D0D] border-[#1E1E1E] hover:border-[#333]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#888]">
                      <span className="text-[#D9FF3F] uppercase font-bold">{t.difficulty}</span>
                      <span>{t.wordCount} TỪ</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors line-clamp-1">
                      {t.name}
                    </h3>

                    <p className="text-xs text-[#777] line-clamp-2 leading-relaxed">
                      {t.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#555]">
                      {isSelected ? 'Đang chọn' : 'Khám phá'}
                    </span>
                    <span className="text-white group-hover:text-[#D9FF3F] font-bold flex items-center gap-1">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Level Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono text-[#666] mr-2">CẤP ĐỘ:</span>
              <button
                onClick={() => setSelectedLevel('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedLevel === 'all'
                    ? 'bg-[#D9FF3F] text-black font-bold'
                    : 'bg-[#121212] text-[#888] hover:text-white border border-[#222]'
                }`}
              >
                TẤT CẢ
              </button>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-[#D9FF3F] text-black font-bold'
                      : 'bg-[#121212] text-[#888] hover:text-white border border-[#222]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ vựng, pinyin, nghĩa..."
                className="w-full bg-[#121212] border border-[#252525] focus:border-[#D9FF3F] text-xs font-mono text-white rounded-xl pl-10 pr-4 py-2.5 outline-none placeholder:text-[#555]"
              />
            </div>

          </div>

          {/* Active Filter Indicators */}
          {(selectedTopic !== 'all' || selectedLevel !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
              <span>Đang lọc:</span>
              {selectedTopic !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#181818] text-[#D9FF3F] border border-[#282828]">
                  Chủ đề: {selectedTopic}
                </span>
              )}
              {selectedLevel !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#181818] text-white border border-[#282828]">
                  Level: {selectedLevel}
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedTopic('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
                className="text-zinc-500 hover:text-white underline cursor-pointer ml-2"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Word Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#777]">
            <span>HIỂN THỊ {filteredWords.length} TỪ VỰNG</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWords.map((word) => (
              <VocabularyCard
                key={word.id}
                word={word}
                onSelect={(w) => onNavigate(`/${languagePrefix}/vocabulary/${w.slug}`)}
              />
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="p-16 rounded-3xl bg-[#0D0D0D] border border-[#202020] text-center space-y-3">
              <BookOpen className="w-10 h-10 text-[#555] mx-auto" />
              <p className="text-base font-bold text-white">Không tìm thấy từ vựng phù hợp</p>
              <p className="text-xs text-[#888] font-mono">
                Thử đổi cấp độ hoặc từ khóa tìm kiếm.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
