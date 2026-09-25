import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-24 text-center">
      <div className="max-w-md mx-auto">
        <span className="text-xs font-mono tracking-widest text-[#D9FF3F] uppercase block mb-3">
          LỖI 404
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display mb-4 tracking-tight">
          KHÔNG TÌM THẤY<br />NỘI DUNG.
        </h1>
        <p className="text-sm text-[#888] leading-relaxed mb-8">
          Đường dẫn bạn yêu cầu không tồn tại hoặc đã được cập nhật sang địa chỉ mới trong hệ thống BENSOP.
        </p>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded-md transition-all cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>QUAY VỀ BENSOP</span>
        </button>
      </div>
    </div>
  );
};
