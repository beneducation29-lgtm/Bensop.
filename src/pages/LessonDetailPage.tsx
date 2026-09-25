import React, { useState } from 'react';
import { Lesson, Course, SavedItem } from '../types';
import { LESSONS } from '../data/lessons';
import { COURSES } from '../data/courses';
import { BookmarkButton } from '../components/BookmarkButton';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Play, Pause, Volume2, 
  HelpCircle, ChevronDown, BookOpen, Check, Award, AlertCircle 
} from 'lucide-react';

interface LessonDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectLesson: (lessonSlug: string) => void;
  onSelectCourse: (course: Course) => void;
  completedLessons: string[];
  onToggleCompleteLesson: (lessonSlug: string) => void;
  savedItems: SavedItem[];
  onToggleBookmark: (item: SavedItem) => void;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectLesson,
  onSelectCourse,
  completedLessons,
  onToggleCompleteLesson,
  savedItems,
  onToggleBookmark,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedExerciseOption, setSelectedExerciseOption] = useState<number | null>(null);
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState(false);

  const lesson = LESSONS.find((l) => l.slug === slug) || LESSONS[0];
  const course = COURSES.find((c) => c.slug === lesson.courseSlug) || COURSES[0];

  const isCompleted = completedLessons.includes(lesson.slug);
  const isSaved = savedItems.some((s) => s.slug === lesson.slug);

  // Flatten course lessons for sidebar
  const allCourseLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allCourseLessons.findIndex((l) => l.slug === lesson.slug);
  const progressPercent = Math.round(((currentLessonIndex + 1) / allCourseLessons.length) * 100);

  const handleExerciseSubmit = () => {
    if (selectedExerciseOption !== null) {
      setExerciseSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      
      {/* Minimalist Top App Bar for Focused Learning */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#1C1C1C] py-3.5 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Course */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCourse(course)}
              className="flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">VỀ KHÓA HỌC:</span>
              <span className="text-white font-bold truncate max-w-[180px] sm:max-w-xs">{course.title}</span>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
              <span className="hidden md:inline">TIẾN ĐỘ:</span>
              <span className="text-white font-bold">BÀI {currentLessonIndex + 1} / {allCourseLessons.length}</span>
              <span className="text-[#D9FF3F] font-bold">({progressPercent}%)</span>
            </div>

            {/* Mobile Syllabus Toggle Button */}
            <button
              onClick={() => setMobileSyllabusOpen(!mobileSyllabusOpen)}
              className="lg:hidden px-3 py-1.5 bg-[#141414] border border-[#262626] rounded text-xs font-mono text-white flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D9FF3F]" />
              <span>Mục lục</span>
            </button>

            {/* Bookmark button */}
            <BookmarkButton
              item={{
                id: `save-les-${lesson.id}`,
                type: 'lesson',
                title: lesson.title,
                slug: lesson.slug,
                category: lesson.categoryName,
                savedAt: 'Hôm nay',
                meta: lesson.duration,
              }}
              isBookmarked={isSaved}
              onToggle={onToggleBookmark}
            />
          </div>

        </div>

        {/* Progress Bar line */}
        <div className="w-full h-1 bg-[#1A1A1A] absolute bottom-0 left-0 right-0">
          <div
            className="h-full bg-[#D9FF3F] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Learning Canvas Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 py-8 sm:py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Main Content Column (70%) */}
        <main className="flex-1 max-w-3xl">
          
          {/* Header */}
          <div className="pb-8 mb-8 border-b border-[#1E1E1E]">
            <div className="flex items-center gap-3 text-xs font-mono text-[#777] mb-2">
              <span className="text-[#D9FF3F] uppercase font-bold">{lesson.categoryName}</span>
              <span>·</span>
              <span>Thời lượng học: {lesson.duration}</span>
              {isCompleted && (
                <>
                  <span>·</span>
                  <span className="text-[#D9FF3F] font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Đã hoàn thành
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4 font-display">
              {lesson.title}
            </h1>

            <p className="text-sm sm:text-base text-[#9A9A9A] leading-relaxed">
              {lesson.summary}
            </p>
          </div>

          {/* Interactive Audio Simulation Player */}
          <div className="p-4 sm:p-5 bg-[#0E0E0E] border border-[#222] rounded-xl mb-10 flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-[#D9FF3F] text-black shadow-[0_0_15px_rgba(217,255,63,0.3)]'
                    : 'bg-[#181818] border border-[#333] text-white hover:border-[#D9FF3F]'
                }`}
                title="Nghe phát âm chuẩn bản ngữ"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div>
                <span className="text-xs font-bold text-white block">
                  Bản ghi âm hướng dẫn phát âm chuẩn
                </span>
                <span className="text-[11px] font-mono text-[#777]">
                  {isPlayingAudio ? 'Đang phát âm thanh mẫu...' : 'Nhấn để nghe giảng giải và audio phát âm mẫu'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#666]">
              <Volume2 className="w-4 h-4 text-[#D9FF3F]" />
              <span className="hidden sm:inline">Studio Audio 320kbps</span>
            </div>
          </div>

          {/* Body Content Paragraphs */}
          <div className="space-y-6 text-base text-[#D0D0D0] leading-relaxed mb-12">
            {lesson.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Key Points Callout */}
          <div className="p-6 bg-[#0E0E0E] border-l-2 border-[#D9FF3F] rounded-r-xl mb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              ĐIỂM THEN CHỐT CỦA BÀI HỌC:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#CCC]">
              {lesson.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D9FF3F] font-mono font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Examples */}
          <div className="mb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#777] font-bold mb-4">
              VÍ DỤ THỰC TẾ & PHÂN TÍCH ÂM
            </h3>
            <div className="space-y-3">
              {lesson.examples.map((ex, i) => (
                <div key={i} className="p-4 bg-[#111111] border border-[#222] rounded-xl">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-mono text-[#D9FF3F] uppercase">{ex.label}</span>
                    <strong className="text-base text-white">{ex.target}</strong>
                  </div>
                  <div className="text-xs text-[#AAA] mb-1">
                    Nghĩa: {ex.translation}
                  </div>
                  {ex.note && (
                    <div className="text-[11px] font-mono text-[#888] pt-2 border-t border-[#1C1C1C]">
                      💡 {ex.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Checkpoint Exercise */}
          {lesson.exercise && (
            <div className="p-6 sm:p-8 bg-[#0E0E0E] border border-[#262626] rounded-2xl mb-14">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-3 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>CHECKPOINT BÀI HỌC (KIỂM TRA TỨC THÌ)</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-6">
                {lesson.exercise.question}
              </h4>

              <div className="space-y-3 mb-6">
                {lesson.exercise.options.map((opt, optIdx) => {
                  const isSelected = selectedExerciseOption === optIdx;
                  const isCorrect = optIdx === lesson.exercise!.correctIndex;

                  let optClass = 'bg-[#141414] border-[#222] text-[#CCC] hover:border-[#444]';
                  if (exerciseSubmitted) {
                    if (isCorrect) optClass = 'bg-[#142D14] border-[#D9FF3F] text-white';
                    else if (isSelected && !isCorrect) optClass = 'bg-[#2E1414] border-red-500 text-red-200';
                    else optClass = 'bg-[#141414] border-[#222] text-[#555] opacity-50';
                  } else if (isSelected) {
                    optClass = 'bg-[#1C1C1C] border-[#D9FF3F] text-white';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={exerciseSubmitted}
                      onClick={() => setSelectedExerciseOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${optClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {exerciseSubmitted && (
                <div className="p-4 bg-[#141414] border-l-2 border-[#D9FF3F] rounded-r-lg mb-6 text-xs text-[#CCC]">
                  <strong className="text-white block mb-1">Giải thích đáp án:</strong>
                  {lesson.exercise.explanation}
                </div>
              )}

              {!exerciseSubmitted ? (
                <button
                  disabled={selectedExerciseOption === null}
                  onClick={handleExerciseSubmit}
                  className="px-5 py-2.5 bg-[#D9FF3F] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer"
                >
                  Xác nhận câu trả lời
                </button>
              ) : (
                <div className="text-xs font-mono text-[#D9FF3F] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã kiểm tra thành công! Hãy hoàn thành bài học bên dưới.</span>
                </div>
              )}
            </div>
          )}

          {/* Quick Learning Lab Integration (Phase 4) */}
          {(lesson.categoryId === 'tieng-anh' || lesson.categoryId === 'tieng-trung') && (
            <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-[#222] mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#D9FF3F] uppercase tracking-wider block mb-1">
                  BENSOP INTERACTIVE LABS
                </span>
                <h4 className="text-base font-bold text-white">
                  Luyện tập chuyên sâu với Vocabulary & Grammar Lab
                </h4>
                <p className="text-xs text-[#888] mt-1">
                  Ghi nhớ từ vựng qua Spaced Repetition và làm chủ cấu trúc ngữ pháp thông qua câu hỏi thực chiến.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigate(`/${lesson.categoryId}/vocabulary`)}
                  className="px-4 py-2 bg-[#181818] hover:bg-[#242424] text-white border border-[#2F2F2F] text-xs font-mono rounded-lg transition-colors cursor-pointer"
                >
                  Từ vựng Lab →
                </button>
                <button
                  onClick={() => onNavigate(`/${lesson.categoryId}/grammar`)}
                  className="px-4 py-2 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-bold text-xs font-mono rounded-lg transition-colors cursor-pointer"
                >
                  Ngữ pháp Lab →
                </button>
              </div>
            </div>
          )}

          {/* Bottom Actions Bar */}
          <div className="pt-8 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
            {lesson.prevLessonSlug ? (
              <button
                onClick={() => onSelectLesson(lesson.prevLessonSlug!)}
                className="w-full sm:w-auto px-5 py-3 bg-[#111] hover:bg-[#1C1C1C] border border-[#242424] text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Bài trước</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => onToggleCompleteLesson(lesson.slug)}
                className={`px-5 py-3 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-[#181818] border border-[#D9FF3F]/50 text-[#D9FF3F]'
                    : 'bg-[#181818] border border-[#333] text-white hover:border-white'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{isCompleted ? 'ĐÃ HOÀN THÀNH' : 'ĐÁNH DẤU HOÀN THÀNH'}</span>
              </button>

              {lesson.nextLessonSlug && (
                <button
                  onClick={() => {
                    if (!isCompleted) onToggleCompleteLesson(lesson.slug);
                    onSelectLesson(lesson.nextLessonSlug!);
                  }}
                  className="px-6 py-3 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(217,255,63,0.15)]"
                >
                  <span>BÀI TIẾP THEO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </main>

        {/* Sidebar Syllabus (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:w-80 shrink-0 ${
            mobileSyllabusOpen
              ? 'fixed inset-0 z-50 bg-[#050505] p-6 overflow-y-auto block'
              : 'hidden lg:block'
          }`}
        >
          {mobileSyllabusOpen && (
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#222]">
              <h3 className="font-bold text-white">Mục lục khóa học</h3>
              <button
                onClick={() => setMobileSyllabusOpen(false)}
                className="text-xs text-[#D9FF3F] underline"
              >
                Đóng lại
              </button>
            </div>
          )}

          <div className="sticky top-20 bg-[#0E0E0E] border border-[#222] rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C] mb-4">
              <span className="text-xs font-mono text-[#D9FF3F] uppercase font-bold">
                GIÁO TRÌNH
              </span>
              <span className="text-[11px] font-mono text-[#666]">
                {completedLessons.length} / {allCourseLessons.length} bài
              </span>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {course.modules.map((m, mIdx) => (
                <div key={mIdx}>
                  <div className="text-[11px] font-mono text-[#777] uppercase mb-2">
                    Phần 0{mIdx + 1}: {m.title.replace(/^Phần \d+: /, '')}
                  </div>
                  <div className="space-y-1 pl-2 border-l border-[#222]">
                    {m.lessons.map((les, lIdx) => {
                      const isCurrent = les.slug === lesson.slug;
                      const isLesDone = completedLessons.includes(les.slug);

                      return (
                        <button
                          key={lIdx}
                          onClick={() => {
                            onSelectLesson(les.slug);
                            setMobileSyllabusOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                            isCurrent
                              ? 'bg-[#181818] text-[#D9FF3F] font-bold border-l-2 border-[#D9FF3F]'
                              : 'text-[#888] hover:text-white hover:bg-[#141414]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isLesDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9FF3F] shrink-0" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#444] shrink-0" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#555] shrink-0">{les.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};
