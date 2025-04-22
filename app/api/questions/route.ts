/**
 * Test with `/api/questions?subject=<subject>&grade=6&count=10` (use `count=5` for coding-ai).
 *
 * Testing Checklist:
 * 1. Subject Topics: Verify questions match the subject's topics from subjects.ts
 * 2. Caching: Make the same request twice to verify cache works
 * 3. Fallback: Test with invalid API key to verify fallback questions
 * 4. Validation: Check that questions have correct format (2 or 4 options)
 * 5. Error Handling: Test with invalid subject to verify 400 response
 */

import { NextResponse } from "next/server";
import OpenAI from "openai";
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
  passage?: string; // Add passage field for comprehension questions
  explanations?: {
    correct: string;
    incorrect: Record<string, string>;
  };
}

// Extend QuizQuestion to include the new explanations structure
interface ExtendedQuizQuestion extends QuizQuestion {
  topic: string;
  hint: string;
  passage?: string; // Add passage field for comprehension questions
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

// In-memory cache for generated questions
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
    passage: q.passage, // Preserve passage if provided
    explanations: q.explanations || {
      correct: q.explanation || "Correct! Well done!",
      incorrect: {
        A:
          (q.explanations as any)?.incorrect?.["A"] ||
          "Incorrect, review the explanation",
        B:
          (q.explanations as any)?.incorrect?.["B"] ||
          "Incorrect, review the explanation",
        C:
          (q.explanations as any)?.incorrect?.["C"] ||
          "Incorrect, review the explanation",
        D:
          (q.explanations as any)?.incorrect?.["D"] ||
          "Incorrect, review the explanation",
      },
    },
  })); // Preserve existing explanations.incorrect if provided
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
    passage: passage, // Preserve passage if provided
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

// Generate questions with OpenAI
async function generateQuestions(
  subject: string,
  grade: number,
  count: number
): Promise<ExtendedQuizQuestion[]> {
  // Check cache first
  const cacheKey = `${subject}-${grade}-${count}`;
  if (questionCache[cacheKey]) {
    console.log(
      `Returning ${questionCache[cacheKey].length} cached questions for ${subject} grade ${grade}`
    );
    return questionCache[cacheKey];
  }

  const maxAttempts = 5;
  let attempts = 0;
  let accumulatedQuestions: ExtendedQuizQuestion[] = [];

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is missing, using fallback questions");
    const fallbackQuestions = getQuestions(subject);
    console.log(
      "Using fallback questions for subject:",
      subject,
      "count:",
      count
    );
    const result = fallbackQuestions.slice(0, count).map((q) => ({
      ...q,
      hint: q.hint || "Review the question carefully",
      explanations: {
        correct:
          q.explanations?.correct || q.explanation || "Correct! Well done!",
        incorrect: {
          A:
            q.explanations?.incorrect?.A ||
            q.explanation ||
            "Incorrect, review the explanation",
          B:
            q.explanations?.incorrect?.B ||
            q.explanation ||
            "Incorrect, review the explanation",
          C:
            q.explanations?.incorrect?.C ||
            q.explanation ||
            "Incorrect, review the explanation",
          D:
            q.explanations?.incorrect?.D ||
            q.explanation ||
            "Incorrect, review the explanation",
        },
      },
    })) as ExtendedQuizQuestion[];
    questionCache[cacheKey] = result;
    return result;
  }

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Get subject details for prompt
  const subjectDetails = subjects.find((s) => s.id === subject);
  if (!subjectDetails) {
    throw new Error(`Subject ${subject} not found`);
  }

  // Special handling for coding-ai subject
  const questionCount = subject === "coding-ai" ? count || 5 : count;

  while (
    accumulatedQuestions.length < questionCount &&
    attempts < maxAttempts
  ) {
    attempts++;
    const remaining = questionCount - accumulatedQuestions.length;
    console.log(
      `Attempt ${attempts}: Requesting ${remaining} questions for ${subject} grade ${grade}`
    );

    try {
      console.time("OpenAI API call");
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that generates educational ${subjectDetails.name} questions for grade ${grade} in JSON format. Generate exactly ${remaining} questions as an array.`,
          },
          {
            role: "user",
            content: `Generate exactly ${remaining} multiple-choice or true/false quiz questions for ${grade}th-grade ${
              subjectDetails.name
            }, covering topics like ${
              subjectDetails.subtitle
            }. Each question must follow this JSON format:

            {
              "topic": "String (e.g., ${
                subjectDetails.subtitle.split(", ")[0]
              })",
              "passage": "For Reading subject comprehension questions, a short passage (3-5 sentences) related to the question (omit for non-comprehension questions like vocabulary or true/false)",
              "question": "String describing the problem (use proper grammar)",
              "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"] or ["A) True", "B) False"] for true/false questions,
              "correctAnswer": "Letter (A, B, C, or D) of the correct option (e.g., 'B')",
              "explanation": "Detailed step-by-step explanation of the correct answer for a ${grade}th-grade student",
              "hint": "A short hint to guide the student (one sentence)",
              "explanations": {
                "correct": "Detailed feedback for a correct answer, affirming the solution, explaining why it's right, and giving a tip",
                "incorrect": {
                  "A": "Detailed feedback explaining why option A is wrong, identifying the likely mistake, and guiding toward the correct approach (omit if A is correct)",
                  "B": "Detailed feedback explaining why option B is wrong, identifying the likely mistake, and guiding toward the correct approach (omit if B is correct)",
                  "C": "Detailed feedback explaining why option C is wrong, identifying the likely mistake, and guiding toward the correct approach (omit if C is correct, only for multiple-choice questions)",
                  "D": "Detailed feedback explaining why option D is wrong, identifying the likely mistake, and guiding toward the correct approach (omit if D is correct, only for multiple-choice questions)"
                }
              }
            }

            Requirements:
            - Generate exactly ${remaining} questions.
            - Questions must suit ${grade}th-grade level.
            - For the Reading subject, if the topic is "Comprehension" or the question refers to a passage (e.g., "What is the main idea of the passage?"), include a "passage" field with a short passage (3-5 sentences) that the question is based on.
            - For non-comprehension questions (e.g., Vocabulary or true/false questions), omit the "passage" field.
            - Options must have either 2 options (true/false) or 4 options (multiple-choice).
            - correctAnswer must be a letter (A, B, C, or D), not a numerical value.
            - Ensure accuracy and variety in topics.
            - Use proper grammar in questions.
            - For each incorrect option in explanations.incorrect, provide specific feedback explaining why that option is wrong.
            - Return the questions as a JSON array: [{"topic": "...", "passage": "...", "question": "...", ...}, ...]`, // Emphasize generating passages for Reading comprehension questions
          },
        ],
        response_format: { type: "json_object" },
      });
      console.timeEnd("OpenAI API call");

      const content = completion.choices[0].message.content;
      if (!content) throw new Error("No content received from OpenAI");

      const response = JSON.parse(content);
      console.log("Raw OpenAI response:", JSON.stringify(response, null, 2)); // Debug: Log raw OpenAI response to verify structure

      let rawQuestions: any[];
      if (Array.isArray(response)) {
        rawQuestions = response;
      } else if (response.questions && Array.isArray(response.questions)) {
        rawQuestions = response.questions;
      } else if (response.topic && response.question && response.options) {
        rawQuestions = [response]; // Handle single question object
      } else {
        throw new Error("Invalid OpenAI response format");
      }

      const newQuestions: ExtendedQuizQuestion[] = rawQuestions.map((q) => ({
        question: q.question || "",
        options: q.options || [],
        correctAnswer: q.correctAnswer || "A",
        topic: q.topic || subject,
        explanation: q.explanation || "",
        hint: q.hint || "Review the question carefully",
        passage: q.passage, // Include passage if provided
        explanations: {
          correct:
            q.explanations?.correct || q.explanation || "Correct! Well done!",
          incorrect: q.explanations?.incorrect || {
            A: "Incorrect, review the explanation",
            B: "Incorrect, review the explanation",
            C: "Incorrect, review the explanation",
            D: "Incorrect, review the explanation",
          },
        },
      })); // Explicitly map fields to ensure correct structure and preserve explanations.incorrect

      accumulatedQuestions = accumulatedQuestions.concat(newQuestions);
      console.log(`Accumulated ${accumulatedQuestions.length} questions`);
    } catch (error) {
      console.error(`OpenAI API error on attempt ${attempts}:`, error);
    }
  }

  if (accumulatedQuestions.length < questionCount) {
    console.log(
      `Only ${accumulatedQuestions.length} questions generated, supplementing with fallback`
    );
    const fallbackQuestions = getQuestions(subject);
    const additionalNeeded = questionCount - accumulatedQuestions.length;
    accumulatedQuestions = accumulatedQuestions.concat(
      fallbackQuestions.slice(0, additionalNeeded)
    );
  }

  console.time("Validation");
  const questions = accumulatedQuestions.map(validateQuestion);
  console.timeEnd("Validation");

  console.log(
    "generateQuestions: Mapped explanations.incorrect:",
    questions.map((q) => q.explanations.incorrect)
  ); // Debug: Log mapped explanations.incorrect
  console.log(
    "generateQuestions: Passages in questions:",
    questions.map((q) => ({
      topic: q.topic,
      question: q.question,
      passage: q.passage,
    }))
  ); // Debug: Log passages in questions

  // Cache the questions
  questionCache[cacheKey] = questions;
  console.log(
    `Generated and cached ${questions.length} questions for ${subject} grade ${grade}`
  );
  return questions;
}

// API route handler
export async function GET(request: Request) {
  console.log("API route accessed: /api/questions");
  const { searchParams } = new URL(request.url);
  const grade = parseInt(searchParams.get("grade") || "6", 10);
  const count = parseInt(searchParams.get("count") || "10", 10);
  const subject = searchParams.get("subject") || "mathematics";

  // Validate subject
  if (!subjects.some((s) => s.id === subject)) {
    return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
  }

  const questions = await generateQuestions(subject, grade, count);
  console.log(`Returning ${questions.length} questions for ${subject}`);
  return NextResponse.json(questions);
}
