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
  topic?: string;
  passage?: string;
  explanations?: {
    correct: string;
    incorrect: { [key: string]: string };
  };
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
  topic,
  passage,
  explanations,
}: QuizCardProps) {
  console.log("QuizCard props:", {
    question,
    options,
    selectedAnswer,
    feedback,
    topic,
    passage,
    explanations,
  });

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
      {/* Topic (if available) */}
      {topic && (
        <div className="text-[14px] text-[#555] mb-[10px]">{topic}</div>
      )}
      {/* Passage (if available) */}
      {passage && (
        <div className="text-[16px] text-[#333] mb-[15px] p-[10px] bg-[#F5F5F5] rounded-[6px]">
          {passage}
        </div>
      )}
      {/* Question text */}
      <h2 className="text-[18px] font-semibold mb-[15px]">{question}</h2>

      {/* Answer options */}
      <div className="flex flex-col gap-[12px] mb-[15px] max-sm:gap-[10px]">
        {options.map((option, index) => {
          const optionLetter = option.split(")")[0].trim();
          return (
            <label
              key={index}
              className={`p-[12px] rounded-[6px] text-[16px] flex items-center cursor-pointer transition-colors bg-clip-padding ${
                selectedAnswer === option
                  ? "bg-[#E0E7FF]"
                  : feedback && optionLetter === feedback.correctAnswer
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
                {feedback && optionLetter === feedback.correctAnswer && (
                  <Check className="w-[20px] h-[20px] text-[#14532d]" />
                )}
                {feedback &&
                  selectedAnswer === option &&
                  optionLetter !== feedback.correctAnswer && (
                    <X className="w-[20px] h-[20px] text-[#dc2626]" />
                  )}
              </span>
            </label>
          );
        })}
      </div>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={isSubmitDisabled || disabled}
        className={`w-full py-[10px] px-[16px] rounded-[6px] text-[16px] font-semibold ${
          isSubmitDisabled || disabled
            ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
            : "bg-[#4361ee] text-white hover:bg-[#3251dd]"
        } transition-colors focus:outline-none focus:ring-0`}
      >
        Submit Answer
      </button>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mt-[20px] p-[15px] rounded-[6px] ${
            feedback.isCorrect
              ? "bg-[#ECFDF5] border border-[#14532d]"
              : "bg-[#FEF2F2] border border-[#dc2626]"
          }`}
        >
          <p className="text-[16px] font-medium mb-[10px]">
            {feedback.isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p className="text-[14px] text-[#555]">
            {feedback.explanation || "No explanation available"}
          </p>
        </div>
      )}
    </div>
  );
}
