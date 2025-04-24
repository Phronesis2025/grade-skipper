import { supabase } from "./supabase";

export type AchievementId =
  | "first_quiz"
  | "three_correct"
  | "five_correct"
  | "master_reading"
  | "master_history"
  | "master_mathematics"
  | "master_science"
  | "master_english"
  | "master_coding_ai"
  | "master_logic_puzzles"
  | "streak_breaker_3"
  | "streak_breaker_5"
  | "quiz_80"
  | "quiz_100";

// Fetch existing achievements for a user
export async function getExistingAchievements(
  userId: string
): Promise<Set<string>> {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("achievement_id")
      .eq("id", userId)
      .not("earned", "is", null);

    if (error) {
      console.warn("Failed to fetch achievements:", error);
      return new Set(); // Return empty set on error instead of throwing
    }

    return new Set(
      data?.map((item: { achievement_id: string }) => item.achievement_id) || []
    );
  } catch (error) {
    console.warn("Error in getExistingAchievements:", error);
    return new Set(); // Return empty set on error
  }
}

// Check for correct-in-a-row achievements
export function checkCorrectInARow(
  correctInARow: number,
  existingAchievements: Set<string>
): { newAchievements: { achievementId: AchievementId; name: string }[] } {
  const newAchievements: { achievementId: AchievementId; name: string }[] = [];

  if (correctInARow >= 3 && !existingAchievements.has("three_correct")) {
    newAchievements.push({
      achievementId: "three_correct",
      name: "Three in a Row",
    });
  }

  if (correctInARow >= 5 && !existingAchievements.has("five_correct")) {
    newAchievements.push({
      achievementId: "five_correct",
      name: "Five in a Row",
    });
  }

  return { newAchievements };
}

// Check for mastery achievements (e.g., 90%+ on 5 quizzes for a subject)
export async function checkMastery(
  userId: string,
  subject: string,
  grade: number,
  existingAchievements: Set<string>
): Promise<{
  newAchievements: { achievementId: AchievementId; name: string }[];
}> {
  const newAchievements: { achievementId: AchievementId; name: string }[] = [];

  const { data, error } = await supabase
    .from("quizzes")
    .select("score")
    .eq("id", userId)
    .eq("subject", subject)
    .eq("grade", grade);

  if (error) {
    console.error("Error checking mastery:", error);
    return { newAchievements: [] };
  }

  const highScores = data.filter((quiz: { score: number }) => quiz.score >= 90);
  const subjectAchievementMap: { [key: string]: AchievementId } = {
    reading: "master_reading",
    history: "master_history",
    mathematics: "master_mathematics",
    science: "master_science",
    english: "master_english",
    "coding-ai": "master_coding_ai",
    "logic-puzzles": "master_logic_puzzles",
  };

  const achievementId = subjectAchievementMap[subject];
  const achievementName = `Master of ${
    subject.charAt(0).toUpperCase() + subject.slice(1)
  }`;

  if (
    highScores.length >= 5 &&
    achievementId &&
    !existingAchievements.has(achievementId)
  ) {
    newAchievements.push({
      achievementId,
      name: achievementName,
    });
  }

  return { newAchievements };
}

// Check for streak breaker achievements
export async function checkStreakBreaker(
  userId: string,
  existingAchievements: Set<string>
): Promise<{
  newAchievements: { achievementId: AchievementId; name: string }[];
}> {
  const newAchievements: { achievementId: AchievementId; name: string }[] = [];

  const { data, error } = await supabase
    .from("streaks")
    .select("current")
    .eq("id", userId)
    .single();

  if (error) {
    console.warn("Error checking streak:", error);
    return { newAchievements: [] };
  }

  const streak = data?.current || 0;

  if (streak >= 3 && !existingAchievements.has("streak_breaker_3")) {
    newAchievements.push({
      achievementId: "streak_breaker_3",
      name: "Streak Breaker: 3 Days",
    });
  }

  if (streak >= 5 && !existingAchievements.has("streak_breaker_5")) {
    newAchievements.push({
      achievementId: "streak_breaker_5",
      name: "Streak Breaker: 5 Days",
    });
  }

  return { newAchievements };
}

// Check for quiz completion achievements
export async function checkQuizCompletion(
  userId: string,
  percentage: number,
  existingAchievements: Set<string>
): Promise<{
  newAchievements: { achievementId: AchievementId; name: string }[];
}> {
  const newAchievements: { achievementId: AchievementId; name: string }[] = [];

  // Check for first quiz completion
  const { count, error } = await supabase
    .from("quizzes")
    .select("id", { count: "exact" })
    .eq("id", userId);

  if (error) {
    console.error("Error checking quiz completion:", error);
    return { newAchievements: [] };
  }

  if (count === 1 && !existingAchievements.has("first_quiz")) {
    newAchievements.push({
      achievementId: "first_quiz",
      name: "First Quiz Completed",
    });
  }

  // Check for score-based achievements
  if (percentage >= 80 && !existingAchievements.has("quiz_80")) {
    newAchievements.push({
      achievementId: "quiz_80",
      name: "Quiz Ace: 80%+",
    });
  }

  if (percentage === 100 && !existingAchievements.has("quiz_100")) {
    newAchievements.push({
      achievementId: "quiz_100",
      name: "Perfect Score: 100%",
    });
  }

  return { newAchievements };
}
