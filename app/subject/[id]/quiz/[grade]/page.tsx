"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import CustomLink from "@/components/CustomLink";
import { useState } from "react";

// Import the subjects array (same structure as in app/page.tsx)
const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: null,
    iconColor: "text-[#4361ee]",
    subtitle: "Fractions, Decimals, Algebra",
    progressColor: "bg-[#4361ee]",
  },
  {
    id: "reading",
    name: "Reading",
    icon: null,
    iconColor: "text-[#10b981]",
    subtitle: "Comprehension, Analysis",
    progressColor: "bg-[#10b981]",
  },
  {
    id: "science",
    name: "Science",
    icon: null,
    iconColor: "text-[#8b5cf6]",
    subtitle: "Earth Science, Biology",
    progressColor: "bg-[#8b5cf6]",
  },
  {
    id: "history",
    name: "History",
    icon: null,
    iconColor: "text-[#f59e0b]",
    subtitle: "U.S. History, World Events",
    progressColor: "bg-[#f59e0b]",
  },
  {
    id: "english",
    name: "English",
    icon: null,
    iconColor: "text-[#f97316]",
    subtitle: "Grammar, Writing",
    progressColor: "bg-[#f97316]",
  },
  {
    id: "coding-ai",
    name: "Coding & AI",
    icon: null,
    iconColor: "text-[#3b82f6]",
    subtitle: "Basic Programming, AI Concepts",
    progressColor: "bg-[#3b82f6]",
  },
  {
    id: "logic-puzzles",
    name: "Logic Puzzles",
    icon: null,
    iconColor: "text-[#ec4899]",
    subtitle: "Problem Solving, Critical Thinking",
    progressColor: "bg-[#ec4899]",
  },
];

export default function QuizPage() {
  // Get the route parameters
  const params = useParams();
  const subjectId = params.id as string;
  const grade = params.grade as string;

  // State to track the selected answer
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Handler for answer selection
  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
  };

  // Find the matching subject by ID
  const subject = subjects.find((s) => s.id === subjectId);

  // Set the title from the found subject, or use a fallback
  const title = subject ? subject.name : "Subject Not Found";

  return (
    <>
      <div className="bg-[#F9FAFB] min-h-screen">
        {/* Back to Subject link */}
        <div className="flex justify-end max-w-[800px] mx-auto px-[25px] pt-[5px] max-sm:justify-center">
          <CustomLink
            href={`/subject/${subjectId}`}
            className="bg-[#4361ee] !text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline"
          >
            Back to {title}
          </CustomLink>
        </div>

        {/* Main container */}
        <div className="max-w-[800px] mx-auto p-[15px] max-sm:p-[15px]">
          {/* Subject header */}
          <div className="text-center mb-[15px]">
            <h1 className="text-[24px] font-bold mb-[5px]">{title}</h1>

            {/* Progress indicator */}
            <div className="flex justify-between items-center mb-[5px] max-sm:flex-col max-sm:gap-[10px]">
              <div className="text-[16px] text-[#555]">Question 8 of 10</div>
              <div className="flex-grow h-[6px] bg-[#EEE] rounded-[3px] mx-[15px] overflow-hidden max-sm:mx-0 max-sm:w-full">
                <div className="w-[60%] h-full bg-[#333]"></div>
              </div>
              <div className="text-[16px] text-[#555]">Progress: 60%</div>
            </div>
          </div>

          {/* Question navigation at top */}
          <div className="flex items-center justify-between border-b border-[#eee] pt-[5px] pb-[10px] mb-[20px]">
            <div className="text-[14px] text-[#555]">Grade {grade}</div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-lg p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] mb-[20px]">
            {/* Question text */}
            <h2 className="text-[18px] font-semibold mb-[15px]">
              What is the result of simplifying the fraction 24/32?
            </h2>

            {/* Answer options */}
            <div className="flex flex-col gap-[10px] mb-[15px] max-sm:gap-[8px]">
              <label
                className={`p-[10px] rounded-[6px] text-[16px] flex items-center cursor-pointer transition-colors ${
                  selectedAnswer === "3/4"
                    ? "bg-[#E0E7FF]"
                    : "bg-[#F5F5F5] hover:bg-[#EAEAEA]"
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value="3/4"
                  className="mr-[10px]"
                  checked={selectedAnswer === "3/4"}
                  onChange={handleAnswerSelection}
                />
                3/4
              </label>

              <label
                className={`p-[10px] rounded-[6px] text-[16px] flex items-center cursor-pointer transition-colors ${
                  selectedAnswer === "4/3"
                    ? "bg-[#E0E7FF]"
                    : "bg-[#F5F5F5] hover:bg-[#EAEAEA]"
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value="4/3"
                  className="mr-[10px]"
                  checked={selectedAnswer === "4/3"}
                  onChange={handleAnswerSelection}
                />
                4/3
              </label>

              <label
                className={`p-[10px] rounded-[6px] text-[16px] flex items-center cursor-pointer transition-colors ${
                  selectedAnswer === "2/3"
                    ? "bg-[#E0E7FF]"
                    : "bg-[#F5F5F5] hover:bg-[#EAEAEA]"
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value="2/3"
                  className="mr-[10px]"
                  checked={selectedAnswer === "2/3"}
                  onChange={handleAnswerSelection}
                />
                2/3
              </label>

              <label
                className={`p-[10px] rounded-[6px] text-[16px] flex items-center cursor-pointer transition-colors ${
                  selectedAnswer === "5/8"
                    ? "bg-[#E0E7FF]"
                    : "bg-[#F5F5F5] hover:bg-[#EAEAEA]"
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value="5/8"
                  className="mr-[10px]"
                  checked={selectedAnswer === "5/8"}
                  onChange={handleAnswerSelection}
                />
                5/8
              </label>
            </div>

            {/* Navigation button */}
            <div className="flex justify-center max-sm:flex-col max-sm:gap-[10px] max-sm:items-stretch">
              <CustomLink
                href={selectedAnswer ? `/subject/${subjectId}/results` : "#"}
                className={`px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold max-sm:text-center max-sm:w-full ${
                  selectedAnswer
                    ? "bg-[#4361ee] text-[white] hover:bg-[#3251dd] transition-colors"
                    : "bg-[#4361ee] text-white opacity-50 cursor-not-allowed"
                }`}
                {...(!selectedAnswer && {
                  "aria-disabled": true,
                  onClick: (e: React.MouseEvent) => e.preventDefault(),
                })}
              >
                Submit Answer
              </CustomLink>
            </div>
          </div>

          {/* Tools section */}
          <div className="flex justify-center gap-[20px] mb-[20px]">
            {/* Hint tool */}
            <div className="text-[14px] text-[#666] hover:text-[#4361ee] flex items-center gap-[5px] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Hint
            </div>

            {/* Calculator tool */}
            <div className="text-[14px] text-[#666] hover:text-[#4361ee] flex items-center gap-[5px] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Calculator
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
