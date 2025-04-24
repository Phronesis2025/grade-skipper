/**
 * Utility functions for local storage operations.
 * These functions allow for saving and retrieving user progress
 * for quizzes and subject mastery.
 */

import { Progress } from "./types";

// Prefix for all storage keys to avoid collisions
const STORAGE_KEY_PREFIX = "grade-skipper-";

// Normalize topic strings (capitalize first letter, remove extra spaces/special characters)
export function normalizeTopic(topic: string): string {
  // Remove extra spaces and special characters, trim
  const cleaned = topic
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  // Capitalize first letter of each word
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

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

// Get user progress from localStorage
export function getUserProgress(): Progress {
  return getItem<Progress>("user-progress", {
    completedQuizzes: [],
    subjectProgress: {},
    points: 0,
    level: 1,
    streaks: { current: 0, longest: 0, lastQuizDate: null },
    achievements: [],
  });
}

// Save user progress to localStorage
export function saveUserProgress(progress: Progress): boolean {
  return setItem("user-progress", progress);
}

// Save a completed quiz to localStorage, including points and achievements
export function saveCompletedQuiz(
  quiz: {
    subject: string;
    topic: string;
    grade: number;
    score: number;
    timestamp: string;
    time_spent: number;
    hints_used: number;
    calculator_used: boolean;
  },
  pointsToAdd: number,
  newAchievements: { achievementId: string; name: string }[]
): boolean {
  const progress = getUserProgress();
  const normalizedTopic = normalizeTopic(quiz.topic);
  const newQuiz = { ...quiz, topic: normalizedTopic };

  // Update completedQuizzes
  progress.completedQuizzes.push(newQuiz);

  // Update subjectProgress
  if (!progress.subjectProgress[quiz.subject]) {
    progress.subjectProgress[quiz.subject] = {};
  }
  if (!progress.subjectProgress[quiz.subject][normalizedTopic]) {
    progress.subjectProgress[quiz.subject][normalizedTopic] = {};
  }
  if (!progress.subjectProgress[quiz.subject][normalizedTopic][quiz.grade]) {
    progress.subjectProgress[quiz.subject][normalizedTopic][quiz.grade] = {
      quizScores: [],
      mastered: false,
    };
  }
  progress.subjectProgress[quiz.subject][normalizedTopic][
    quiz.grade
  ].quizScores.push(quiz.score);

  // Check for mastery (90%+ on 5 quizzes)
  const scores =
    progress.subjectProgress[quiz.subject][normalizedTopic][quiz.grade]
      .quizScores;
  if (scores.length >= 5 && scores.slice(-5).every((score) => score >= 90)) {
    progress.subjectProgress[quiz.subject][normalizedTopic][
      quiz.grade
    ].mastered = true;
  }

  // Update points
  progress.points = (progress.points || 0) + pointsToAdd;

  // Update achievements
  progress.achievements.push(
    ...newAchievements.map((ach) => ({
      id: ach.achievementId,
      name: ach.name,
      earned: new Date().toISOString(),
    }))
  );

  // Update streak (simplified for local storage, Supabase handles the real logic)
  const today = new Date().toISOString().split("T")[0];
  if (
    !progress.streaks.lastQuizDate ||
    progress.streaks.lastQuizDate !== today
  ) {
    progress.streaks.current = (progress.streaks.current || 0) + 1;
    progress.streaks.longest = Math.max(
      progress.streaks.longest || 0,
      progress.streaks.current
    );
    progress.streaks.lastQuizDate = today;
  }

  return saveUserProgress(progress);
}

// Get completed quizzes from localStorage
export function getCompletedQuizzes(): Progress["completedQuizzes"] {
  return getUserProgress().completedQuizzes;
}

// Get points from localStorage
export function getLocalPoints(): number {
  return getUserProgress().points || 0;
}

// Get achievements from localStorage
export function getLocalAchievements(): {
  id: string;
  name: string;
  earned: string;
}[] {
  return getUserProgress().achievements || [];
}
