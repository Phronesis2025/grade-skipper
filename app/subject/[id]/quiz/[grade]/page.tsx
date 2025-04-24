"use client";

import { useParams } from "next/navigation";
import CustomLink from "@/components/CustomLink";
import QuizCard from "@/components/QuizCard";
import ProgressBar from "@/components/ProgressBar";
import CalculatorModal from "@/components/CalculatorModal";
import HintModal from "@/components/HintModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { AchievementPopUp } from "@/components/AchievementPopUp";
import { useState, useEffect, useRef } from "react";
import { subjects } from "@/lib/subjects";
import { saveCompletedQuiz, getLocalPoints } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";
import { calculatePoints } from "@/lib/utils";
import {
  checkCorrectInARow,
  checkMastery,
  checkStreakBreaker,
  checkQuizCompletion,
  getExistingAchievements,
  AchievementId,
} from "@/lib/achievements";
import {
  updateUserPoints,
  insertAchievement,
  updateStreak,
} from "@/lib/supabase";

// Import static question files
import readingQuestions from "@/lib/questions/reading-grade6";
import historyQuestions from "@/lib/questions/history-grade6";
import mathematicsQuestions from "@/lib/questions/mathematics-grade6";
import scienceQuestions from "@/lib/questions/science-grade6";
import englishQuestions from "@/lib/questions/english-grade6";
import codingAiQuestions from "@/lib/questions/coding-ai-grade6";
import logicPuzzlesQuestions from "@/lib/questions/logic-puzzles-grade6";

// Hardcoded user ID for anonymous user (to be replaced with auth later)
const ANONYMOUS_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

// Interface for raw question format from static files
interface AnswerExplanations {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface RawQuizQuestion {
  subject: string;
  topic: string;
  grade: number;
  questionType: string;
  passage?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
  correctAnswerExplanation: string;
  incorrectAnswersExplanation: Partial<AnswerExplanations>;
  difficulty: string;
  tags: string[];
  timeEstimate: number;
  webLink: string;
  source: string;
  lastUpdated: string;
}

interface QuizQuestion {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  passage?: string;
}

interface ExtendedQuizQuestion extends QuizQuestion {
  userAnswer: string | null;
  explanations: {
    correct: string;
    incorrect: Partial<AnswerExplanations>;
  };
}

// Map subject IDs to question files
const questionFiles: { [key: string]: RawQuizQuestion[] } = {
  reading: readingQuestions,
  history: historyQuestions,
  mathematics: mathematicsQuestions,
  science: scienceQuestions,
  english: englishQuestions,
  "coding-ai": codingAiQuestions,
  "logic-puzzles": logicPuzzlesQuestions,
};

export default function QuizPage() {
  const params = useParams();
  const subjectId = params.id as string;
  const grade = parseInt(params.grade as string, 10);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
  } | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctInARow, setCorrectInARow] = useState(0);
  const [maxCorrectInARow, setMaxCorrectInARow] = useState(0);
  const [existingAchievements, setExistingAchievements] = useState<Set<string>>(
    new Set()
  );
  const [newAchievements, setNewAchievements] = useState<
    { achievementId: AchievementId; name: string }[]
  >([]);
  const [questions, setQuestions] = useState<ExtendedQuizQuestion[]>([]);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [hintsUsed, setHintsUsed] = useState(0);
  const [calculatorUsed, setCalculatorUsed] = useState(false);
  const [sessionId] = useState(uuidv4()); // Unique session ID for caching

  const hasFetched = useRef(false);

  // Load Supabase client dynamically
  const [supabase, setSupabase] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/lib/supabase").then((mod) => setSupabase(mod.supabase));
    }
  }, []);

  // Fetch existing achievements on mount
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const achievements = await getExistingAchievements(ANONYMOUS_USER_ID);
        setExistingAchievements(achievements);
      } catch (error) {
        console.error("Failed to fetch existing achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  // Randomize and select questions
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Load questions from static files and insert quiz_attempts
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadQuestions = async () => {
      try {
        setError(null);

        const count = subjectId === "coding-ai" ? 5 : 10;
        const availableQuestions = questionFiles[subjectId];

        if (!availableQuestions) {
          throw new Error(`No question file found for subject: ${subjectId}`);
        }

        if (availableQuestions.length < count) {
          throw new Error(
            `Insufficient questions for ${subjectId}. Found ${availableQuestions.length}, need ${count}.`
          );
        }

        // Randomly select 'count' questions
        const selectedQuestions = shuffleArray(availableQuestions).slice(
          0,
          count
        );

        // Transform questions to ExtendedQuizQuestion format
        const questionsWithUserAnswer: ExtendedQuizQuestion[] =
          selectedQuestions.map((q) => ({
            topic: q.topic,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.correctAnswerExplanation,
            hint: q.hint,
            passage: q.passage,
            userAnswer: null,
            explanations: {
              correct: q.correctAnswerExplanation,
              incorrect: q.incorrectAnswersExplanation,
            },
          }));

        setQuestions(questionsWithUserAnswer);
        setCurrentQuestionIndex(0);

        // Insert quiz_attempts
        if (supabase && questionsWithUserAnswer.length > 0) {
          const topic = questionsWithUserAnswer[0].topic;

          try {
            // Use upsert to handle the quiz attempt
            const { error: upsertError } = await supabase
              .from("quiz_attempts")
              .upsert(
                {
                  id: ANONYMOUS_USER_ID,
                  subject: subjectId,
                  topic: topic,
                  grade: grade,
                  completed: false,
                  timestamp: new Date().toISOString(),
                },
                {
                  onConflict: "id",
                }
              );

            if (upsertError) {
              console.error("Failed to handle quiz attempt:", upsertError);
              throw new Error(
                `Failed to handle quiz attempt: ${upsertError.message}`
              );
            }
          } catch (error) {
            console.error("Error handling quiz attempt:", error);
            throw error;
          }
        }
      } catch (err) {
        console.error("Error loading questions:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load questions"
        );
      }
    };
    loadQuestions();

    // Cleanup to allow new fetch on unmount
    return () => {
      hasFetched.current = false;
    };
  }, [grade, subjectId, supabase, sessionId]);

  // Log state changes
  useEffect(() => {
    if (isCalculatorOpen || isHintOpen) {
      console.log("isCalculatorOpen:", isCalculatorOpen);
      console.log("isHintOpen:", isHintOpen);
    }
  }, [isCalculatorOpen, isHintOpen]);

  const currentQuestion = questions[currentQuestionIndex];

  // Only log question data when it exists
  useEffect(() => {
    if (currentQuestion) {
      console.log("Current Question:", currentQuestion);
      console.log("Questions Array:", questions);
      console.log("Current Index:", currentQuestionIndex);
    }
  }, [currentQuestion, questions, currentQuestionIndex]);

  const handleSubmit = () => {
    if (selectedAnswer && currentQuestion) {
      const selectedLetter = selectedAnswer.split(")")[0].trim();
      const selectedValue = selectedAnswer.split(")")[1].trim();
      const isLetterFormat = ["A", "B", "C", "D"].includes(
        currentQuestion.correctAnswer
      );

      let isCorrect: boolean;
      if (isLetterFormat) {
        isCorrect = selectedLetter === currentQuestion.correctAnswer;
      } else {
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

      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[currentQuestionIndex] = {
          ...updatedQuestions[currentQuestionIndex],
          userAnswer: selectedAnswer,
        };
        return updatedQuestions;
      });

      console.log(
        "handleSubmit: selectedLetter:",
        selectedLetter,
        "explanations.incorrect:",
        currentQuestion.explanations.incorrect
      );

      const explanation = isCorrect
        ? currentQuestion.explanations.correct
        : (currentQuestion.explanations.incorrect as Record<string, string>)[
            selectedLetter
          ] ||
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
        setCorrectAnswers((prev) => prev + 1);
        setCorrectInARow((prev) => prev + 1);
        setMaxCorrectInARow((prev) => Math.max(prev, correctInARow + 1));
      } else {
        setCorrectInARow(0);
      }

      // Check for in-a-row achievements after each answer
      const { newAchievements: inARowAchievements } = checkCorrectInARow(
        isCorrect ? correctInARow + 1 : 0,
        existingAchievements
      );
      if (inARowAchievements.length > 0) {
        setNewAchievements((prev) => [...prev, ...inARowAchievements]);
        inARowAchievements.forEach((ach) =>
          existingAchievements.add(ach.achievementId)
        );
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishQuiz = async () => {
    const totalQuestions = questions.length;
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    const quiz = {
      id: uuidv4(), // Generate a unique ID for each quiz
      subject: subjectId,
      topic: questions[0]?.topic || "General",
      grade,
      score: percentage,
      timestamp: new Date().toISOString(),
      time_spent: timeSpent,
      hints_used: hintsUsed,
      calculator_used: calculatorUsed,
    };

    // Initialize allNewAchievements early to ensure it's always defined
    let allNewAchievements: { achievementId: AchievementId; name: string }[] =
      [];

    try {
      // Check achievements
      const { newAchievements: inARowAchievements } = checkCorrectInARow(
        maxCorrectInARow,
        existingAchievements
      );
      const { newAchievements: masteryAchievements } = await checkMastery(
        ANONYMOUS_USER_ID,
        subjectId,
        grade,
        existingAchievements
      );
      const { newAchievements: streakAchievements } = await checkStreakBreaker(
        ANONYMOUS_USER_ID,
        existingAchievements
      );
      const { newAchievements: quizAchievements } = await checkQuizCompletion(
        ANONYMOUS_USER_ID,
        percentage,
        existingAchievements
      );

      allNewAchievements = [
        ...inARowAchievements,
        ...masteryAchievements,
        ...streakAchievements,
        ...quizAchievements,
      ];
      setNewAchievements((prev) => [...prev, ...allNewAchievements]);

      // Save achievements to Supabase
      for (const ach of allNewAchievements) {
        try {
          await insertAchievement(ach.achievementId, ach.name);
          existingAchievements.add(ach.achievementId);
        } catch (error) {
          console.error(`Failed to insert achievement ${ach.name}:`, error);
        }
      }

      // Calculate points
      const pointsEarned = calculatePoints(
        correctAnswers,
        totalQuestions,
        allNewAchievements.length
      );
      console.log("Points earned from quiz:", pointsEarned); // Log points earned

      // Save quiz data
      if (supabase) {
        // Insert quiz as a new record
        const { error: quizError } = await supabase
          .from("quizzes")
          .insert([quiz]);

        if (quizError) {
          console.warn("Failed to insert quiz:", quizError);
        }

        // Update quiz_attempts
        const { error: attemptError } = await supabase
          .from("quiz_attempts")
          .update({ completed: true })
          .match({
            id: ANONYMOUS_USER_ID,
            subject: subjectId,
            topic: quiz.topic,
            grade,
            completed: false,
          });

        if (attemptError) {
          console.warn("Failed to update quiz_attempts:", attemptError);
        }

        // Insert event_log
        const { error: logError } = await supabase.from("event_logs").insert([
          {
            id: uuidv4(), // Generate a unique ID for each event log
            event_type: "quiz_completed",
            details: {
              subject: subjectId,
              topic: quiz.topic,
              grade,
              score: percentage,
            },
            timestamp: new Date().toISOString(),
          },
        ]);

        if (logError) {
          console.warn("Failed to insert event_log:", logError);
        }

        // Update points
        try {
          await updateUserPoints(pointsEarned);
        } catch (error) {
          console.error("Failed to update points:", error);
        }

        // Update streaks
        try {
          await updateStreak();
        } catch (error) {
          console.error("Failed to update streak:", error);
        }
      }

      // Save to local storage (includes points and achievements)
      const localSuccess = saveCompletedQuiz(
        quiz,
        pointsEarned,
        allNewAchievements
      );
      if (!localSuccess) {
        console.error("Failed to save quiz to local storage");
        throw new Error("Failed to save to local storage");
      }

      // Log local storage points to verify
      const localPointsAfterSave = getLocalPoints();
      console.log("Local storage points after save:", localPointsAfterSave);

      // Navigate to results page
      window.history.pushState(
        { questions },
        "",
        `/subject/${subjectId}/results?score=${correctAnswers}&total=${questions.length}`
      );
      window.location.href = `/subject/${subjectId}/results?score=${correctAnswers}&total=${questions.length}`;
    } catch (error) {
      console.error("Error saving quiz:", error);

      // Save to local storage even if Supabase fails
      const localSuccess = saveCompletedQuiz(quiz, 0, allNewAchievements);
      if (!localSuccess) {
        console.error("Failed to save quiz to local storage");
      }

      // Log local storage points to verify
      const localPointsAfterSave = getLocalPoints();
      console.log(
        "Local storage points after save (error case):",
        localPointsAfterSave
      );

      // Navigate to results page
      window.history.pushState(
        { questions },
        "",
        `/subject/${subjectId}/results?score=${correctAnswers}&total=${questions.length}`
      );
      window.location.href = `/subject/${subjectId}/results?score=${correctAnswers}&total=${questions.length}`;
    }
  };

  const handleOpenCalculator = () => {
    console.log("Calculator button clicked");
    setIsCalculatorOpen(true);
    setCalculatorUsed(true);
  };

  const handleOpenHint = () => {
    console.log("Hint button clicked");
    setIsHintOpen(true);
    setHintsUsed(hintsUsed + 1);
  };

  const subject = subjects.find((s) => s.id === subjectId);
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
            className="bg-[#4361ee] text-white px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
          >
            Back to {title}
          </button>
        </div>
        <div className="max-w-[800px] mx-auto p-[10px]">
          <div className="bg-white rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
            <p className="text-[16px] text-red-600 mb-[15px]">{error}</p>
            <button
              onClick={() => (window.location.href = `/subject/${subjectId}`)}
              className="bg-[#4361ee] text-white px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
            >
              Back to {title}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while questions are being loaded
  if (!currentQuestion) {
    return (
      <div className="bg-[#F0F1F2] min-h-screen">
        <div className="max-w-[800px] mx-auto p-[10px]">
          <div className="bg-white rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
            <h1 className="text-[24px] font-bold mb-[5px]">{title}</h1>
            <p className="text-[16px] text-[#555] mb-[10px]">
              Loading questions...
            </p>
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
      <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4361ee] text-white px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
        >
          Back to {title}
        </button>
      </div>

      <div className="max-w-[800px] mx-auto p-[10px] relative">
        <div className="bg-white rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-center mb-[15px]">
            <h1 className="text-[24px] font-bold mb-[5px]">{title}</h1>
            <ProgressBar
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              progressColor={progressColor}
            />
          </div>

          <div className="flex items-center justify-between border-b border-[#eee] pt-[5px] pb-[10px] mb-[20px]">
            <div className="text-[14px] text-[#555]">Grade {grade}</div>
          </div>

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
            passage={currentQuestion.passage}
            explanations={currentQuestion.explanations}
          />

          {feedback && (
            <div className="flex justify-center max-sm:flex-col max-sm:gap-[10px] max-sm:items-stretch mb-[30px]">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#4361ee] text-white hover:bg-[#3251dd] transition-colors max-sm:text-center max-sm:w-full focus:outline-none focus:ring-0"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#4361ee] text-white hover:bg-[#3251dd] transition-colors max-sm:text-center max-sm:w-full focus:outline-none focus:ring-0"
                >
                  Finish Quiz
                </button>
              )}
            </div>
          )}

          <div className="w-full max-w-[200px] h-[1px] bg-[#eee] mx-auto my-[15px]"></div>

          <div className="flex justify-center gap-[20px] mb-[20px] mt-[20px]">
            <button
              onClick={handleOpenHint}
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
                onClick={handleOpenCalculator}
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

        <CalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />
        <HintModal
          isOpen={isHintOpen}
          onClose={() => setIsHintOpen(false)}
          hint={currentQuestion.hint || "No hint available"}
        />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => (window.location.href = `/subject/${subjectId}`)}
          message="Are you sure you want to leave the quiz? Your progress will be lost."
        />
        {newAchievements.map((ach, idx) => (
          <AchievementPopUp
            key={idx}
            achievementName={ach.name}
            onClose={() =>
              setNewAchievements((prev) => prev.filter((_, i) => i !== idx))
            }
          />
        ))}
      </div>
    </div>
  );
}
