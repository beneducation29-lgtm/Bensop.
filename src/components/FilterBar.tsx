import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  selectedSort: 'latest' | 'popular' | 'recommended';
  onSelectSort: (sort: 'latest' | 'popular' | 'recommended') => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedLevel,
  onSelectLevel,
  selectedSort,
  onSelectSort,
  totalCount,
}) => {
  const levels = [
    { id: 'all', label: 'Tất cả cấp độ' },
    { id: 'Beginner', label: 'Cơ bản (Beginner)' },
    { id: 'Intermediate', label: 'Trung cấp (Intermediate)' },
    { id: 'Advanced', label: 'Nâng cao (Advanced)' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 bg-[#0E0E0E] border border-[#202020] rounded-xl mb-8">
      {/* Level Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
        <span className="text-xs font-mono text-[#666] mr-2 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#D9FF3F]" />
          LỌC:
        </span>
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => onSelectLevel(lvl.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedLevel === lvl.id
                ? 'bg-white text-black font-bold'
                : 'bg-[#141414] text-[#888] hover:text-white hover:bg-[#1C1C1C] border border-[#242424]'
            }`}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      {/* Sort Selector & Count */}
      <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono text-[#888]">
        <span className="text-[#666]">{totalCount} nội dung</span>
        <div className="flex items-center gap-1">
          <span className="text-[#555]">Sắp xếp:</span>
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as any)}
            className="bg-[#141414] border border-[#242424] text-white rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#D9FF3F] cursor-pointer"
          >
            <option value="latest">Mới nhất</option>
            <option value="popular">Phổ biến nhất</option>
            <option value="recommended">Đề xuất cho bạn</option>
          </select>
        </div>
      </div>
    </div>
  );
};
