import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Volume2, ArrowRight, Award, Compass, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { LearningPathTimeline } from '../components/LearningPathTimeline';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { LEARNING_PATHS } from '../data/learningPaths';
import { Article, Course } from '../types';

interface EnglishPageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  onStartQuiz: (quizId: string) => void;
}

export const EnglishPage: React.FC<EnglishPageProps> = ({
  onBack,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
  onStartQuiz,
}) => {
  const englishArticles = ARTICLES.filter((a) => a.categoryId === 'tieng-anh');
  const englishCourses = COURSES.filter((c) => c.categoryId === 'tieng-anh');
  const englishPath = LEARNING_PATHS.find((p) => p.categoryId === 'tieng-anh')!;

  const [selectedTrack, setSelectedTrack] = useState<'beginner' | 'intermediate' | 'upper' | 'advanced'>('intermediate');

  const modules = [
    { name: 'Vocabulary', label: 'Collocations & Phrasal Verbs công sở', count: '1.200 cụm từ', topic: 'vocabulary' },
    { name: 'Grammar', label: 'Ngữ pháp ứng dụng không học vẹt', count: '90 cấu trúc', topic: 'grammar' },
    { name: 'Speaking', label: 'Phản xạ tư duy trực tiếp tiếng Anh', count: '80 chủ đề', topic: 'speaking' },
    { name: 'Listening', label: 'Bắt keyword tốc độ nói người bản ngữ', count: '75 audio clips', topic: 'listening' },
    { name: 'Reading', label: 'Đọc lướt & phân tích tài liệu chuyên ngành', count: '50 bài đọc', topic: 'reading' },
    { name: 'Writing', label: 'Viết email & báo cáo chuẩn ngoại giao', count: '30 templates', topic: 'writing' },
    { name: 'Pronunciation', label: 'Nối âm Connected Speech & ngữ điệu', count: '35 bài luyện', topic: 'pronunciation' },
    { name: 'Quiz Lab', label: 'Trắc nghiệm phản xạ ngữ cảnh', count: '30 bộ đề', topic: 'quiz' },
  ];

  const paths = [
    {
      id: 'beginner',
      title: 'Beginner (A1 - A2)',
      desc: 'Xây dựng 800 từ vựng cốt lõi, chuẩn hóa phát âm IPA và câu đơn giao tiếp.',
      target: 'Phản xạ câu cơ bản sau 45 ngày'
    },
    {
      id: 'intermediate',
      title: 'Intermediate (B1 - B2)',
      desc: 'Làm chủ Phrasal Verbs, nối âm Connected Speech và diễn đạt ý tưởng mạch lạc.',
      target: 'Tự tin đàm phán trong công việc'
    },
    {
      id: 'upper',
      title: 'Upper Intermediate (B2+)',
      desc: 'Thuyết trình chuyên sâu, viết báo cáo phân tích và tranh luận lịch thiệp.',
      target: 'Dẫn dắt các cuộc họp đa quốc gia'
    },
    {
      id: 'advanced',
      title: 'Advanced (C1 - C2)',
      desc: 'Sử dụng thành ngữ, ẩn dụ tinh tế, kỹ thuật Storytelling và phong thái bản ngữ.',
      target: 'Lãnh đạo và truyền cảm hứng toàn cầu'
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'TIẾNG ANH' }]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="py-8 sm:py-14 border-b border-[#1E1E1E] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-[#D9FF3F] uppercase block mb-3">
                TIẾNG ANH
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.96] font-display uppercase mb-6">
                SPEAK.<br />
                UNDERSTAND.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAEAEA] to-[#999]">
                  CONNECT.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-xl mb-8 font-normal">
                Xây dựng khả năng sử dụng tiếng Anh cho học tập, công việc và giao tiếp thực tế. Thoát khỏi tư duy dịch nhẩm từng chữ và nói tự nhiên như người bản xứ.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('/khoa-hoc/connected-speech-speaking-tu-nhien')}
                  className="px-8 py-4 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer shadow-[0_0_25px_rgba(217,255,63,0.18)]"
                >
                  BẮT ĐẦU HỌC →
                </button>
                <button
                  onClick={() => onStartQuiz('quiz-en-01')}
                  className="px-6 py-4 bg-[#141414] border border-[#2A2A2A] hover:border-[#444] text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  Làm Quiz Phrasal Verbs
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#222] bg-[#111]">
                <img
                  src="/src/assets/images/bensop_english_bw_1790320781718.jpg"
                  alt="Tiếng Anh thực tế Bensop"
                  className="w-full h-full object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-1">
                    PHƯƠNG PHÁP CỐT LÕI
                  </span>
                  <p className="text-sm font-bold text-white">
                    Connected Speech & Particle Logic giúp loại bỏ giọng gượng gạo sau 30 ngày.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: CHỌN LỘ TRÌNH (Learning Paths) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="w-4 h-4 text-[#D9FF3F]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              LỘ TRÌNH PHÁT TRIỂN
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-8">
            CHỌN CẤP ĐỘ CỦA BẠN
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {paths.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedTrack(p.id as any)}
                className={`p-6 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTrack === p.id
                    ? 'bg-[#141414] border-[#D9FF3F] shadow-[0_0_20px_rgba(217,255,63,0.08)]'
                    : 'bg-[#0E0E0E] border-[#202020] hover:border-[#383838]'
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-[#888] leading-relaxed mb-4">{p.desc}</p>
                </div>
                <div className="pt-3 border-t border-[#1C1C1C] text-[11px] font-mono text-[#D9FF3F]">
                  🎯 {p.target}
                </div>
              </button>
            ))}
          </div>

          {/* Timeline */}
          {englishPath && (
            <div className="p-6 sm:p-10 bg-[#0C0C0C] border border-[#1E1E1E] rounded-2xl">
              <LearningPathTimeline
                path={englishPath}
                onSelectCourse={(slug) => onNavigate(`/khoa-hoc/${slug}`)}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>

        {/* Section: HỌC TIẾNG ANH (8 Modules) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-4 h-4 text-[#D9FF3F]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              CHUYÊN MỤC KỸ NĂNG
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-8">
            HỌC TIẾNG ANH
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(`/tieng-anh/${m.topic}`)}
                className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#D9FF3F] rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#D9FF3F] block mb-2">
                    MODULE 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2">
                    {m.name}
                  </h3>
                  <p className="text-xs text-[#888] mb-4">{m.label}</p>
                </div>
                <div className="text-[11px] font-mono text-[#666] pt-3 border-t border-[#181818] flex justify-between items-center">
                  <span>{m.count}</span>
                  <span className="text-white group-hover:text-[#D9FF3F] flex items-center gap-1 font-bold">
                    Khám phá <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest block mb-1">
              BÀI VIẾT NỔI BẬT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Bài viết thực tiễn Tiếng Anh
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {englishArticles.map((art) => (
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
