"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import CustomLink from "@/components/CustomLink";
import { subjects } from "@/lib/subjects";
import { saveCompletedQuiz } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  explanations: {
    correct: string;
    incorrect: { [key: string]: string };
  };
  topic: string;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.id as string;
  const grade = parseInt(params.grade as string) || 6;
  const subject = subjects.find((subject) => subject.id === subjectId);
  const title = subject?.name || "Subject Not Found";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const [hintsUsed, setHintsUsed] = useState(0);
  const [calculatorUsed, setCalculatorUsed] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  // Load Supabase client dynamically
  const [supabase, setSupabase] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/lib/supabase").then((mod) => setSupabase(mod.supabase));
    }
  }, []);

  // Fetch questions and insert quiz_attempts
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/questions?subject=${subjectId}&grade=${grade}`
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        const formattedQuestions: Question[] = data.questions.map((q: any) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          userAnswer: null,
          explanations: q.explanations || { correct: "", incorrect: {} },
          topic: q.topic || "General",
        }));
        setQuestions(formattedQuestions);
        console.log("Loaded questions:", formattedQuestions);

        // Insert quiz_attempts
        if (supabase && formattedQuestions.length > 0) {
          const newSessionId = uuidv4();
          setSessionId(newSessionId);
          const { error } = await supabase.from("quiz_attempts").insert([
            {
              session_id: newSessionId,
              subject: subjectId,
              topic: formattedQuestions[0].topic,
              grade,
              completed: false,
              timestamp: new Date().toISOString(),
            },
          ]);
          if (error) console.warn("Failed to insert quiz_attempts:", error);
        }
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [subjectId, grade, supabase]);

  const handleAnswerSelect = (answer: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = answer;
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    const correctAnswers = questions.filter(
      (q) =>
        q.userAnswer && q.userAnswer.split(")")[0].trim() === q.correctAnswer
    ).length;
    const totalQuestions = questions.length;
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds

    // Save quiz data
    const quiz = {
      subject: subjectId,
      topic: questions[0]?.topic || "General",
      grade,
      score: percentage,
      timestamp: new Date().toISOString(),
      time_spent: timeSpent,
      hints_used: hintsUsed,
      calculator_used: calculatorUsed,
    };

    try {
      // Check for existing quiz to prevent duplicates
      if (supabase) {
        const { data: existingQuizzes } = await supabase
          .from("quizzes")
          .select("id")
          .match({ subject: subjectId, topic: quiz.topic, grade })
          .gte(
            "timestamp",
            new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          )
          .limit(1);
        if (existingQuizzes && existingQuizzes.length > 0) {
          console.log("Quiz already saved for this session");
          return;
        }

        // Save to local storage
        const localSuccess = saveCompletedQuiz(quiz);
        if (!localSuccess) throw new Error("Failed to save to local storage");

        // Save to Supabase
        const { error: quizError } = await supabase
          .from("quizzes")
          .insert([quiz]);
        if (quizError) throw quizError;

        // Update quiz_attempts to mark as completed
        if (sessionId) {
          const { error: attemptError } = await supabase
            .from("quiz_attempts")
            .update({ completed: true })
            .match({ session_id: sessionId });
          if (attemptError)
            console.warn("Failed to update quiz_attempts:", attemptError);
        }

        // Log quiz_completed event
        const { error: logError } = await supabase.from("event_logs").insert([
          {
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
        if (logError) throw logError;
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }

    // Navigate to results
    window.history.pushState(
      {
        questions,
        time_spent: timeSpent,
        hints_used: hintsUsed,
        calculator_used: calculatorUsed,
      },
      "",
      `/subject/${subjectId}/results?score=${correctAnswers}&total=${totalQuestions}`
    );
    router.push(
      `/subject/${subjectId}/results?score=${correctAnswers}&total=${totalQuestions}`
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="bg-[#F0F1F2] min-h-screen">
      <div className="flex justify-between items-center px-[25px] pt-[5px] max-sm:flex-col max-sm:gap-[10px]">
        <CustomLink
          href={`/subject/${subjectId}`}
          className="bg-[#4361ee] text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline focus:outline-none focus:ring-0"
        >
          Back to {title}
        </CustomLink>
        <button
          onClick={() => setCalculatorUsed(true)}
          className="bg-[#4361ee] text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold focus:outline-none focus:ring-0"
        >
          Use Calculator
        </button>
      </div>
      <div className="max-w-[800px] mx-auto p-[10px]">
        <h1 className="text-[24px] font-bold text-[#333] mb-[5px] text-center">
          {title} Quiz
        </h1>
        <p className="text-[16px] text-[#555] mb-[15px] text-center">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <QuizCard
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          selectedAnswer={questions[currentQuestionIndex].userAnswer}
          onAnswerSelect={handleAnswerSelect}
          subjectId={subjectId}
          isSubmitDisabled={false}
          disabled={false}
          onSubmit={() => {}}
          feedback={null}
          topic={questions[currentQuestionIndex].topic}
          explanations={questions[currentQuestionIndex].explanations}
        />
        <div className="flex justify-between mt-[15px]">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-[#4361ee] text-[white] px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold focus:outline-none focus:ring-0"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="bg-[#4361ee] text-[white] px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold focus:outline-none focus:ring-0"
            >
              Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
