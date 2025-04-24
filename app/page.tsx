"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { subjects } from "@/lib/subjects";
import { Book, Check, Flame, Lightbulb, Star, Award } from "lucide-react";
import {
  getLocalPoints,
  getLocalAchievements,
  getCompletedQuizzes,
} from "@/lib/storage";
import TrophyCase from "@/components/TrophyCase";

// Hardcoded user ID for anonymous user (to be replaced with auth later)
const ANONYMOUS_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

interface Quiz {
  subject: string;
  topic: string;
  grade: number;
  score: number;
  timestamp: string;
  time_spent: number;
  hints_used: number;
  calculator_used: boolean;
}

interface Streak {
  id: string;
  current: number;
  last_quiz_date: string;
}

interface Achievement {
  id: string;
  achievement_id: string;
  name: string;
  earned: boolean;
}

interface SubjectProgress {
  gradeLevel: number;
  percentage: number;
  masteryProgress: number;
}

export default function Home() {
  const [metrics, setMetrics] = useState({
    totalQuizScore: 0,
    quizzesCompleted: 0,
    currentStreak: 0,
    achievements: 0,
  });
  const [points, setPoints] = useState<number | null>(null);
  const [subjectProgress, setSubjectProgress] = useState<
    Record<string, SubjectProgress>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch quizzes
        const { data: quizzesData, error: quizzesError } = await supabase
          .from("quizzes")
          .select("*");

        if (quizzesError) throw new Error("Failed to fetch quizzes");

        // Fetch streaks
        const { data: streaksData, error: streaksError } = await supabase
          .from("streaks")
          .select("current")
          .eq("id", ANONYMOUS_USER_ID) // Added id filter
          .single();

        if (streaksError && streaksError.code !== "PGRST116") {
          throw new Error("Failed to fetch streaks");
        }

        // Fetch achievements
        let achievementsCount = 0;
        try {
          const { data: achievementsData, error: achievementsError } =
            await supabase
              .from("achievements")
              .select("*")
              .eq("id", ANONYMOUS_USER_ID)
              .not("earned", "is", null);

          if (achievementsError) {
            console.warn("Could not fetch achievements:", achievementsError);
          } else {
            achievementsCount = achievementsData?.length || 0;
          }
        } catch (error) {
          console.warn("Could not fetch achievements:", error);
        }

        // Fetch points
        let pointsData: number = 0;
        const { data: pointsResult, error: pointsError } = await supabase
          .from("points")
          .select("total_points")
          .eq("id", ANONYMOUS_USER_ID) // Added id filter
          .single();

        if (pointsError && pointsError.code !== "PGRST116") {
          console.warn("Failed to fetch points:", pointsError.message);
          // Fallback to local storage for points specifically
          pointsData = getLocalPoints();
        } else {
          pointsData = pointsResult?.total_points || getLocalPoints(); // Fallback to local storage if no data
        }

        // Calculate stat card metrics
        const quizzesCompleted = quizzesData?.length || 0;
        const totalQuizScore =
          quizzesCompleted > 0
            ? quizzesData.reduce(
                (sum: number, quiz: Quiz) => sum + quiz.score,
                0
              ) / quizzesCompleted
            : 0;
        const currentStreak = streaksData?.current || 0;

        setMetrics({
          totalQuizScore: parseFloat(totalQuizScore.toFixed(2)),
          quizzesCompleted,
          currentStreak,
          achievements: achievementsCount,
        });
        setPoints(pointsData);

        // Calculate subject progress
        const progress: Record<string, SubjectProgress> = {};
        for (const subject of subjects) {
          // Fetch quizzes for this subject
          const subjectQuizzes =
            quizzesData?.filter((quiz: Quiz) => quiz.subject === subject.id) ||
            [];

          // Calculate highest unlocked grade and mastery progress
          let currentGrade = 6;
          let highestUnlockedGrade = 6;

          // Check each grade level for mastery
          while (currentGrade <= 9) {
            const gradeQuizzes = subjectQuizzes.filter(
              (quiz: Quiz) => quiz.grade === currentGrade && quiz.score >= 90
            );

            if (gradeQuizzes.length >= 5) {
              // Grade is mastered, move to next grade
              highestUnlockedGrade = currentGrade + 1;
              currentGrade++;
            } else {
              // Grade not mastered, stop here
              break;
            }
          }

          // Calculate mastery progress for highest unlocked grade
          const highGradeQuizzes = subjectQuizzes.filter(
            (quiz: Quiz) =>
              quiz.grade === highestUnlockedGrade && quiz.score >= 90
          );
          const masteryProgress = Math.min(
            (highGradeQuizzes.length / 5) * 100,
            100
          );

          // Calculate average score percentage
          const percentage =
            subjectQuizzes.length > 0
              ? subjectQuizzes.reduce(
                  (sum: number, quiz: Quiz) => sum + quiz.score,
                  0
                ) / subjectQuizzes.length
              : 0;

          progress[subject.id] = {
            gradeLevel: highestUnlockedGrade,
            percentage: parseFloat(percentage.toFixed(2)),
            masteryProgress: parseFloat(masteryProgress.toFixed(2)),
          };
        }

        setSubjectProgress(progress);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data, falling back to local storage", {
          position: "top-right",
          autoClose: 3000,
          style: { background: "#F0F4FF", color: "#4361ee" },
        });

        // Fallback to local storage
        const localPoints = getLocalPoints();
        const localAchievements = getLocalAchievements();
        const localQuizzes = getCompletedQuizzes();

        const quizzesCompleted = localQuizzes.length;
        const totalQuizScore =
          quizzesCompleted > 0
            ? localQuizzes.reduce(
                (sum: number, quiz: Quiz) => sum + quiz.score,
                0
              ) / quizzesCompleted
            : 0;

        // Calculate subject progress from local storage
        const progress: Record<string, SubjectProgress> = {};
        for (const subject of subjects) {
          const subjectQuizzes = localQuizzes.filter(
            (quiz: Quiz) => quiz.subject === subject.id
          );

          // Calculate highest unlocked grade and mastery progress
          let currentGrade = 6;
          let highestUnlockedGrade = 6;

          // Check each grade level for mastery
          while (currentGrade <= 9) {
            const gradeQuizzes = subjectQuizzes.filter(
              (quiz: Quiz) => quiz.grade === currentGrade && quiz.score >= 90
            );

            if (gradeQuizzes.length >= 5) {
              // Grade is mastered, move to next grade
              highestUnlockedGrade = currentGrade + 1;
              currentGrade++;
            } else {
              // Grade not mastered, stop here
              break;
            }
          }

          // Calculate mastery progress for highest unlocked grade
          const highGradeQuizzes = subjectQuizzes.filter(
            (quiz: Quiz) =>
              quiz.grade === highestUnlockedGrade && quiz.score >= 90
          );
          const masteryProgress = Math.min(
            (highGradeQuizzes.length / 5) * 100,
            100
          );

          // Calculate average score percentage
          const percentage =
            subjectQuizzes.length > 0
              ? subjectQuizzes.reduce(
                  (sum: number, quiz: Quiz) => sum + quiz.score,
                  0
                ) / subjectQuizzes.length
              : 0;

          progress[subject.id] = {
            gradeLevel: highestUnlockedGrade,
            percentage: parseFloat(percentage.toFixed(2)),
            masteryProgress: parseFloat(masteryProgress.toFixed(2)),
          };
        }

        setMetrics({
          totalQuizScore: parseFloat(totalQuizScore.toFixed(2)),
          quizzesCompleted,
          currentStreak: 0, // No streak data in local storage for now
          achievements: localAchievements.length,
        });
        setPoints(localPoints);
        setSubjectProgress(progress);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Learning Journey Section */}
        <div
          className="rounded-[16px] p-[25px] mb-[30px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          style={{ backgroundColor: "white", width: "100%" }}
        >
          {/* Title and Badge */}
          <div className="flex justify-between items-center mb-[15px]">
            <h2 className="text-[20px] font-bold">Your Learning Journey</h2>
            <div className="bg-[#F0F4FF] text-[#4361ee] rounded-[16px] pl-4 pr-[7px] py-[8px] flex items-center">
              <span className="mr-[8px] text-[15px] pl-[7px]">⭐</span>
              <span className="text-[13px] font-[700]">
                {loading || points === null ? "Loading..." : `${points} pts`}
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-row gap-[15px] max-[640px]:grid max-[640px]:grid-cols-2 max-[640px]:gap-[15px]">
            <div className="flex-1 bg-[#f0f4ff] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#2f4ac7] rounded-[4px] w-[25px] h-[25px] flex items-center justify-center mb-[8px] border border-[#f0f4ff]">
                <Star className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Total Quiz Score %
              </p>
              <p className="text-[20px] font-[700]">
                {loading ? "Loading..." : `${metrics.totalQuizScore}%`}
              </p>
            </div>
            <div className="flex-1 bg-[#ecfdf5] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#099465] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#ecfdf5]">
                <Check className="text-[white] w-[16px] h-[16px]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Quizzes Completed
              </p>
              <p className="text-[20px] font-[700]">
                {loading ? "Loading..." : metrics.quizzesCompleted}
              </p>
            </div>
            <div className="flex-1 bg-[#f5f3ff] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#6d43c7] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#f5f3ff]">
                <Flame className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">Current Streak</p>
              <p className="text-[20px] font-[700]">
                {loading
                  ? "Loading..."
                  : `${metrics.currentStreak} day${
                      metrics.currentStreak !== 1 ? "s" : ""
                    }`}
              </p>
            </div>
            <div className="flex-1 bg-[#fff7ed] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#d97706] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#fff7ed]">
                <Award className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">Achievements</p>
              <p className="text-[20px] font-[700]">
                {loading ? "Loading..." : metrics.achievements}
              </p>
            </div>
          </div>
        </div>

        {/* Trophy Case Section */}
        <TrophyCase />

        {/* Subject Cards */}
        <div className="mb-[30px]">
          <div className="grid grid-cols-3 gap-[15px] max-[768px]:grid-cols-2 max-[640px]:grid-cols-1">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              const progressData = subjectProgress[subject.id] || {
                gradeLevel: 6,
                percentage: 0,
                masteryProgress: 0,
              };
              const progress = progressData.percentage;
              const letterGrade =
                progress >= 90
                  ? "A"
                  : progress >= 80
                  ? "B"
                  : progress >= 70
                  ? "C"
                  : progress >= 60
                  ? "D"
                  : "F";
              return (
                <Link
                  key={subject.id}
                  href={`/subject/${subject.id}`}
                  className="no-underline"
                >
                  <div
                    className="rounded-[10px] p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                    style={{
                      backgroundColor: "white",
                      height: "175px",
                      width: "100%",
                    }}
                  >
                    {/* Top section with icon/title and percentage */}
                    <div className="flex justify-between items-start mb-[8px]">
                      <div>
                        <Icon
                          className={`w-[18px] h-[18px] ${subject.iconColor} mb-[8px]`}
                        />
                        <h3 className="text-[16px] font-[600]">
                          {subject.name}
                        </h3>
                        <p className="text-[13px] text-[#666]">
                          {subject.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[16px] font-[700]">{progress}%</p>
                        <p className="text-[14px] text-[#666] font-[800] text-center">
                          {letterGrade}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar and grade info */}
                    <div className="h-[6px] bg-[#eee] rounded-[3px] overflow-hidden mb-[5px]">
                      <div
                        className={`h-full ${subject.progressColor}`}
                        style={{
                          width: `${progressData.masteryProgress}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mb-[5px]">
                      <p className="text-[10px] text-[#666] text-left">
                        <span className="font-[700]">Mastery:</span>{" "}
                        {5 - Math.floor(progressData.masteryProgress / 20)} more
                        to unlock {progressData.gradeLevel + 1}th grade
                      </p>
                      <p className="text-[10px] text-[#666] text-right">
                        {progressData.masteryProgress}% Complete
                      </p>
                    </div>
                    <p className="text-[12px] text-[#666] text-left">
                      {progressData.gradeLevel}th grade
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div
          className="rounded-[16px] p-[25px] mb-[30px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          style={{ backgroundColor: "white", width: "100%" }}
        >
          <h3 className="text-[18px] font-bold mb-[15px] text-left">
            Recommended Next Steps
          </h3>
          <div className="flex flex-row gap-[15px] max-[640px]:flex-col">
            <div
              className="rounded-lg p-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-row items-start flex-1"
              style={{ backgroundColor: "#F0F7FF" }}
            >
              <Lightbulb className="text-[#4361ee] m-[10px] w-6 h-6 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-[15px] font-semibold mb-[5px] text-left">
                  Practice Fractions
                </h4>
                <p className="text-[13px] text-[#555] text-left">
                  Your recent math quiz shows room for improvement in fractions.
                </p>
              </div>
            </div>
            <div
              className="rounded-lg p-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-row items-start flex-1"
              style={{ backgroundColor: "#ECFDF5" }}
            >
              <Book className="text-[#10b981] m-[10px] w-6 h-6 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-[15px] font-semibold mb-[5px] text-left">
                  Reading Challenge
                </h4>
                <p className="text-[13px] text-[#555] text-left">
                  Try the advanced comprehension exercises to boost your skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Link
        href="/admin"
        className="px-5 py-[15px] text-center text-[13px] text-[#666] shadow-[0_1px_2px_rgba(0,0,0,0.03)] mt-auto w-full no-underline block"
        style={{ backgroundColor: "white" }}
      >
        © 2025 GradeSkipper. Made by Dad.
      </Link>
    </div>
  );
}
