"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Check, X } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation: string;
}

interface AccordionProps {
  questions: Question[];
}

export default function Accordion({ questions }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {questions.map((q, index) => {
        const isOpen = openIndex === index;
        // Determine if the user's answer is correct
        const userAnswerLetter = q.userAnswer
          ? q.userAnswer.split(")")[0].trim()
          : null;
        const isCorrect = userAnswerLetter === q.correctAnswer;

        return (
          <div
            key={index}
            className={`rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${
              q.userAnswer
                ? isCorrect
                  ? "bg-[#CADDCA]"
                  : "bg-[#F0CACA]"
                : "bg-white"
            }`}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full p-[12px] text-[16px] font-semibold text-left flex justify-between items-center focus:outline-none focus:ring-0 ${
                q.userAnswer
                  ? isCorrect
                    ? "bg-[#CADDCA]"
                    : "bg-[#F0CACA]"
                  : "bg-white"
              } rounded-[6px]`}
            >
              <span>{q.question}</span>
              <ChevronDown
                className={`w-[20px] h-[20px] transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="p-[12px] pt-[0px] text-[14px] text-[#555] bg-[#F5F5F5]">
                <p className="mb-[5px] flex items-center gap-[8px]">
                  Your Answer: {q.userAnswer || "Not answered"}{" "}
                  {q.userAnswer &&
                    (isCorrect ? (
                      <Check
                        className="w-[20px] h-[20px] text-green-500"
                        strokeWidth={4}
                      />
                    ) : (
                      <X
                        className="w-[20px] h-[20px] text-red-500"
                        strokeWidth={4}
                      />
                    ))}
                </p>
                <p className="mb-[5px] flex items-center gap-[8px]">
                  Correct Answer: {q.correctAnswer}{" "}
                  <Check
                    className="w-[20px] h-[20px] text-green-500"
                    strokeWidth={4}
                  />
                </p>
                <p>Explanation: {q.explanation}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
