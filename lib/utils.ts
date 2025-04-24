import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePoints(
  correctAnswers: number,
  totalQuestions: number,
  achievementsEarned: number
): number {
  // Calculate score percentage
  const score = (correctAnswers / totalQuestions) * 100;

  // Points logic: +1 per correct answer, +10 for 90%+ score, +25 per achievement
  const pointsFromCorrect = correctAnswers * 1;
  const pointsFromScore = score >= 90 ? 10 : 0;
  const pointsFromAchievements = achievementsEarned * 25;

  return pointsFromCorrect + pointsFromScore + pointsFromAchievements;
}
