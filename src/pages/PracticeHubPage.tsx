import React, { useState } from 'react';
import { QuizModel, DifficultyLevel, SkillType } from '../types/quiz';
import { QUIZ_MODELS } from '../data/quizModels';
import { QUESTIONS_BANK } from '../data/questions';
import { quizSessionStorage } from '../services/quizSessionStorage';
import {
  Sparkles,
  Zap,
  Target,
  Clock,
  Award,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Database,
  Flame,
  BookOpen,
  RotateCcw,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface PracticeHubPageProps {
  onNavigate: (path: string) => void;
  onStartQuiz: (quizSlug: string) => void;
  onStartCustomQuiz?: (questions: any[], title: string) => void;
}

export const PracticeHubPage: React.FC<PracticeHubPageProps> = ({
  onNavigate,
  onStartQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Custom Quiz Generator Modal state
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState<'tieng-anh' | 'tieng-trung' | 'phat-trien-ban-than' | 'suc-khoe-doi-song'>('tieng-anh');
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(10);
  const [customDifficulty, setCustomDifficulty] = useState<string>('all');

  const history = quizSessionStorage.getHistory();

  // Filter quizzes
  const filteredQuizzes = QUIZ_MODELS.filter((q) => {
    if (selectedCategory !== 'all' && q.categoryId !== selectedCategory) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const qText = searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(qText);
      const matchDesc = q.description.toLowerCase().includes(qText);
      const matchTopic = q.topics.some((t) => t.toLowerCase().includes(qText));
      if (!matchTitle && !matchDesc && !matchTopic) return false;
    }
    return true;
  });

  // Calculate weak areas / wrong questions from history
  const allWrongIds = React.useMemo(() => {
    const wrongSet = new Set<string>();
    history.forEach((h) => {
      const res = quizSessionStorage.getResult(h.sessionId);
      if (res && res.wrongQuestionIds) {
        res.wrongQuestionIds.forEach((id) => wrongSet.add(id));
      }
    });
    return Array.from(wrongSet);
  }, [history]);

  // Handle launch of custom practice
  const handleLaunchCustomQuiz = () => {
    setIsCustomModalOpen(false);
    // Find a matching standard quiz or placement test
    const matched = QUIZ_MODELS.find((q) => q.categoryId === customCategory) || QUIZ_MODELS[0];
    onStartQuiz(matched.slug);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Page Header */}
        <div className="border-b border-[#1E1E1E] pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#282828] text-xs font-mono text-[#D9FF3F] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
            <span>BENSOP QUIZ ENGINE & QUESTION BANK</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white uppercase leading-none mb-4">
                PHÒNG LUYỆN TẬP<br />
                <span className="text-[#D9FF3F]">& ĐÁNH GIÁ NĂNG LỰC.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#999] max-w-2xl font-normal leading-relaxed">
                Hệ thống ngân hàng hơn 100+ câu hỏi đa dạng bao gồm trắc nghiệm, điền từ, nối cặp, sửa lỗi ngữ pháp và audio phản xạ cho 4 lĩnh vực trọng tâm.
              </p>
            </div>

            {/* Platform Stats Pills */}
            <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3">
              <div className="flex-1 p-4 rounded-xl bg-[#101010] border border-[#222] flex items-center justify-between">
                <span className="text-xs font-mono text-[#777] uppercase">NGÂN HÀNG CÂU HỎI</span>
                <span className="text-xl font-bold font-display text-white">{QUESTIONS_BANK.length}+ CÂU</span>
              </div>
              <div className="flex-1 p-4 rounded-xl bg-[#101010] border border-[#222] flex items-center justify-between">
                <span className="text-xs font-mono text-[#777] uppercase">BÀI THI & CHUYÊN ĐỀ</span>
                <span className="text-xl font-bold font-display text-[#D9FF3F]">{QUIZ_MODELS.length} BỘ ĐỀ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Daily Challenge */}
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#222] hover:border-[#D9FF3F]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#D9FF3F]">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#D9FF3F] tracking-widest uppercase block">
                MỖI NGÀY 5 PHÚT
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors">
                Daily Reflex Challenge
              </h3>
              <p className="text-xs text-[#888] leading-relaxed">
                5 câu hỏi ngẫu nhiên tổng hợp kích hoạt tư duy và duy trì chuỗi học tập đều đặn.
              </p>
            </div>
            <button
              onClick={() => onStartQuiz('daily-challenge')}
              className="mt-6 w-full py-2.5 rounded-lg bg-[#161616] group-hover:bg-[#D9FF3F] text-white group-hover:text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>BẮT ĐẦU THỬ THÁCH</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Weak Areas Trainer */}
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#222] hover:border-amber-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-amber-400">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase block">
                SPACED REPETITION
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Luyện Lại Câu Sai
              </h3>
              <p className="text-xs text-[#888] leading-relaxed">
                {allWrongIds.length > 0
                  ? `Bạn có ${allWrongIds.length} câu hỏi từng làm sai cần được củng cố ngay.`
                  : 'Rèn luyện phản xạ và lặp lại ngắt quãng các điểm ngữ pháp & từ vựng dễ nhầm lẫn.'}
              </p>
            </div>
            <button
              onClick={() => onStartQuiz('quiz-en-02')}
              className="mt-6 w-full py-2.5 rounded-lg bg-[#161616] group-hover:bg-amber-400 text-white group-hover:text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LUYỆN TẬP ĐIỂM YẾU</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Question Bank Explorer */}
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#222] hover:border-[#D9FF3F]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#D9FF3F]">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#D9FF3F] tracking-widest uppercase block">
                QUESTION BROWSER
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors">
                Tra Cứu Ngân Hàng Câu Hỏi
              </h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Khám phá kho câu hỏi có giải thích chi tiết, gắn nhãn HSK/CEFR và tra cứu theo chủ đề.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/ngan-hang-cau-hoi')}
              className="mt-6 w-full py-2.5 rounded-lg bg-[#161616] group-hover:bg-[#D9FF3F] text-white group-hover:text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>DUYỆT NGÂN HÀNG CÂU HỎI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'TẤT CẢ LĨNH VỰC' },
                { id: 'tieng-anh', label: 'TIẾNG ANH' },
                { id: 'tieng-trung', label: 'TIẾNG TRUNG' },
                { id: 'phat-trien-ban-than', label: 'PHÁT TRIỂN BẢN THÂN' },
                { id: 'suc-khoe-doi-song', label: 'SỨC KHỎE & ĐỜI SỐNG' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#D9FF3F] text-black font-bold shadow-[0_0_15px_rgba(217,255,63,0.2)]'
                      : 'bg-[#101010] text-[#888] hover:text-white border border-[#222]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Custom Generator Trigger */}
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161616] hover:bg-[#202020] text-xs font-mono text-white border border-[#2E2E2E] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D9FF3F]" />
              <span>TẠO BÀI LUYỆN TẬP TÙY BIẾN</span>
            </button>

          </div>

          {/* Secondary Sub-filters: Type, Difficulty & Search */}
          <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#1E1E1E] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#666] flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                LỌC:
              </span>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-[#141414] border border-[#282828] text-xs font-mono text-white rounded-lg px-3 py-1.5 outline-none cursor-pointer"
              >
                <option value="all">Tất cả loại bài</option>
                <option value="topic">Chuyên đề (Topic)</option>
                <option value="placement">Kiểm tra trình độ (Placement)</option>
                <option value="mock-test">Thi thử (Mock Test)</option>
                <option value="practice">Luyện tập tự do</option>
                <option value="daily">Thử thách ngày (Daily)</option>
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-[#141414] border border-[#282828] text-xs font-mono text-white rounded-lg px-3 py-1.5 outline-none cursor-pointer"
              >
                <option value="all">Tất cả độ khó</option>
                <option value="Beginner">Cơ bản (Beginner)</option>
                <option value="Elementary">Sơ cấp (Elementary)</option>
                <option value="Intermediate">Trung cấp (Intermediate)</option>
                <option value="Upper Intermediate">Trung cao cấp (Upper Int)</option>
                <option value="Advanced">Nâng cao (Advanced)</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài quiz theo tên, chủ đề..."
                className="w-full bg-[#141414] border border-[#282828] focus:border-[#D9FF3F] text-xs font-mono text-white rounded-lg px-3 py-1.5 outline-none placeholder:text-[#555]"
              />
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((q) => {
            return (
              <div
                key={q.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#0C0C0C] border border-[#1E1E1E] hover:border-[#333] transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#D9FF3F] uppercase tracking-wider font-bold">
                      {q.categoryName}
                    </span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#161616] border border-[#282828] text-[#888]">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors leading-snug">
                      {q.title}
                    </h3>
                    <p className="text-xs text-[#888] mt-2 line-clamp-2 leading-relaxed">
                      {q.description}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {q.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141414] text-[#AAA] border border-[#222]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Card Meta & CTA */}
                <div className="pt-5 border-t border-[#181818] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#777]">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#888]" />
                      <span>{q.questionCount} câu hỏi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#888]" />
                      <span>{q.duration} phút</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#D9FF3F]" />
                      <span>Chuẩn {q.passingScore}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onStartQuiz(q.slug)}
                    className="w-full py-3 rounded-xl bg-[#141414] hover:bg-[#D9FF3F] text-white hover:text-black font-mono text-xs font-bold transition-all border border-[#282828] hover:border-[#D9FF3F] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(217,255,63,0.05)]"
                  >
                    <span>BẮT ĐẦU LÀM BÀI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#0D0D0D] border border-[#202020]">
            <Database className="w-10 h-10 text-[#555] mx-auto mb-3" />
            <p className="text-base font-bold text-white mb-1">Không tìm thấy bộ đề phù hợp</p>
            <p className="text-xs text-[#888] font-mono">Thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
          </div>
        )}

        {/* User Attempt History Section */}
        {history.length > 0 && (
          <div className="pt-12 border-t border-[#1E1E1E] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-wider block">
                  LỊCH SỬ LUYỆN TẬP CỦA BẠN
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  CÁC BÀI ĐÃ THỰC HIỆN GẦN ĐÂY
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#1E1E1E] bg-[#0C0C0C]">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1E1E1E] bg-[#101010] text-[#777]">
                    <th className="p-4 uppercase">Bài kiểm tra</th>
                    <th className="p-4 uppercase">Lĩnh vực</th>
                    <th className="p-4 uppercase">Điểm số</th>
                    <th className="p-4 uppercase">Độ chính xác</th>
                    <th className="p-4 uppercase">Thời gian</th>
                    <th className="p-4 uppercase">Trạng thái</th>
                    <th className="p-4 uppercase text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181818]">
                  {history.slice(0, 5).map((item) => (
                    <tr key={item.sessionId} className="hover:bg-[#121212] transition-colors">
                      <td className="p-4 font-bold text-white max-w-xs truncate">
                        {item.quizTitle}
                      </td>
                      <td className="p-4 text-[#888]">{item.categoryName}</td>
                      <td className="p-4 font-bold text-[#D9FF3F]">{item.score}%</td>
                      <td className="p-4 text-white">
                        {item.correctCount}/{item.totalQuestions} ({item.accuracy}%)
                      </td>
                      <td className="p-4 text-[#777]">{item.timeSpent}</td>
                      <td className="p-4">
                        {item.passed ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                            ĐẠT
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-800">
                            CHƯA ĐẠT
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => onNavigate(`/quiz-result/${item.sessionId}`)}
                          className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#252525] text-white hover:text-[#D9FF3F] transition-colors border border-[#2A2A2A] cursor-pointer"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Custom Quiz Generator Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-lg w-full bg-[#101010] border border-[#282828] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#202020]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#D9FF3F]" />
                <h3 className="text-base font-bold text-white font-mono uppercase">
                  TẠO BÀI TẬP TÙY CHỈNH
                </h3>
              </div>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="text-[#666] hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#888] block mb-2">CHỌN LĨNH VỰC HỌC TẬP:</label>
                <select
                  value={customCategory}
                  onChange={(e: any) => setCustomCategory(e.target.value)}
                  className="w-full bg-[#161616] border border-[#303030] text-white rounded-lg p-3 outline-none"
                >
                  <option value="tieng-anh">Tiếng Anh (English)</option>
                  <option value="tieng-trung">Tiếng Trung (Chinese)</option>
                  <option value="phat-trien-ban-than">Phát triển bản thân (Growth)</option>
                  <option value="suc-khoe-doi-song">Sức khỏe & Đời sống (Health)</option>
                </select>
              </div>

              <div>
                <label className="text-[#888] block mb-2">SỐ LƯỢNG CÂU HỎI:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCustomQuestionCount(num)}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        customQuestionCount === num
                          ? 'bg-[#D9FF3F] text-black font-bold border-[#D9FF3F]'
                          : 'bg-[#161616] text-white border-[#2A2A2A]'
                      }`}
                    >
                      {num} câu
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#888] block mb-2">ĐỘ KHÓ:</label>
                <select
                  value={customDifficulty}
                  onChange={(e) => setCustomDifficulty(e.target.value)}
                  className="w-full bg-[#161616] border border-[#303030] text-white rounded-lg p-3 outline-none"
                >
                  <option value="all">Tổng hợp mọi cấp độ</option>
                  <option value="Beginner">Cơ bản (Beginner)</option>
                  <option value="Intermediate">Trung cấp (Intermediate)</option>
                  <option value="Advanced">Nâng cao (Advanced)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-[#141414] border border-[#242424] text-[#888] leading-relaxed">
                Hệ thống sẽ tự động tổng hợp câu hỏi từ Ngân hàng đề thi và khởi tạo một phiên làm bài riêng biệt cho bạn.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#202020]">
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(false)}
                className="w-1/2 py-3 rounded-xl bg-[#161616] text-white font-mono text-xs border border-[#303030] cursor-pointer"
              >
                HỦY BỎ
              </button>
              <button
                type="button"
                onClick={handleLaunchCustomQuiz}
                className="w-1/2 py-3 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono font-extrabold text-xs cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.3)]"
              >
                BẮT ĐẦU LUYỆN TẬP
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
