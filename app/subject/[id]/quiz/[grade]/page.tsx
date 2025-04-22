"use client";

import { useParams } from "next/navigation";
import CustomLink from "@/components/CustomLink";
import QuizCard from "@/components/QuizCard";
import ProgressBar from "@/components/ProgressBar";
import CalculatorModal from "@/components/CalculatorModal";
import HintModal from "@/components/HintModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useState, useEffect, useRef } from "react";
import { subjects } from "@/lib/subjects";
import LoadingAnimation from "@/components/LoadingAnimation";

// Update type names to match route.ts
type QuizQuestion = {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  passage?: string; // Add passage field for comprehension questions
};

// Extend QuizQuestion to include userAnswer and new explanations structure
type ExtendedQuizQuestion = QuizQuestion & {
  userAnswer: string | null;
  explanations: {
    correct: string;
    incorrect: { [key: string]: string };
  };
};

export default function QuizPage() {
  // Get the route parameters
  const params = useParams();
  const subjectId = params.id as string;
  const grade = parseInt(params.grade as string, 10);

  // State for quiz
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
  } | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState<ExtendedQuizQuestion[]>([]);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ref to prevent duplicate fetches
  const hasFetched = useRef(false);

  // Fetch questions from API
  useEffect(() => {
    if (hasFetched.current) return; // Prevent duplicate fetches
    hasFetched.current = true;

    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch questions with subject-specific count and subject
        const count = subjectId === "coding-ai" ? 5 : 10;
        const response = await fetch(
          `/api/questions?grade=${grade}&count=${count}&subject=${subjectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to load questions");
        }
        const data = await response.json();
        console.log("Raw API response:", data); // Debug: Log raw API response to verify explanations.incorrect
        // Initialize userAnswer as null for each question
        const questionsWithUserAnswer: ExtendedQuizQuestion[] = data.map(
          (q: QuizQuestion) => ({
            ...q,
            userAnswer: null,
            explanations: {
              correct:
                q.explanations?.correct ||
                q.explanation ||
                "Correct! Well done!",
              incorrect: q.explanations?.incorrect || {
                A: "Review the explanation and try again",
                B: "Review the explanation and try again",
                C: "Review the explanation and try again",
                D: "Review the explanation and try again",
              },
            },
          })
        ); // Preserve explanations.incorrect from API response, apply defaults only if missing
        setQuestions(questionsWithUserAnswer);
        setCurrentQuestionIndex(0);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load questions"
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [grade, subjectId]);

  // Log state changes
  useEffect(() => {
    console.log("isCalculatorOpen:", isCalculatorOpen);
    console.log("isHintOpen:", isHintOpen);
  }, [isCalculatorOpen, isHintOpen]);

  // Get the current question with logging
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  console.log("Current Question:", currentQuestion);
  console.log("Questions Array:", questions);
  console.log("Current Index:", currentQuestionIndex);

  // Handle answer submission
  const handleSubmit = () => {
    if (selectedAnswer && currentQuestion) {
      // Extract the letter (e.g., "B") from selectedAnswer (e.g., "B) 4")
      const selectedLetter = selectedAnswer.split(")")[0].trim();
      // Extract the value (e.g., "4") from selectedAnswer (e.g., "B) 4")
      const selectedValue = selectedAnswer.split(")")[1].trim();
      // Validate correctAnswer format
      const isLetterFormat = ["A", "B", "C", "D"].includes(
        currentQuestion.correctAnswer
      );

      let isCorrect: boolean;
      if (isLetterFormat) {
        // Compare letters if correctAnswer is in letter format (e.g., "B")
        isCorrect = selectedLetter === currentQuestion.correctAnswer;
      } else {
        // Fallback: Compare values if correctAnswer is not a letter (e.g., "4")
        const correctOption = currentQuestion.options.find((opt) =>
          opt.startsWith(`${currentQuestion.correctAnswer})`)
        );
        const correctValue = correctOption
          ? correctOption.split(")")[1].trim()
          : null;
        isCorrect = correctValue ? selectedValue === correctValue : false;
        console.warn(
          `Invalid correctAnswer format for question: "${currentQuestion.question}". Expected letter (A, B, C, D), got "${currentQuestion.correctAnswer}". Using fallback comparison.`
        );
      }

      // Update the question with the user's answer
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[currentQuestionIndex] = {
          ...updatedQuestions[currentQuestionIndex],
          userAnswer: selectedAnswer,
        };
        return updatedQuestions;
      });

      // Debug: Log selectedLetter and incorrect explanations
      console.log(
        "handleSubmit: selectedLetter:",
        selectedLetter,
        "explanations.incorrect:",
        currentQuestion.explanations.incorrect
      );

      // Select the appropriate incorrect explanation based on the user's selection
      const explanation = isCorrect
        ? currentQuestion.explanations.correct
        : currentQuestion.explanations.incorrect[selectedLetter] ||
          `Incorrect. The correct answer is ${currentQuestion.correctAnswer}. Please review the explanation.`;

      setFeedback({
        isCorrect,
        explanation,
        correctAnswer: currentQuestion.correctAnswer,
      });
      console.log("Feedback set:", {
        isCorrect,
        selectedLetter,
        selectedValue,
        correctAnswer: currentQuestion.correctAnswer,
        question: currentQuestion.question,
        explanation,
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

  // Handle calculator open
  const handleOpenCalculator = () => {
    console.log("Calculator button clicked");
    setIsCalculatorOpen(true);
  };

  // Handle hint open
  const handleOpenHint = () => {
    console.log("Hint button clicked");
    setIsHintOpen(true);
  };

  // Find the matching subject by ID
  const subject = subjects.find((s) => s.id === subjectId);

  // Set the title and progress color from the found subject, or use a fallback
  const title = subject ? subject.name : "Subject Not Found";
  const progressColor = subject
    ? subject.progressColor.replace(/^bg-\[#([0-9a-fA-F]{6})\]$/, "#$1")
    : "#4361ee";

  if (error) {
    return (
      <div className="bg-[#F0F1F2] min-h-screen">
        <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
          <button
            onClick={() => (window.location.href = `/subject/${subjectId}`)}
            className="bg-[#4361ee] text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
          >
            Back to {title}
          </button>
        </div>
        <div className="max-w-[800px] mx-auto p-[10px]">
          <div className="bg-[white] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
            <p className="text-[16px] text-red-600 mb-[15px]">{error}</p>
            <button
              onClick={() => (window.location.href = `/subject/${subjectId}`)}
              className="bg-[#4361ee] text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
            >
              Back to {title}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-[#F0F1F2] min-h-screen">
        <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
          <button
            onClick={() => (window.location.href = `/subject/${subjectId}`)}
            className="bg-[#4361ee] text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
          >
            Back to {title}
          </button>
        </div>
        <div className="max-w-[800px] mx-auto p-[10px]">
          <div className="bg-[white] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
            <LoadingAnimation />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F0F1F2] min-h-screen">
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
      <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4361ee] text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
        >
          Back to {title}
        </button>
      </div>

      {/* Main container */}
      <div className="max-w-[800px] mx-auto p-[10px] relative">
        {/* Main content card */}
        <div className="bg-[white] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
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
            topic={currentQuestion.topic}
            passage={currentQuestion.passage} // Pass the passage to QuizCard
            explanations={currentQuestion.explanations}
          />

          {/* Next Question / Finish Quiz button */}
          {feedback && (
            <div className="flex justify-center max-sm:flex-col max-sm:gap-[10px] max-sm:items-stretch mb-[30px]">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#4361ee] text-[white] hover:bg-[#3251dd] transition-colors max-sm:text-center max-sm:w-full focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Pass questions to the results page via history state
                    window.history.pushState(
                      { questions },
                      "",
                      `/subject/${subjectId}/results?score=${correctAnswers}&total=${questions.length}`
                    );
                    window.location.href = `/subject/${subjectId}/results?score=${correctAnswers}&total=${questions.length}`;
                  }}
                  className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#4361ee] text-[white] hover:bg-[#3251dd] transition-colors max-sm:text-center max-sm:w-full focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0"
                >
                  Finish Quiz
                </button>
              )}
            </div>
          )}

          {/* Separator */}
          <div className="w-full max-w-[200px] h-[1px] bg-[#eee] mx-auto my-[15px]"></div>

          {/* Tools section */}
          <div className="flex justify-center gap-[20px] mb-[20px] mt-[20px]">
            {/* Hint tool */}
            <button
              onClick={() => {
                console.log("Hint button clicked");
                setIsHintOpen(true);
              }}
              className="text-[14px] text-[#666] hover:text-[#4361ee] flex items-center gap-[5px] cursor-pointer bg-transparent border-none p-0 transition-colors duration-150"
            >
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
            </button>

            {["mathematics", "science"].includes(subjectId) && (
              <button
                onClick={() => {
                  console.log("Calculator button clicked");
                  setIsCalculatorOpen(true);
                }}
                className="text-[14px] text-[#666] hover:text-[#4361ee] flex items-center gap-[5px] cursor-pointer bg-transparent border-none p-0 transition-colors duration-150"
              >
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
              </button>
            )}
          </div>
        </div>

        {/* Modals */}
        <CalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />
        <HintModal
          isOpen={isHintOpen}
          onClose={() => setIsHintOpen(false)}
          hint={currentQuestion.hint}
        />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => (window.location.href = `/subject/${subjectId}`)}
        />
      </div>
    </div>
  );
}
