import React from 'react';
import { Flame, CheckCircle, Award, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { UserProgress } from '../types';
import { INITIAL_USER } from '../data/users';

interface PersonalDashboardProps {
  onContinueLearning: (path: string) => void;
  user?: UserProgress;
}

export const PersonalDashboard: React.FC<PersonalDashboardProps> = ({ 
  onContinueLearning,
  user = INITIAL_USER,
}) => {

  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0A] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-[#888888] uppercase">
                BẢNG ĐIỀU KHIỂN HỌC VIÊN
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Xin chào, {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#888888] mt-1 font-normal">
              Bạn đang duy trì chuỗi học tập rất tích cực. Hãy hoàn thành 1 bài học hôm nay để không gián đoạn chuỗi.
            </p>
          </div>

          <button
            onClick={() => onContinueLearning('/tieng-trung')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded-lg transition-all cursor-pointer shadow-lg whitespace-nowrap self-start md:self-auto"
          >
            <span>TIẾP TỤC HỌC TIẾNG TRUNG</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className="p-6 bg-[#121212] border border-[#222222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888888] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider">Learning Streak</span>
              <Flame className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.streakDays} <span className="text-sm font-normal text-[#888]">ngày</span>
              </div>
              <div className="text-[11px] text-[#D9FF3F] font-mono mt-1">
                Kỷ lục cá nhân: 14 ngày
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#121212] border border-[#222222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888888] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider">Lessons Completed</span>
              <CheckCircle className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.lessonsCompleted} <span className="text-sm font-normal text-[#888]">bài</span>
              </div>
              <div className="text-[11px] text-[#777] font-mono mt-1">
                Mục tiêu tuần: 10 bài
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#121212] border border-[#222222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888888] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider">Quiz Score</span>
              <Award className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.quizScore}%
              </div>
              <div className="text-[11px] text-[#777] font-mono mt-1">
                Độ chính xác trung bình
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#121212] border border-[#222222] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888888] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider">Total Learning Time</span>
              <Clock className="w-4 h-4 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {user.totalTime}
              </div>
              <div className="text-[11px] text-[#777] font-mono mt-1">
                +2h 15m so với tuần trước
              </div>
            </div>
          </div>

        </div>

        {/* Progress Across 4 Domains */}
        <div className="p-6 sm:p-8 bg-[#121212] border border-[#222222] rounded-2xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E1E1E]">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#AAAAAA] font-bold">
              Tiến trình theo lĩnh vực
            </h3>
            <span className="text-xs text-[#666] font-mono">Cập nhật 2 giờ trước</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Chinese Progress */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-white">TIẾNG TRUNG (HSK 2 Nền tảng)</span>
                <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.chinese}%</span>
              </div>
              <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#D9FF3F] transition-all duration-700 rounded-full" 
                  style={{ width: `${user.coursesProgress.chinese}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-[#666] flex justify-between font-mono">
                <span>Bài 24 / 30</span>
                <button 
                  onClick={() => onContinueLearning('/tieng-trung')}
                  className="hover:text-white transition-colors"
                >
                  Học tiếp →
                </button>
              </div>
            </div>

            {/* English Progress */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-white">TIẾNG ANH (Connected Speech & Reflex)</span>
                <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.english}%</span>
              </div>
              <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-700 rounded-full" 
                  style={{ width: `${user.coursesProgress.english}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-[#666] flex justify-between font-mono">
                <span>Bài 16 / 28</span>
                <button 
                  onClick={() => onContinueLearning('/tieng-anh')}
                  className="hover:text-white transition-colors"
                >
                  Học tiếp →
                </button>
              </div>
            </div>

            {/* Personal Growth Progress */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-white">PHÁT TRIỂN BẢN THÂN (Deep Work & Thói quen)</span>
                <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.growth}%</span>
              </div>
              <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#888888] transition-all duration-700 rounded-full" 
                  style={{ width: `${user.coursesProgress.growth}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-[#666] flex justify-between font-mono">
                <span>Bài 8 / 20</span>
                <button 
                  onClick={() => onContinueLearning('/phat-trien-ban-than')}
                  className="hover:text-white transition-colors"
                >
                  Học tiếp →
                </button>
              </div>
            </div>

            {/* Health & Life Progress */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-white">SỨC KHỎE & ĐỜI SỐNG (Nhịp sinh học & Phục hồi)</span>
                <span className="font-mono text-[#D9FF3F]">{user.coursesProgress.health}%</span>
              </div>
              <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#AAAAAA] transition-all duration-700 rounded-full" 
                  style={{ width: `${user.coursesProgress.health}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-[#666] flex justify-between font-mono">
                <span>Bài 15 / 24</span>
                <button 
                  onClick={() => onContinueLearning('/suc-khoe-doi-song')}
                  className="hover:text-white transition-colors"
                >
                  Học tiếp →
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
