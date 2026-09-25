import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Volume2, CheckCircle2, ArrowRight, Award, Compass, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { LearningPathTimeline } from '../components/LearningPathTimeline';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { LEARNING_PATHS } from '../data/learningPaths';
import { Article, Course } from '../types';

interface ChinesePageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
  onStartQuiz: (quizId: string) => void;
}

export const ChinesePage: React.FC<ChinesePageProps> = ({
  onBack,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
  onStartQuiz,
}) => {
  const chineseArticles = ARTICLES.filter((a) => a.categoryId === 'tieng-trung');
  const chineseCourses = COURSES.filter((c) => c.categoryId === 'tieng-trung');
  const chinesePath = LEARNING_PATHS.find((p) => p.categoryId === 'tieng-trung')!;

  const [activeTone, setActiveTone] = useState<number>(1);
  const [selectedTrack, setSelectedTrack] = useState<'beginner' | 'intermediate' | 'advanced' | 'hsk'>('beginner');

  const tones = [
    { tone: 1, name: 'Thanh 1 (阴平)', pinyin: 'mā (妈)', meaning: 'Mẹ', tonePitch: '5-5', desc: 'Cao, ngân đều, không hạ giọng' },
    { tone: 2, name: 'Thanh 2 (阳平)', pinyin: 'má (麻)', meaning: 'Cây gai, tê', tonePitch: '3-5', desc: 'Đi từ trung bình lên cao, tương tự dấu sắc nhẹ' },
    { tone: 3, name: 'Thanh 3 (上声)', pinyin: 'mǎ (马)', meaning: 'Con ngựa', tonePitch: '2-1-4', desc: 'Hạ thấp rồi vểnh nhẹ lên' },
    { tone: 4, name: 'Thanh 4 (去声)', pinyin: 'mà (骂)', meaning: 'Mắng mỏ', tonePitch: '5-1', desc: 'Rơi thẳng từ đỉnh cao nhất xuống dứt khoát' },
  ];

  const modules = [
    { name: 'Vocabulary', label: 'Từ vựng cốt lõi HSK 1 - HSK 6', count: '1.500+ từ', topic: 'vocabulary' },
    { name: 'Grammar', label: 'Cấu trúc ngữ pháp thực dụng', count: '120 cấu trúc', topic: 'grammar' },
    { name: 'Pronunciation', label: 'Bính âm Pinyin & 4 Thanh điệu', count: '30 bài thực hành', topic: 'pronunciation' },
    { name: 'Listening', label: 'Luyện nghe bắt keyword tự nhiên', count: '60 audio clips', topic: 'listening' },
    { name: 'Speaking', label: 'Phản xạ đàm phán & giao tiếp đời sống', count: '85 hội thoại', topic: 'speaking' },
    { name: 'Reading', label: 'Đọc báo, tin tức và tài liệu thương mại', count: '45 bài đọc', topic: 'reading' },
    { name: 'HSK Track', label: 'Lộ trình thi chứng chỉ HSK & HSKK', count: '6 cấp độ', topic: 'hsk' },
    { name: 'Quiz Lab', label: 'Trắc nghiệm phản xạ từ vựng', count: '25 bộ đề', topic: 'quiz' },
  ];

  const tracks = [
    {
      id: 'beginner',
      title: 'Beginner (Sơ cấp)',
      desc: 'Bính âm Pinyin, quy tắc phát âm, 300 từ HSK 1-2 và hội thoại sinh hoạt cơ bản.',
      target: 'Đạt phản xạ giao tiếp sau 60 ngày'
    },
    {
      id: 'intermediate',
      title: 'Intermediate (Trung cấp)',
      desc: '600 từ HSK 3, ngữ pháp câu chữ 把/被, đàm phán mua hàng và thương lượng cơ bản.',
      target: 'Làm việc trực tiếp qua tin nhắn/email'
    },
    {
      id: 'advanced',
      title: 'Advanced (Nâng cao)',
      desc: 'HSK 5-6, đọc báo chí chuyên ngành tài chính, phiên dịch thương mại và thành ngữ cổ.',
      target: 'Đàm phán độc lập cùng đối tác'
    },
    {
      id: 'hsk',
      title: 'Luyện thi HSK 3.0',
      desc: 'Hệ thống đề thi thử, chiến thuật làm bài nghe hiểu và mẹo làm bài viết HSK 1 - 6.',
      target: 'Chinh phục chứng chỉ quốc tế'
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'TIẾNG TRUNG' }]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="py-8 sm:py-14 border-b border-[#1E1E1E] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-[#D9FF3F] uppercase block mb-3">
                TIẾNG TRUNG
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.96] font-display uppercase mb-6">
                HỌC TIẾNG TRUNG<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAEAEA] to-[#999]">
                  THEO CÁCH THỰC TẾ.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-xl mb-8 font-normal">
                Từ phát âm, từ vựng và ngữ pháp đến giao tiếp, HSK và khả năng sử dụng tiếng Trung trong đời sống và sự nghiệp.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('/khoa-hoc/tieng-trung-thuc-chien-tu-con-so-0')}
                  className="px-8 py-4 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer shadow-[0_0_25px_rgba(217,255,63,0.18)]"
                >
                  BẮT ĐẦU HỌC →
                </button>
                <button
                  onClick={() => onStartQuiz('quiz-zh-01')}
                  className="px-6 py-4 bg-[#141414] border border-[#2A2A2A] hover:border-[#444] text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  Làm Quiz Test HSK
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#222] bg-[#111]">
                <img
                  src="/src/assets/images/bensop_chinese_bw_1790320769606.jpg"
                  alt="Tiếng Trung thực tế Bensop"
                  className="w-full h-full object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-1">
                    PHƯƠNG PHÁP BENSOP
                  </span>
                  <p className="text-sm font-bold text-white">
                    Chiết tự chữ Hán logic kết hợp phản xạ đàm phán xuất nhập khẩu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: CHỌN CON ĐƯỜNG CỦA BẠN (Learning Paths) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="w-4 h-4 text-[#D9FF3F]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              ĐỊNH HƯỚNG MỤC TIÊU
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-8">
            CHỌN CON ĐƯỜNG CỦA BẠN
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {tracks.map((tr) => (
              <button
                key={tr.id}
                onClick={() => setSelectedTrack(tr.id as any)}
                className={`p-6 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTrack === tr.id
                    ? 'bg-[#141414] border-[#D9FF3F] shadow-[0_0_20px_rgba(217,255,63,0.08)]'
                    : 'bg-[#0E0E0E] border-[#202020] hover:border-[#383838]'
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{tr.title}</h3>
                  <p className="text-xs text-[#888] leading-relaxed mb-4">{tr.desc}</p>
                </div>
                <div className="pt-3 border-t border-[#1C1C1C] text-[11px] font-mono text-[#D9FF3F]">
                  🎯 {tr.target}
                </div>
              </button>
            ))}
          </div>

          {/* Connected Learning Path Timeline */}
          {chinesePath && (
            <div className="p-6 sm:p-10 bg-[#0C0C0C] border border-[#1E1E1E] rounded-2xl">
              <LearningPathTimeline
                path={chinesePath}
                onSelectCourse={(slug) => onNavigate(`/khoa-hoc/${slug}`)}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>

        {/* Section: HỌC TIẾNG TRUNG (8 Topic Cards) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-4 h-4 text-[#D9FF3F]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              CHUYÊN MỤC NỘI DUNG
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-8">
            HỌC TIẾNG TRUNG
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(`/tieng-trung/${m.topic}`)}
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
                    Vào học <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Tool: 4 Thanh điệu */}
        <div className="mb-24 p-8 sm:p-12 bg-[#0C0C0C] border border-[#202020] rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-[#1C1C1C] gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#D9FF3F] uppercase">
                CÔNG CỤ TƯƠNG TÁC
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Luyện độ chuẩn xác 4 Thanh điệu tiếng Trung
              </h3>
            </div>
            <span className="text-xs text-[#777] font-mono">
              Bấm vào từng thanh để xem cao độ và hướng đi của luồng hơi
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {tones.map((t) => (
              <button
                key={t.tone}
                onClick={() => setActiveTone(t.tone)}
                className={`p-6 rounded-xl border text-left transition-all cursor-pointer ${
                  activeTone === t.tone
                    ? 'bg-[#181818] border-[#D9FF3F]'
                    : 'bg-[#121212] border-[#222] hover:border-[#383838]'
                }`}
              >
                <div className="flex justify-between text-xs font-mono text-[#777] mb-3">
                  <span>Cao độ: {t.tonePitch}</span>
                  <span className={activeTone === t.tone ? 'text-[#D9FF3F]' : ''}>0{t.tone}</span>
                </div>
                <div className="text-3xl font-black text-white font-display mb-1">{t.pinyin}</div>
                <div className="text-xs text-[#D9FF3F] font-mono mb-2">Nghĩa: {t.meaning}</div>
                <p className="text-xs text-[#888] leading-relaxed">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles & Course in Chinese */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest block mb-1">
              BÀI VIẾT NỔI BẬT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Bài viết chuyên ngành Tiếng Trung
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chineseArticles.map((art) => (
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
