import React, { useState } from 'react';
import { Question, QuestionType, SkillType, DifficultyLevel } from '../types/quiz';
import { QUESTIONS_BANK } from '../data/questions';
import { QuestionRenderer } from '../components/quiz/QuestionRenderer';
import {
  Database,
  Search,
  Filter,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCircle2,
  HelpCircle,
  BarChart,
  BookOpen
} from 'lucide-react';

interface QuestionBankPageProps {
  onNavigate: (path: string) => void;
  onPracticeQuiz?: (slug: string) => void;
}

export const QuestionBankPage: React.FC<QuestionBankPageProps> = ({
  onNavigate,
  onPracticeQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredQuestions = QUESTIONS_BANK.filter((q) => {
    if (selectedCategory !== 'all' && q.categoryId !== selectedCategory) return false;
    if (selectedSkill !== 'all' && q.skill !== selectedSkill) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const text = searchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(text);
      const matchTags = q.tags.some((t) => t.toLowerCase().includes(text));
      const matchExp = q.explanation?.general?.toLowerCase().includes(text);
      if (!matchQ && !matchTags && !matchExp) return false;
    }
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="border-b border-[#1E1E1E] pb-8">
          <button
            onClick={() => onNavigate('/luyen-tap')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI PHÒNG LUYỆN TẬP</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#282828] text-xs font-mono text-[#D9FF3F] mb-4">
                <Database className="w-3.5 h-3.5" />
                <span>KHO DỮ LIỆU ĐỀ THI</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-none">
                NGÂN HÀNG CÂU HỎI
              </h1>
              <p className="text-sm text-[#888] mt-3 max-w-2xl font-mono">
                Duyệt, tra cứu và nghiên cứu cơ sở lý thuyết của hơn {QUESTIONS_BANK.length} câu hỏi được phân loại theo tiêu chuẩn CEFR & HSK.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101010] border border-[#222] font-mono text-xs text-[#888] shrink-0">
              Tổng số câu tìm thấy: <strong className="text-[#D9FF3F] text-base ml-1">{filteredQuestions.length}</strong>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#1E1E1E] space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#666] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo nội dung câu hỏi, từ khóa, tag hoặc giải thích..."
              className="w-full bg-[#141414] border border-[#262626] focus:border-[#D9FF3F] text-sm text-white rounded-xl pl-11 pr-4 py-3 outline-none placeholder:text-[#555] font-sans"
            />
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            {/* Category */}
            <div>
              <label className="text-[#777] block mb-1">Lĩnh vực:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] text-white rounded-lg p-2.5 outline-none"
              >
                <option value="all">Tất cả lĩnh vực</option>
                <option value="tieng-anh">Tiếng Anh</option>
                <option value="tieng-trung">Tiếng Trung</option>
                <option value="phat-trien-ban-than">Phát triển bản thân</option>
                <option value="suc-khoe-doi-song">Sức khỏe & Đời sống</option>
              </select>
            </div>

            {/* Skill */}
            <div>
              <label className="text-[#777] block mb-1">Kỹ năng:</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] text-white rounded-lg p-2.5 outline-none"
              >
                <option value="all">Tất cả kỹ năng</option>
                <option value="Vocabulary">Từ vựng (Vocabulary)</option>
                <option value="Grammar">Ngữ pháp (Grammar)</option>
                <option value="Reading">Đọc hiểu (Reading)</option>
                <option value="Listening">Nghe hiểu (Listening)</option>
                <option value="Speaking">Nói & Giao tiếp (Speaking)</option>
                <option value="Writing">Viết & Dịch thuật (Writing)</option>
                <option value="Pronunciation">Phát âm & Thanh điệu</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="text-[#777] block mb-1">Dạng câu hỏi:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] text-white rounded-lg p-2.5 outline-none"
              >
                <option value="all">Tất cả dạng câu</option>
                <option value="multiple-choice">Trắc nghiệm đơn</option>
                <option value="multiple-select">Nhiều đáp án đúng</option>
                <option value="true-false">Đúng / Sai</option>
                <option value="fill-blank">Điền vào chỗ trống</option>
                <option value="matching">Ghép cặp tương ứng</option>
                <option value="ordering">Sắp xếp thứ tự</option>
                <option value="sentence-correction">Tìm lỗi sai câu</option>
                <option value="translation">Dịch thuật</option>
                <option value="listening">Nghe phản xạ</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-[#777] block mb-1">Độ khó:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] text-white rounded-lg p-2.5 outline-none"
              >
                <option value="all">Tất cả độ khó</option>
                <option value="Beginner">Cơ bản (Beginner)</option>
                <option value="Elementary">Sơ cấp (Elementary)</option>
                <option value="Intermediate">Trung cấp (Intermediate)</option>
                <option value="Upper Intermediate">Trung cao cấp</option>
                <option value="Advanced">Nâng cao (Advanced)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-[#0D0D0D] border border-[#1E1E1E] overflow-hidden transition-all hover:border-[#2D2D2D]"
              >
                {/* Header row: Click to toggle expand */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#181818] border border-[#262626] text-[#D9FF3F] font-bold uppercase">
                        {q.categoryId.replace('-', ' ')}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#242424] text-white">
                        {q.skill}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#242424] text-[#888]">
                        {q.type}
                      </span>
                      {q.cefrLevel && (
                        <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#242424] text-amber-300">
                          {q.cefrLevel}
                        </span>
                      )}
                      {q.hskLevel && (
                        <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#242424] text-amber-300">
                          {q.hskLevel}
                        </span>
                      )}
                      {q.stats && (
                        <span className="ml-auto text-emerald-400 font-bold hidden sm:inline-block">
                          Độ chính xác: {q.stats.accuracy}% ({q.stats.timesCorrect}/{q.stats.timesAttempted} lượt)
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      <span className="font-mono text-xs text-[#666] mr-2">#{idx + 1}</span>
                      {q.question}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {q.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-[#666] flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="p-2 text-[#777] hover:text-white shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Detailed Preview */}
                {isExpanded && (
                  <div className="border-t border-[#1A1A1A] p-6 sm:p-8 bg-[#090909]">
                    <QuestionRenderer
                      question={q}
                      userAnswer={q.correctAnswer}
                      onChangeAnswer={() => {}}
                      isReviewMode={true}
                      showExplanation={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="p-12 rounded-2xl bg-[#0D0D0D] border border-[#202020] text-center space-y-3">
            <Database className="w-10 h-10 text-[#555] mx-auto" />
            <p className="text-base font-bold text-white">Không tìm thấy câu hỏi phù hợp</p>
            <p className="text-xs text-[#888] font-mono">Hãy thử xóa bộ lọc hoặc tìm từ khóa khác.</p>
          </div>
        )}

      </div>
    </div>
  );
};
