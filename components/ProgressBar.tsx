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

  const extractColorValue = (colorString: string): string => {
    if (colorString.startsWith("bg-[#") && colorString.endsWith("]")) {
      return colorString.substring(4, colorString.length - 1);
    } else if (colorString.startsWith("#")) {
      return colorString;
    }
    return "#4361ee";
  };

  const bgColor = extractColorValue(progressColor);

  console.log(
    `ProgressBar: Index=${currentQuestionIndex}, Total=${totalQuestions}, Percentage=${progressPercentage}%, Color=${bgColor}`
  );

  return (
    <div className="flex justify-between items-center mb-[5px] w-full max-sm:flex-col max-sm:gap-[10px]">
      <div className="text-[16px] text-[#555] whitespace-nowrap">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      <div className="h-[6px] bg-[#EEE] rounded-[3px] overflow-hidden mx-[15px] flex-grow max-sm:mx-0 max-sm:w-full">
        <div
          className="h-full rounded-[3px] transition-all duration-300 ease-in-out"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: bgColor,
          }}
        ></div>
      </div>
      <div className="text-[16px] text-[#555] whitespace-nowrap">
        Progress: {Math.round(progressPercentage)}%
      </div>
    </div>
  );
}
