import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Hardcoded user ID for anonymous user (to be replaced with auth later)
const ANONYMOUS_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

// Update user points in Supabase
export async function updateUserPoints(pointsToAdd: number): Promise<number> {
  const { data, error } = await supabase
    .from("points")
    .select("total_points")
    .eq("id", ANONYMOUS_USER_ID)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Failed to fetch points:", error);
    throw error;
  }

  const currentPoints = data?.total_points || 0;
  const newPoints = currentPoints + pointsToAdd;

  const { error: updateError } = await supabase
    .from("points")
    .upsert(
      { id: ANONYMOUS_USER_ID, total_points: newPoints },
      { onConflict: "id" }
    );

  if (updateError) {
    console.error("Failed to update points:", updateError);
    throw updateError;
  }

  return newPoints;
}

// Insert a new achievement
export async function insertAchievement(
  achievementId: string,
  name: string
): Promise<void> {
  try {
    const { error } = await supabase.from("achievements").upsert(
      {
        id: ANONYMOUS_USER_ID,
        achievement_id: achievementId,
        name: name,
        earned: new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    );

    if (error) {
      console.warn("Failed to insert achievement:", error);
    }
  } catch (error) {
    console.warn("Error in insertAchievement:", error);
  }
}

// Update streak after quiz completion
export async function updateStreak(): Promise<{
  current: number;
  longest: number;
}> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("streaks")
    .select("current, longest, last_quiz_date")
    .eq("id", ANONYMOUS_USER_ID)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Failed to fetch streak:", error);
    throw error;
  }

  const lastQuizDate = data?.last_quiz_date
    ? new Date(data.last_quiz_date)
    : null;
  const currentStreak = data?.current || 0;
  const longestStreak = data?.longest || 0;

  let newStreak = currentStreak;
  if (!lastQuizDate || lastQuizDate.toISOString().split("T")[0] !== today) {
    newStreak = currentStreak + 1;
  }

  const newLongest = Math.max(longestStreak, newStreak);

  const { error: updateError } = await supabase.from("streaks").upsert(
    {
      id: ANONYMOUS_USER_ID,
      current: newStreak,
      longest: newLongest,
      last_quiz_date: today,
    },
    { onConflict: "id" }
  );

  if (updateError) {
    console.error("Failed to update streak:", updateError);
    throw updateError;
  }

  return { current: newStreak, longest: newLongest };
}
