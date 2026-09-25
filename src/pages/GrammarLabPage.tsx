import React, { useState } from 'react';
import { LanguageCode } from '../types/vocabulary';
import { GrammarConcept } from '../types/grammar';
import { grammarService } from '../services/grammarService';
import { getGrammarTopics } from '../data/grammarTopics';
import { GrammarCard } from '../components/grammar/GrammarCard';
import {
  Sparkles,
  BookOpen,
  Filter,
  Search,
  ArrowRight,
  RotateCcw,
  Layers,
  Award
} from 'lucide-react';

interface GrammarLabPageProps {
  language: LanguageCode;
  onNavigate: (path: string) => void;
  onSelectConcept: (concept: GrammarConcept) => void;
}

export const GrammarLabPage: React.FC<GrammarLabPageProps> = ({
  language,
  onNavigate,
  onSelectConcept
}) => {
  const languagePrefix = language === 'en' ? 'tieng-anh' : 'tieng-trung';
  const languageTitle = language === 'en' ? 'TIẾNG ANH' : 'TIẾNG TRUNG';

  const topics = getGrammarTopics(language);
  const allConcepts = grammarService.getAllConcepts(language);

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = language === 'en'
    ? ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    : ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];

  const filteredConcepts = allConcepts.filter((c) => {
    if (selectedTopic !== 'all' && c.topic !== selectedTopic && !c.tags.includes(selectedTopic)) return false;
    if (selectedLevel !== 'all' && c.level !== selectedLevel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDesc = c.shortDescription.toLowerCase().includes(q);
      const matchIdea = c.theIdea.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchIdea) return false;
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
            <span>BENSOP GRAMMAR LAB — {languageTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs font-mono tracking-widest text-[#888] uppercase block">
                GRAMMAR LAB
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white uppercase leading-none">
                UNDERSTAND THE<br />
                <span className="text-[#D9FF3F]">SYSTEM BEHIND THE LANGUAGE.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#999] max-w-2xl font-normal leading-relaxed">
                Không chỉ học quy tắc khô khan. Thấu hiểu cơ chế vận hành, bản chất logic của ngữ pháp và biết cách áp dụng nhuần nhuyễn vào thực tế.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    const firstConcept = allConcepts[0];
                    if (firstConcept) onNavigate(`/${languagePrefix}/grammar/${firstConcept.slug}`);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.25)]"
                >
                  <span>EXPLORE GRAMMAR</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={() => onNavigate('/luyen-tap')}
                  className="px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-white font-mono text-xs font-bold border border-[#2B2B2B] hover:border-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D9FF3F]" />
                  <span>PRACTICE GRAMMAR</span>
                </button>

                <button
                  onClick={() => onNavigate(`/${languagePrefix}/grammar/review`)}
                  className="px-5 py-3.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-[#AAA] hover:text-white font-mono text-xs border border-[#262626] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>GRAMMAR REVIEW</span>
                </button>
              </div>
            </div>

            {/* Platform Stats Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">ĐIỂM NGỮ PHÁP</span>
                <span className="text-2xl font-bold font-display text-white">{allConcepts.length}+ CONCEPTS</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">CHUYÊN ĐỀ</span>
                <span className="text-2xl font-bold font-display text-[#D9FF3F]">{topics.length} MODULES</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">HỆ ĐỐI CHIẾU</span>
                <span className="text-xl font-bold font-display text-white">COMPARISON</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#202020]">
                <span className="text-xs font-mono text-[#777] uppercase block mb-1">CẢNH BÁO LỖI</span>
                <span className="text-xl font-bold font-display text-red-400">COMMON MISTAKES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grammar Topics Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                DANH MỤC CHỦ ĐỀ NGỮ PHÁP
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                GRAMMAR MODULES
              </h2>
            </div>
            <span className="text-xs font-mono text-[#888]">
              {topics.length} CHỦ ĐỀ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((t) => {
              const isSelected = selectedTopic === t.slug || selectedTopic === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(isSelected ? 'all' : t.slug)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    isSelected
                      ? 'bg-[#181818] border-[#D9FF3F] shadow-[0_0_20px_rgba(217,255,63,0.1)]'
                      : 'bg-[#0D0D0D] border-[#1E1E1E] hover:border-[#333]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#888]">
                      <span className="text-[#D9FF3F] uppercase font-bold">{t.levelRange}</span>
                      <span>{t.conceptCount} ĐIỂM NGỮ PHÁP</span>
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
                      {isSelected ? 'Đang lọc chủ đề này' : 'Chọn xem chủ đề'}
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

        {/* Filter Toolbar */}
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

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm ngữ pháp, quy tắc, cấu trúc..."
                className="w-full bg-[#121212] border border-[#252525] focus:border-[#D9FF3F] text-xs font-mono text-white rounded-xl pl-10 pr-4 py-2.5 outline-none placeholder:text-[#555]"
              />
            </div>
          </div>
        </div>

        {/* Grammar Concepts Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#777]">
            <span>HIỂN THỊ {filteredConcepts.length} ĐIỂM NGỮ PHÁP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConcepts.map((concept) => (
              <GrammarCard
                key={concept.id}
                concept={concept}
                onSelect={(c) => onNavigate(`/${languagePrefix}/grammar/${c.slug}`)}
              />
            ))}
          </div>

          {filteredConcepts.length === 0 && (
            <div className="p-16 rounded-3xl bg-[#0D0D0D] border border-[#202020] text-center space-y-3">
              <BookOpen className="w-10 h-10 text-[#555] mx-auto" />
              <p className="text-base font-bold text-white">Không tìm thấy điểm ngữ pháp phù hợp</p>
              <p className="text-xs text-[#888] font-mono">
                Thử thay đổi cấp độ hoặc từ khóa tìm kiếm.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
