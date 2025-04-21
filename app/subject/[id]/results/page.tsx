"use client";

import { useParams, useSearchParams } from "next/navigation";
import CustomLink from "@/components/CustomLink";
import Accordion from "@/components/Accordion";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useState } from "react";
import { subjects } from "@/lib/subjects";

// Define the Subject type
type Subject = {
  id: string;
  name: string;
  icon: any;
  iconColor: string;
  subtitle: string;
  progressColor: string;
};

// Mock data for questions (to be replaced with dynamic data in Phase 4)
const mockQuestions = [
  {
    question: "What is 2 + 2?",
    options: ["A) 3", "B) 4", "C) 5", "D) 6"],
    correctAnswer: "B",
    userAnswer: "B",
    explanation: "2 + 2 equals 4.",
  },
  {
    question: "What is 5 - 3?",
    options: ["A) 1", "B) 2", "C) 3", "D) 4"],
    correctAnswer: "B",
    userAnswer: "B",
    explanation: "5 - 3 equals 2.",
  },
  {
    question: "What is 3 × 3?",
    options: ["A) 6", "B) 9", "C) 12", "D) 15"],
    correctAnswer: "B",
    userAnswer: "C",
    explanation: "3 × 3 equals 9. You selected 12, which is incorrect.",
  },
  {
    question: "What is 10 ÷ 2?",
    options: ["A) 2", "B) 3", "C) 4", "D) 5"],
    correctAnswer: "D",
    userAnswer: "D",
    explanation: "10 ÷ 2 equals 5.",
  },
  {
    question: "What is 7 + 8?",
    options: ["A) 13", "B) 14", "C) 15", "D) 16"],
    correctAnswer: "C",
    userAnswer: "C",
    explanation: "7 + 8 equals 15.",
  },
  {
    question: "What is 12 - 4?",
    options: ["A) 6", "B) 7", "C) 8", "D) 9"],
    correctAnswer: "C",
    userAnswer: "C",
    explanation: "12 - 4 equals 8.",
  },
  {
    question: "What is 4 × 5?",
    options: ["A) 16", "B) 18", "C) 20", "D) 22"],
    correctAnswer: "C",
    userAnswer: "B",
    explanation: "4 × 5 equals 20. You selected 18, which is incorrect.",
  },
  {
    question: "What is 9 ÷ 3?",
    options: ["A) 2", "B) 3", "C) 4", "D) 5"],
    correctAnswer: "B",
    userAnswer: "B",
    explanation: "9 ÷ 3 equals 3.",
  },
  {
    question: "What is 6 + 7?",
    options: ["A) 11", "B) 12", "C) 13", "D) 14"],
    correctAnswer: "C",
    userAnswer: "C",
    explanation: "6 + 7 equals 13.",
  },
  {
    question: "What is 15 - 6?",
    options: ["A) 7", "B) 8", "C) 9", "D) 10"],
    correctAnswer: "C",
    userAnswer: "C",
    explanation: "15 - 6 equals 9.",
  },
];

export default function ResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subjectId = params.id as string;
  const subject = subjects.find((subject) => subject.id === subjectId);
  const title = subject?.name || "Subject Not Found";

  const score = parseInt(searchParams.get("score") || "8");
  const total = parseInt(searchParams.get("total") || "10");
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPerfectScore = percentage === 100;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#F0F1F2] min-h-screen">
      {/* Back to Home Button */}
      <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4361ee] text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
        >
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-[800px] mx-auto p-[10px]">
        {/* Results Card */}
        <div className="bg-[white] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
          {/* Title */}
          <h1 className="text-[24px] font-bold text-[#333] mb-[5px]">
            {title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-[18px] font-semibold text-[#555] mb-[10px]">
            Quiz Completed!
          </h2>

          {/* Score */}
          <p className="text-[16px] text-[#333] mb-[5px]">
            Score: {score}/{total} Correct
          </p>

          {/* Percentage */}
          <p className="text-[16px] text-[#333] mb-[15px]">{percentage}%</p>

          {/* Accordion for Question Review */}
          <div className="mb-[15px]">
            <Accordion questions={mockQuestions} />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-[10px] max-sm:flex-col max-sm:gap-[10px] max-sm:items-stretch">
            {/* Retake Quiz Button (hidden if score is 100%) */}
            {!isPerfectScore && (
              <CustomLink
                href={`/subject/${subjectId}/quiz/6`}
                className="bg-[#4361ee] text-[white] px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold max-sm:text-center max-sm:w-full"
              >
                Retake Quiz
              </CustomLink>
            )}

            {/* Back to Subject Button */}
            <CustomLink
              href={`/subject/${subjectId}`}
              className="bg-[#4361ee] text-[white] px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold max-sm:text-center max-sm:w-full"
            >
              Back to {title}
            </CustomLink>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => (window.location.href = "/")}
      />
    </div>
  );
}
