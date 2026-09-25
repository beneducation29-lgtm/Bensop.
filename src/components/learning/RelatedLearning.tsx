import React from 'react';
import { ArrowRight, BookOpen, Layers, Award, FileText, CheckCircle2 } from 'lucide-react';

interface RelatedLearningProps {
  relatedLessonSlug?: string;
  relatedCourseSlug?: string;
  relatedArticleSlug?: string;
  relatedQuizSlug?: string;
  relatedVocabWords?: { word: string; slug: string; meaning: string }[];
  relatedGrammarConcepts?: { title: string; slug: string; level: string }[];
  onNavigate: (path: string) => void;
  onTakeQuiz?: (slug: string) => void;
  languagePrefix: 'tieng-anh' | 'tieng-trung';
}

export const RelatedLearning: React.FC<RelatedLearningProps> = ({
  relatedLessonSlug,
  relatedCourseSlug,
  relatedArticleSlug,
  relatedQuizSlug,
  relatedVocabWords = [],
  relatedGrammarConcepts = [],
  onNavigate,
  onTakeQuiz,
  languagePrefix
}) => {
  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-[#202020] space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D9FF3F] uppercase tracking-widest mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
          <span>LEARNING CONNECTIONS</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white uppercase">
          MẠNG LƯỚI BÀI HỌC & TƯ LIỆU LIÊN QUAN
        </h3>
        <p className="text-xs text-[#888] font-mono mt-1">
          Học theo ngữ cảnh đa chiều: Kết nối từ vựng, ngữ pháp, bài thực hành và đề thi mô phỏng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Related Quiz */}
        {relatedQuizSlug && (
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#242424] flex flex-col justify-between group hover:border-[#D9FF3F]/50 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#D9FF3F] uppercase tracking-wider block">
                BÀI KIỂM TRA ĐÁNH GIÁ
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors line-clamp-1">
                Quiz Thực Hành Tức Thì
              </h4>
              <p className="text-xs text-[#777] leading-relaxed">
                Đánh giá mức độ phản xạ và ghi nhớ sâu qua bộ câu hỏi của Question Bank.
              </p>
            </div>
            <button
              onClick={() => {
                if (onTakeQuiz) onTakeQuiz(relatedQuizSlug);
                else onNavigate(`/quiz/${relatedQuizSlug}`);
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#D9FF3F] text-black font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(217,255,63,0.15)]"
            >
              <span>LÀM BÀI TEST NGAY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Related Lesson */}
        {relatedLessonSlug && (
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#242424] flex flex-col justify-between group hover:border-white/40 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">
                BÀI HỌC CỐT LÕI
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors line-clamp-1">
                Xem Bài Học Trong Khóa
              </h4>
              <p className="text-xs text-[#777] leading-relaxed">
                Nghiên cứu bài giảng chi tiết, ví dụ thực tế và giải nghĩa tình huống giao tiếp.
              </p>
            </div>
            <button
              onClick={() => onNavigate(`/bai-hoc/${relatedLessonSlug}`)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] text-white font-mono text-xs font-bold border border-[#303030] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>VÀO BÀI HỌC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Related Article */}
        {relatedArticleSlug && (
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#242424] flex flex-col justify-between group hover:border-white/40 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#AAA] uppercase tracking-wider block">
                BÀI VIẾT CHUYÊN ĐỀ
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#D9FF3F] transition-colors line-clamp-1">
                Đọc Bài Phân Tích
              </h4>
              <p className="text-xs text-[#777] leading-relaxed">
                Mở rộng góc nhìn văn hóa, tư duy hành vi và kinh nghiệm từ chuyên gia.
              </p>
            </div>
            <button
              onClick={() => onNavigate(`/bai-viet/${relatedArticleSlug}`)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] text-white font-mono text-xs font-bold border border-[#303030] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ĐỌC BÀI VIẾT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Linked Vocabulary Chips */}
      {relatedVocabWords.length > 0 && (
        <div className="pt-4 border-t border-[#1A1A1A] space-y-3">
          <span className="text-xs font-mono text-[#888] uppercase block">
            TỪ VỰNG LIÊN QUAN TRỰC TIẾP:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {relatedVocabWords.map((v) => (
              <button
                key={v.slug}
                onClick={() => onNavigate(`/${languagePrefix}/vocabulary/${v.slug}`)}
                className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#D9FF3F] text-xs font-mono text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="font-bold text-[#D9FF3F]">{v.word}</span>
                <span className="text-[#777]">({v.meaning})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Linked Grammar Chips */}
      {relatedGrammarConcepts.length > 0 && (
        <div className="pt-4 border-t border-[#1A1A1A] space-y-3">
          <span className="text-xs font-mono text-[#888] uppercase block">
            CẤU TRÚC NGỮ PHÁP LIÊN QUAN:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {relatedGrammarConcepts.map((g) => (
              <button
                key={g.slug}
                onClick={() => onNavigate(`/${languagePrefix}/grammar/${g.slug}`)}
                className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#D9FF3F] text-xs font-mono text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="px-1.5 py-0.5 rounded bg-[#202020] text-[10px] text-[#888]">
                  {g.level}
                </span>
                <span className="font-bold text-white">{g.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
