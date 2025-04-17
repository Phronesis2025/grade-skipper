/**
 * Utility functions for local storage operations.
 * These functions allow for saving and retrieving user progress,
 * quiz results, and reading logs.
 */

import { Progress, QuizResult, ReadingLog } from "./types";

// Prefix for all storage keys to avoid collisions
const STORAGE_KEY_PREFIX = "grade-skipper-";

// Get a value from localStorage with error handling
export function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Set a value in localStorage with error handling
export function setItem<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${key}`,
      JSON.stringify(value)
    );
    return true;
  } catch (error) {
    console.error(`Error storing ${key} in localStorage:`, error);
    return false;
  }
}

// Remove an item from localStorage
export function removeItem(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
}

// Specific functions for handling progress
export function getUserProgress(): Progress {
  return getItem<Progress>("user-progress", {
    completedQuizzes: [],
    subjectProgress: {},
    points: 0,
    level: 1,
  });
}

export function saveUserProgress(progress: Progress): boolean {
  return setItem("user-progress", progress);
}

// Specific functions for handling quiz results
export function saveQuizResult(quizId: string, result: QuizResult): boolean {
  const results = getItem<Record<string, QuizResult>>("quiz-results", {});
  results[quizId] = result;
  return setItem("quiz-results", results);
}

export function getQuizResults(): Record<string, QuizResult> {
  return getItem<Record<string, QuizResult>>("quiz-results", {});
}

// Specific functions for handling reading logs
export function saveReadingLog(log: ReadingLog): boolean {
  const logs = getItem<ReadingLog[]>("reading-logs", []);
  logs.push(log);
  return setItem("reading-logs", logs);
}

export function getReadingLogs(): ReadingLog[] {
  return getItem<ReadingLog[]>("reading-logs", []);
}
