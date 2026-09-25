import React from 'react';
import { CheckCircle2, Lock, ArrowRight, BookOpen, Clock, Award } from 'lucide-react';
import { LearningPath, LearningPathLevel } from '../types';

interface LearningPathTimelineProps {
  path: LearningPath;
  onSelectCourse: (courseSlug: string) => void;
  onNavigate: (path: string) => void;
}

export const LearningPathTimeline: React.FC<LearningPathTimelineProps> = ({
  path,
  onSelectCourse,
  onNavigate,
}) => {
  return (
    <div className="py-8">
      {/* Path Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#1E1E1E]">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] block mb-2">
            LỘ TRÌNH CHUẨN HÓA ({path.estimatedHours})
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
            {path.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#8E8E8E] max-w-md">
          {path.description}
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 border-l border-[#222] space-y-12">
        {path.levels.map((lvl, index) => {
          const isCompleted = lvl.status === 'completed';
          const isInProgress = lvl.status === 'in-progress';
          const isLocked = lvl.status === 'locked';

          return (
            <div key={index} className="relative group">
              {/* Dot on Timeline */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  isCompleted
                    ? 'bg-[#121212] border-[#D9FF3F] text-[#D9FF3F]'
                    : isInProgress
                    ? 'bg-[#D9FF3F] border-[#D9FF3F] text-black animate-pulse'
                    : 'bg-[#141414] border-[#333] text-[#555]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : isLocked ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-black" />
                )}
              </div>

              {/* Level Card */}
              <div
                className={`p-6 sm:p-8 rounded-xl border transition-all ${
                  isInProgress
                    ? 'bg-[#101010] border-[#D9FF3F]/50 shadow-[0_0_20px_rgba(217,255,63,0.06)]'
                    : isCompleted
                    ? 'bg-[#0E0E0E] border-[#222]'
                    : 'bg-[#0A0A0A] border-[#1A1A1A] opacity-60'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D9FF3F] uppercase">
                      {lvl.levelNumber}
                    </span>
                    <span className="text-xs text-[#555]">·</span>
                    <span className="text-xs font-mono text-[#888]">
                      {lvl.lessonCount} bài học · {lvl.quizCount} bài quiz
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${
                      isCompleted
                        ? 'border-[#D9FF3F]/40 text-[#D9FF3F] bg-[#D9FF3F]/10'
                        : isInProgress
                        ? 'border-white text-white font-bold bg-white/10'
                        : 'border-[#333] text-[#666]'
                    }`}
                  >
                    {isCompleted ? 'Đã hoàn thành' : isInProgress ? 'Đang thực hiện' : 'Chưa mở khóa'}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {lvl.title}
                </h4>
                <p className="text-xs font-mono text-[#999] mb-3">
                  {lvl.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-6">
                  {lvl.description}
                </p>

                {/* Skills gained */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-[11px] font-mono text-[#555] uppercase mr-2">
                    Kỹ năng:
                  </span>
                  {lvl.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs text-[#AAA] border border-[#222] bg-[#141414] px-2.5 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Course Link Trigger */}
                {lvl.courseSlugs[0] && !isLocked && (
                  <button
                    onClick={() => onSelectCourse(lvl.courseSlugs[0])}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#D9FF3F] transition-colors cursor-pointer"
                  >
                    <span>Vào khóa học chi tiết của Level này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
