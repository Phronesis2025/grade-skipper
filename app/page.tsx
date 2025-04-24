"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { subjects } from "@/lib/subjects";
import { Book, Check, Flame, Lightbulb, Star, Award } from "lucide-react";

interface Quiz {
  id: string;
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
}

export default function Home() {
  const [metrics, setMetrics] = useState({
    totalQuizScore: 0,
    quizzesCompleted: 0,
    currentStreak: 0,
    achievements: 0,
  });
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
          .single();

        if (streaksError && streaksError.code !== "PGRST116") {
          throw new Error("Failed to fetch streaks");
        }

        // Fetch achievements
        let achievementsCount = 0;
        try {
          const { data: achievementsData, error: achievementsError } =
            await supabase.from("achievements").select("*").eq("earned", true);

          if (achievementsError && achievementsError.code !== "PGRST116") {
            console.warn(
              "Achievements table might not exist:",
              achievementsError.message
            );
          } else {
            achievementsCount = achievementsData?.length || 0;
          }
        } catch (error) {
          console.warn("Could not fetch achievements:", error);
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

        // Calculate subject progress
        const progress: Record<string, SubjectProgress> = {};
        for (const subject of subjects) {
          // Fetch quizzes for this subject
          const subjectQuizzes =
            quizzesData?.filter((quiz: Quiz) => quiz.subject === subject.id) ||
            [];

          // Grade Level: Use the most recent quiz's grade, default to 6 if none
          const latestQuiz = subjectQuizzes.sort(
            (a: Quiz, b: Quiz) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )[0];
          const gradeLevel = latestQuiz ? latestQuiz.grade : 6; // Default to 6th grade

          // Percentage: Average score for this subject, default to 0 if none
          const percentage =
            subjectQuizzes.length > 0
              ? subjectQuizzes.reduce(
                  (sum: number, quiz: Quiz) => sum + quiz.score,
                  0
                ) / subjectQuizzes.length
              : 0;

          progress[subject.id] = {
            gradeLevel,
            percentage: parseFloat(percentage.toFixed(2)),
          };
        }

        setSubjectProgress(progress);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data", {
          position: "top-right",
          autoClose: 3000,
          style: { background: "#F0F4FF", color: "#4361ee" },
        });
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
            <div className="bg-[#F0F4FF] text-[#4361ee] rounded-[16px] px-3 py-[6px] flex items-center text-sm font-medium">
              <span className="mr-[5px]">⭐</span>
              <span>350 Points</span>
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
              <p className="text-[20px] font-extrabold">
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
              <p className="text-[20px] font-extrabold">
                {loading ? "Loading..." : metrics.quizzesCompleted}
              </p>
            </div>
            <div className="flex-1 bg-[#f5f3ff] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#6d43c7] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#f5f3ff]">
                <Flame className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">Current Streak</p>
              <p className="text-[20px] font-extrabold">
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
              <p className="text-[20px] font-extrabold">
                {loading ? "Loading..." : metrics.achievements}
              </p>
            </div>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="mb-[30px]">
          <div className="grid grid-cols-3 gap-[15px] max-[768px]:grid-cols-2 max-[640px]:grid-cols-1">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              const progressData = subjectProgress[subject.id] || {
                gradeLevel: 6,
                percentage: 0,
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
                    <Icon
                      className={`w-[18px] h-[18px] ${subject.iconColor} mb-[8px]`}
                    />
                    <h3
                      className="text-[16px] font-semibold"
                      style={{ fontWeight: 600 }}
                    >
                      {subject.name}
                    </h3>
                    <p className="text-[13px] text-[#666] mb-[8px]">
                      {subject.subtitle}
                    </p>
                    <div className="h-[6px] bg-[#eee] rounded-[3px] overflow-hidden mb-[5px]">
                      <div
                        className={`h-full ${subject.progressColor}`}
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-[12px] text-[#666] text-right mb-[5px]">
                      {progress}% Complete
                    </p>
                    <p className="text-[12px] text-[#666] text-left">
                      {progressData.gradeLevel}th grade - {progress}% total -{" "}
                      {letterGrade}
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
