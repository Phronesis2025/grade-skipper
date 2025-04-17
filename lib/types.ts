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
  id: string;
  title: string;
  author: string;
  subject: string;
  coverUrl?: string;
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
  completedQuizzes: string[];
  subjectProgress: Record<
    string,
    {
      completedTopics: string[];
      overallScore: number;
      lastAccessed: string;
    }
  >;
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
