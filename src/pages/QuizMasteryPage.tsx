import React from 'react';
import { QuizResult } from '../types/quiz';
import { quizSessionStorage } from '../services/quizSessionStorage';
import { masteryService } from '../services/masteryService';
import { spacedReviewService } from '../services/spacedReviewService';
import { ArrowRight, Brain, CalendarClock, TrendingDown, TrendingUp } from 'lucide-react';

interface QuizMasteryPageProps {
  sessionId: string;
  onNavigate: (path: string) => void;
}

export const QuizMasteryPage: React.FC<QuizMasteryPageProps> = ({ sessionId, onNavigate }) => {
  const result: QuizResult | null = quizSessionStorage.getResult(sessionId);
  const mastery = masteryService.getSnapshot();
  const weakAreas = masteryService.getWeakAreas(5);
  const review = spacedReviewService.getForQuiz(result?.quizSlug || '');

  if (!result) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-24 px-5 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-10 h-10 text-[#D9FF3F] mx-auto mb-4" />
          <p className="font-bold mb-4">Chưa có dữ liệu mastery cho bài này.</p>
          <button onClick={() => onNavigate('/luyen-tap')} className="px-5 py-3 bg-[#D9FF3F] text-black rounded-xl font-mono text-xs font-bold">
            VỀ PHÒNG LUYỆN TẬP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white px-5 sm:px-8 pt-24 pb-20">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#202020]">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-5 h-5 text-[#D9FF3F]" />
            <span className="text-xs font-mono text-[#D9FF3F] tracking-widest">MASTERY ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase">Kết quả đã trở thành năng lực học tập</h1>
          <p className="text-sm text-[#888] mt-3 max-w-2xl">
            Bensop đã cập nhật dữ liệu từ bài quiz này để điều chỉnh mức độ thành thạo và lịch ôn tiếp theo.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <div className="p-4 rounded-xl bg-[#151515] border border-[#262626]">
              <span className="text-[10px] font-mono text-[#777] block">MASTERY TỔNG</span>
              <strong className="text-3xl text-[#D9FF3F]">{mastery.overall}%</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#151515] border border-[#262626]">
              <span className="text-[10px] font-mono text-[#777] block">ĐIỂM QUIZ</span>
              <strong className="text-3xl">{result.score}%</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#151515] border border-[#262626]">
              <span className="text-[10px] font-mono text-[#777] block">CÂU ĐÚNG</span>
              <strong className="text-3xl">{result.correctCount}/{result.totalQuestions}</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#151515] border border-[#262626]">
              <span className="text-[10px] font-mono text-[#777] block">ÔN TIẾP</span>
              <strong className="text-3xl">{review[0] ? new Date(review[0].dueAt).toLocaleDateString('vi-VN') : '—'}</strong>
            </div>
          </div>
        </div>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#202020]">
            <h2 className="font-bold uppercase flex items-center gap-2 mb-5"><TrendingUp className="w-4 h-4 text-[#D9FF3F]" /> Kỹ năng vừa cập nhật</h2>
            <div className="space-y-4">
              {result.questionBreakdowns.length === 0 ? <p className="text-sm text-[#777]">Chưa có dữ liệu.</p> : result.questionBreakdowns.slice(0, 8).map((item) => {
                const record = mastery.questions.find((m) => m.entityId === item.questionId);
                return (
                  <div key={item.questionId} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white truncate">{item.question.question}</div>
                      <div className="h-1.5 bg-[#1A1A1A] rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#D9FF3F]" style={{ width: `${record?.mastery ?? 0}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#D9FF3F]">{record?.mastery ?? 0}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#202020]">
            <h2 className="font-bold uppercase flex items-center gap-2 mb-5"><TrendingDown className="w-4 h-4 text-amber-300" /> Khu vực cần củng cố</h2>
            <div className="space-y-3">
              {weakAreas.length ? weakAreas.map((area) => (
                <div key={area.id} className="p-3 rounded-xl bg-[#111] border border-[#222] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold">{area.label}</div>
                    <div className="text-[10px] text-[#777] font-mono">{area.attempts} lượt · {area.mastery}% mastery</div>
                  </div>
                  <button onClick={() => onNavigate('/luyen-tap')} className="text-xs font-mono text-[#D9FF3F] flex items-center gap-1">
                    LUYỆN <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )) : <p className="text-sm text-[#777]">Chưa có vùng cần củng cố.</p>}
            </div>
          </div>
        </section>

        <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#202020]">
          <div className="flex items-center gap-2 mb-4">
            <CalendarClock className="w-4 h-4 text-[#D9FF3F]" />
            <h2 className="font-bold uppercase">Spaced Review đã được kích hoạt</h2>
          </div>
          <p className="text-sm text-[#888]">
            Kết quả {result.score}% đã tạo lịch ôn theo mức độ nhớ: {result.score >= 80 ? '7 ngày' : result.score >= 60 ? '3 ngày' : '1 ngày'}.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={() => onNavigate('/dashboard')} className="px-5 py-3 bg-[#D9FF3F] text-black rounded-xl font-mono text-xs font-bold">XEM DASHBOARD</button>
            <button onClick={() => onNavigate('/luyen-tap')} className="px-5 py-3 bg-[#151515] border border-[#292929] rounded-xl font-mono text-xs">LUYỆN THÊM</button>
          </div>
        </div>
      </div>
    </div>
  );
};
