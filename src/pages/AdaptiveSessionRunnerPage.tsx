import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, RotateCcw, Sparkles, Target, Zap } from 'lucide-react';
import { AdaptiveSessionItem } from '../services/adaptiveSessionService';
import { learnerActivityService } from '../services/learnerActivityService';

interface AdaptiveSessionRunnerPageProps {
  items: AdaptiveSessionItem[];
  totalMinutes: number;
  onNavigate: (path: string) => void;
}

export const AdaptiveSessionRunnerPage: React.FC<AdaptiveSessionRunnerPageProps> = ({ items, totalMinutes, onNavigate }) => {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  const item = items[current];
  const doneCount = completed.length;
  const progress = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  const markComplete = () => {
    if (!item) return;
    if (!completed.includes(item.id)) {
      learnerActivityService.record({
        skill: item.skill.toLowerCase() as any,
        language: 'en',
        activityId: item.id,
        score: 100,
        evidenceType: 'completion',
        timestamp: new Date().toISOString(),
        metadata: { adaptiveSession: true, path: item.path },
      });
      setCompleted(prev => [...prev, item.id]);
    }
  };

  const next = () => {
    markComplete();
    if (current < items.length - 1) setCurrent(current + 1);
  };

  const reset = () => {
    setCurrent(0);
    setCompleted([]);
  };

  const status = useMemo(() => item ? (completed.includes(item.id) ? 'ĐÃ HOÀN THÀNH' : 'ĐANG THỰC HIỆN') : 'HOÀN TẤT', [item, completed]);

  if (!item || doneCount === items.length) {
    return (
      <div className="pt-28 pb-24 min-h-screen bg-[#050505] text-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl border border-[#D9FF3F]/30 bg-[#0D0D0D] p-8 sm:p-12 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[#D9FF3F]" />
            <div className="mt-5 text-[10px] font-mono tracking-[0.2em] text-[#D9FF3F]">ADAPTIVE SESSION COMPLETE</div>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black uppercase">PHIÊN HỌC ĐÃ HOÀN TẤT.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#777]">
              Bạn vừa hoàn thành {items.length} bước trong phiên {totalMinutes} phút. Evidence mới đã được ghi nhận để phiên tiếp theo thích nghi tốt hơn.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={() => onNavigate('/dashboard')} className="rounded-xl bg-[#D9FF3F] px-6 py-3 text-xs font-extrabold text-black">VỀ DASHBOARD</button>
              <button onClick={reset} className="rounded-xl border border-[#2A2A2A] bg-[#141414] px-6 py-3 text-xs font-bold text-white flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> HỌC THÊM</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] text-[#D9FF3F]"><Sparkles className="w-3.5 h-3.5" /> ADAPTIVE SESSION</div>
            <h1 className="mt-2 text-3xl sm:text-5xl font-black uppercase">HỌC THEO TÍN HIỆU CỦA BẠN.</h1>
            <p className="mt-3 text-sm text-[#777]">Bước {current + 1}/{items.length} · {progress}% phiên đã hoàn thành · khoảng {totalMinutes} phút.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#222] bg-[#101010] px-4 py-3 text-[10px] font-mono text-[#888]"><Clock3 className="w-4 h-4 text-[#D9FF3F]" /> {item.durationMinutes} PHÚT</div>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-[#151515]"><div className="h-full bg-[#D9FF3F] transition-all" style={{ width: progress + '%' }} /></div>

        <section className="rounded-3xl border border-[#242424] bg-[#0D0D0D] p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono font-bold tracking-widest">
            <span className="rounded-md bg-[#181818] px-2 py-1 text-[#D9FF3F]">BƯỚC {current + 1}</span>
            <span className="rounded-md border border-[#252525] px-2 py-1 text-[#777]">{item.skill.toUpperCase()}</span>
            <span className="rounded-md border border-[#252525] px-2 py-1 text-[#777]">{status}</span>
          </div>
          <h2 className="mt-6 text-2xl sm:text-4xl font-black uppercase">{item.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#999]">{item.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#202020] bg-[#111] p-5">
              <Target className="h-5 w-5 text-[#D9FF3F]" />
              <div className="mt-3 text-[9px] font-mono text-[#555]">TẠI SAO BẠN ĐƯỢC CHỌN?</div>
              <p className="mt-2 text-xs leading-relaxed text-[#888]">{item.reason}</p>
            </div>
            <div className="rounded-2xl border border-[#202020] bg-[#111] p-5">
              <Zap className="h-5 w-5 text-[#D9FF3F]" />
              <div className="mt-3 text-[9px] font-mono text-[#555]">NHIỆM VỤ</div>
              <p className="mt-2 text-xs leading-relaxed text-[#888]">Mở hoạt động này, hoàn thành bài tập, sau đó quay lại đây để Bensop cập nhật evidence.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button onClick={() => onNavigate(item.path)} className="flex-1 rounded-xl bg-[#D9FF3F] px-6 py-4 text-xs font-extrabold text-black flex items-center justify-center gap-2">
              MỞ HOẠT ĐỘNG <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={next} className="rounded-xl border border-[#2A2A2A] bg-[#151515] px-6 py-4 text-xs font-bold text-white">
              {current === items.length - 1 ? 'ĐÁNH DẤU HOÀN TẤT' : 'HOÀN TẤT & BƯỚC TIẾP →'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
