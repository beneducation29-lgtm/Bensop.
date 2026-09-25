import React, { useState } from 'react';
import { QuizResult } from '../types/quiz';
import { quizSessionStorage } from '../services/quizSessionStorage';
import { QuestionRenderer } from '../components/quiz/QuestionRenderer';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Share2,
  BarChart3,
  Bookmark,
  Check
} from 'lucide-react';

interface QuizResultPageProps {
  sessionId?: string;
  result?: QuizResult | null;
  onNavigate: (path: string) => void;
  onRetakeQuiz: (quizSlug: string) => void;
  onPracticeWrongQuestions?: (questionIds: string[]) => void;
}

export const QuizResultPage: React.FC<QuizResultPageProps> = ({
  sessionId,
  result: propResult,
  onNavigate,
  onRetakeQuiz,
  onPracticeWrongQuestions,
}) => {
  // Resolve result from props or localStorage
  const result: QuizResult | null = React.useMemo(() => {
    if (propResult) return propResult;
    if (sessionId) return quizSessionStorage.getResult(sessionId);
    const history = quizSessionStorage.getHistory();
    if (history.length > 0) {
      return quizSessionStorage.getResult(history[0].sessionId);
    }
    return null;
  }, [propResult, sessionId]);

  const [activeTab, setActiveTab] = useState<'all' | 'wrong' | 'correct'>('all');
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 text-center pt-24">
        <div className="max-w-md">
          <Award className="w-12 h-12 text-[#D9FF3F] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Chưa có kết quả làm bài</h2>
          <p className="text-sm text-[#888] mb-6">Hãy tham gia một bài luyện tập để xem bảng thống kê phân tích.</p>
          <button
            onClick={() => onNavigate('/luyen-tap')}
            className="px-6 py-3 bg-[#D9FF3F] text-black rounded-lg font-mono text-xs font-bold cursor-pointer"
          >
            ĐẾN PHÒNG LUYỆN TẬP
          </button>
        </div>
      </div>
    );
  }

  const formatTimeSpent = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredBreakdowns = result.questionBreakdowns.filter((b) => {
    if (activeTab === 'wrong') return !b.isCorrect;
    if (activeTab === 'correct') return b.isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Top Back Nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('/luyen-tap')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI PHÒNG LUYỆN TẬP</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-xs font-mono text-[#888] hover:text-white border border-[#262626] cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#D9FF3F]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'ĐÃ SAO CHÉP LIÊN KẾT' : 'CHIA SẺ KẾT QUẢ'}</span>
          </button>
        </div>

        {/* Hero Score Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C0C0C] border border-[#202020] relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20 ${
              result.passed ? 'bg-[#D9FF3F]/10' : 'bg-amber-500/10'
            }`}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Status & Score */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider border">
                {result.passed ? (
                  <span className="text-[#D9FF3F] bg-[#16220E] border-[#D9FF3F]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ĐẠT CHUẨN XUẤT SẮC
                  </span>
                ) : (
                  <span className="text-amber-400 bg-amber-950/40 border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    CẦN CẢI THIỆN THÊM
                  </span>
                )}
                <span className="text-[#888]">{result.categoryName}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black font-display text-white uppercase leading-tight">
                {result.quizTitle}
              </h1>

              <p className="text-sm text-[#888] font-mono">
                Hoàn thành lúc: {new Date(result.completedAt).toLocaleTimeString('vi-VN')} · Ngày {new Date(result.completedAt).toLocaleDateString('vi-VN')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onRetakeQuiz(result.quizSlug)}
                  className="px-5 py-3 rounded-xl bg-[#141414] hover:bg-[#202020] text-white font-mono text-xs font-bold border border-[#2B2B2B] hover:border-[#D9FF3F] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>LÀM LẠI TOÀN BỘ BÀI</span>
                </button>

                {result.wrongQuestionIds.length > 0 && onPracticeWrongQuestions && (
                  <button
                    onClick={() => onPracticeWrongQuestions(result.wrongQuestionIds)}
                    className="px-5 py-3 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.25)]"
                  >
                    <span>LUYỆN RIÊNG {result.wrongQuestionIds.length} CÂU SAI</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Giant Score Metrics */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] text-center">
                <span className="text-[11px] font-mono text-[#888] uppercase block mb-1">ĐIỂM SỐ ĐẠT ĐƯỢC</span>
                <span className="text-4xl sm:text-5xl font-black font-display text-[#D9FF3F] block">
                  {result.score}%
                </span>
                <span className="text-xs font-mono text-[#666] mt-1 block">
                  {result.earnedPoints} / {result.totalPoints} Điểm
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] text-center">
                <span className="text-[11px] font-mono text-[#888] uppercase block mb-1">ĐỘ CHÍNH XÁC</span>
                <span className="text-4xl sm:text-5xl font-black font-display text-white block">
                  {result.accuracy}%
                </span>
                <span className="text-xs font-mono text-[#666] mt-1 block">
                  {result.correctCount} / {result.totalQuestions} Câu đúng
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#101010] border border-[#222] text-center col-span-2 flex items-center justify-around text-xs font-mono text-[#888]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D9FF3F]" />
                  <span>Thời gian: <strong className="text-white">{formatTimeSpent(result.timeSpent)}</strong></span>
                </div>
                <div className="h-4 w-px bg-[#262626]" />
                <div>
                  Câu sai: <strong className="text-red-400">{result.wrongCount}</strong>
                </div>
                <div className="h-4 w-px bg-[#262626]" />
                <div>
                  Chưa trả lời: <strong className="text-zinc-400">{result.unansweredCount}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Analytics Breakdown Grid: Skills & Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skill Breakdown */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0D0D] border border-[#202020] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E1E1E]">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#D9FF3F]" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  NĂNG LỰC THEO KỸ NĂNG
                </h3>
              </div>
              <span className="text-xs font-mono text-[#777]">{Object.keys(result.skillBreakdown).length} KỸ NĂNG</span>
            </div>

            <div className="space-y-4">
              {Object.entries(result.skillBreakdown).map(([skill, stat]) => (
                <div key={skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-medium">{skill}</span>
                    <span className="text-[#D9FF3F] font-bold">
                      {stat.correct}/{stat.total} ({stat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        stat.percentage >= 80
                          ? 'bg-[#D9FF3F]'
                          : stat.percentage >= 60
                          ? 'bg-amber-400'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Breakdown */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0D0D] border border-[#202020] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E1E1E]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D9FF3F]" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  ĐỘ CHÍNH XÁC THEO CHỦ ĐỀ
                </h3>
              </div>
              <span className="text-xs font-mono text-[#777]">{Object.keys(result.topicBreakdown).length} CHỦ ĐỀ</span>
            </div>

            <div className="space-y-4">
              {Object.entries(result.topicBreakdown).map(([topic, stat]) => (
                <div key={topic} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-medium uppercase">{topic}</span>
                    <span className="text-zinc-300">
                      {stat.correct}/{stat.total} ({stat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-400 transition-all duration-500 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202020]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white uppercase">
                XEM LẠI CHI TIẾT TỪNG CÂU HỎI
              </h2>
              <p className="text-xs font-mono text-[#888] mt-1">
                Phân tích lỗi sai, đáp án mẫu và ghi nhớ quy tắc ngữ pháp / từ vựng cốt lõi.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#121212] p-1 rounded-xl border border-[#222]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === 'all' ? 'bg-[#222] text-white font-bold' : 'text-[#888] hover:text-white'
                }`}
              >
                TẤT CẢ ({result.totalQuestions})
              </button>
              <button
                onClick={() => setActiveTab('wrong')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === 'wrong'
                    ? 'bg-red-950/60 text-red-200 border border-red-500/40 font-bold'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                CÂU SAI ({result.wrongCount})
              </button>
              <button
                onClick={() => setActiveTab('correct')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === 'correct'
                    ? 'bg-emerald-950/60 text-emerald-200 border border-emerald-500/40 font-bold'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                CÂU ĐÚNG ({result.correctCount})
              </button>
            </div>
          </div>

          {/* List of Question Breakdown Cards */}
          <div className="space-y-8">
            {filteredBreakdowns.map((item, idx) => (
              <div
                key={item.questionId}
                className={`p-6 sm:p-10 rounded-2xl border transition-all ${
                  item.isCorrect
                    ? 'bg-[#0A0A0A] border-[#1F1F1F]'
                    : 'bg-[#0E0A0A] border-red-900/30'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-white">
                      CÂU {idx + 1}
                    </span>
                    {item.isCorrect ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        CHÍNH XÁC (+{item.earnedPoints} ĐIỂM)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/80 text-red-300 border border-red-800 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        CHƯA CHÍNH XÁC (0 ĐIỂM)
                      </span>
                    )}
                  </div>
                </div>

                <QuestionRenderer
                  question={item.question}
                  userAnswer={item.userAnswer}
                  onChangeAnswer={() => {}}
                  isReviewMode={true}
                  showExplanation={true}
                />
              </div>
            ))}
          </div>

          {/* Bottom Navigation CTA */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[#202020]">
            <button
              onClick={() => onNavigate('/luyen-tap')}
              className="w-full sm:w-auto px-8 py-4 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs font-mono tracking-tight rounded-xl transition-all cursor-pointer shadow-[0_0_25px_rgba(217,255,63,0.2)]"
            >
              QUAY VỀ PHÒNG LUYỆN TẬP
            </button>
            <button
              onClick={() => onNavigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-[#141414] hover:bg-[#202020] text-white font-bold text-xs font-mono tracking-tight border border-[#2B2B2B] rounded-xl transition-all cursor-pointer"
            >
              XEM BẢNG PHÂN TÍCH HỌC TẬP
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
