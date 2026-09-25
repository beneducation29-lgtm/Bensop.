import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, FileText, CheckCircle2, Bookmark, Layers, GraduationCap } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';
import { TOPICS } from '../data/topics';
import { QUIZZES } from '../data/quizzes';
import { vocabularyService } from '../services/vocabularyService';
import { grammarService } from '../services/grammarService';
import { Article, Course, Quiz } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (lessonSlug: string) => void;
  onSelectQuiz: (quizId: string) => void;
  onNavigate: (path: string) => void;
}

type FilterTab = 'ALL' | 'ARTICLES' | 'COURSES' | 'LESSONS' | 'TOPICS' | 'VOCABULARY' | 'GRAMMAR' | 'QUIZ';

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectCourse,
  onSelectLesson,
  onSelectQuiz,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search logic across all datasets
  const filteredArticles = ARTICLES.filter(
    (a) =>
      !normalizedQuery ||
      a.title.toLowerCase().includes(normalizedQuery) ||
      a.excerpt.toLowerCase().includes(normalizedQuery) ||
      a.categoryName.toLowerCase().includes(normalizedQuery) ||
      (a.subtitle && a.subtitle.toLowerCase().includes(normalizedQuery))
  );

  const filteredCourses = COURSES.filter(
    (c) =>
      !normalizedQuery ||
      c.title.toLowerCase().includes(normalizedQuery) ||
      c.description.toLowerCase().includes(normalizedQuery) ||
      c.categoryName.toLowerCase().includes(normalizedQuery)
  );

  const filteredLessons = LESSONS.filter(
    (l) =>
      !normalizedQuery ||
      l.title.toLowerCase().includes(normalizedQuery) ||
      l.summary.toLowerCase().includes(normalizedQuery) ||
      l.categoryName.toLowerCase().includes(normalizedQuery)
  );

  const filteredTopics = TOPICS.filter(
    (t) =>
      !normalizedQuery ||
      t.name.toLowerCase().includes(normalizedQuery) ||
      t.description.toLowerCase().includes(normalizedQuery) ||
      t.englishName.toLowerCase().includes(normalizedQuery)
  );

  const allWords = [
    ...vocabularyService.getAllWords('en'),
    ...vocabularyService.getAllWords('zh'),
  ];
  const allConcepts = [
    ...grammarService.getAllConcepts('en'),
    ...grammarService.getAllConcepts('zh'),
  ];

  const filteredVocab = allWords.filter(
    (v) =>
      !normalizedQuery ||
      v.word.toLowerCase().includes(normalizedQuery) ||
      v.meaning.toLowerCase().includes(normalizedQuery) ||
      v.pronunciation.toLowerCase().includes(normalizedQuery) ||
      v.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
  );

  const filteredGrammar = allConcepts.filter(
    (g) =>
      !normalizedQuery ||
      g.title.toLowerCase().includes(normalizedQuery) ||
      g.theIdea.toLowerCase().includes(normalizedQuery) ||
      g.shortDescription.toLowerCase().includes(normalizedQuery) ||
      g.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
  );

  const filteredQuizzes = QUIZZES.filter(
    (q) =>
      !normalizedQuery ||
      q.title.toLowerCase().includes(normalizedQuery) ||
      q.categoryName.toLowerCase().includes(normalizedQuery)
  );

  const totalResults =
    filteredArticles.length +
    filteredCourses.length +
    filteredLessons.length +
    filteredTopics.length +
    filteredVocab.length +
    filteredGrammar.length +
    filteredQuizzes.length;

  const tabs: FilterTab[] = ['ALL', 'ARTICLES', 'COURSES', 'LESSONS', 'TOPICS', 'VOCABULARY', 'GRAMMAR', 'QUIZ'];

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-start overflow-y-auto animate-in fade-in duration-200">
      
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full px-5 sm:px-8 pt-8 pb-6 flex items-center justify-between border-b border-[#1A1A1A]">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-2xl tracking-tighter text-white font-display">
            BENSOP
          </span>
          <span className="text-xs font-mono tracking-widest text-[#666] uppercase pl-2 border-l border-[#262626]">
            GLOBAL KNOWLEDGE SEARCH
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-[#888] hover:text-white bg-[#121212] border border-[#222] transition-colors cursor-pointer"
        >
          <span>ĐÓNG</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[#1C1C1C] rounded border border-[#333]">ESC</kbd>
          <X className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Main Search Input Area */}
      <div className="max-w-6xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-14">
        
        <div className="relative mb-8">
          <label htmlFor="search-input" className="block text-xs font-mono uppercase tracking-widest text-[#777] mb-3">
            Tìm kiếm bài học, khóa học, chủ đề, từ vựng, ngữ pháp & quiz
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-0 w-8 h-8 text-[#555]" />
            <input
              id="search-input"
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập từ khóa (vd: present perfect, phrasal verbs, thanh điệu, deep work...)"
              className="w-full bg-transparent pl-12 pr-10 py-3 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white placeholder-[#333] focus:outline-none border-b border-[#262626] focus:border-[#D9FF3F] transition-colors tracking-tight font-display"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-0 p-2 text-[#777] hover:text-white"
                title="Xóa tìm kiếm"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-[#141414]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === tab
                  ? 'bg-white text-black'
                  : 'bg-[#121212] text-[#888] hover:text-white hover:bg-[#1A1A1A] border border-[#202020]'
              }`}
            >
              {tab}
            </button>
          ))}
          <span className="text-xs font-mono text-[#555] ml-auto shrink-0 pl-4">
            {totalResults} kết quả
          </span>
        </div>

        {/* Results Stream */}
        <div className="space-y-12">
          
          {/* Lessons Category */}
          {(activeFilter === 'ALL' || activeFilter === 'LESSONS') && filteredLessons.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-4 uppercase tracking-widest">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>BÀI HỌC TRỰC TUYẾN ({filteredLessons.length})</span>
              </div>
              <div className="space-y-3">
                {filteredLessons.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => {
                      onSelectLesson(l.slug);
                      onClose();
                    }}
                    className="p-5 bg-[#101010] border border-[#222] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#777] mb-1.5">
                        <span className="text-[#D9FF3F] uppercase">{l.categoryName}</span>
                        <span>·</span>
                        <span>{l.duration}</span>
                        <span>·</span>
                        <span className="truncate max-w-[200px]">{l.courseTitle}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-1 font-display">
                        {l.title}
                      </h4>
                      <p className="text-xs text-[#8E8E8E] line-clamp-1">
                        {l.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#555] group-hover:text-[#D9FF3F] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Category */}
          {(activeFilter === 'ALL' || activeFilter === 'ARTICLES') && filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-4 uppercase tracking-widest">
                <FileText className="w-3.5 h-3.5" />
                <span>BÀI VIẾT CHUYÊN ĐỀ ({filteredArticles.length})</span>
              </div>
              <div className="space-y-3">
                {filteredArticles.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onSelectArticle(a);
                      onClose();
                    }}
                    className="p-5 bg-[#101010] border border-[#222] hover:border-[#404040] rounded-xl cursor-pointer group transition-all flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#777] mb-1.5">
                        <span className="text-[#D9FF3F] uppercase">{a.categoryName}</span>
                        <span>·</span>
                        <span>{a.readingTime}</span>
                        <span>·</span>
                        <span>{a.publishedAt}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-1 font-display">
                        {a.title}
                      </h4>
                      <p className="text-xs text-[#8E8E8E] line-clamp-1">
                        {a.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#555] group-hover:text-[#D9FF3F] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Category */}
          {(activeFilter === 'ALL' || activeFilter === 'COURSES') && filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-4 uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                <span>KHÓA HỌC CHUYÊN SÂU ({filteredCourses.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectCourse(c);
                      onClose();
                    }}
                    className="p-5 bg-[#101010] border border-[#222] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all"
                  >
                    <div className="flex justify-between text-xs font-mono text-[#777] mb-2">
                      <span className="text-white font-bold">{c.categoryName}</span>
                      <span>{c.level}</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2 font-display">
                      {c.title}
                    </h4>
                    <p className="text-xs text-[#888] line-clamp-2 mb-3">
                      {c.description}
                    </p>
                    <span className="text-[11px] font-mono text-[#666]">
                      {c.duration} · {c.lessonsCount} bài
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics Category */}
          {(activeFilter === 'ALL' || activeFilter === 'TOPICS') && filteredTopics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-4 uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5" />
                <span>CHỦ ĐỀ CHUYÊN MỤC ({filteredTopics.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onNavigate(`/${t.categoryId}/${t.slug}`);
                      onClose();
                    }}
                    className="p-5 bg-[#101010] border border-[#222] hover:border-[#383838] rounded-xl cursor-pointer group transition-all"
                  >
                    <span className="text-[11px] font-mono text-[#D9FF3F] uppercase block mb-1">
                      {t.categoryId}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-1 font-display">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#777] line-clamp-2 mb-3">
                      {t.description}
                    </p>
                    <span className="text-[11px] font-mono text-[#555] block">
                      {t.stats.lessonsCount}+ bài học · {t.stats.itemsCount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vocabulary Category */}
          {(activeFilter === 'ALL' || activeFilter === 'VOCABULARY') && filteredVocab.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-4 uppercase tracking-widest">
                <Bookmark className="w-3.5 h-3.5" />
                <span>TỪ VỰNG TRỌNG TÂM ({filteredVocab.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVocab.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => {
                      onNavigate(`/${v.language === 'en' ? 'tieng-anh' : 'tieng-trung'}/vocabulary/${v.slug}`);
                      onClose();
                    }}
                    className="p-5 bg-[#101010] border border-[#222] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all"
                  >
                    <div className="flex justify-between text-[11px] font-mono text-[#666] mb-2 uppercase">
                      <span className="text-[#D9FF3F]">{v.language === 'en' ? 'Tiếng Anh' : 'Tiếng Trung'}</span>
                      <span className="px-2 py-0.5 rounded bg-[#181818] text-white">{v.level}</span>
                    </div>
                    <div className="text-xl font-black text-white group-hover:text-[#D9FF3F] transition-colors mb-1 font-display">
                      {v.word}
                    </div>
                    <div className="text-xs font-mono text-[#D9FF3F] mb-2">{v.pronunciation}</div>
                    <div className="text-xs text-[#CCC] mb-2">{v.meaning}</div>
                    {v.examples && v.examples.length > 0 && (
                      <div className="text-[11px] text-[#777] italic border-t border-[#1C1C1C] pt-2 line-clamp-2">
                        "{v.examples[0].sentence}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grammar Category */}
          {(activeFilter === 'ALL' || activeFilter === 'GRAMMAR') && filteredGrammar.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-4 uppercase tracking-widest">
                <span>CẤU TRÚC NGỮ PHÁP ({filteredGrammar.length})</span>
              </div>
              <div className="space-y-3">
                {filteredGrammar.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      onNavigate(`/${g.language === 'en' ? 'tieng-anh' : 'tieng-trung'}/grammar/${g.slug}`);
                      onClose();
                    }}
                    className="p-5 bg-[#101010] border border-[#222] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-mono text-[#D9FF3F] uppercase">
                        {g.language === 'en' ? 'TIẾNG ANH' : 'TIẾNG TRUNG'} · {g.level}
                      </span>
                      <span className="text-xs text-zinc-400 group-hover:text-white flex items-center gap-1 font-mono">
                        Xem chi tiết →
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors mt-1 mb-2 font-display">
                      {g.title}
                    </h4>
                    {g.rules && g.rules.length > 0 && g.rules[0].formula && (
                      <div className="text-xs font-mono text-[#D9FF3F] bg-[#161616] p-2.5 rounded border border-[#262626] mb-2">
                        {g.rules[0].formula}
                      </div>
                    )}
                    <p className="text-xs text-[#888] line-clamp-2">{g.theIdea || g.shortDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quizzes Category */}
          {(activeFilter === 'ALL' || activeFilter === 'QUIZ') && filteredQuizzes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-4 uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>BÀI KIỂM TRA PHẢN XẠ QUIZ ({filteredQuizzes.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredQuizzes.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => {
                      onSelectQuiz(q.id);
                      onClose();
                    }}
                    className="p-5 bg-[#101010] border border-[#222] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all"
                  >
                    <div className="flex justify-between text-xs font-mono text-[#777] mb-2 uppercase">
                      <span className="text-[#D9FF3F] font-bold">{q.categoryName}</span>
                      <span>Độ khó: {q.difficulty}</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2 font-display">
                      {q.title}
                    </h4>
                    <p className="text-xs text-[#888] mb-4">{q.subtitle}</p>
                    <div className="flex justify-between items-center text-xs font-bold text-white group-hover:text-[#D9FF3F]">
                      <span>{q.questions.length} câu hỏi · {q.timeLimit}</span>
                      <span>Làm bài →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {totalResults === 0 && (
            <div className="text-center py-20 border border-dashed border-[#222] rounded-2xl">
              <p className="text-lg font-bold text-white mb-2">
                Không tìm thấy kết quả phù hợp cho "{query}"
              </p>
              <p className="text-xs text-[#777] max-w-sm mx-auto mb-6">
                Hãy thử tìm kiếm với các từ khóa phổ biến: "tiếng anh", "tiếng trung", "phrasal verbs", "kỷ luật", "giấc ngủ", "thói quen".
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-4 py-2 bg-[#1C1C1C] text-xs font-semibold text-white rounded-lg hover:bg-[#252525]"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
