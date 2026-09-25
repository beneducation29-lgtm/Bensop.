import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-[#1C1C1C] pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Massive Editorial Punch Heading */}
        <div className="pb-16 border-b border-[#1A1A1A]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#777777] uppercase block mb-3">
                BENSOP PHILOSOPHY
              </span>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase font-display leading-[0.9]">
                LEARN.<br />
                <span className="text-[#A0A0A0]">GROW.</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D9FF3F]">
                  LIVE.
                </span>
              </h2>
            </div>

            {/* Newsletter Subscription */}
            <div className="max-w-md w-full">
              <h3 className="text-lg font-bold text-white mb-2">
                Bản tin Tri thức Hàng tuần
              </h3>
              <p className="text-xs text-[#8E8E8E] leading-relaxed mb-4">
                Nhận những bài luận phân tích sâu, từ vựng chọn lọc và phương pháp phát triển cá nhân vào sáng thứ Bảy mỗi tuần.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email của bạn..."
                  className="w-full bg-[#111111] border border-[#262626] focus:border-[#D9FF3F] px-4 py-3 text-xs text-white placeholder-[#555] rounded-none focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <span className="text-[11px] text-[#D9FF3F] font-mono mt-2 block">
                  Cảm ơn bạn! Chúng tôi đã lưu địa chỉ email của bạn.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-[#1A1A1A] text-xs">
          
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2">
            <span className="text-2xl font-black tracking-tight text-white font-display block mb-3">
              BENSOP
            </span>
            <p className="text-[#888888] leading-relaxed max-w-sm mb-4">
              Không chỉ là một website học tập, mà là một hệ sinh thái giúp con người học hỏi, phát triển và sống tốt hơn.
            </p>
            <div className="text-[11px] font-mono text-[#555]">
              Designed with precision for modern learners.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono uppercase tracking-widest text-[#777] mb-4">
              4 Lĩnh Vực
            </h4>
            <ul className="space-y-2.5 text-[#A0A0A0]">
              <li>
                <button onClick={() => onNavigate('/tieng-trung')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer">
                  Tiếng Trung
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tieng-anh')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer">
                  Tiếng Anh
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/phat-trien-ban-than')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer">
                  Phát triển bản thân
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/suc-khoe-doi-song')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer">
                  Sức khỏe & đời sống
                </button>
              </li>
            </ul>
          </div>

          {/* Practice & Quiz Hub */}
          <div>
            <h4 className="font-mono uppercase tracking-widest text-[#777] mb-4">
              Luyện Tập & Labs
            </h4>
            <ul className="space-y-2.5 text-[#A0A0A0]">
              <li>
                <button onClick={() => onNavigate('/tieng-anh/vocabulary')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer text-left">
                  English Vocabulary Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tieng-anh/grammar')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer text-left">
                  English Grammar Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tieng-trung/vocabulary')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer text-left">
                  Chinese Vocab Lab (HSK)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tieng-trung/grammar')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer text-left">
                  Chinese Grammar Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/luyen-tap')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer text-left">
                  Phòng luyện tập (Hub)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/ngan-hang-cau-hoi')} className="hover:text-[#D9FF3F] transition-colors cursor-pointer text-left">
                  Ngân hàng câu hỏi
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Info */}
          <div>
            <h4 className="font-mono uppercase tracking-widest text-[#777] mb-4">
              Về Bensop
            </h4>
            <ul className="space-y-2.5 text-[#A0A0A0]">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
                  Tuyên ngôn tri thức
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
                  Đội ngũ học thuật
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
                  Chính sách bảo mật
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
                  Điều khoản dịch vụ
                </button>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="font-mono uppercase tracking-widest text-[#777] mb-4">
              Mạng Xã Hội
            </h4>
            <ul className="space-y-2.5 text-[#A0A0A0]">
              <li>
                <a href="#facebook" className="hover:text-white transition-colors">
                  Facebook Community
                </a>
              </li>
              <li>
                <a href="#youtube" className="hover:text-white transition-colors">
                  YouTube Learning
                </a>
              </li>
              <li>
                <a href="#tiktok" className="hover:text-white transition-colors">
                  TikTok Education
                </a>
              </li>
              <li>
                <a href="#linkedin" className="hover:text-white transition-colors">
                  LinkedIn Network
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Standard Notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] font-mono gap-4">
          <div>
            © 2026 BENSOP. All rights reserved. Nền tảng học tập & phát triển độc lập.
          </div>
          <div className="flex items-center gap-6">
            <span>Phiên bản 2.6.4</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
            <span>Hà Nội · Sài Gòn</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
