/**
 * TypeScript type definitions for the application
 */

// Basic question interface for quizzes
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// Quiz result interface
export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number; // in seconds
  answers: Record<number, number>; // questionId -> selectedAnswerIndex
}

// Book interface for reading logs
export interface Book {
  title: string;
  author: string;
  pagesRead: number;
  totalPages: number;
  thoughts: string;
  rating: number;
}

// Reading log entry
export interface ReadingLog {
  bookId: string;
  pagesRead: number;
  dateRead: string;
  minutesSpent: number;
  notes?: string;
}

// User progress interface
export interface Progress {
  completedQuizzes?: { topic: string; score: number }[];
  subjectProgress: Record<string, any>;
  points: number;
  level: number;
}

// Topic interface
export interface Topic {
  id: string;
  name: string;
  description: string;
}

// Subject interface
export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}
