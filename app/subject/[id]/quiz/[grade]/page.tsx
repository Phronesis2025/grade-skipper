"use client";

import { useParams } from "next/navigation";
import CustomLink from "@/components/CustomLink";
import QuizCard from "@/components/QuizCard";
import ProgressBar from "@/components/ProgressBar";
import { useState, useEffect } from "react";
import {
  mathematicsQuestions,
  MathQuestion,
} from "@/lib/questions/mathematics";

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

// Function to select first 10 questions for SSR
function getDefaultQuestions(): MathQuestion[] {
  const allQuestions = Object.values(mathematicsQuestions).flat();
  return allQuestions.length > 0
    ? allQuestions.slice(0, 10)
    : [
        {
          question: "Fallback: What is 1 + 1?",
          options: ["2", "3", "4", "5"],
          correctAnswer: "2",
          explanation: "1 + 1 equals 2.",
          hint: "Basic addition.",
          topic: "Fallback",
        },
      ];
}

// Function to select 10 random questions for client-side
function getRandomQuestions(): MathQuestion[] {
  const allQuestions = Object.values(mathematicsQuestions).flat();
  if (allQuestions.length === 0) {
    return [
      {
        question: "Fallback: What is 1 + 1?",
        options: ["2", "3", "4", "5"],
        correctAnswer: "2",
        explanation: "1 + 1 equals 2.",
        hint: "Basic addition.",
        topic: "Fallback",
      },
    ];
  }
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

export default function QuizPage() {
  // Get the route parameters
  const params = useParams();
  const subjectId = params.id as string;
  const grade = params.grade as string;

  // State for quiz
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
  } | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState<MathQuestion[]>(() =>
    subjectId === "mathematics"
      ? getDefaultQuestions()
      : [
          {
            question: "What is the result of simplifying the fraction 24/32?",
            options: ["3/4", "4/3", "2/3", "5/8"],
            correctAnswer: "3/4",
            explanation: "24/32 ÷ 8/8 = 3/4.",
            hint: "Divide numerator and denominator by their greatest common factor.",
            topic: "Fractions",
          },
        ]
  );

  // Randomize questions client-side after hydration
  useEffect(() => {
    if (subjectId === "mathematics") {
      const newQuestions = getRandomQuestions();
      console.log("Randomized Questions:", newQuestions);
      setQuestions(newQuestions);
    }
  }, [subjectId]);

  // Get the current question with logging
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  console.log("Current Question:", currentQuestion);
  console.log("Questions Array:", questions);
  console.log("Current Index:", currentQuestionIndex);

  // Handle answer submission
  const handleSubmit = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setFeedback({
        isCorrect,
        explanation: currentQuestion.explanation,
        correctAnswer: currentQuestion.correctAnswer,
      });
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }
  };

  // Handle next question or finish quiz
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Find the matching subject by ID
  const subject = subjects.find((s) => s.id === subjectId);

  // Set the title and progress color from the found subject, or use a fallback
  const title = subject ? subject.name : "Subject Not Found";
  const progressColor = subject
    ? subject.progressColor.replace(/^bg-\[#([0-9a-fA-F]{6})\]$/, "#$1")
    : "#4361ee";

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <style jsx>{`
        button:focus-visible,
        button:focus,
        a:focus-visible,
        a:focus,
        button:active,
        a:active {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      {/* Back to Subject link */}
      <div className="flex justify-end max-w-[800px] mx-auto px-[25px] pt-[5px] max-sm:justify-center">
        <CustomLink
          href={`/subject/${subjectId}`}
          className="bg-[#4361ee] !text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0"
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
          <ProgressBar
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            progressColor={progressColor}
          />
        </div>

        {/* Question navigation at top */}
        <div className="flex items-center justify-between border-b border-[#eee] pt-[5px] pb-[10px] mb-[20px]">
          <div className="text-[14px] text-[#555]">Grade {grade}</div>
        </div>

        {/* Question card */}
        <QuizCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={(answer) => setSelectedAnswer(answer)}
          subjectId={subjectId}
          isSubmitDisabled={!selectedAnswer}
          disabled={!!feedback}
          onSubmit={handleSubmit}
          feedback={feedback}
        />

        {/* Next Question / Finish Quiz button */}
        {feedback && (
          <div className="flex justify-center max-sm:flex-col max-sm:gap-[10px] max-sm:items-stretch">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#4361ee] text-[white] hover:bg-[#3251dd] transition-colors max-sm:text-center max-sm:w-full focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0"
              >
                Next Question
              </button>
            ) : (
              <CustomLink
                href={`/subject/${subjectId}/results?score=${correctAnswers}&total=${questions.length}`}
                className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#4361ee] text-[white] hover:bg-[#3251dd] transition-colors max-sm:text-center max-sm:w-full focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0"
              >
                Finish Quiz
              </CustomLink>
            )}
          </div>
        )}

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
  );
}
