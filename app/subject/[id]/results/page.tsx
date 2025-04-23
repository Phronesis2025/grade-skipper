"use client";

import { useParams, useSearchParams } from "next/navigation";
import CustomLink from "@/components/CustomLink";
import Accordion from "@/components/Accordion";
import { useState, useEffect } from "react";
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

// Define the Question type expected by Accordion
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation: string;
  topic?: string; // Added for topic extraction
}

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

  // State to hold quiz questions
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  // Retrieve questions from history.state
  useEffect(() => {
    if (typeof window === "undefined") return;

    const state = window.history.state;
    if (state && state.questions) {
      // Ensure the questions match the expected Question type
      const questions: Question[] = state.questions.map((q: any) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: q.userAnswer,
        explanation:
          q.explanation ||
          (q.explanations
            ? q.userAnswer &&
              q.userAnswer.split(")")[0].trim() === q.correctAnswer
              ? q.explanations.correct
              : q.explanations.incorrect
            : "No explanation provided."),
        topic: q.topic,
      }));
      setQuizQuestions(questions);
      console.log("Quiz questions loaded:", questions);
    } else {
      console.warn("No quiz questions found in history.state");
    }
  }, []);

  return (
    <div className="bg-[#F0F1F2] min-h-screen">
      {/* Back to Home Button */}
      <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
        <button
          onClick={() => (window.location.href = "/")}
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
            <Accordion
              questions={quizQuestions.length > 0 ? quizQuestions : []}
            />
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
    </div>
  );
}
