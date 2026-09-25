import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Course, SavedItem, Article } from '../types';
import { COURSES } from '../data/courses';
import { ARTICLES } from '../data/articles';
import { LESSONS } from '../data/lessons';
import { BookmarkButton } from '../components/BookmarkButton';
import { BookOpen, Clock, BarChart3, CheckCircle2, Play, ArrowRight, Award } from 'lucide-react';

interface CourseDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectLesson: (lessonSlug: string) => void;
  onSelectArticle: (article: Article) => void;
  onStartQuiz: (quizId: string) => void;
  savedItems: SavedItem[];
  onToggleBookmark: (item: SavedItem) => void;
  completedLessons: string[];
  isLoggedIn: boolean;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectLesson,
  onSelectArticle,
  onStartQuiz,
  savedItems,
  onToggleBookmark,
  completedLessons,
  isLoggedIn,
}) => {
  const course = COURSES.find((c) => c.slug === slug) || COURSES[0];
  const isSaved = savedItems.some((s) => s.slug === course.slug);

  // Flatten lessons from course modules
  const allCourseLessons = course.modules.flatMap((m) => m.lessons);
  const completedCount = allCourseLessons.filter((l) => completedLessons.includes(l.slug)).length;
  const progressPercent = allCourseLessons.length > 0 ? Math.round((completedCount / allCourseLessons.length) * 100) : 0;

  const relatedArticles = ARTICLES.filter(
    (a) => a.categoryId === course.categoryId || course.relatedArticleSlugs?.includes(a.slug)
  ).slice(0, 2);

  const startLessonSlug = course.firstLessonSlug || (allCourseLessons[0]?.slug ?? 'en-linking-consonant-to-vowel');

  return (
    <div className="pt-24 pb-28 bg-[#050505] min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: course.categoryName, path: `/${course.categoryId}` },
            { label: 'KHÓA HỌC', path: `/${course.categoryId}` },
            { label: course.title }
          ]}
          onNavigate={onNavigate}
        />

        {/* Course Marquee Hero */}
        <div className="py-8 sm:py-12 border-b border-[#1E1E1E] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-3">
                {course.categoryName} · KHÓA HỌC CHUYÊN SÂU
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.08] mb-4 font-display">
                {course.title}
              </h1>

              <p className="text-base text-[#A0A0A0] leading-relaxed mb-6 font-normal">
                {course.description}
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#888] mb-8">
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-[#D9FF3F]" />
                  <span>Trình độ: <strong className="text-white">{course.level}</strong></span>
                </div>
                <span>/</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D9FF3F]" />
                  <span>{course.duration}</span>
                </div>
                <span>/</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D9FF3F]" />
                  <span>{course.lessonsCount} bài giảng chi tiết</span>
                </div>
              </div>

              {/* Progress bar if user is logged in */}
              {isLoggedIn && (
                <div className="p-4 bg-[#0F0F0F] border border-[#222] rounded-xl max-w-lg mb-8">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-white">Tiến độ của bạn</span>
                    <span className="text-[#D9FF3F] font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#202020] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D9FF3F] transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#666] font-mono mt-2">
                    Đã hoàn thành {completedCount} / {allCourseLessons.length} bài học
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectLesson(startLessonSlug)}
                  className="px-8 py-3.5 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer shadow-[0_0_25px_rgba(217,255,63,0.15)] flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>{completedCount > 0 ? 'TIẾP TỤC HỌC' : 'BẮT ĐẦU HỌC'}</span>
                </button>

                <BookmarkButton
                  item={{
                    id: `save-${course.id}`,
                    type: 'course',
                    title: course.title,
                    slug: course.slug,
                    category: course.categoryName,
                    savedAt: 'Hôm nay',
                    meta: `${course.lessonsCount} bài giảng`,
                  }}
                  isBookmarked={isSaved}
                  onToggle={onToggleBookmark}
                  showText={true}
                  className="px-4 py-3 bg-[#121212] border border-[#242424] rounded text-xs"
                />
              </div>
            </div>

            {/* Right Course Preview Poster */}
            {course.image && (
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#222] bg-[#111]">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover grayscale contrast-125"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#D9FF3F]">
                    BENSOP ACCREDITED COURSE
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E1E1E]">
            <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
              GIÁO TRÌNH KHÓA HỌC
            </h2>
            <span className="text-xs font-mono text-[#777]">
              {course.modules.length} Học phần · {allCourseLessons.length} Bài học
            </span>
          </div>

          <div className="space-y-6">
            {course.modules.map((mod, modIdx) => (
              <div key={modIdx} className="p-6 bg-[#0E0E0E] border border-[#202020] rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#181818] border border-[#333] text-xs font-mono text-[#D9FF3F] flex items-center justify-center font-bold">
                    0{modIdx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {mod.title}
                  </h3>
                </div>

                <div className="space-y-2 pl-9">
                  {mod.lessons.map((lesson, lesIdx) => {
                    const isLessonCompleted = completedLessons.includes(lesson.slug);
                    return (
                      <div
                        key={lesIdx}
                        onClick={() => onSelectLesson(lesson.slug)}
                        className="p-3.5 bg-[#121212] hover:bg-[#1A1A1A] border border-[#1E1E1E] hover:border-[#383838] rounded-lg cursor-pointer group transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          {isLessonCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-[#D9FF3F] shrink-0" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-[#333] shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm font-medium text-white group-hover:text-[#D9FF3F] transition-colors">
                            {lesson.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[#666]">
                          <span>{lesson.duration}</span>
                          <span className="group-hover:translate-x-1 transition-transform text-[#999] group-hover:text-[#D9FF3F]">→</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Quiz Trigger */}
        {course.relatedQuizId && (
          <div className="p-6 sm:p-8 bg-[#101010] border border-[#262626] rounded-xl mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-1">
                BÀI KIỂM TRA CHỨNG NHẬN
              </span>
              <h4 className="text-lg font-bold text-white">
                Kiểm tra kiến thức sau khi hoàn thành khóa học
              </h4>
              <p className="text-xs text-[#888] mt-1">
                Làm bài trắc nghiệm phản xạ để đo lường mức độ tiến bộ của bạn.
              </p>
            </div>
            <button
              onClick={() => onStartQuiz(course.relatedQuizId!)}
              className="px-6 py-3 bg-white hover:bg-[#D9FF3F] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              LÀM BÀI TEST NGAY →
            </button>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#777] mb-6 font-bold">
              BÀI VIẾT THAM KHẢO CHO KHÓA HỌC NÀY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="p-5 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#383838] rounded-xl cursor-pointer group transition-all"
                >
                  <span className="text-xs font-mono text-[#D9FF3F] block mb-2">{art.readingTime}</span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-[#888] line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
