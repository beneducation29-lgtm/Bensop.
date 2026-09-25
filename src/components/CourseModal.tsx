import React from 'react';
import { X, BookOpen, Clock, BarChart, CheckCircle, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onStartLearning: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onStartLearning,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-3xl w-full bg-[#101010] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-10 my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#202020] mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#D9FF3F] uppercase">
              {course.categoryName} · KHÓA HỌC CHUYÊN SÂU
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#777] hover:text-white rounded-full bg-[#161616] border border-[#2A2A2A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course Info */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-display">
          {course.title}
        </h2>

        <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed mb-6">
          {course.description}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-[#141414] rounded-xl border border-[#222] mb-8 text-xs font-mono">
          <div>
            <span className="text-[#666] block mb-1">Cấp độ:</span>
            <strong className="text-white">{course.level}</strong>
          </div>
          <div>
            <span className="text-[#666] block mb-1">Thời lượng:</span>
            <strong className="text-white">{course.duration}</strong>
          </div>
          <div>
            <span className="text-[#666] block mb-1">Số bài giảng:</span>
            <strong className="text-[#D9FF3F]">{course.lessonsCount} bài</strong>
          </div>
        </div>

        {/* Curriculum Modules */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#888] font-bold mb-4">
            Khung chương trình chi tiết
          </h3>
          <div className="space-y-4">
            {course.modules.map((mod, i) => (
              <div key={i} className="p-4 bg-[#141414] border border-[#222] rounded-xl">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#202020] text-[#D9FF3F] flex items-center justify-center text-xs font-mono">
                    {i + 1}
                  </span>
                  {mod.title}
                </h4>
                <ul className="text-xs text-[#8E8E8E] space-y-1.5 pl-7">
                  {mod.lessons.map((lesson, lIdx) => (
                    <li key={lIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#444]" />
                      <span>{typeof lesson === 'string' ? lesson : lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-[#1C1C1C]">
          <span className="text-xs font-mono text-[#666]">
            Miễn phí cho thành viên Bensop
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#888] hover:text-white"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onStartLearning();
                onClose();
              }}
              className="px-6 py-2.5 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded-md transition-all cursor-pointer"
            >
              Bắt đầu học khóa này
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
