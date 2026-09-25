import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { BookmarkButton } from '../components/BookmarkButton';
import { Article, SavedItem, Course } from '../types';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';
import { Clock, Calendar, Share2, ArrowLeft, ArrowRight, CheckCircle2, BookOpen, HelpCircle, Bookmark } from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  onStartQuiz: (quizId: string) => void;
  savedItems: SavedItem[];
  onToggleBookmark: (item: SavedItem) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
  onStartQuiz,
  savedItems,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);

  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  const isSaved = savedItems.some((s) => s.slug === article.slug);

  // Related contents
  const relatedLesson = article.relatedLessonSlug
    ? LESSONS.find((l) => l.slug === article.relatedLessonSlug)
    : null;

  const relatedCourse = article.relatedCourseSlug
    ? COURSES.find((c) => c.slug === article.relatedCourseSlug)
    : null;

  const relatedArticles = ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.categoryId === article.categoryId || article.relatedArticleSlugs?.includes(a.slug))
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-24 pb-28 bg-[#050505] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: article.categoryName, path: `/${article.categoryId}` },
            { label: 'BÀI VIẾT', path: `/${article.categoryId}` },
            { label: article.title }
          ]}
          onNavigate={onNavigate}
        />

        {/* Article Header */}
        <header className="py-8 border-b border-[#1E1E1E] mb-10">
          <div className="flex items-center gap-3 text-xs font-mono text-[#777] mb-4">
            <span className="text-[#D9FF3F] uppercase font-bold">{article.categoryName}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.08] mb-4 font-display">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed mb-6 font-normal">
              {article.subtitle}
            </p>
          )}

          {/* Author & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#181818]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#181818] border border-[#2A2A2A] flex items-center justify-center font-bold text-sm text-[#D9FF3F]">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{article.author.name}</div>
                <div className="text-xs text-[#777] font-mono">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookmarkButton
                item={{
                  id: `save-${article.id}`,
                  type: 'article',
                  title: article.title,
                  slug: article.slug,
                  category: article.categoryName,
                  savedAt: 'Hôm nay',
                  meta: article.readingTime,
                }}
                isBookmarked={isSaved}
                onToggle={onToggleBookmark}
                showText={true}
                className="px-3 py-1.5 bg-[#121212] border border-[#242424] rounded-lg"
              />

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] hover:bg-[#1C1C1C] border border-[#242424] text-xs font-mono text-[#888] hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Đã copy link' : 'Chia sẻ'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#121212] mb-12 border border-[#222]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        </div>

        {/* Key Takeaways Callout Box */}
        {article.keyTakeaways && (
          <div className="p-6 sm:p-8 bg-[#0D0D0D] border-l-2 border-[#D9FF3F] rounded-r-xl mb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              ĐIỂM CỐT LÕI RÚT RA:
            </h3>
            <ul className="space-y-3 text-sm text-[#DDD] leading-relaxed">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#D9FF3F] font-bold font-mono mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Vocabulary Box (if provided) */}
        {article.vocabularyBox && (
          <div className="p-6 bg-[#0E0E0E] border border-[#222] rounded-xl mb-12">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-3">
              VOCABULARY FOCUS
            </span>
            <div className="space-y-4">
              {article.vocabularyBox.map((v, i) => (
                <div key={i} className="p-3 bg-[#141414] rounded-lg border border-[#222]">
                  <div className="flex items-baseline justify-between mb-1">
                    <strong className="text-sm text-white">{v.word}</strong>
                    <span className="text-xs font-mono text-[#D9FF3F]">{v.phonetic}</span>
                  </div>
                  <div className="text-xs text-[#AAA] mb-1">Nghĩa: {v.meaning}</div>
                  <div className="text-[11px] text-[#777] italic">"{v.example}"</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grammar Box (if provided) */}
        {article.grammarBox && (
          <div className="p-6 bg-[#0E0E0E] border border-[#222] rounded-xl mb-12">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-3">
              GRAMMAR HIGHLIGHT
            </span>
            {article.grammarBox.map((g, i) => (
              <div key={i}>
                <h4 className="text-sm font-bold text-white mb-2">{g.title}</h4>
                <div className="p-3 bg-[#141414] font-mono text-xs text-[#D9FF3F] rounded border border-[#262626] mb-2">
                  {g.formula}
                </div>
                <p className="text-xs text-[#999] leading-relaxed">{g.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {/* Body Paragraphs with Editorial Drop-Cap */}
        <div className="space-y-6 text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-normal mb-16">
          {article.content.map((p, index) => {
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="first-letter:text-5xl first-letter:font-black first-letter:font-display first-letter:text-[#D9FF3F] first-letter:float-left first-letter:mr-3 first-letter:mt-1 text-[#E5E5E5]"
                >
                  {p}
                </p>
              );
            }
            return <p key={index}>{p}</p>;
          })}
        </div>

        {/* Interactive Quiz Trigger Banner inside Article */}
        {article.relatedQuizId && (
          <div className="p-6 sm:p-8 bg-[#101010] border border-[#2A2A2A] rounded-xl mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-1">
                KIỂM TRA KIẾN THỨC BÀI ĐỌC
              </span>
              <h4 className="text-lg font-bold text-white">
                Thử thách phản xạ với bài Quiz ngắn 3 phút
              </h4>
              <p className="text-xs text-[#888] mt-1">
                Đo lường mức độ ghi nhớ và hiểu sâu các khái niệm vừa đọc.
              </p>
            </div>
            <button
              onClick={() => onStartQuiz(article.relatedQuizId!)}
              className="px-6 py-3 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              LÀM BÀI QUIZ NGAY →
            </button>
          </div>
        )}

        {/* Connected Learning: Related Lesson & Course */}
        {(relatedLesson || relatedCourse) && (
          <div className="p-6 bg-[#0E0E0E] border border-[#202020] rounded-xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777] block mb-4">
              NỘI DUNG THỰC HÀNH KẾT NỐI
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedLesson && (
                <div
                  onClick={() => onNavigate(`/bai-hoc/${relatedLesson.slug}`)}
                  className="p-4 bg-[#141414] border border-[#262626] hover:border-[#D9FF3F] rounded-lg cursor-pointer group transition-all"
                >
                  <span className="text-[11px] font-mono text-[#D9FF3F] block mb-1">
                    BÀI HỌC TƯƠNG TÁC
                  </span>
                  <h5 className="text-sm font-bold text-white group-hover:text-[#D9FF3F] mb-1">
                    {relatedLesson.title}
                  </h5>
                  <p className="text-xs text-[#777] line-clamp-2 mb-2">
                    {relatedLesson.summary}
                  </p>
                  <span className="text-xs font-bold text-white group-hover:text-[#D9FF3F] flex items-center gap-1">
                    Vào phòng học ({relatedLesson.duration}) →
                  </span>
                </div>
              )}

              {relatedCourse && (
                <div
                  onClick={() => onSelectCourse(relatedCourse)}
                  className="p-4 bg-[#141414] border border-[#262626] hover:border-[#D9FF3F] rounded-lg cursor-pointer group transition-all"
                >
                  <span className="text-[11px] font-mono text-[#D9FF3F] block mb-1">
                    KHÓA HỌC ĐẦY ĐỦ
                  </span>
                  <h5 className="text-sm font-bold text-white group-hover:text-[#D9FF3F] mb-1">
                    {relatedCourse.title}
                  </h5>
                  <p className="text-xs text-[#777] line-clamp-2 mb-2">
                    {relatedCourse.description}
                  </p>
                  <span className="text-xs font-bold text-white group-hover:text-[#D9FF3F] flex items-center gap-1">
                    Xem giáo trình khóa học →
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Previous / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8 border-y border-[#1E1E1E] mb-16">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle)}
              className="text-left p-4 bg-[#0A0A0A] hover:bg-[#121212] border border-[#1E1E1E] rounded-lg transition-colors cursor-pointer group"
            >
              <span className="text-[11px] font-mono text-[#666] flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                BÀI TRƯỚC ĐÓ
              </span>
              <h5 className="text-sm font-bold text-white group-hover:text-[#D9FF3F] line-clamp-1">
                {prevArticle.title}
              </h5>
            </button>
          ) : <div />}

          {nextArticle ? (
            <button
              onClick={() => onSelectArticle(nextArticle)}
              className="text-right p-4 bg-[#0A0A0A] hover:bg-[#121212] border border-[#1E1E1E] rounded-lg transition-colors cursor-pointer group"
            >
              <span className="text-[11px] font-mono text-[#666] flex items-center justify-end gap-1 mb-1">
                BÀI TIẾP THEO
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <h5 className="text-sm font-bold text-white group-hover:text-[#D9FF3F] line-clamp-1">
                {nextArticle.title}
              </h5>
            </button>
          ) : <div />}
        </div>

        {/* Related Articles Grid */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#777] mb-6 font-bold">
            BÀI VIẾT CÙNG LĨNH VỰC
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((ra) => (
              <div
                key={ra.id}
                onClick={() => onSelectArticle(ra)}
                className="p-5 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#383838] rounded-xl cursor-pointer group transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#D9FF3F] block mb-2">{ra.readingTime}</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#D9FF3F] line-clamp-2 mb-2">
                    {ra.title}
                  </h4>
                </div>
                <span className="text-xs text-[#777] group-hover:text-white pt-2 border-t border-[#181818] mt-3">
                  Đọc tiếp →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 text-center pt-10 border-t border-[#1E1E1E]">
          <h4 className="text-2xl font-bold text-white font-display mb-3">
            TIẾP TỤC HÀNH TRÌNH HỌC TẬP
          </h4>
          <p className="text-xs text-[#888] max-w-md mx-auto mb-6">
            Đừng dừng lại ở việc đọc. Hãy thực hành các bài tập và làm bài kiểm tra để biến kiến thức thành kỹ năng bản năng.
          </p>
          <button
            onClick={() => onNavigate(`/${article.categoryId}`)}
            className="px-8 py-3.5 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer"
          >
            VỀ KHÔNG GIAN {article.categoryName} →
          </button>
        </div>

      </div>
    </div>
  );
};
