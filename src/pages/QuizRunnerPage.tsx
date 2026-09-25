import React, { useState, useEffect, useRef } from 'react';
import { QuizModel, Question, QuizResult } from '../types/quiz';
import { QUIZ_MODELS } from '../data/quizModels';
import { QUESTIONS_BANK } from '../data/questions';
import { QuestionRenderer } from '../components/quiz/QuestionRenderer';
import { calculateQuizResult } from '../lib/quiz/scoring';
import { quizSessionStorage } from '../services/quizSessionStorage';
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  X,
  Pause,
  Play,
  HelpCircle,
  Award
} from 'lucide-react';

interface QuizRunnerPageProps {
  quizSlug: string;
  onNavigate: (path: string) => void;
  onFinishQuiz: (result: QuizResult) => void;
}

export const QuizRunnerPage: React.FC<QuizRunnerPageProps> = ({
  quizSlug,
  onNavigate,
  onFinishQuiz,
}) => {
  // 1. Resolve Quiz or Fallback to First Model
  const quiz: QuizModel =
    QUIZ_MODELS.find((q) => q.slug === quizSlug || q.id === quizSlug) || QUIZ_MODELS[0];

  // 2. Resolve Questions
  const questions: Question[] = React.useMemo(() => {
    return quiz.questionIds
      .map((id) => QUESTIONS_BANK.find((q) => q.id === id))
      .filter((q): q is Question => Boolean(q));
  }, [quiz]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [markedIds, setMarkedIds] = useState<string[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Timer: Duration in minutes converted to seconds
  const totalSeconds = (quiz.duration || 10) * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(totalSeconds);
  const sessionIdRef = useRef<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`);

  // Restore saved active session if same quiz
  useEffect(() => {
    const saved = quizSessionStorage.getActiveSession();
    if (saved && (saved.quizSlug === quiz.slug || saved.quizId === quiz.id) && saved.status === 'in-progress') {
      setAnswers(saved.answers || {});
      setMarkedIds(saved.markedForReview || []);
      setCurrentIndex(saved.currentQuestionIndex || 0);
      if (typeof saved.timeRemaining === 'number' && saved.timeRemaining > 0) {
        setTimeRemaining(saved.timeRemaining);
      }
      sessionIdRef.current = saved.id;
    }
  }, [quiz.slug, quiz.id]);

  // Timer Tick
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, answers, markedIds, currentIndex]);

  // Periodically save progress to local session
  useEffect(() => {
    quizSessionStorage.saveActiveSession({
      id: sessionIdRef.current,
      userId: 'user_active',
      quizId: quiz.id,
      quizSlug: quiz.slug,
      quizTitle: quiz.title,
      categoryId: quiz.categoryId,
      categoryName: quiz.categoryName,
      questionIds: questions.map((q) => q.id),
      currentQuestionIndex: currentIndex,
      answers,
      markedForReview: markedIds,
      timeRemaining,
      totalTimeSpent: totalSeconds - timeRemaining,
      startedAt: new Date().toISOString(),
      status: 'in-progress',
    });
  }, [answers, markedIds, currentIndex, timeRemaining, quiz, questions, totalSeconds]);

  // Answer Change
  const handleAnswerChange = (val: any) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val,
    }));
  };

  // Toggle Mark For Review
  const toggleMarkCurrent = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setMarkedIds((prev) =>
      prev.includes(currentQ.id) ? prev.filter((id) => id !== currentQ.id) : [...prev, currentQ.id]
    );
  };

  // Submit and Calculate Results
  const handleFinalSubmit = () => {
    setIsSubmitModalOpen(false);
    const timeSpent = Math.max(1, totalSeconds - timeRemaining);
    const result = calculateQuizResult(
      questions,
      answers,
      {
        id: quiz.id,
        title: quiz.title,
        slug: quiz.slug,
        categoryId: quiz.categoryId,
        categoryName: quiz.categoryName,
        passingScore: quiz.passingScore,
      },
      timeSpent,
      sessionIdRef.current
    );

    quizSessionStorage.saveResult(result);
    quizSessionStorage.clearActiveSession();
    onFinishQuiz(result);
  };

  // Formatting Time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = questions[currentIndex];
  if (!currentQ) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <AlertTriangle className="w-12 h-12 text-[#D9FF3F] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Không tìm thấy câu hỏi</h2>
          <p className="text-sm text-[#888] mb-6">Bài luyện tập này hiện đang được hoàn thiện câu hỏi.</p>
          <button
            onClick={() => onNavigate('/luyen-tap')}
            className="px-6 py-3 bg-[#1A1A1A] border border-[#333] hover:border-[#D9FF3F] text-white rounded-lg font-mono text-xs cursor-pointer"
          >
            QUAY LẠI PHÒNG LUYỆN TẬP
          </button>
        </div>
      </div>
    );
  }

  const isCurrentAnswered =
    answers[currentQ.id] !== undefined &&
    answers[currentQ.id] !== null &&
    answers[currentQ.id] !== '';
  const isCurrentMarked = markedIds.includes(currentQ.id);

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null && answers[k] !== ''
  ).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col pt-16 sm:pt-20">
      {/* Top Test Control Header */}
      <header className="sticky top-16 sm:top-20 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1E1E1E] py-3.5 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back & Quiz Info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn thoát bài làm dở? Tiến trình sẽ được lưu lại.')) {
                  onNavigate('/luyen-tap');
                }
              }}
              className="p-2 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#888] hover:text-white border border-[#262626] cursor-pointer"
              title="Thoát"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#D9FF3F] tracking-widest uppercase block truncate">
                {quiz.categoryName} · {quiz.type.toUpperCase()}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                {quiz.title}
              </h1>
            </div>
          </div>

          {/* Timer & Submit Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Timer */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-bold ${
                timeRemaining < 60
                  ? 'bg-red-950/60 border-red-500/80 text-red-300 animate-pulse'
                  : 'bg-[#141414] border-[#2A2A2A] text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-[#D9FF3F]" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            {/* Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#888] hover:text-white cursor-pointer hidden sm:flex items-center justify-center"
              title={isPaused ? 'Tiếp tục làm bài' : 'Tạm dừng đồng hồ'}
            >
              {isPaused ? <Play className="w-4 h-4 text-[#D9FF3F]" /> : <Pause className="w-4 h-4" />}
            </button>

            {/* Submit Quiz Button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 sm:px-5 py-2 rounded-lg bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight transition-all cursor-pointer shadow-[0_0_15px_rgba(217,255,63,0.2)]"
            >
              NỘP BÀI
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Arena */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Question Navigator */}
        <aside className="lg:col-span-4 order-2 lg:order-1 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#1F1F1F]">
            
            {/* Navigator Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-5">
              <div>
                <span className="text-xs font-mono text-[#888] uppercase block">DANH SÁCH CÂU HỎI</span>
                <span className="text-sm font-bold text-white font-mono">
                  {answeredCount} / {questions.length} ĐÃ TRẢ LỜI
                </span>
              </div>
              <span className="text-xs font-mono text-[#D9FF3F] bg-[#161616] px-2.5 py-1 rounded border border-[#2A2A2A]">
                {Math.round((answeredCount / questions.length) * 100)}%
              </span>
            </div>

            {/* Question Quick Jump Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
              {questions.map((q, idx) => {
                const isSelected = idx === currentIndex;
                const isAnswered =
                  answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '';
                const isMarked = markedIds.includes(q.id);

                let btnClass = 'bg-[#141414] border-[#242424] text-[#777] hover:border-[#444]';
                if (isSelected) {
                  btnClass = 'bg-[#222] border-[#D9FF3F] text-white ring-1 ring-[#D9FF3F] font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-[#172212] border-emerald-600/50 text-emerald-300 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-lg border text-xs font-mono transition-all relative flex items-center justify-center cursor-pointer ${btnClass}`}
                  >
                    <span>{idx + 1}</span>
                    {isMarked && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-6 border-t border-[#1A1A1A] mt-6 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#777]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/80" />
                <span>Đã làm ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#141414] border border-[#333]" />
                <span>Chưa làm ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                <span>Xem lại ({markedIds.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded border border-[#D9FF3F] bg-[#222]" />
                <span>Đang chọn</span>
              </div>
            </div>

          </div>

          {/* Quick Tip Box */}
          <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A] text-xs text-[#777] leading-relaxed">
            <span className="text-[#D9FF3F] font-bold block mb-1">MẸO BENSOP:</span>
            Đánh dấu các câu còn phân vân để quay lại sau cùng. Đừng dừng lại quá 60 giây ở bất kỳ câu nào để đảm bảo hoàn thành bài đúng giờ.
          </div>
        </aside>

        {/* Right Column: Question Body & Actions */}
        <main className="lg:col-span-8 order-1 lg:order-2 space-y-6">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0D0D0D] border border-[#1E1E1E] shadow-2xl relative">
            
            {/* Question Counter Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#1A1A1A] mb-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-black font-display text-white">
                  {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}
                </span>
                <span className="text-xs font-mono text-[#666]">
                  / {questions.length < 10 ? `0${questions.length}` : questions.length}
                </span>
              </div>

              {/* Mark for review action */}
              <button
                type="button"
                onClick={toggleMarkCurrent}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                  isCurrentMarked
                    ? 'bg-amber-950/40 border-amber-500/80 text-amber-300'
                    : 'bg-[#141414] border-[#2A2A2A] text-[#888] hover:text-white'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isCurrentMarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{isCurrentMarked ? 'ĐÃ ĐÁNH DẤU XEM LẠI' : 'ĐÁNH DẤU XEM LẠI'}</span>
              </button>
            </div>

            {/* Question Content Rendered based on QuestionType */}
            <QuestionRenderer
              question={currentQ}
              userAnswer={answers[currentQ.id]}
              onChangeAnswer={handleAnswerChange}
            />

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-10 border-t border-[#1A1A1A] mt-10">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="px-5 py-3 rounded-xl bg-[#141414] hover:bg-[#202020] text-white text-xs font-mono font-bold border border-[#262626] disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>CÂU TRƯỚC</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="px-6 py-3 rounded-xl bg-[#1F1F1F] hover:bg-[#2B2B2B] text-white text-xs font-mono font-bold border border-[#333] hover:border-[#D9FF3F] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>CÂU TIẾP THEO</span>
                  <ArrowRight className="w-4 h-4 text-[#D9FF3F]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-7 py-3 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black text-xs font-mono font-extrabold tracking-tight transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.3)]"
                >
                  <span>NỘP BÀI THI</span>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                </button>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* Submit Confirmation Dialog Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-[#101010] border border-[#282828] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#202020]">
              <div className="flex items-center gap-2 text-white font-bold">
                <Award className="w-5 h-5 text-[#D9FF3F]" />
                <span>XÁC NHẬN NỘP BÀI</span>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-[#666] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#161616] border border-[#242424] flex items-center justify-between">
                <span className="text-[#888]">Số câu đã làm:</span>
                <span className="font-bold text-white">{answeredCount} / {questions.length}</span>
              </div>

              {unansweredCount > 0 && (
                <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/40 text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Còn {unansweredCount} câu hỏi bạn CHƯA TRẢ LỜI!</span>
                </div>
              )}

              {markedIds.length > 0 && (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-300 flex items-center gap-2">
                  <Flag className="w-4 h-4 shrink-0" />
                  <span>Còn {markedIds.length} câu đánh dấu xem lại.</span>
                </div>
              )}

              <p className="text-[#888] pt-2 leading-relaxed">
                Sau khi nộp bài, hệ thống sẽ chấm điểm tức thì, thống kê năng lực theo từng kỹ năng và phân tích các câu sai kèm giải thích chi tiết.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#202020]">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-1/2 py-3 rounded-xl bg-[#161616] hover:bg-[#202020] text-white font-mono text-xs border border-[#303030] cursor-pointer"
              >
                TIẾP TỤC LÀM
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-1/2 py-3 rounded-xl bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-mono font-extrabold text-xs cursor-pointer shadow-[0_0_20px_rgba(217,255,63,0.3)]"
              >
                XÁC NHẬN NỘP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paused Overlay */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-[#121212] border border-[#282828] rounded-2xl p-8 text-center space-y-4">
            <Pause className="w-10 h-10 text-[#D9FF3F] mx-auto animate-pulse" />
            <h3 className="text-xl font-bold text-white">ĐÃ TẠM DỪNG</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Đồng hồ đang dừng. Nội dung bài làm của bạn đã được lưu an toàn.
            </p>
            <button
              onClick={() => setIsPaused(false)}
              className="w-full py-3 bg-[#D9FF3F] text-black font-mono font-extrabold text-xs rounded-xl cursor-pointer"
            >
              TIẾP TỤC BÀI THI
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
