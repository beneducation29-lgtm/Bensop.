import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun, Heart, Activity, AlertTriangle, ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { LearningPathTimeline } from '../components/LearningPathTimeline';
import { ARTICLES } from '../data/articles';
import { COURSES } from '../data/courses';
import { LEARNING_PATHS } from '../data/learningPaths';
import { Article, Course } from '../types';

interface HealthLifePageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: Article) => void;
  onSelectCourse: (course: Course) => void;
}

export const HealthLifePage: React.FC<HealthLifePageProps> = ({
  onBack,
  onNavigate,
  onSelectArticle,
  onSelectCourse,
}) => {
  const healthArticles = ARTICLES.filter((a) => a.categoryId === 'suc-khoe-doi-song');
  const healthCourses = COURSES.filter((c) => c.categoryId === 'suc-khoe-doi-song');
  const healthPath = LEARNING_PATHS.find((p) => p.categoryId === 'suc-khoe-doi-song')!;

  const [activeRule, setActiveRule] = useState<number>(0);

  const protocolRules = [
    {
      step: '10 TIẾNG',
      label: 'Ngừng nạp Caffeine',
      time: 'Trước khi đi ngủ 10h',
      desc: 'Thời gian bán thải của caffeine là từ 5 - 8 tiếng. Ngừng uống sau 14:00 chiều để bảo vệ thụ thể Adenosine của não bộ.'
    },
    {
      step: '3 TIẾNG',
      label: 'Ngừng ăn bữa lớn',
      time: 'Trước khi đi ngủ 3h',
      desc: 'Giúp dạ dày và gan hoàn thành tiêu hóa, tránh tình trạng tăng thân nhiệt lõi và trào ngược làm gián đoạn giấc ngủ sâu.'
    },
    {
      step: '2 TIẾNG',
      label: 'Ngừng làm việc áp lực',
      time: 'Trước khi đi ngủ 2h',
      desc: 'Hạ thấp nồng độ hormone căng thẳng Cortisol, chuyển hệ thần kinh từ trạng thái Giao cảm sang Phó giao cảm thư giãn.'
    },
    {
      step: '1 TIẾNG',
      label: 'Tắt màn hình ánh sáng xanh',
      time: 'Trước khi đi ngủ 1h',
      desc: 'Ánh sáng xanh ức chế Melatonin. Đọc sách giấy hoặc trò chuyện dưới ánh đèn vàng mờ ấm để chuẩn bị đi ngủ.'
    },
    {
      step: '0 LẦN',
      label: 'Không bấm nút Snooze báo thức',
      time: 'Khi thức dậy sáng hôm sau',
      desc: 'Bấm nút hoãn báo thức làm phân mảnh giấc ngủ và gây ra tình trạng uể oải kéo dài suốt cả ngày (Sleep Inertia).'
    }
  ];

  const topics = [
    { name: 'Fitness & Vận động', slug: 'fitness', desc: 'Kháng lực, dẻo dai cơ thể và sức bền tim mạch Zone 2', icon: Activity, count: '26 bài học' },
    { name: 'Nutrition Chức năng', slug: 'nutrition', desc: 'Dinh dưỡng cân bằng lượng vi chất và kiểm soát đường huyết', icon: Heart, count: '28 bài học' },
    { name: 'Sleep & Nhịp sinh học', slug: 'sleep', desc: 'Tối ưu giai đoạn Deep Sleep và REM để phục hồi trí não', icon: Moon, count: '22 bài học' },
    { name: 'Lifestyle Bền vững', slug: 'lifestyle', desc: 'Thực hành tối giản, hòa hợp thiên nhiên và giảm phụ thuộc công nghệ', icon: Sun, count: '18 bài học' },
    { name: 'Wellbeing Tinh thần', slug: 'wellbeing', desc: 'Thiền định, hít thở điều hòa và giải tỏa lo âu mãn tính', icon: Heart, count: '20 bài học' },
    { name: 'Healthy Habits', slug: 'healthy-habits', desc: 'Xây dựng thói quen vi mô lành mạnh buổi sáng và tối', icon: Activity, count: '24 bài học' },
  ];

  const startHereHealth = [
    {
      step: '01',
      title: 'Đồng bộ nhịp sinh học: Chìa khóa cho giấc ngủ sâu',
      slug: 'dong-bo-nhip-sinh-hoc-giac-ngu-sau',
      desc: 'Tiếp xúc ánh sáng mặt trời 30 phút buổi sáng để thiết lập đồng hồ sinh học SCN trong não.'
    },
    {
      step: '02',
      title: 'Những nguyên tắc cơ bản để ngủ tốt hơn mỗi đêm',
      slug: 'nhung-nguyen-tac-co-ban-de-ngu-tot-hon',
      desc: 'Hạ nhiệt độ phòng ngủ xuống 18-20 độ C và giữ bóng tối 100% để tối ưu hóa Melatonin.'
    },
    {
      step: '03',
      title: 'Vận động hàng ngày có ý nghĩa gì với tuổi thọ não bộ?',
      slug: 'van-dong-hang-ngay-co-y-nghia-gi',
      desc: 'Khám phá phân tử myokine và kích hoạt yếu tố tăng trưởng thần kinh BDNF qua vận động.'
    },
    {
      step: '04',
      title: 'Xây dựng một lối sống cân bằng giữa áp lực hiện đại',
      slug: 'xay-dung-mot-loi-song-can-bang',
      desc: 'Phân định ranh giới giữa công việc và phục hồi để tránh hội chứng kiệt quệ cảm xúc.'
    }
  ];

  return (
    <div className="pt-24 pb-24 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'SỨC KHỎE & ĐỜI SỐNG' }]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="py-8 sm:py-14 border-b border-[#1E1E1E] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-[#D9FF3F] uppercase block mb-3">
                SỨC KHỎE & ĐỜI SỐNG
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.96] font-display uppercase mb-6">
                SỐNG KHỎE.<br />
                SỐNG CÂN BẰNG.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAEAEA] to-[#999]">
                  SỐNG TỐT.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-xl mb-8 font-normal">
                Kiến thức y học lối sống dựa trên chứng cứ khoa học. Học cách nuôi dưỡng cơ thể khỏe mạnh, giấc ngủ sâu phục hồi và tâm trí sáng suốt để duy trì đỉnh cao năng lượng mỗi ngày.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('/khoa-hoc/khoa-hoc-the-luc-dinh-duong-phuc-hoi')}
                  className="px-8 py-4 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer shadow-[0_0_25px_rgba(217,255,63,0.18)]"
                >
                  BẮT ĐẦU HỌC →
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('protocol-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-[#141414] border border-[#2A2A2A] hover:border-[#444] text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  Xem quy tắc 10-3-2-1-0
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#222] bg-[#111]">
                <img
                  src="/src/assets/images/bensop_health_bw_1790320807310.jpg"
                  alt="Sức khỏe & đời sống Bensop"
                  className="w-full h-full object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono text-[#D9FF3F] uppercase block mb-1">
                    ĐỊNH NGHĨA SỨC KHỎE
                  </span>
                  <p className="text-sm font-bold text-white">
                    Sức khỏe không chỉ là không có bệnh tật, mà là trạng thái hưng thịnh hoàn toàn về thể chất lẫn tinh thần.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="mb-20">
          <div className="p-5 bg-[#111111] border border-[#2A2A2A] rounded-xl flex items-start gap-4 text-xs text-[#999] leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-[#D9FF3F] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">Tuyên bố miễn trừ trách nhiệm y khoa:</strong>
              Lưu ý: Nội dung chỉ nhằm mục đích cung cấp thông tin giáo dục khoa học thường thức, không thay thế chẩn đoán, điều trị hay tư vấn y khoa của chuyên gia y tế có chứng chỉ hành nghề.
            </div>
          </div>
        </div>

        {/* Section: START HERE */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-4 h-4 text-[#D9FF3F]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              BẮT ĐẦU TỪ ĐÂY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-8">
            START HERE — NỀN TẢNG THỂ LỰC & GIẤC NGỦ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {startHereHealth.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(`/bai-viet/${item.slug}`)}
                className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#D9FF3F] rounded-xl cursor-pointer group transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#D9FF3F] block mb-2">BÀI HỌC 0{idx + 1}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D9FF3F] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#888] leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-xs font-bold text-white group-hover:text-[#D9FF3F]">
                  <span>Đọc phân tích khoa học</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: POPULAR TOPICS (6 Topics Grid with direct navigation) */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate(`/suc-khoe-doi-song/${t.slug}`)}
                  className="p-6 bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#D9FF3F] rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#D9FF3F]">TRỤ CỘT 0{idx + 1}</span>
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

        {/* Practical Guides: Giao thức 10-3-2-1-0 */}
        <div id="protocol-section" className="mb-24 p-8 sm:p-12 bg-[#0C0C0C] border border-[#202020] rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-[#1C1C1C] gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#D9FF3F] uppercase">
                PRACTICAL GUIDES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Giao thức Giấc ngủ sâu 10-3-2-1-0
              </h3>
            </div>
            <span className="text-xs text-[#777] font-mono">
              Bấm vào từng mốc thời gian để xem giải thích khoa học
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {protocolRules.map((rule, idx) => (
              <button
                key={idx}
                onClick={() => setActiveRule(idx)}
                className={`p-6 rounded-xl border text-left transition-all cursor-pointer ${
                  activeRule === idx
                    ? 'bg-[#181818] border-[#D9FF3F]'
                    : 'bg-[#121212] border-[#222] hover:border-[#383838]'
                }`}
              >
                <span className="text-xs font-mono text-[#D9FF3F] block mb-2">{rule.step}</span>
                <h4 className="text-base font-bold text-white mb-1">{rule.label}</h4>
                <span className="text-[11px] font-mono text-[#777] block mb-3">{rule.time}</span>
                <p className="text-xs text-[#888] leading-relaxed line-clamp-3">{rule.desc}</p>
              </button>
            ))}
          </div>

          <div className="p-4 bg-[#141414] rounded-lg border border-[#242424] text-xs text-[#AAA]">
            🌙 <strong>Giải thích khoa học:</strong> {protocolRules[activeRule].desc}
          </div>
        </div>

        {/* Learning Path */}
        {healthPath && (
          <div className="mb-24 p-6 sm:p-10 bg-[#0C0C0C] border border-[#1E1E1E] rounded-2xl">
            <LearningPathTimeline
              path={healthPath}
              onSelectCourse={(slug) => onNavigate(`/khoa-hoc/${slug}`)}
              onNavigate={onNavigate}
            />
          </div>
        )}

        {/* Featured Articles */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest block mb-1">
              BÀI VIẾT KHOA HỌC ĐỜI SỐNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Kiến thức sức khỏe chọn lọc
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthArticles.map((art) => (
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
