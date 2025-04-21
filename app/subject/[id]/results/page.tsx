"use client";

import { useParams } from "next/navigation";
import CustomLink from "@/components/CustomLink";
import Accordion from "@/components/Accordion";

// Define the Subject type
type Subject = {
  id: string;
  name: string;
  icon: any;
  iconColor: string;
  subtitle: string;
  progressColor: string;
};

// Subject data
const subjects: Subject[] = [
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

// Mock data for questions (to be replaced with dynamic data in Phase 4)
const mockQuestions = [
  {
    question: "What is 24/32 simplified?",
    userAnswer: "3/4",
    correctAnswer: "3/4",
    explanation: "24/32 ÷ 8/8 = 3/4.",
  },
  {
    question: "What is 15 + 27?",
    userAnswer: "42",
    correctAnswer: "42",
    explanation: "15 + 27 = 42.",
  },
  {
    question: "What is 10 × 5?",
    userAnswer: "40",
    correctAnswer: "50",
    explanation: "10 × 5 = 50.",
  },
  {
    question: "What is 100 ÷ 4?",
    userAnswer: "25",
    correctAnswer: "25",
    explanation: "100 ÷ 4 = 25.",
  },
  {
    question: "What is 3/5 as a decimal?",
    userAnswer: "0.6",
    correctAnswer: "0.6",
    explanation: "3 ÷ 5 = 0.6.",
  },
  {
    question: "What is 7 - 2?",
    userAnswer: "5",
    correctAnswer: "5",
    explanation: "7 - 2 = 5.",
  },
  {
    question: "What is the area of a rectangle with length 4 and width 3?",
    userAnswer: "10",
    correctAnswer: "12",
    explanation: "Area = length × width = 4 × 3 = 12.",
  },
  {
    question: "What is 8 + 9?",
    userAnswer: "17",
    correctAnswer: "17",
    explanation: "8 + 9 = 17.",
  },
  {
    question: "What is 20 - 5?",
    userAnswer: "15",
    correctAnswer: "15",
    explanation: "20 - 5 = 15.",
  },
  {
    question: "What is 6 × 2?",
    userAnswer: "12",
    correctAnswer: "12",
    explanation: "6 × 2 = 12.",
  },
];

export default function ResultsPage() {
  // Extract the id parameter from the route
  const params = useParams();
  const subjectId = params.id as string;

  // Find the matching subject by id
  const subject = subjects.find((subject) => subject.id === subjectId);

  // Set the title (with fallback)
  const title = subject?.name || "Subject Not Found";

  return (
    <div className="bg-[#F0F1F2] min-h-screen">
      {/* Back to Home Button */}
      <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
        <CustomLink
          href="/"
          className="bg-[#4361ee] !text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline"
        >
          Back to Home
        </CustomLink>
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
            Score: 8/10 Correct
          </p>

          {/* Percentage */}
          <p className="text-[16px] text-[#333] mb-[15px]">80%</p>

          {/* Accordion for Question Review */}
          <div className="mb-[15px]">
            <Accordion questions={mockQuestions} />
          </div>

          {/* Buttons Container */}
          <div className="flex justify-center gap-[10px] max-sm:flex-col max-sm:gap-[10px] max-sm:items-stretch">
            {/* Try Again Button */}
            <CustomLink
              href={`/subject/${subjectId}/quiz/6`}
              className="bg-[#4361ee] !text-[white] px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold max-sm:text-center max-sm:w-full"
            >
              Try Again
            </CustomLink>

            {/* Back to Subject Button */}
            <CustomLink
              href={`/subject/${subjectId}`}
              className="bg-[#4361ee] !text-[white] px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold max-sm:text-center max-sm:w-full"
            >
              Back to {title}
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
}
