import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SavedItem, Article, Course } from '../types';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { Bookmark, ArrowRight, Trash2, BookOpen, FileText, CheckCircle2 } from 'lucide-react';

interface SavedPageProps {
  savedItems: SavedItem[];
  onToggleBookmark: (item: SavedItem) => void;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (lessonSlug: string) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  savedItems,
  onToggleBookmark,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
  onSelectLesson,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'article' | 'course' | 'lesson'>('all');

  const filteredItems = savedItems.filter(
    (item) => filterType === 'all' || item.type === filterType
  );

  const handleOpenItem = (item: SavedItem) => {
    if (item.type === 'article') {
      const art = ARTICLES.find((a) => a.slug === item.slug);
      if (art) onSelectArticle(art);
      else onNavigate(`/bai-viet/${item.slug}`);
    } else if (item.type === 'course') {
      const crs = COURSES.find((c) => c.slug === item.slug);
      if (crs) onSelectCourse(crs);
      else onNavigate(`/khoa-hoc/${item.slug}`);
    } else if (item.type === 'lesson') {
      onSelectLesson(item.slug);
    }
  };

  return (
    <div className="pt-24 pb-28 bg-[#050505] min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'NỘI DUNG ĐÃ LƯU' }]}
          onNavigate={onNavigate}
        />

        {/* Header */}
        <div className="py-8 border-b border-[#1E1E1E] mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="w-5 h-5 text-[#D9FF3F] fill-current" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              BỘ SƯU TẬP CỦA BẠN
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-display mb-3">
            NỘI DUNG ĐÃ LƯU
          </h1>
          <p className="text-sm text-[#999]">
            Quản lý các bài viết, khóa học và bài học bạn muốn nghiên cứu chuyên sâu hoặc ôn tập lại.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'all', label: `Tất cả (${savedItems.length})` },
            { id: 'article', label: `Bài viết (${savedItems.filter((i) => i.type === 'article').length})` },
            { id: 'course', label: `Khóa học (${savedItems.filter((i) => i.type === 'course').length})` },
            { id: 'lesson', label: `Bài học (${savedItems.filter((i) => i.type === 'lesson').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-white text-black'
                  : 'bg-[#121212] text-[#888] hover:text-white border border-[#222]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Saved Items List */}
        {filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenItem(item)}
                className="p-5 sm:p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#383838] rounded-xl cursor-pointer group transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center shrink-0 mt-0.5">
                    {item.type === 'article' ? (
                      <FileText className="w-4 h-4 text-[#D9FF3F]" />
                    ) : item.type === 'course' ? (
                      <BookOpen className="w-4 h-4 text-[#D9FF3F]" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[#D9FF3F]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#666] mb-1">
                      <span className="text-[#D9FF3F] uppercase font-bold">{item.category}</span>
                      <span>·</span>
                      <span className="uppercase">{item.type}</span>
                      <span>·</span>
                      <span>{item.meta}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#181818] justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(item);
                    }}
                    className="p-2 text-[#666] hover:text-red-400 hover:bg-[#1A1414] rounded transition-colors"
                    title="Xóa khỏi danh sách lưu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <span className="px-3.5 py-1.5 bg-[#181818] group-hover:bg-[#D9FF3F] group-hover:text-black text-xs font-bold rounded transition-colors flex items-center gap-1">
                    <span>Mở</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-[#0A0A0A] border border-dashed border-[#222] rounded-2xl">
            <Bookmark className="w-8 h-8 text-[#555] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              Bạn chưa lưu nội dung nào.
            </h3>
            <p className="text-xs sm:text-sm text-[#777] max-w-sm mx-auto mb-6">
              Khi đọc bài viết hoặc khám phá khóa học, hãy nhấn biểu tượng Bookmark để lưu lại ôn tập bất cứ lúc nào.
            </p>
            <button
              onClick={() => onNavigate('/')}
              className="px-6 py-3 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer"
            >
              KHÁM PHÁ NỘI DUNG NGAY →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
