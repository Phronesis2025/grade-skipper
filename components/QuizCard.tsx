"use client";

import { Check, X } from "lucide-react";

interface QuizCardProps {
  question: string;
  options: string[] | undefined;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  subjectId: string;
  isSubmitDisabled: boolean;
  disabled: boolean;
  onSubmit: () => void;
  feedback: {
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
  } | null;
}

export default function QuizCard({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  subjectId,
  isSubmitDisabled,
  disabled,
  onSubmit,
  feedback,
}: QuizCardProps) {
  if (!options || options.length === 0) {
    return (
      <div className="bg-white rounded-lg p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] mb-[20px]">
        <h2 className="text-[18px] font-semibold mb-[15px]">{question}</h2>
        <p className="text-[14px] text-red-600">
          Error: No options available for this question.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] mb-[20px]">
      <style jsx>{`
        button:focus-visible,
        button:focus,
        button:active {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      {/* Question text */}
      <h2 className="text-[18px] font-semibold mb-[15px]">{question}</h2>

      {/* Answer options */}
      <div className="flex flex-col gap-[12px] mb-[15px] max-sm:gap-[10px]">
        {options.map((option, index) => (
          <label
            key={index}
            className={`p-[12px] rounded-[6px] text-[16px] flex items-center cursor-pointer transition-colors bg-clip-padding ${
              selectedAnswer === option
                ? "bg-[#E0E7FF]"
                : feedback && option === feedback.correctAnswer
                ? "bg-[#ECFDF5] border border-[#14532d]"
                : "bg-[#F5F5F5] hover:bg-[#EAEAEA]"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              className="mr-[16px] w-[16px] h-[16px] border-2 border-[#4361ee] rounded-full focus:outline-none focus:ring-0"
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
              disabled={disabled}
            />
            <span className="flex items-center gap-[16px] relative z-10">
              {option}
              {feedback && option === feedback.correctAnswer && (
                <Check
                  className="w-[20px] h-[20px] text-[#14532d]"
                  strokeWidth={4}
                />
              )}
              {feedback && option === selectedAnswer && !feedback.isCorrect && (
                <X
                  className="w-[20px] h-[20px] text-[#991b1b]"
                  strokeWidth={4}
                />
              )}
            </span>
          </label>
        ))}
      </div>

      {/* Feedback explanation */}
      {feedback && (
        <div className="text-[14px] text-[#555] mb-[15px] p-[10px] bg-[#F5F5F5] rounded-[6px]">
          {feedback.explanation}
        </div>
      )}

      {/* Submit button */}
      {!feedback && (
        <div className="flex justify-center max-sm:flex-col max-sm:gap-[10px] max-sm:items-stretch">
          <button
            onClick={onSubmit}
            className={`px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold max-sm:text-center max-sm:w-full focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 ${
              isSubmitDisabled
                ? "bg-[#4361ee] text-white opacity-50 cursor-not-allowed"
                : "bg-[#4361ee] text-[white] hover:bg-[#3251dd] transition-colors"
            }`}
            disabled={isSubmitDisabled}
          >
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
}
