"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserProgress } from "@/lib/storage";
import { Progress } from "@/lib/types";
import {
  Book,
  Check,
  Clock,
  Flame,
  Lightbulb,
  GraduationCap,
  TestTube,
  Landmark,
  Pencil,
  Code,
  Puzzle,
} from "lucide-react";

// Subject data
const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: GraduationCap,
    iconColor: "text-[#4361ee]",
    subtitle: "Fractions, Decimals, Algebra",
    progressColor: "bg-[#4361ee]",
  },
  {
    id: "reading",
    name: "Reading",
    icon: Book,
    iconColor: "text-[#10b981]",
    subtitle: "Comprehension, Analysis",
    progressColor: "bg-[#10b981]",
  },
  {
    id: "science",
    name: "Science",
    icon: TestTube,
    iconColor: "text-[#8b5cf6]",
    subtitle: "Earth Science, Biology",
    progressColor: "bg-[#8b5cf6]",
  },
  {
    id: "history",
    name: "History",
    icon: Landmark,
    iconColor: "text-[#f59e0b]",
    subtitle: "U.S. History, World Events",
    progressColor: "bg-[#f59e0b]",
  },
  {
    id: "english",
    name: "English",
    icon: Pencil,
    iconColor: "text-[#f97316]",
    subtitle: "Grammar, Writing",
    progressColor: "bg-[#f97316]",
  },
  {
    id: "coding-ai",
    name: "Coding & AI",
    icon: Code,
    iconColor: "text-[#3b82f6]",
    subtitle: "Basic Programming, AI Concepts",
    progressColor: "bg-[#3b82f6]",
  },
  {
    id: "logic-puzzles",
    name: "Logic Puzzles",
    icon: Puzzle,
    iconColor: "text-[#ec4899]",
    subtitle: "Problem Solving, Critical Thinking",
    progressColor: "bg-[#ec4899]",
  },
];

export default function Home() {
  const [userProgress, setUserProgress] = useState<Progress>({
    completedQuizzes: [],
    subjectProgress: {},
    points: 0,
    level: 1,
  });

  useEffect(() => {
    const progress = getUserProgress();
    setUserProgress(progress);
  }, []);

  // Placeholder stats calculations
  const questionsAnswered = userProgress.completedQuizzes
    ? userProgress.completedQuizzes.reduce(
        (total, quiz) => total + (quiz.score > 0 ? 1 : 0),
        0
      )
    : 0;
  const topicsMastered = Object.values(userProgress.subjectProgress).filter(
    (progress) => typeof progress === "number" && progress >= 80
  ).length;
  const learningHours = 0; // Placeholder
  const currentStreak = 1; // Placeholder

  // Placeholder subject progress
  const subjectProgress = {
    mathematics: 75,
    reading: 80,
    science: 50,
    history: 65,
    english: 60,
    "coding-ai": 35,
    "logic-puzzles": 45,
  };

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
          <div className="flex flex-row gap-[15px] max-[640px]:flex-col">
            <div className="flex-1 bg-[#f0f4ff] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#2f4ac7] rounded-[4px] w-[25px] h-[25px] flex items-center justify-center mb-[8px] border border-[#f0f4ff]">
                <Book className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Questions Answered
              </p>
              <p className="text-[20px] font-extrabold">{questionsAnswered}</p>
            </div>
            <div className="flex-1 bg-[#ecfdf5] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#099465] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#ecfdf5]">
                <Check className="text-[white] w-[16px] h-[16px]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Topics Mastered
              </p>
              <p className="text-[20px] font-extrabold">{topicsMastered}</p>
            </div>
            <div className="flex-1 bg-[#f5f3ff] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#6d43c7] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#f5f3ff]">
                <Clock className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">Learning Hours</p>
              <p className="text-[20px] font-extrabold">{learningHours}</p>
            </div>
            <div className="flex-1 bg-[#fff7ed] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#d97706] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#fff7ed]">
                <Flame className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                {currentStreak > 1 ? "Current Streak" : "Longest Streak"}
              </p>
              <p className="text-[20px] font-extrabold">{currentStreak} days</p>
            </div>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="mb-[30px]">
          <div className="grid grid-cols-3 gap-[15px] max-[768px]:grid-cols-2 max-[640px]:grid-cols-1">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              const progress =
                (subjectProgress as Record<string, number>)[subject.id] ?? 0;
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
                      height: "180px",
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
                    <p className="text-[12px] text-[#666] text-right">
                      {progress}% Complete
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
      <div
        className="px-5 py-[15px] text-center text-[13px] text-[#666] shadow-[0_1px_2px_rgba(0,0,0,0.03)] mt-auto w-full"
        style={{ backgroundColor: "white" }}
      >
        © 2025 GradeSkipper. Made by Dad.
      </div>
    </div>
  );
}
