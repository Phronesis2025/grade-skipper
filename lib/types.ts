/**
 * TypeScript type definitions for the GradeSkipper application
 */

// Basic question interface for quizzes
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// User progress interface
export interface Progress {
  completedQuizzes: {
    subject: string;
    topic: string;
    grade: number;
    score: number;
    timestamp: string;
    time_spent: number;
    hints_used: number;
    calculator_used: boolean;
  }[];
  subjectProgress: Record<
    string,
    Record<
      string,
      Record<
        number,
        {
          quizScores: number[];
          mastered: boolean;
        }
      >
    >
  >;
  points: number;
  level: number;
  streaks: {
    current: number;
    longest: number;
    lastQuizDate: string | null;
  };
  achievements: {
    id: string;
    name: string;
    earned: string;
  }[];
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
