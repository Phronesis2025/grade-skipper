"use client";

interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  progressColor: string;
}

export default function ProgressBar({
  currentQuestionIndex,
  totalQuestions,
  progressColor,
}: ProgressBarProps) {
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex justify-between items-center mb-[5px] max-sm:flex-col max-sm:gap-[10px]">
      <div className="text-[16px] text-[#555]">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      <div className="flex-grow h-[6px] bg-[#EEE] rounded-[3px] mx-[15px] overflow-hidden max-sm:mx-0 max-sm:w-full">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: progressColor,
          }}
        ></div>
      </div>
      <div className="text-[16px] text-[#555]">
        Progress: {Math.round(progressPercentage)}%
      </div>
    </div>
  );
}
