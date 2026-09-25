import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, ArrowUpRight, CheckCircle2, Bookmark, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  savedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  isLoggedIn,
  onToggleLogin,
  savedCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'VI' | 'EN'>('VI');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Khám phá', path: '/' },
    { label: 'Tiếng Trung', path: '/tieng-trung' },
    { label: 'Tiếng Anh', path: '/tieng-anh' },
    { label: 'Phát triển bản thân', path: '/phat-trien-ban-than' },
    { label: 'Sức khỏe & đời sống', path: '/suc-khoe-doi-song' },
    { label: 'Luyện tập', path: '/luyen-tap' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#050505]/92 backdrop-blur-md py-3.5 border-[#202020]'
            : 'bg-[#050505]/75 backdrop-blur-sm py-5 border-[#1A1A1A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Zone: High-impact minimalist wordmark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/')}
              className="group text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D9FF3F]"
              aria-label="Bensop Home"
            >
              <span className="font-extrabold text-2xl sm:text-3xl tracking-tighter text-white group-hover:text-[#D9FF3F] transition-colors font-display">
                BENSOP
              </span>
            </button>
            <span className="hidden xl:inline text-xs font-mono tracking-widest text-[#555555] uppercase pl-2 border-l border-[#262626]">
              LEARN • GROW • LIVE
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`text-xs lg:text-sm tracking-tight transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#D9FF3F] font-semibold'
                      : 'text-[#9A9A9A] hover:text-white font-medium'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D9FF3F]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-[#A0A0A0] hover:text-white bg-[#121212] hover:bg-[#1C1C1C] border border-[#262626] transition-all cursor-pointer"
              aria-label="Tìm kiếm bài học và nội dung"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tìm kiếm...</span>
              <kbd className="hidden lg:inline text-[10px] text-[#555] px-1 bg-[#1a1a1a] rounded border border-[#333]">⌘K</kbd>
            </button>

            {/* Saved Bookmarks Trigger */}
            <button
              onClick={() => onNavigate('/saved')}
              className={`p-2 rounded-full border transition-colors cursor-pointer relative ${
                currentPath === '/saved'
                  ? 'border-[#D9FF3F] text-[#D9FF3F] bg-[#D9FF3F]/10'
                  : 'border-[#262626] text-[#888] hover:text-white hover:border-[#404040]'
              }`}
              title="Mục đã lưu"
            >
              <Bookmark className="w-3.5 h-3.5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D9FF3F] text-black text-[9px] font-black rounded-full flex items-center justify-center font-mono">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'VI' ? 'EN' : 'VI')}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded border border-[#262626] text-[#A0A0A0] hover:text-white hover:border-[#404040] transition-colors cursor-pointer"
              title="Đổi ngôn ngữ"
            >
              {language}
            </button>

            {/* Login / Dashboard Profile Button */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  onNavigate('/dashboard');
                } else {
                  onToggleLogin();
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                isLoggedIn
                  ? currentPath === '/dashboard'
                    ? 'bg-[#D9FF3F] text-black font-extrabold shadow-sm'
                    : 'bg-[#181818] text-[#D9FF3F] border border-[#D9FF3F]/40 hover:bg-[#202020]'
                  : 'bg-white text-black hover:bg-[#D9FF3F] hover:text-black font-bold'
              }`}
              title={isLoggedIn ? 'Xem Dashboard học tập' : 'Đăng nhập'}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isLoggedIn ? 'Dashboard' : 'Đăng nhập'}</span>
              {isLoggedIn && <CheckCircle2 className="w-3 h-3 text-current" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#D9FF3F] focus:outline-none cursor-pointer"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#050505]/98 pt-24 px-6 md:hidden flex flex-col justify-between pb-10 animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#666666] font-mono">
              Điều hướng BENSOP
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-2xl font-bold text-left py-2 flex items-center justify-between border-b border-[#1C1C1C] ${
                    currentPath === item.path ? 'text-[#D9FF3F]' : 'text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#555]" />
                </button>
              ))}

              <button
                onClick={() => {
                  onNavigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`text-xl font-bold text-left py-2 flex items-center justify-between border-b border-[#1C1C1C] ${
                  currentPath === '/dashboard' ? 'text-[#D9FF3F]' : 'text-[#DDD]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[#D9FF3F]" />
                  <span>Bảng học tập (Dashboard)</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#555]" />
              </button>

              <button
                onClick={() => {
                  onNavigate('/saved');
                  setMobileMenuOpen(false);
                }}
                className={`text-xl font-bold text-left py-2 flex items-center justify-between border-b border-[#1C1C1C] ${
                  currentPath === '/saved' ? 'text-[#D9FF3F]' : 'text-[#DDD]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#D9FF3F]" />
                  <span>Nội dung đã lưu ({savedCount})</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#555]" />
              </button>
            </div>

            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#151515] border border-[#2E2E2E] rounded-lg text-sm text-white font-medium"
            >
              <Search className="w-4 h-4 text-[#A0A0A0]" />
              Tìm kiếm trên Bensop
            </button>
          </div>

          <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between text-xs text-[#777]">
            <span>Bensop Platform © 2026</span>
            <button
              onClick={() => {
                onToggleLogin();
                if (!isLoggedIn) onNavigate('/dashboard');
                setMobileMenuOpen(false);
              }}
              className="text-[#D9FF3F] font-semibold underline underline-offset-4"
            >
              {isLoggedIn ? 'Tài khoản: Ben Nguyễn' : 'Đăng nhập ngay'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
