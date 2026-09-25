import React, { useState } from 'react';
import { ArrowLeft, Brain, Target, Zap, Shield, ArrowRight, CheckCircle2, Sparkles, Compass, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { LearningPathTimeline } from '../components/LearningPathTimeline';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { LEARNING_PATHS } from '../data/learningPaths';
import { Article, Course } from '../types';

interface PersonalGrowthPageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  onStartQuiz: (quizId: string) => void;
}

export const PersonalGrowthPage: React.FC<PersonalGrowthPageProps> = ({
  onBack,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
  onStartQuiz,
}) => {
  const growthArticles = ARTICLES.filter((a) => a.categoryId === 'phat-trien-ban-than');
  const growthCourses = COURSES.filter((c) => c.categoryId === 'phat-trien-ban-than');
  const growthPath = LEARNING_PATHS.find((p) => p.categoryId === 'phat-trien-ban-than')!;

  const topics = [
    { name: 'Mindset', slug: 'mindset', desc: 'Mô hình tư duy bậc hai, nguyên lý thứ nhất & khắc kỷ hiện đại', icon: Brain, count: '32 bài học' },
    { name: 'Habits', slug: 'habits', desc: 'Thiết kế hệ thống thói quen vi mô bền bỉ theo James Clear', icon: Target, count: '28 bài học' },
    { name: 'Discipline', slug: 'discipline', desc: 'Kỷ luật sắt qua việc tối ưu môi trường và giảm thiểu lựa chọn', icon: Shield, count: '22 bài học' },
    { name: 'Productivity', slug: 'productivity', desc: 'Deep Work 90 phút, Time Blocking & quản trị năng lượng', icon: Zap, count: '30 bài học' },
    { name: 'Communication', slug: 'communication', desc: 'Thuyết phục, lắng nghe chủ động và giải quyết xung đột', icon: Target, count: '24 bài học' },
    { name: 'Career Strategy', slug: 'career', desc: 'Xây dựng lợi thế cạnh tranh cá nhân (Career Capital)', icon: Brain, count: '20 bài học' },
    { name: 'Leadership', slug: 'leadership', desc: 'Lãnh đạo bằng sự gương mẫu và thấu hiểu tâm lý', icon: Shield, count: '18 bài học' },
    { name: 'Personal Finance', slug: 'personal-finance', desc: 'Tư duy tài sản - tiêu sản và độc lập tài chính dài hạn', icon: Zap, count: '16 bài học' },
  ];

  const startHereItems = [
    {
      step: '01',
      title: 'Mô hình Tư duy Nguyên lý thứ nhất (First Principles)',
      type: 'TƯ DUY CỐT LÕI',
      slug: 'mo-hinh-tu-duy-nguyen-ly-thu-nhat',
      desc: 'Học cách bóc tách bất kỳ vấn đề phức tạp nào về những chân lý nền tảng thay vì suy nghĩ bắt chước.'
    },
    {
      step: '02',
      title: 'Kỷ luật không phải là làm nhiều hơn, mà là biết từ chối',
      type: 'KỶ LUẬT TỰ THÂN',
      slug: 'ky-luat-khong-phai-lam-nhieu-hon',
      desc: 'Bí mật của những người có kỷ luật thép: Thiết kế môi trường để giảm thiểu ma sát tâm lý.'
    },
    {
      step: '03',
      title: 'Xây dựng thói quen từ những việc nhỏ: Quy tắc 2 phút',
      type: 'HÀNH VI VI MÔ',
      slug: 'xay-dung-thoi-quen-tu-nhung-viec-nho',
      desc: 'Biến thói quen mới thành một cổng vào không thể trì hoãn trong 30 ngày đầu tiên.'
    },
    {
      step: '04',
      title: 'Deep Work: Phương pháp làm việc sâu trong thời đại phân tâm',
      type: 'HIỆU SUẤT ĐỈNH CAO',
      slug: 'deep-work-la-gi-cach-thuc-hien',
      desc: 'Bảo vệ khối thời gian 90 phút tập trung cao độ để sản xuất thành tựu vượt bậc.'
    },
    {
      step: '05',
      title: '5 cách quản lý thời gian và quản trị năng lượng sinh học',
      type: 'HỆ THỐNG VẬN HÀNH',
      slug: '5-cach-quan-ly-thoi-gian-thuc-te',
      desc: 'Chuyển hóa từ người bận rộn hỗn loạn thành người chủ động kiểm soát lịch trình.'
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'PHÁT TRIỂN BẢN THÂN' }]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="py-8 sm:py-14 border-b border-[#1E1E1E] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-[#D9FF3F] uppercase block mb-3">
                PHÁT TRIỂN BẢN THÂN
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.96] font-display uppercase mb-6">
                TRỞ THÀNH<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAEAEA] to-[#999]">
                  PHIÊN BẢN TỐT HƠN.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-xl mb-8 font-normal">
                Không chạy theo những lời khuyên cảm xúc nhất thời. Chúng tôi cung cấp các khung tư duy triết học, khoa học hành vi và công cụ thực chứng để bạn làm chủ cuộc đời mình.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('/khoa-hoc/ky-luat-tu-than-hieu-suat-dinh-cao')}
                  className="px-8 py-4 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer shadow-[0_0_25px_rgba(217,255,63,0.18)]"
                >
                  BẮT ĐẦU HỌC →
                </button>
                <button
                  onClick={() => onStartQuiz('quiz-growth-01')}
                  className="px-6 py-4 bg-[#141414] border border-[#2A2A2A] hover:border-[#444] text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  Đo lường tư duy hiệu suất
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#222] bg-[#111]">
                <img
                  src="/src/assets/images/bensop_growth_bw_1790320796588.jpg"
                  alt="Phát triển bản thân Bensop"
                  className="w-full h-full object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-1">
                    TRIẾT LÝ VẬN HÀNH
                  </span>
                  <p className="text-sm font-bold text-white">
                    Bạn không vươn tới tầm cao của mục tiêu, bạn rơi xuống ngang hàng với hệ thống bạn thiết lập.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: START HERE (5 nội dung nền tảng cho người mới) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-4 h-4 text-[#D9FF3F]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              DÀNH CHO NGƯỜI MỚI BẮT ĐẦU
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-8">
            START HERE — 5 BÀI HỌC NỀN TẢNG
          </h2>

          <div className="space-y-3">
            {startHereItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(`/bai-viet/${item.slug}`)}
                className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-black font-mono text-[#444] group-hover:text-[#D9FF3F] transition-colors shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-1">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#888] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#D9FF3F] shrink-0">
                  <span>Khám phá bài học</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: POPULAR TOPICS (8 Topics Grid with direct topic navigation) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-4 h-4 text-[#D9FF3F]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              CHỦ ĐỀ ĐƯỢC QUAN TÂM NHIỀU NHẤT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-8">
            POPULAR TOPICS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate(`/phat-trien-ban-than/${t.slug}`)}
                  className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#D9FF3F] rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#D9FF3F]">CHUYÊN ĐỀ 0{idx + 1}</span>
                      <Icon className="w-4 h-4 text-[#666] group-hover:text-[#D9FF3F] transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2">
                      {t.name}
                    </h3>
                    <p className="text-xs text-[#888] leading-relaxed mb-4">{t.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-[#181818] text-[11px] font-mono text-[#666] flex justify-between items-center">
                    <span>{t.count}</span>
                    <span className="text-white group-hover:text-[#D9FF3F] flex items-center gap-1 font-bold">
                      Vào xem <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Paths */}
        {growthPath && (
          <div className="mb-24 p-6 sm:p-10 bg-[#0C0C0C] border border-[#1E1E1E] rounded-2xl">
            <LearningPathTimeline
              path={growthPath}
              onSelectCourse={(slug) => onNavigate(`/khoa-hoc/${slug}`)}
              onNavigate={onNavigate}
            />
          </div>
        )}

        {/* Featured Articles */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest block mb-1">
              BÀI LUẬN TRI THỨC
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Các bài viết phân tích sâu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {growthArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="p-6 bg-[#0E0E0E] border border-[#222] hover:border-[#404040] rounded-xl cursor-pointer group transition-all"
              >
                <div className="text-xs font-mono text-[#777] mb-2">
                  {art.readingTime} · {art.publishedAt}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-3">
                  {art.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#999] leading-relaxed mb-4">
                  {art.excerpt}
                </p>
                <span className="text-xs font-bold text-white group-hover:text-[#D9FF3F] flex items-center gap-1">
                  Đọc toàn văn <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
