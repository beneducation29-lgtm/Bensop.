import React, { useState } from 'react';
import { Bookmark, Check } from 'lucide-react';
import { SavedItem } from '../types';

interface BookmarkButtonProps {
  item: SavedItem;
  isBookmarked: boolean;
  onToggle: (item: SavedItem) => void;
  className?: string;
  showText?: boolean;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  item,
  isBookmarked,
  onToggle,
  className = '',
  showText = false,
}) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    onToggle(item);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isBookmarked ? 'Bỏ lưu' : 'Lưu vào danh sách'}
      title={isBookmarked ? 'Đã lưu trong mục Saved' : 'Lưu lại để học sau'}
      className={`inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
        isBookmarked
          ? 'text-[#D9FF3F] hover:text-[#cbf532]'
          : 'text-[#777] hover:text-white'
      } ${animating ? 'scale-125' : 'scale-100'} ${className}`}
    >
      <Bookmark
        className={`w-4 h-4 transition-transform ${isBookmarked ? 'fill-current' : ''}`}
      />
      {showText && (
        <span className="text-xs font-mono">
          {isBookmarked ? 'Đã lưu' : 'Lưu lại'}
        </span>
      )}
    </button>
  );
};
