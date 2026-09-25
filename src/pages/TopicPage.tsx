import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { FilterBar } from '../components/FilterBar';
import { Topic, Article, Course, SavedItem } from '../types';
import { CATEGORIES } from '../data/categories';
import { TOPICS } from '../data/topics';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { BookmarkButton } from '../components/BookmarkButton';
import { ArrowRight, BookOpen, Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface TopicPageProps {
  categorySlug: string;
  topicSlug: string;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  savedItems: SavedItem[];
  onToggleBookmark: (item: SavedItem) => void;
}

export const TopicPage: React.FC<TopicPageProps> = ({
  categorySlug,
  topicSlug,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
  savedItems,
  onToggleBookmark,
}) => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSort, setSelectedSort] = useState<'latest' | 'popular' | 'recommended'>('latest');

  const category = CATEGORIES.find(
    (c) => c.slug === `/${categorySlug}` || c.id === categorySlug
  );

  const topic = TOPICS.find(
    (t) => t.categoryId === category?.id && t.slug === topicSlug
  );

  if (!category || !topic) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Không tìm thấy chủ đề này</h2>
        <button
          onClick={() => onNavigate('/')}
          className="text-xs text-[#D9FF3F] font-mono underline"
        >
          Quay về trang chủ
        </button>
      </div>
    );
  }

  // Filter articles belonging to this category and topic
  let filteredArticles = ARTICLES.filter((a) => {
    const matchesCategory = a.categoryId === category.id;
    const matchesTopic = a.topicSlug === topicSlug || a.content.some((p) => p.toLowerCase().includes(topic.name.toLowerCase()));
    const matchesLevel = selectedLevel === 'all' || a.level === selectedLevel;
    return matchesCategory && (matchesTopic || !a.topicSlug) && matchesLevel;
  });

  if (selectedSort === 'popular') {
    filteredArticles = [...filteredArticles].reverse();
  }

  const topicCourses = COURSES.filter((c) => c.categoryId === category.id && (c.topicSlug === topicSlug || !c.topicSlug));

  return (
    <div className="pt-24 pb-24 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: category.name, path: category.slug },
            { label: topic.name.toUpperCase() }
          ]}
          onNavigate={onNavigate}
        />

        {/* Topic Hero Section */}
        <div className="py-8 sm:py-12 border-b border-[#1E1E1E] mb-12">
          <div className="max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-2">
              {category.name} · CHỦ ĐỀ CHUYÊN SÂU
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase font-display mb-4">
              {topic.name}
            </h1>
            <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed mb-6 font-normal">
              {topic.description}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#888]">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold">{topic.stats.lessonsCount}+</span>
                <span>bài học</span>
              </div>
              <span className="text-[#333]">/</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D9FF3F] font-bold">{topic.stats.itemsCount}</span>
                <span>tài nguyên cốt lõi</span>
              </div>
              {topic.stats.topicsCount && (
                <>
                  <span className="text-[#333]">/</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold">{topic.stats.topicsCount}</span>
                    <span>phân nhánh</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Courses in this Topic if available */}
        {topicCourses.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#888] font-bold">
                Khóa học liên quan đến chủ đề này
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topicCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectCourse(c)}
                  className="p-6 bg-[#0E0E0E] border border-[#222] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all"
                >
                  <div className="flex justify-between text-xs font-mono text-[#777] mb-2 uppercase">
                    <span className="text-[#D9FF3F]">{c.level}</span>
                    <span>{c.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#888] leading-relaxed mb-4 line-clamp-2">
                    {c.description}
                  </p>
                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-bold text-white group-hover:text-[#D9FF3F]">
                    <span>{c.lessonsCount} bài học trong giáo trình</span>
                    <span className="flex items-center gap-1">Khám phá <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          selectedLevel={selectedLevel}
          onSelectLevel={setSelectedLevel}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          totalCount={filteredArticles.length}
        />

        {/* Articles List in this Topic */}
        {filteredArticles.length > 0 ? (
          <div className="space-y-4">
            {filteredArticles.map((art) => {
              const isSaved = savedItems.some((s) => s.slug === art.slug);
              return (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#383838] rounded-xl cursor-pointer group transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#666] mb-2">
                      <span className="text-[#D9FF3F] uppercase font-bold">{art.categoryName}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readingTime}
                      </span>
                      <span>·</span>
                      <span>{art.publishedAt}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2 font-display">
                      {art.title}
                    </h3>

                    {art.subtitle && (
                      <p className="text-xs font-mono text-[#999] mb-2">
                        {art.subtitle}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#888] line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#181818]">
                    <BookmarkButton
                      item={{
                        id: `save-${art.id}`,
                        type: 'article',
                        title: art.title,
                        slug: art.slug,
                        category: art.categoryName,
                        savedAt: 'Hôm nay',
                        meta: art.readingTime,
                      }}
                      isBookmarked={isSaved}
                      onToggle={onToggleBookmark}
                      showText={true}
                    />

                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181818] group-hover:bg-[#D9FF3F] group-hover:text-black text-xs font-bold rounded-lg transition-colors">
                      <span>Đọc bài</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0A0A0A] border border-dashed border-[#222] rounded-xl">
            <p className="text-sm font-bold text-white mb-2">Chưa có bài học nào phù hợp với bộ lọc</p>
            <p className="text-xs text-[#777] mb-4">Hãy thử chuyển bộ lọc về "Tất cả cấp độ"</p>
            <button
              onClick={() => setSelectedLevel('all')}
              className="px-4 py-2 bg-[#181818] text-xs font-semibold text-white rounded hover:bg-[#252525]"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
