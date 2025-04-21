"use client";

import { useState } from "react";

type Question = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
};

type AccordionProps = {
  questions: Question[];
};

export default function Accordion({ questions }: AccordionProps) {
  // State to track which accordion item is open (null if none)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle accordion item
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-[8px]">
      {questions.map((q, index) => {
        const isCorrect = q.userAnswer === q.correctAnswer;
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border border-[#eee] rounded-[6px]">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full flex justify-between items-center p-[10px] text-[18px] text-[#333] rounded-[6px] focus:outline-none ${
                isCorrect ? "bg-[#e6f7e9]" : "bg-[#ffebee]"
              }`}
            >
              <span className="truncate">{q.question}</span>
              <svg
                className={`w-[20px] h-[20px] transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="p-[10px] text-[14px] text-[#333]">
                <p className="mb-[5px]">{q.question}</p>
                <p className="flex items-center gap-[5px]">
                  Your Answer: {q.userAnswer}
                  {isCorrect ? (
                    <svg
                      className="w-[16px] h-[16px] text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-[16px] h-[16px] text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </p>
                <p className="flex items-center gap-[5px]">
                  Correct Answer: {q.correctAnswer}
                  <svg
                    className="w-[16px] h-[16px] text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </p>
                {!isCorrect && (
                  <p className="mt-[5px] text-[14px] text-[#333]">
                    Explanation: {q.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
