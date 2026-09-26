import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { UserProgress, Article, Course } from '../types';
import { getRecommendations } from '../data/recommendations';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { Flame, CheckCircle, Award, Clock, ArrowRight, Play, BookOpen, Bookmark, Target, BarChart3, Zap, Sparkles, RotateCcw } from 'lucide-react';
import { quizSessionStorage } from '../services/quizSessionStorage';
import { learningProgressService } from '../services/learningProgressService';
import { recommendationService } from '../services/recommendationService';
import { spacedReviewService } from '../services/spacedReviewService';
import { LESSONS } from '../data/lessons';
import { masteryService } from '../services/masteryService';
import { learnerProfileService } from '../services/learnerProfileService';
import { adaptiveSessionService } from '../services/adaptiveSessionService';

interface DashboardPageProps {
  user: UserProgress;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (lessonSlug: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
  onSelectLesson,
}) => {
  const [activeInterest, setActiveInterest] = useState<'tieng-anh' | 'tieng-trung' | 'phat-trien-ban-than' | 'suc-khoe-doi-song'>('tieng-anh');

  const recommendations = getRecommendations(activeInterest);
  const dueReviews = spacedReviewService.getDue().slice(0, 5);
  const masterySnapshot = masteryService.getSnapshot();
  const nextLearningActions = recommendationService.getNextLearningActions(3);
  const adaptiveSession = adaptiveSessionService.buildSession();
  const learningSkillSnapshot = recommendationService.getLearningSkillSnapshot();
  const learnerProfile = learnerProfileService.getSnapshot();

  const handleOpenRecommended = (slug: string, type: 'article' | 'course') => {
    if (type === 'article') {
      const art = ARTICLES.find((a) => a.slug === slug);
      if (art) onSelectArticle(art);
      else onNavigate(`/bai-viet/${slug}`);
    } else {
      const crs = COURSES.find((c) => c.slug === slug);
      if (crs) onSelectCourse(crs);
      else onNavigate(`/khoa-hoc/${slug}`);
    }
  };

  return (
    <div className="pt-24 pb-28 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'BẢNG ĐIỀU KHIỂN HỌC VIÊN' }]}
          onNavigate={onNavigate}
        />

        {/* Hero Section */}
        <div className="py-8 sm:py-12 border-b border-[#1E1E1E] mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-2">
            WELCOME BACK, {user.name.toUpperCase()}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1] uppercase font-display mb-4">
            TIẾP TỤC HÀNH TRÌNH<br />
            <span className="text-[#A0A0A0]">CỦA BẠN.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#888] max-w-xl">
            Kỷ luật được đo bằng từng bài học bạn hoàn thành hôm nay. Bạn đang giữ vững chuỗi học tập rất tốt.
          </p>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-6 bg-[#0E0E0E] border border-[#222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888] mb-4">
              <span className="text-xs font-mono uppercase">Learning Streak</span>
              <Flame className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.streakDays} <span className="text-sm font-normal text-[#888]">ngày</span>
              </div>
              <div className="text-[11px] text-[#D9FF3F] font-mono mt-1">Đang hoạt động</div>
            </div>
          </div>

          <div className="p-6 bg-[#0E0E0E] border border-[#222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888] mb-4">
              <span className="text-xs font-mono uppercase">Lessons Completed</span>
              <CheckCircle className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.lessonsCompleted} <span className="text-sm font-normal text-[#888]">bài</span>
              </div>
              <div className="text-[11px] text-[#777] font-mono mt-1">+3 bài trong tuần</div>
            </div>
          </div>

          <div className="p-6 bg-[#0E0E0E] border border-[#222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888] mb-4">
              <span className="text-xs font-mono uppercase">Quiz Score</span>
              <Award className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.quizScore}%
              </div>
              <div className="text-[11px] text-[#777] font-mono mt-1">Độ chính xác trung bình</div>
            </div>
          </div>

          <div className="p-6 bg-[#0E0E0E] border border-[#222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888] mb-4">
              <span className="text-xs font-mono uppercase">Total Learning Time</span>
              <Clock className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.totalTime}
              </div>
              <div className="text-[11px] text-[#777] font-mono mt-1">Tổng thời gian học</div>
            </div>
          </div>
        </div>

        {/* DAILY LEARNING SESSION (Phase 4 Requirement 42) */}
        <div className="p-8 sm:p-10 bg-[#0C0C0C] border border-[#222] rounded-3xl mb-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D9FF3F]/5 blur-[80px] pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2B2B2B] text-xs font-mono text-[#D9FF3F]">
                <Sparkles className="w-3.5 h-3.5 text-[#D9FF3F]" />
                <span>DAILY LEARNING PROTOCOL — HÔM NAY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-display text-white uppercase tracking-tight">
                MỤC TIÊU PHẢN XẠ & CỦNG CỐ HẰNG NGÀY
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#141414] border border-[#222]">
                  <span className="text-[#777] block mb-1">TỪ VỰNG MỚI:</span>
                  <span className="font-bold text-white text-sm">5 Từ vựng</span>
                </div>
                <div className="p-3 rounded-xl bg-[#141414] border border-[#222]">
                  <span className="text-[#777] block mb-1">NGỮ PHÁP:</span>
                  <span className="font-bold text-[#D9FF3F] text-sm">Present Perfect</span>
                </div>
                <div className="p-3 rounded-xl bg-[#141414] border border-[#222]">
                  <span className="text-[#777] block mb-1">LUYỆN TẬP:</span>
                  <span className="font-bold text-white text-sm">10 Câu hỏi</span>
                </div>
                <div className="p-3 rounded-xl bg-[#141414] border border-[#222]">
                  <span className="text-[#777] block mb-1">ÔN TẬP (SRS):</span>
                  <span className="font-bold text-amber-300 text-sm">12 Từ cần ôn</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/tieng-anh/vocabulary/practice')}
                className="px-8 py-4 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono font-extrabold text-xs tracking-tight rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,255,63,0.25)]"
              >
                <span>START TODAY'S SESSION</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={() => onNavigate('/tieng-anh/vocabulary/review')}
                className="px-6 py-3 bg-[#141414] hover:bg-[#202020] text-zinc-300 font-mono text-xs rounded-xl border border-[#262626] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>XEM TỪ CẦN ÔN TẬP</span>
              </button>
            </div>
          </div>
        </div>

        {/* NEXT 3 LEARNING ACTIONS */}
        <section className="mb-12 rounded-3xl border border-[#D9FF3F]/20 bg-[#0D0D0D] p-6 sm:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">
              <Zap className="w-3.5 h-3.5" />
              PERSONALIZED LEARNING PATH
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black uppercase text-white">3 BƯỚC TIẾP THEO.</h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#777]">
              Bensop xếp thứ tự dựa trên lượt ôn đến hạn, điểm yếu và mức độ luyện của từng kỹ năng.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {nextLearningActions.map((action, index) => (
              <button
                key={`${action.type}-${action.path}`}
                onClick={() => onNavigate(action.path)}
                className={`rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 ${
                  index === 0 ? 'border-[#D9FF3F]/50 bg-[#121212]' : 'border-[#222] bg-[#101010] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#D9FF3F]">BƯỚC {index + 1} · {action.priority.toUpperCase()}</span>
                  <span className="text-[9px] font-mono text-[#666]">{action.durationMinutes} PHÚT</span>
                </div>
                <h3 className="mt-3 text-base font-black uppercase text-white">{action.title}</h3>
                <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-[#777]">{action.description}</p>
                <div className="mt-4 border-t border-[#1E1E1E] pt-3">
                  <div className="text-[9px] font-mono text-[#555]">VÌ SAO</div>
                  <div className="mt-1 text-[10px] leading-relaxed text-[#888]">{action.reason}</div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] font-mono font-bold text-white">
                  <span>{action.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9FF3F]" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ADAPTIVE SESSION ENGINE */}
        <section className="mb-12 rounded-3xl border border-[#D9FF3F]/30 bg-[#0D0D0D] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">
                <Zap className="w-3.5 h-3.5" />
                ADAPTIVE SESSION ENGINE
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black uppercase text-white">PHIÊN HỌC DÀNH RIÊNG CHO BẠN.</h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#777]">
                Bensop tự ghép một phiên 10–15 phút từ lượt ôn đến hạn, điểm yếu, mức độ luyện và momentum gần đây.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-xl border border-[#252525] bg-[#121212] px-4 py-2 text-[10px] font-mono text-[#888]">
                {adaptiveSession.items.length} BƯỚC · <b className="text-[#D9FF3F]">{adaptiveSession.totalMinutes} PHÚT</b>
              </span>
              <button
                onClick={() => adaptiveSession.items[0] && onNavigate(adaptiveSession.items[0].path)}
                className="rounded-xl bg-[#D9FF3F] px-5 py-3 text-[10px] font-mono font-extrabold text-black hover:bg-[#cbf532] transition-colors"
              >
                BẮT ĐẦU PHIÊN →
              </button>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {adaptiveSession.items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className="rounded-2xl border border-[#222] bg-[#101010] p-5 text-left hover:border-[#D9FF3F]/40 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#D9FF3F]">BƯỚC {index + 1} · {item.skill.toUpperCase()}</span>
                  <span className="text-[9px] font-mono text-[#666]">{item.durationMinutes} PHÚT</span>
                </div>
                <h3 className="mt-3 text-sm font-black uppercase text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#777]">{item.description}</p>
                <div className="mt-3 border-t border-[#1D1D1D] pt-3 text-[10px] leading-relaxed text-[#888]">
                  <span className="text-[#555]">TÍN HIỆU: </span>{item.reason}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CROSS-SKILL LEARNING PROFILE */}
        <section className="mb-12 rounded-3xl border border-[#202020] bg-[#0B0B0B] p-6 sm:p-8">
          <div className="mb-5">
            <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">CROSS-SKILL PROFILE</span>
            <h3 className="mt-2 text-2xl font-black uppercase text-white">6 KỸ NĂNG · 1 LỘ TRÌNH.</h3>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#777]">
              Bensop kết hợp dữ liệu từ Vocabulary, Grammar, Listening, Speaking, Reading và Writing để chọn bước tiếp theo thay vì chỉ dựa vào một loại bài tập.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {learningSkillSnapshot.map((skill) => (
              <button
                key={skill.key}
                onClick={() => onNavigate(skill.path)}
                className="rounded-xl border border-[#202020] bg-[#101010] p-4 text-left hover:border-[#D9FF3F]/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">{skill.label}</span>
                  <span className="font-mono text-[10px] text-[#D9FF3F]">{skill.score}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1A1A1A]">
                  <div className="h-full bg-[#D9FF3F]" style={{ width: `${skill.score}%` }} />
                </div>
                <div className="mt-2 text-[9px] font-mono text-[#666]">
                  {skill.activityCount}/{skill.total} nội dung đã luyện
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* LEARNER EVIDENCE TIMELINE */}
        <section className="mb-12 rounded-3xl border border-[#202020] bg-[#0B0B0B] p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">LEARNER EVIDENCE</span>
              <h3 className="mt-2 text-2xl font-black uppercase text-white">TIẾN BỘ ĐƯỢC GHI NHẬN THEO TỪNG LẦN HỌC.</h3>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#777]">
                Mỗi lần luyện Vocabulary, Grammar, Listening, Speaking hoặc Reading đều tạo evidence để Bensop cập nhật lộ trình cá nhân.
              </p>
            </div>
            <div className="flex gap-2 text-[9px] font-mono">
              <span className="rounded-lg border border-[#222] bg-[#121212] px-3 py-2 text-[#888]">STREAK EVIDENCE <b className="text-[#D9FF3F]">{learnerProfile.streakDays} NGÀY</b></span>
              <span className="rounded-lg border border-[#222] bg-[#121212] px-3 py-2 text-[#888]">EVENTS <b className="text-white">{learnerProfile.recentEvidence.length}</b></span>
            </div>
          </div>
          {learnerProfile.recentEvidence.length > 0 ? (
            <div className="grid gap-2">
              {learnerProfile.recentEvidence.slice(0, 6).map((event) => (
                <div key={event.id} className="flex flex-col gap-2 rounded-xl border border-[#1D1D1D] bg-[#101010] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="min-w-24 rounded-md border border-[#2A2A2A] bg-[#151515] px-2 py-1 text-center text-[9px] font-mono font-bold uppercase text-[#D9FF3F]">{event.skill}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{event.activityId}</div>
                      <div className="text-[9px] font-mono text-[#666]">{new Date(event.timestamp).toLocaleString('vi-VN')}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{event.score}%</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#2A2A2A] p-6 text-center text-xs text-[#666]">
              Bắt đầu một phiên luyện tập để tạo evidence đầu tiên cho hồ sơ học tập.
            </div>
          )}
        </section>

        {/* SPACED REVIEW QUEUE — driven by completed lesson schedules */}
        <section className="mb-12 rounded-3xl border border-[#202020] bg-[#0B0B0B] p-6 sm:p-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">SPACED REVIEW ENGINE</span>
              <h3 className="mt-2 text-2xl font-black uppercase text-white">ÔN ĐÚNG LÚC, KHÔNG HỌC LẠI TỪ ĐẦU.</h3>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#777]">Mỗi bài đã hoàn thành được Bensop tự lên lịch ôn sau 1, 3 và 7 ngày để chuyển kiến thức từ “đã xem” sang “đã nhớ”.</p>
            </div>
            <span className="text-xs font-mono text-[#666]">{dueReviews.length} lượt đang đến hạn</span>
          </div>

          {dueReviews.length === 0 ? (
            <div className="rounded-xl border border-[#202020] bg-[#101010] p-5 text-sm text-[#777]">
              Chưa có lượt ôn đến hạn. Khi bạn hoàn thành bài học mới, lịch ôn sẽ tự động được tạo.
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {dueReviews.map((item) => {
                const lesson = item.lessonSlug ? LESSONS.find((entry) => entry.slug === item.lessonSlug) : undefined;
                const label = lesson?.title || item.lessonSlug || item.quizSlug || 'Nội dung cần ôn';
                return (
                  <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-[#252525] bg-[#101010] p-4">
                    <div className="min-w-0">
                      <div className="text-[9px] font-mono font-bold text-[#D9FF3F]">
                        {item.reviewType === 'quiz' ? 'ÔN QUIZ' : 'ÔN BÀI'} · SAU {item.intervalDays} NGÀY · ĐẾN HẠN
                      </div>
                      <div className="mt-1 truncate text-sm font-bold text-white">{label}</div>
                    </div>
                    <button
                      onClick={() => item.quizSlug ? onNavigate(`/quiz/${item.quizSlug}`) : item.lessonSlug ? onSelectLesson(item.lessonSlug) : onNavigate('/luyen-tap')}
                      className="shrink-0 rounded-lg bg-[#D9FF3F] px-3 py-2 text-[10px] font-extrabold text-black"
                    >
                      ÔN NGAY →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* LIVE MASTERY SNAPSHOT */}
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 rounded-2xl border border-[#202020] bg-[#0B0B0B] p-6">
            <span className="text-[10px] font-mono tracking-[0.18em] text-[#D9FF3F]">LIVE MASTERY</span>
            <div className="mt-2 text-4xl font-black text-white">{masterySnapshot.overall}%</div>
            <p className="mt-1 text-xs text-[#777]">được cập nhật từ các quiz đã hoàn thành</p>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-[#202020] bg-[#0B0B0B] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase text-white">Kỹ năng đang được ghi nhận</h3>
              <button onClick={() => onNavigate('/luyen-tap')} className="text-xs font-mono text-[#D9FF3F]">LUYỆN THÊM →</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {masterySnapshot.skills.slice().sort((a,b) => b.mastery-a.mastery).slice(0,4).map((item) => (
                <div key={item.id} className="rounded-xl bg-[#111] border border-[#202020] p-3">
                  <div className="flex justify-between text-xs"><span className="text-white">{item.label}</span><span className="font-mono text-[#D9FF3F]">{item.mastery}%</span></div>
                  <div className="mt-2 h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden"><div className="h-full bg-[#D9FF3F]" style={{width:`${item.mastery}%`}} /></div>
                </div>
              ))}
              {!masterySnapshot.skills.length && <p className="text-xs text-[#777]">Làm quiz đầu tiên để Bensop bắt đầu đo mastery.</p>}
            </div>
          </div>
        </section>

        {/* LANGUAGE PROGRESS: Vocabulary + Grammar (Phase 4 Requirement 41) */}
        <div className="p-8 sm:p-10 bg-[#0C0C0C] border border-[#202020] rounded-3xl mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#1E1E1E]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-1">
                TIẾN TRÌNH HỌC NGÔN NGỮ (LANGUAGE PROGRESS)
              </span>
              <h3 className="text-2xl font-bold text-white font-display uppercase">
                VOCABULARY & GRAMMAR MASTERY
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('/tieng-anh/vocabulary')}
                className="text-xs font-mono text-[#D9FF3F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Vocabulary Lab</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="text-[#444]">·</span>
              <button
                onClick={() => onNavigate('/tieng-anh/grammar')}
                className="text-xs font-mono text-[#D9FF3F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Grammar Lab</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Box */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#1E1E1E] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1C1C1C] border border-[#2B2B2B] text-white">
                    ENGLISH
                  </span>
                  <h4 className="text-sm font-bold text-white font-mono uppercase">Tiếng Anh Học Thuật & Công Sở</h4>
                </div>
                <button
                  onClick={() => onNavigate('/tieng-anh')}
                  className="text-xs font-mono text-[#777] hover:text-white transition-colors cursor-pointer"
                >
                  Xem Hub →
                </button>
              </div>

              {/* Vocab metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#888]">Từ vựng (Vocabulary):</span>
                  <span className="text-[#D9FF3F] font-bold">68 / 120 words (57%)</span>
                </div>
                <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#D9FF3F] rounded-full" style={{ width: '57%' }} />
                </div>
              </div>

              {/* Grammar metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#888]">Ngữ pháp (Grammar):</span>
                  <span className="text-white font-bold">12 / 30 concepts (40%)</span>
                </div>
                <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#666]">
                <span>Độ chính xác: <strong className="text-white">88%</strong></span>
                <button
                  onClick={() => onNavigate('/tieng-anh/vocabulary/practice')}
                  className="text-[#D9FF3F] hover:underline cursor-pointer"
                >
                  Tiếp tục luyện tập →
                </button>
              </div>
            </div>

            {/* Chinese Box */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#1E1E1E] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1C1C1C] border border-[#2B2B2B] text-amber-300">
                    CHINESE
                  </span>
                  <h4 className="text-sm font-bold text-white font-mono uppercase">Tiếng Trung Thực Chiến & HSK</h4>
                </div>
                <button
                  onClick={() => onNavigate('/tieng-trung')}
                  className="text-xs font-mono text-[#777] hover:text-white transition-colors cursor-pointer"
                >
                  Xem Hub →
                </button>
              </div>

              {/* Vocab metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#888]">Từ vựng (Vocabulary):</span>
                  <span className="text-amber-300 font-bold">42 / 100 words (42%)</span>
                </div>
                <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              {/* Grammar metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#888]">Ngữ pháp (Grammar):</span>
                  <span className="text-white font-bold">8 / 25 concepts (32%)</span>
                </div>
                <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-300 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#666]">
                <span>Độ chính xác: <strong className="text-white">82%</strong></span>
                <button
                  onClick={() => onNavigate('/tieng-trung/vocabulary/practice')}
                  className="text-amber-300 hover:underline cursor-pointer"
                >
                  Tiếp tục luyện tập →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Featured Module */}
        <div className="p-6 sm:p-8 bg-[#101010] border border-[#262626] rounded-2xl mb-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-2 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
              <span>BÀI HỌC GẦN NHẤT ĐANG DANG DỞ</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              Nối phụ âm sang nguyên âm (Consonant to Vowel Linking)
            </h3>
            <p className="text-xs sm:text-sm text-[#888] max-w-xl">
              Khóa học: CONNECTED SPEECH & THỰC HÀNH SPEAKING TỰ NHIÊN · Phần 1: Linking Basics
            </p>
          </div>

          <button
            onClick={() => onSelectLesson('en-linking-consonant-to-vowel')}
            className="px-6 py-3.5 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-lg"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>TIẾP TỤC HỌC BÀI NÀY</span>
          </button>
        </div>

        {/* 2-Column Grid: Progress by Domains & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column (7 Cols): Progress */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0E0E0E] border border-[#202020] rounded-xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#777] mb-6 font-bold">
              TIẾN TRÌNH THEO LĨNH VỰC
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white">TIẾNG TRUNG (HSK 2 Nền tảng)</span>
                  <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.chinese}%</span>
                </div>
                <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                  <div className="h-full bg-[#D9FF3F] rounded-full" style={{ width: `${user.coursesProgress.chinese}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white">TIẾNG ANH (Connected Speech & Reflex)</span>
                  <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.english}%</span>
                </div>
                <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${user.coursesProgress.english}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white">PHÁT TRIỂN BẢN THÂN (Deep Work & Thói quen)</span>
                  <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.growth}%</span>
                </div>
                <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                  <div className="h-full bg-[#888] rounded-full" style={{ width: `${user.coursesProgress.growth}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white">SỨC KHỎE & ĐỜI SỐNG (Nhịp sinh học & Phục hồi)</span>
                  <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.health}%</span>
                </div>
                <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                  <div className="h-full bg-[#AAA] rounded-full" style={{ width: `${user.coursesProgress.health}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Recent Activity */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#0E0E0E] border border-[#202020] rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#777] mb-6 font-bold">
                HOẠT ĐỘNG GẦN ĐÂY
              </h3>
              <div className="space-y-4">
                {user.recentActivity.map((act) => (
                  <div key={act.id} className="pb-3 border-b border-[#181818] last:border-b-0">
                    <div className="text-[11px] font-mono text-[#666] flex justify-between mb-1">
                      <span className="text-[#D9FF3F]">{act.category}</span>
                      <span>{act.timestamp}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-white">{act.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('/saved')}
              className="pt-4 mt-6 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
            >
              <span>Xem mục Saved ({user.savedItems.length} mục)</span>
              <span>→</span>
            </button>
          </div>

        </div>

        {/* BENSOP Phase 3: Learning Analytics & Quiz Performance */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#1E1E1E]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-1">
                LEARNING ANALYTICS & QUIZ ENGINE
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                PHÂN TÍCH NĂNG LỰC & LỖ HỔNG KIẾN THỨC
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/luyen-tap')}
              className="px-4 py-2 rounded-lg bg-[#161616] hover:bg-[#D9FF3F] text-white hover:text-black font-mono text-xs font-bold border border-[#2A2A2A] hover:border-[#D9FF3F] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>VÀO PHÒNG LUYỆN TẬP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* 1. Skill Mastery Radar / Bar Breakdown */}
            <div className="p-6 bg-[#0E0E0E] border border-[#202020] rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                  <BarChart3 className="w-4 h-4 text-[#D9FF3F]" />
                  <span>ĐỘ CHÍNH XÁC THEO KỸ NĂNG</span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { skill: 'Từ vựng (Vocabulary)', pct: 88 },
                  { skill: 'Ngữ pháp (Grammar)', pct: 82 },
                  { skill: 'Nghe hiểu (Listening)', pct: 75 },
                  { skill: 'Đọc hiểu & Tư duy', pct: 90 },
                ].map((s) => (
                  <div key={s.skill} className="space-y-1">
                    <div className="flex justify-between text-[#888]">
                      <span>{s.skill}</span>
                      <span className="text-white font-bold">{s.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D9FF3F] rounded-full"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Strong Areas */}
            <div className="p-6 bg-[#0E0E0E] border border-[#202020] rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                  <Zap className="w-4 h-4 text-[#D9FF3F]" />
                  <span>ĐIỂM MẠNH NỔI TRỘI</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  VỮNG VÀNG
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: 'Phrasal Verbs Công Sở', acc: '94% chính xác', desc: 'Phản xạ chọn đúng cụm động từ trong email' },
                  { name: 'Thanh điệu & Pinyin HSK', acc: '88% chính xác', desc: 'Phân biệt thanh 1 và thanh 4 dứt khoát' },
                  { name: 'Tư duy Thói quen Atomic', acc: '92% chính xác', desc: 'Làm chủ 4 bước trong Habit Loop' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#141414] border border-[#1E1E1E]">
                    <div className="flex justify-between text-white font-bold mb-1">
                      <span>{item.name}</span>
                      <span className="text-[#D9FF3F]">{item.acc}</span>
                    </div>
                    <p className="text-[11px] text-[#777] font-sans">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Weak Areas & Actionable Fixes */}
            <div className="p-6 bg-[#0E0E0E] border border-[#202020] rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>LỖ HỔNG CẦN KHẮC PHỤC</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  CẦN ÔN TẬP
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: 'Cấu trúc Đảo ngữ & Thì HTHT', acc: '64% chính xác', action: 'Luyện lại 8 câu đảo ngữ trong quiz' },
                  { name: 'Câu chữ 把 / 被 tiếng Trung', acc: '60% chính xác', action: 'Ôn lại vị trí tân ngữ và phó từ' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30">
                    <div className="flex justify-between text-amber-200 font-bold mb-1">
                      <span>{item.name}</span>
                      <span className="text-amber-400">{item.acc}</span>
                    </div>
                    <p className="text-[11px] text-[#AAA] font-sans mb-2">💡 Gợi ý: {item.action}</p>
                    <button
                      onClick={() => onNavigate('/luyen-tap')}
                      className="text-[10px] font-bold text-[#D9FF3F] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Luyện tập ngay</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Recommended For You (Recommendation Engine) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#1E1E1E]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-1">
                RECOMMENDATION ENGINE
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                ĐỀ XUẤT CHO BẠN
              </h3>
            </div>

            {/* Interest switcher */}
            <div className="flex items-center gap-1 bg-[#121212] p-1 border border-[#222] rounded-lg overflow-x-auto no-scrollbar">
              {[
                { id: 'tieng-anh', label: 'Tiếng Anh' },
                { id: 'tieng-trung', label: 'Tiếng Trung' },
                { id: 'phat-trien-ban-than', label: 'Phát triển bản thân' },
                { id: 'suc-khoe-doi-song', label: 'Sức khỏe' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInterest(tab.id as any)}
                  className={`px-3 py-1 text-xs font-mono transition-colors rounded cursor-pointer whitespace-nowrap ${
                    activeInterest === tab.id
                      ? 'bg-white text-black font-bold'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => handleOpenRecommended(rec.slug, rec.type)}
                className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#383838] rounded-xl cursor-pointer group transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#666] mb-2 uppercase">
                    <span className="text-[#D9FF3F] font-bold">{rec.category}</span>
                    <span>{rec.meta}</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2 font-display">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-[#777] leading-relaxed mb-4">
                    💡 {rec.reason}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-xs font-bold text-white group-hover:text-[#D9FF3F]">
                  <span>{rec.type === 'course' ? 'Xem khóa học' : 'Đọc bài viết'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
