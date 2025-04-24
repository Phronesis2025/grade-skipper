/**
 * Test with `/api/questions?subject=<subject>&grade=6&count=10&sessionId=<uuid>` (use `count=5` for coding-ai).
 *
 * Testing Checklist:
 * 1. Subject Topics: Verify questions match the subject's topics from subjects.ts
 * 2. Caching: Make the same request twice to verify cache works
 * 3. Validation: Check that questions have correct format (2 or 4 options)
 * 4. Error Handling: Test with invalid subject to verify 400 response
 */

import { NextResponse } from "next/server";
import { mathematicsQuestions } from "@/lib/questions/mathematics";
import { scienceQuestions } from "@/lib/questions/science";
import { readingQuestions } from "@/lib/questions/reading";
import { historyQuestions } from "@/lib/questions/history";
import { englishQuestions } from "@/lib/questions/english";
import { coding_aiQuestions } from "@/lib/questions/coding-ai";
import { logicPuzzlesQuestions } from "@/lib/questions/logic-puzzles";
import { subjects } from "@/lib/subjects";

// Base question interface for all subjects
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic?: string;
  hint?: string;
  passage?: string;
  explanations?: {
    correct: string;
    incorrect: Record<string, string>;
  };
}

// Extend QuizQuestion to include the new explanations structure
interface ExtendedQuizQuestion extends QuizQuestion {
  topic: string;
  hint: string;
  passage?: string;
  explanations: {
    correct: string;
    incorrect: Record<string, string>;
  };
}

// Type for topic-based question collections
type TopicBasedQuestions = {
  [topic: string]: Array<Omit<QuizQuestion, "topic">>;
};

// Type for all possible question formats
type QuestionCollection = QuizQuestion[] | TopicBasedQuestions;

// Type guard to check if questions are topic-based
function isTopicBased(
  questions: QuestionCollection
): questions is TopicBasedQuestions {
  return !Array.isArray(questions);
}

// In-memory cache for questions
const questionCache: { [key: string]: ExtendedQuizQuestion[] } = {};

// Helper function to get questions from either array or topic-based format
function getQuestions(subject: string): ExtendedQuizQuestion[] {
  const questions = (() => {
    switch (subject) {
      case "mathematics":
        return mathematicsQuestions;
      case "science":
        return scienceQuestions;
      case "reading":
        return readingQuestions;
      case "history":
        return historyQuestions;
      case "english":
        return englishQuestions;
      case "coding-ai":
        return coding_aiQuestions;
      case "logic-puzzles":
        return logicPuzzlesQuestions;
      default:
        return scienceQuestions; // Default fallback
    }
  })() as QuestionCollection;

  // Convert questions to ExtendedQuizQuestion format
  const flattenedQuestions = isTopicBased(questions)
    ? Object.entries(questions).flatMap(([topic, qs]) =>
        qs.map((q) => ({ ...q, topic }))
      )
    : questions.map((q) => ({ ...q, topic: q.topic || "General" }));

  return flattenedQuestions.map((q: QuizQuestion) => ({
    ...q,
    topic: q.topic || "General",
    hint: q.hint || "Review the question carefully",
    passage: q.passage,
    explanations: q.explanations || {
      correct: q.explanation || "Correct! Well done!",
      incorrect: {
        A: q.explanations?.incorrect?.A || "Incorrect, review the explanation",
        B: q.explanations?.incorrect?.B || "Incorrect, review the explanation",
        C: q.explanations?.incorrect?.C || "Incorrect, review the explanation",
        D: q.explanations?.incorrect?.D || "Incorrect, review the explanation",
      },
    },
  }));
}

// Validate and correct a single question
function validateQuestion(
  question: ExtendedQuizQuestion
): ExtendedQuizQuestion {
  const {
    question: qText,
    options,
    correctAnswer,
    topic,
    hint,
    passage,
    explanations,
  } = question;

  // Default values for missing fields
  const defaultHint = "Review the question carefully";
  const defaultIncorrectExplanation = "Incorrect, review the explanation";
  const defaultExplanations = {
    correct: "Correct! Well done!",
    incorrect: {
      A: defaultIncorrectExplanation,
      B: defaultIncorrectExplanation,
      C: defaultIncorrectExplanation,
      D: defaultIncorrectExplanation,
    },
  };

  // Validate correctAnswer format
  const validAnswers = options.length === 2 ? ["A", "B"] : ["A", "B", "C", "D"];
  if (!validAnswers.includes(correctAnswer)) {
    console.warn(
      `Invalid correctAnswer format for question: "${qText}". Expected letter ${validAnswers.join(
        ", "
      )}, got "${correctAnswer}". Defaulting to first option.`
    );
    return { ...question, correctAnswer: "A" };
  }

  // Validate options length
  if (options.length !== 2 && options.length !== 4) {
    console.warn(
      `Invalid number of options for question: "${qText}". Expected 2 or 4 options, got ${options.length}.`
    );
    return question;
  }

  // Ensure required fields are non-empty
  if (!qText || !topic) {
    console.warn(
      `Missing required fields for question. Question text and topic must be non-empty.`
    );
    return question;
  }

  // Add default values for missing fields
  return {
    ...question,
    hint: hint || defaultHint,
    passage: passage,
    explanations: {
      correct: explanations?.correct || defaultExplanations.correct,
      incorrect: {
        A: explanations?.incorrect?.A || defaultExplanations.incorrect.A,
        B: explanations?.incorrect?.B || defaultExplanations.incorrect.B,
        C:
          options.length === 4
            ? explanations?.incorrect?.C || defaultExplanations.incorrect.C
            : defaultExplanations.incorrect.C,
        D:
          options.length === 4
            ? explanations?.incorrect?.D || defaultExplanations.incorrect.D
            : defaultExplanations.incorrect.D,
      },
    },
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const grade = parseInt(searchParams.get("grade") || "6");
    const count = parseInt(searchParams.get("count") || "10");
    const sessionId = searchParams.get("sessionId") || "default";

    // Validate subject
    if (!subject || !subjects.some((s) => s.id === subject)) {
      return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
    }

    // Use sessionId in cache key for per-quiz caching
    const cacheKey = `${subject}-${grade}-${count}-${sessionId}`;

    // Check cache first
    if (questionCache[cacheKey]) {
      console.log(
        `Returning ${questionCache[cacheKey].length} cached questions for ${subject} grade ${grade} session ${sessionId}`
      );
      return NextResponse.json(questionCache[cacheKey].slice(0, count));
    }

    // Get questions from static files
    const questions = getQuestions(subject);

    // Validate and process questions
    const processedQuestions = questions.map(validateQuestion).slice(0, count);

    // Cache the processed questions
    questionCache[cacheKey] = processedQuestions;

    return NextResponse.json(processedQuestions);
  } catch (error) {
    console.error("Error in questions route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
