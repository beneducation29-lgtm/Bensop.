import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { QUIZZES } from '../data/quizzes';

interface QuizModalProps {
  quizId: string | null;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quizId, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!quizId) return null;

  const quiz = QUIZZES.find((q) => q.id === quizId) || QUIZZES[0];
  const question = quiz.questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-2xl w-full bg-[#101010] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#202020] mb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#D9FF3F] uppercase">
              {quiz.categoryName} · BÀI KIỂM TRA PHẢN XẠ
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {quiz.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#777] hover:text-white rounded-full bg-[#161616] border border-[#2A2A2A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-[#888] mb-3">
              <span>Câu hỏi {currentQuestionIndex + 1} / {quiz.questions.length}</span>
              <span>Độ khó: {quiz.difficulty}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1C1C1C] rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-[#D9FF3F] transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Text */}
            <h4 className="text-lg sm:text-2xl font-bold text-white mb-6 leading-snug">
              {question.question}
            </h4>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === question.correctIndex;
                let optionStyle = 'bg-[#141414] border-[#222] text-[#CCC] hover:border-[#444]';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-[#132B13] border-[#D9FF3F] text-white';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-[#2E1414] border-red-500 text-red-200';
                  } else {
                    optionStyle = 'bg-[#141414] border-[#222] text-[#555] opacity-50';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-[#1C1C1C] border-[#D9FF3F] text-white';
                }

                return (
                  <button
                    key={i}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(i)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border text-sm sm:text-base font-medium transition-all duration-150 flex items-start gap-4 cursor-pointer ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-[#D9FF3F] shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when submitted */}
            {isAnswerSubmitted && (
              <div className="p-4 bg-[#141414] border-l-2 border-[#D9FF3F] rounded-r-lg mb-8 text-xs sm:text-sm text-[#CCC]">
                <strong className="text-white block mb-1">Giải thích chi tiết:</strong>
                {question.explanation}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#1C1C1C]">
              <span className="text-xs font-mono text-[#666]">
                {isAnswerSubmitted
                  ? selectedOption === question.correctIndex
                    ? 'Chính xác! +1 điểm'
                    : 'Chưa chính xác'
                  : 'Chọn 1 phương án'}
              </span>

              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 bg-[#D9FF3F] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#c9ef32] text-black font-bold text-xs tracking-tight rounded-md transition-all cursor-pointer"
                >
                  Xác nhận câu trả lời
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-[#D9FF3F] text-black font-extrabold text-xs tracking-tight rounded-md transition-all cursor-pointer"
                >
                  <span>
                    {currentQuestionIndex + 1 < quiz.questions.length ? 'Câu tiếp theo' : 'Xem kết quả'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#D9FF3F]/30 text-[#D9FF3F] flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#888]">
              KẾT QUẢ BÀI THI
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4 font-display">
              {score} / {quiz.questions.length} Câu đúng
            </h3>

            <p className="text-sm text-[#A0A0A0] max-w-sm mx-auto mb-8">
              {score === quiz.questions.length
                ? 'Xuất sắc! Bạn đã nắm vững toàn bộ kiến thức trong bài học này.'
                : 'Khá tốt! Bạn có thể xem lại các bài học liên quan và làm lại để đạt điểm tuyệt đối.'}
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#181818] hover:bg-[#222] border border-[#333] text-xs font-bold text-white rounded-md cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại quiz</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#D9FF3F] hover:bg-[#cbf532] text-black text-xs font-extrabold rounded-md cursor-pointer"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
