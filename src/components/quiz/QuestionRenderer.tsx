import React, { useState } from 'react';
import { Question } from '../../types/quiz';
import { Volume2, HelpCircle, Check, ArrowUpDown, AlertCircle, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  userAnswer: any;
  onChangeAnswer: (answer: any) => void;
  isReviewMode?: boolean;
  showExplanation?: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  userAnswer,
  onChangeAnswer,
  isReviewMode = false,
  showExplanation = false,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Audio simulator for listening questions
  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2500);
  };

  // Render question type specific UI
  const renderQuestionInput = () => {
    switch (question.type) {
      // 1. Multiple Choice
      case 'multiple-choice': {
        const options = question.options || [];
        return (
          <div className="space-y-3">
            {options.map((opt, idx) => {
              const isSelected = userAnswer === opt;
              const isCorrectOpt = question.correctAnswer === opt;
              const letter = String.fromCharCode(65 + idx);

              let cardStyle = 'bg-[#121212] border-[#222] hover:border-[#444] text-white';
              if (isSelected && !isReviewMode) {
                cardStyle = 'bg-[#181818] border-[#D9FF3F] text-white shadow-[0_0_15px_rgba(217,255,63,0.1)]';
              } else if (isReviewMode) {
                if (isCorrectOpt) {
                  cardStyle = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200';
                } else if (isSelected && !isCorrectOpt) {
                  cardStyle = 'bg-red-950/30 border-red-500/60 text-red-200';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isReviewMode}
                  onClick={() => onChangeAnswer(opt)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all flex items-center gap-4 cursor-pointer disabled:cursor-default ${cardStyle}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#D9FF3F] text-black'
                        : isReviewMode && isCorrectOpt
                        ? 'bg-emerald-500 text-black'
                        : 'bg-[#1E1E1E] text-[#888] border border-[#2E2E2E]'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed flex-1">{opt}</span>
                  {isReviewMode && isCorrectOpt && (
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                      ĐÁP ÁN ĐÚNG
                    </span>
                  )}
                  {isReviewMode && isSelected && !isCorrectOpt && (
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-800">
                      BẠN CHỌN
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        );
      }

      // 2. Multiple Select (Pick multiple correct answers)
      case 'multiple-select': {
        const options = question.options || [];
        const currentSelections: string[] = Array.isArray(userAnswer) ? userAnswer : [];

        const toggleSelection = (opt: string) => {
          if (isReviewMode) return;
          if (currentSelections.includes(opt)) {
            onChangeAnswer(currentSelections.filter((s) => s !== opt));
          } else {
            onChangeAnswer([...currentSelections, opt]);
          }
        };

        const correctArr: string[] = Array.isArray(question.correctAnswer)
          ? question.correctAnswer
          : [question.correctAnswer];

        return (
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#D9FF3F] flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
              <span>CHỌN TẤT CẢ CÁC ĐÁP ÁN ĐÚNG (CÓ THỂ CHỌN NHIỀU)</span>
            </div>
            {options.map((opt, idx) => {
              const isSelected = currentSelections.includes(opt);
              const isCorrectOpt = correctArr.includes(opt);

              let cardStyle = 'bg-[#121212] border-[#222] hover:border-[#444] text-white';
              if (isSelected && !isReviewMode) {
                cardStyle = 'bg-[#181818] border-[#D9FF3F] text-white';
              } else if (isReviewMode) {
                if (isCorrectOpt) {
                  cardStyle = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200';
                } else if (isSelected && !isCorrectOpt) {
                  cardStyle = 'bg-red-950/30 border-red-500/60 text-red-200';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isReviewMode}
                  onClick={() => toggleSelection(opt)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all flex items-center gap-4 cursor-pointer disabled:cursor-default ${cardStyle}`}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#D9FF3F] border-[#D9FF3F] text-black'
                        : 'border-[#444] bg-[#1E1E1E]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed flex-1">{opt}</span>
                  {isReviewMode && isCorrectOpt && (
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      ĐÚNG
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        );
      }

      // 3. True / False
      case 'true-false': {
        const userBool = typeof userAnswer === 'boolean' ? userAnswer : null;
        const correctBool = Boolean(question.correctAnswer);

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'ĐÚNG (TRUE)', val: true },
              { label: 'SAI (FALSE)', val: false },
            ].map((choice) => {
              const isSelected = userBool === choice.val;
              const isCorrectOpt = correctBool === choice.val;

              let btnStyle = 'bg-[#121212] border-[#252525] text-white hover:border-[#444]';
              if (isSelected && !isReviewMode) {
                btnStyle = 'bg-[#1A1A1A] border-[#D9FF3F] text-white shadow-[0_0_20px_rgba(217,255,63,0.12)]';
              } else if (isReviewMode) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                } else if (isSelected && !isCorrectOpt) {
                  btnStyle = 'bg-red-950/40 border-red-500 text-red-300';
                }
              }

              return (
                <button
                  key={String(choice.val)}
                  type="button"
                  disabled={isReviewMode}
                  onClick={() => onChangeAnswer(choice.val)}
                  className={`p-6 sm:p-8 rounded-xl border text-center font-display font-bold text-base sm:text-lg transition-all cursor-pointer disabled:cursor-default flex flex-col items-center justify-center gap-2 ${btnStyle}`}
                >
                  <span>{choice.label}</span>
                  {isSelected && !isReviewMode && (
                    <span className="text-xs font-mono text-[#D9FF3F]">ĐÃ CHỌN</span>
                  )}
                  {isReviewMode && isCorrectOpt && (
                    <span className="text-xs font-mono text-emerald-400">ĐÁP ÁN CHUẨN XÁC</span>
                  )}
                </button>
              );
            })}
          </div>
        );
      }

      // 4. Fill in the Blank
      case 'fill-blank': {
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                disabled={isReviewMode}
                value={userAnswer || ''}
                onChange={(e) => onChangeAnswer(e.target.value)}
                placeholder="Gõ câu trả lời của bạn vào đây..."
                className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#D9FF3F] rounded-xl px-5 py-4 text-white text-base focus:outline-none transition-all placeholder:text-[#555] font-sans"
              />
            </div>
            {isReviewMode && (
              <div className="p-4 rounded-xl bg-[#161616] border border-[#282828] text-sm">
                <span className="text-xs font-mono text-[#888] block mb-1">ĐÁP ÁN CHÍNH XÁC:</span>
                <span className="font-mono font-bold text-[#D9FF3F]">
                  {Array.isArray(question.correctAnswer)
                    ? question.correctAnswer.join(' hoặc ')
                    : String(question.correctAnswer)}
                </span>
              </div>
            )}
          </div>
        );
      }

      // 5. Matching (Pairing left items with right items)
      case 'matching': {
        const pairs = question.matchingPairs || [];
        const userMatches: { left: string; right: string }[] = Array.isArray(userAnswer)
          ? userAnswer
          : [];

        const rightOptions = pairs.map((p) => p.right);

        const handlePairChange = (left: string, right: string) => {
          if (isReviewMode) return;
          const filtered = userMatches.filter((m) => m.left !== left);
          if (right) {
            onChangeAnswer([...filtered, { left, right }]);
          } else {
            onChangeAnswer(filtered);
          }
        };

        return (
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#D9FF3F] mb-3">
              GHÉP CẶP TƯƠNG ỨNG GIỮA CỘT TRÁI VÀ CỘT PHẢI:
            </div>
            <div className="grid gap-3">
              {pairs.map((pair, idx) => {
                const currentMatched = userMatches.find((m) => m.left === pair.left)?.right || '';
                const isCorrect = isReviewMode && currentMatched === pair.right;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isReviewMode
                        ? isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : 'bg-red-950/20 border-red-500/40'
                        : 'bg-[#121212] border-[#222]'
                    }`}
                  >
                    <div className="font-medium text-white sm:w-1/2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1C1C1C] border border-[#333] text-xs font-mono flex items-center justify-center text-[#888]">
                        {idx + 1}
                      </span>
                      <span>{pair.left}</span>
                    </div>

                    <div className="sm:w-1/2">
                      <select
                        disabled={isReviewMode}
                        value={currentMatched}
                        onChange={(e) => handlePairChange(pair.left, e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#D9FF3F] text-white text-sm rounded-lg px-3 py-2.5 outline-none cursor-pointer disabled:cursor-default"
                      >
                        <option value="">-- Chọn vế ghép tương ứng --</option>
                        {rightOptions.map((r, rIdx) => (
                          <option key={rIdx} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // 6. Ordering (Sequence / Sentence arrangement)
      case 'ordering': {
        const defaultItems = question.orderingItems || [];
        const currentOrder: string[] =
          Array.isArray(userAnswer) && userAnswer.length === defaultItems.length
            ? userAnswer
            : defaultItems;

        const moveItem = (index: number, direction: 'up' | 'down') => {
          if (isReviewMode) return;
          const targetIndex = direction === 'up' ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= currentOrder.length) return;
          const next = [...currentOrder];
          const temp = next[index];
          next[index] = next[targetIndex];
          next[targetIndex] = temp;
          onChangeAnswer(next);
        };

        return (
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#D9FF3F] mb-2 flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>SẮP XẾP CÁC PHẦN TỬ THEO ĐÚNG TRẬT TỰ LOGIC / NGỮ PHÁP (DÙNG MŨI TÊN ĐỂ ĐỔI VỊ TRÍ)</span>
            </div>
            <div className="space-y-2">
              {currentOrder.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#121212] border border-[#222] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#1B1B1B] text-[#D9FF3F] font-mono text-xs font-bold flex items-center justify-center border border-[#2B2B2B]">
                      {idx + 1}
                    </span>
                    <span className="text-white text-sm sm:text-base font-medium">{item}</span>
                  </div>

                  {!isReviewMode && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveItem(idx, 'up')}
                        className="px-2.5 py-1.5 rounded bg-[#1C1C1C] hover:bg-[#282828] text-xs font-mono text-white disabled:opacity-30 disabled:cursor-not-allowed border border-[#2C2C2C] cursor-pointer"
                      >
                        ▲ LÊN
                      </button>
                      <button
                        type="button"
                        disabled={idx === currentOrder.length - 1}
                        onClick={() => moveItem(idx, 'down')}
                        className="px-2.5 py-1.5 rounded bg-[#1C1C1C] hover:bg-[#282828] text-xs font-mono text-white disabled:opacity-30 disabled:cursor-not-allowed border border-[#2C2C2C] cursor-pointer"
                      >
                        ▼ XUỐNG
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 7. Sentence Correction (Spotting the error segment)
      case 'sentence-correction': {
        const data = question.sentenceToCorrect;
        if (!data) return null;

        return (
          <div className="space-y-5">
            <div className="p-5 rounded-xl bg-[#121212] border border-[#252525]">
              <span className="text-xs font-mono text-[#888] block mb-3">
                NHẤP VÀO PHÂN ĐOẠN CÓ LỖI SAI TRONG CÂU DƯỚI ĐÂY:
              </span>
              <div className="flex flex-wrap gap-2 text-base sm:text-lg leading-relaxed">
                {data.segments.map((seg, idx) => {
                  const isSelected = Number(userAnswer) === idx;
                  const isErrorSegment = data.errorSegmentIndex === idx;

                  let style = 'bg-[#181818] border-[#333] text-white hover:border-[#D9FF3F]';
                  if (isSelected && !isReviewMode) {
                    style = 'bg-[#D9FF3F] text-black border-[#D9FF3F] font-bold shadow-[0_0_10px_rgba(217,255,63,0.3)]';
                  } else if (isReviewMode) {
                    if (isErrorSegment) {
                      style = 'bg-red-950/80 border-red-500 text-red-200 line-through font-bold';
                    } else if (isSelected && !isErrorSegment) {
                      style = 'bg-zinc-800 text-zinc-400 border-zinc-700';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isReviewMode}
                      onClick={() => onChangeAnswer(idx)}
                      className={`px-3 py-1.5 rounded-lg border text-sm sm:text-base transition-all cursor-pointer disabled:cursor-default ${style}`}
                    >
                      {seg}
                    </button>
                  );
                })}
              </div>
            </div>

            {isReviewMode && (
              <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] text-sm">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">
                  CÁCH SỬA CHUẨN XÁC:
                </span>
                <p className="text-white font-mono">{data.correction}</p>
              </div>
            )}
          </div>
        );
      }

      // 8. Translation
      case 'translation': {
        const prompt = question.translationPrompt;
        return (
          <div className="space-y-4">
            {prompt && (
              <div className="p-4 rounded-xl bg-[#121212] border border-[#262626]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#888] mb-2">
                  <span>DỊCH TỪ:</span>
                  <span className="text-[#D9FF3F] font-bold">{prompt.sourceLanguage}</span>
                  <span>SANG</span>
                  <span className="text-[#D9FF3F] font-bold">{prompt.targetLanguage}</span>
                </div>
                <p className="text-lg font-bold text-white tracking-wide">{prompt.sourceText}</p>
              </div>
            )}

            <textarea
              disabled={isReviewMode}
              rows={3}
              value={userAnswer || ''}
              onChange={(e) => onChangeAnswer(e.target.value)}
              placeholder="Nhập bản dịch chuẩn xác của bạn..."
              className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#D9FF3F] rounded-xl p-4 text-white text-base focus:outline-none transition-all placeholder:text-[#555]"
            />

            {isReviewMode && prompt && (
              <div className="p-4 rounded-xl bg-[#151515] border border-[#282828] text-sm space-y-1">
                <span className="text-xs font-mono text-[#D9FF3F] block">CÁC ĐÁP ÁN ĐƯỢC CHẤP NHẬN:</span>
                <ul className="list-disc list-inside text-zinc-300 font-mono text-xs space-y-1">
                  {prompt.acceptableAnswers.map((ans, i) => (
                    <li key={i}>{ans}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      // 9. Listening
      case 'listening': {
        return (
          <div className="space-y-6">
            {/* Audio waveform controller */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-[#242424] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-black transition-all cursor-pointer ${
                    isPlayingAudio ? 'bg-white scale-95' : 'bg-[#D9FF3F] hover:bg-[#cbf532]'
                  }`}
                >
                  <Volume2 className={`w-6 h-6 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                </button>
                <div>
                  <div className="text-xs font-mono text-[#888] uppercase">
                    {isPlayingAudio ? 'ĐANG PHÁT AUDIO MÔ PHỎNG...' : 'NGHE ĐOẠN HỘI THOẠI'}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">Bấm nút để nghe phát âm chuẩn</div>
                </div>
              </div>

              {/* Fake visualizer bars */}
              <div className="flex items-center gap-1 h-8">
                {[12, 24, 16, 28, 20, 14, 26, 18, 10, 22].map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full bg-[#D9FF3F] transition-all duration-200 ${
                      isPlayingAudio ? 'opacity-100' : 'opacity-25'
                    }`}
                    style={{ height: isPlayingAudio ? `${(height / 28) * 100}%` : '20%' }}
                  />
                ))}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {(question.options || []).map((opt, idx) => {
                const isSelected = userAnswer === opt;
                const isCorrect = question.correctAnswer === opt;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isReviewMode}
                    onClick={() => onChangeAnswer(opt)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer disabled:cursor-default ${
                      isSelected && !isReviewMode
                        ? 'bg-[#181818] border-[#D9FF3F] text-white'
                        : isReviewMode && isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200'
                        : isReviewMode && isSelected && !isCorrect
                        ? 'bg-red-950/30 border-red-500/60 text-red-200'
                        : 'bg-[#121212] border-[#222] hover:border-[#444] text-white'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // 10. Image Choice
      case 'image-choice': {
        const imageOptions = question.imageOptions || [];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {imageOptions.map((opt) => {
              const isSelected = userAnswer === opt.id || userAnswer === opt.label;
              const isCorrect =
                question.correctAnswer === opt.id || question.correctAnswer === opt.label;

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isReviewMode}
                  onClick={() => onChangeAnswer(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer disabled:cursor-default ${
                    isSelected && !isReviewMode
                      ? 'bg-[#181818] border-[#D9FF3F]'
                      : isReviewMode && isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500'
                      : 'bg-[#121212] border-[#222] hover:border-[#444]'
                  }`}
                >
                  <div className="font-bold text-white text-base mb-1">{opt.label}</div>
                  <div className="text-xs text-[#888] font-mono">Lựa chọn trực quan #{opt.id}</div>
                </button>
              );
            })}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Header & Instructions */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1A1A1A] border border-[#2D2D2D] text-[#D9FF3F]">
            {question.skill}
          </span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#141414] border border-[#252525] text-[#888]">
            {question.difficulty}
          </span>
          {question.cefrLevel && (
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#141414] border border-[#252525] text-white">
              CEFR {question.cefrLevel}
            </span>
          )}
          {question.hskLevel && (
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#141414] border border-[#252525] text-amber-300">
              {question.hskLevel}
            </span>
          )}
          <span className="ml-auto text-xs font-mono text-[#666]">
            {question.points} ĐIỂM
          </span>
        </div>

        {question.instructions && (
          <p className="text-xs text-[#888] font-mono mb-3 bg-[#111] px-3 py-2 rounded-lg border border-[#1E1E1E]">
            💡 {question.instructions}
          </p>
        )}

        <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed font-sans">
          {question.question}
        </h3>
      </div>

      {/* Main Interactive Input Component */}
      <div className="pt-2">{renderQuestionInput()}</div>

      {/* Progressive Hint (Only available in non-review mode if provided) */}
      {!isReviewMode && question.hint && question.hint.length > 0 && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#888] hover:text-[#D9FF3F] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý (Hint)'}</span>
          </button>
          {showHint && (
            <div className="mt-2 p-3 rounded-lg bg-[#141414] border border-[#252525] text-xs text-[#AAA] leading-relaxed animate-in fade-in duration-200">
              {question.hint.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#D9FF3F]">›</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Thorough Explanations in Review Mode */}
      {(isReviewMode || showExplanation) && question.explanation && (
        <div className="mt-8 p-6 rounded-2xl bg-[#0D0D0D] border border-[#262626] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1E1E1E] pb-3">
            <span className="w-2 h-2 rounded-full bg-[#D9FF3F]" />
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              GIẢI THÍCH CHI TIẾT & BÀI HỌC CỐT LÕI
            </h4>
          </div>

          <p className="text-sm text-[#CCC] leading-relaxed">{question.explanation.general}</p>

          {question.explanation.whyCorrect && (
            <div className="text-xs space-y-1">
              <span className="font-mono text-emerald-400 font-bold block">TẠI SAO ĐÚNG:</span>
              <p className="text-zinc-300">{question.explanation.whyCorrect}</p>
            </div>
          )}

          {question.explanation.whyWrong && (
            <div className="text-xs space-y-1">
              <span className="font-mono text-red-400 font-bold block">TẠI SAO CÁC PHƯƠNG ÁN KHÁC SAI:</span>
              <div className="space-y-1 pt-1">
                {Object.entries(question.explanation.whyWrong).map(([k, v]) => (
                  <div key={k} className="text-zinc-400">
                    <span className="text-zinc-200 font-mono">"{k}":</span> {v}
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.explanation.grammarRule && (
            <div className="p-3 rounded-lg bg-[#141414] border border-[#222] text-xs">
              <span className="font-mono text-[#D9FF3F] font-bold block mb-1">CÔNG THỨC NGỮ PHÁP:</span>
              <span className="font-mono text-white">{question.explanation.grammarRule}</span>
            </div>
          )}

          {question.explanation.vocabularyNote && (
            <div className="p-3 rounded-lg bg-[#141414] border border-[#222] text-xs">
              <span className="font-mono text-[#D9FF3F] font-bold block mb-1">GHI CHÚ TỪ VỰNG:</span>
              <span className="text-white">{question.explanation.vocabularyNote}</span>
            </div>
          )}

          {question.explanation.tip && (
            <div className="text-xs text-[#AAA] italic flex items-start gap-2">
              <span className="text-[#D9FF3F] not-italic">★</span>
              <span>Mẹo làm bài: {question.explanation.tip}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
