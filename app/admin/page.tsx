"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, Clock, Lightbulb } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
} from "recharts";

// Dynamic import for Charts component
const Charts = dynamic(() => import("@/app/admin/Charts"), {
  ssr: false,
  loading: () => (
    <div className="text-center p-4">
      <p>Loading charts...</p>
    </div>
  ),
});

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

interface QuizAttempt {
  id: string;
  subject: string;
  topic: string;
  grade: number;
  timestamp: string;
  completed: boolean;
}

interface ChartData {
  date: string;
  timeSpent: number;
  quizCount: number;
}

export default function AdminPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [metrics, setMetrics] = useState({
    completionRate: 0,
    totalQuizTime: 0,
    averageQuizTime: 0,
    averageHintsUsed: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [hasChartData, setHasChartData] = useState(false);

  // Refs for chart containers to get their width
  const timeSpentChartRef = useRef<HTMLDivElement>(null);
  const quizzesChartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(600);

  // Update chart width based on container size
  useEffect(() => {
    const updateChartWidth = () => {
      const width = timeSpentChartRef.current?.offsetWidth || 600;
      setChartWidth(Math.max(width, 300)); // Ensure minimum width for readability
    };

    updateChartWidth();
    window.addEventListener("resize", updateChartWidth);
    return () => window.removeEventListener("resize", updateChartWidth);
  }, []);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch quizzes
        const { data: quizzesData, error: quizzesError } = await supabase
          .from("quizzes")
          .select("*")
          .order("timestamp", { ascending: false });

        if (quizzesError) throw new Error("Failed to fetch quizzes");

        // Fetch quiz attempts
        const { data: attemptsData, error: attemptsError } = await supabase
          .from("quiz_attempts")
          .select("*")
          .order("timestamp", { ascending: false });

        if (attemptsError) throw new Error("Failed to fetch quiz attempts");

        console.log("Fetched quizzes:", quizzesData); // Debug log

        // Set state
        setQuizzes(quizzesData || []);
        setQuizAttempts(attemptsData || []);

        // Calculate metrics
        const completedCount = quizzesData?.length || 0;
        const totalAttempts = attemptsData?.length || 0;
        const completionRate =
          totalAttempts > 0 ? (completedCount / totalAttempts) * 100 : 0;

        const totalQuizTime =
          quizzesData?.reduce((sum, quiz) => sum + (quiz.time_spent || 0), 0) ||
          0;

        const averageQuizTime =
          completedCount > 0 ? totalQuizTime / completedCount / 60 : 0; // Convert to minutes

        const totalHintsUsed =
          quizzesData?.reduce((sum, quiz) => sum + (quiz.hints_used || 0), 0) ||
          0;
        const averageHintsUsed =
          completedCount > 0 ? totalHintsUsed / completedCount : 0;

        setMetrics({
          completionRate: parseFloat(completionRate.toFixed(2)),
          totalQuizTime: parseFloat((totalQuizTime / 60).toFixed(2)), // Convert to minutes
          averageQuizTime: parseFloat(averageQuizTime.toFixed(2)),
          averageHintsUsed: parseFloat(averageHintsUsed.toFixed(2)),
        });

        // Find the latest date in the data
        const latestDate = new Date(
          Math.max(...quizzesData.map((q) => new Date(q.timestamp).getTime()))
        );
        const thirtyDaysAgo = new Date(latestDate);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        console.log("Latest date:", latestDate.toISOString());
        console.log("Thirty days ago:", thirtyDaysAgo.toISOString());

        const timeSpentByDay: { [key: string]: number } = {};
        const quizzesByDay: { [key: string]: number } = {};

        console.log("Processing quizzes:", quizzesData?.length);
        quizzesData?.forEach((quiz) => {
          const timestamp = new Date(quiz.timestamp);
          if (isNaN(timestamp.getTime())) {
            console.warn(
              `Invalid timestamp for quiz ${quiz.id}: ${quiz.timestamp}`
            );
            return;
          }

          // Only include quizzes within the last 30 days
          if (timestamp < thirtyDaysAgo) {
            console.log(
              `Skipping quiz from ${timestamp.toISOString()} - too old`
            );
            return;
          }

          const date = timestamp.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          console.log(`Processing quiz for date ${date}:`, {
            timeSpent: quiz.time_spent,
            timestamp: quiz.timestamp,
          });

          // Initialize if not exists
          if (!timeSpentByDay[date]) {
            timeSpentByDay[date] = 0;
          }
          if (!quizzesByDay[date]) {
            quizzesByDay[date] = 0;
          }

          // Accumulate values
          timeSpentByDay[date] += quiz.time_spent || 0;
          quizzesByDay[date] += 1;
        });

        console.log(
          "Time Spent By Day:",
          JSON.stringify(timeSpentByDay, null, 2)
        );
        console.log("Quizzes By Day:", JSON.stringify(quizzesByDay, null, 2));

        const chartData = Array.from({ length: 30 }, (_, i) => {
          const date = new Date(latestDate);
          date.setDate(date.getDate() - (29 - i));
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          return {
            date: formattedDate,
            timeSpent: timeSpentByDay[formattedDate] || 0,
            quizCount: quizzesByDay[formattedDate] || 0,
          };
        }).reverse();

        console.log("Final Chart Data:", JSON.stringify(chartData, null, 2));
        setChartData(chartData);

        // Check if there's any non-zero data for charts
        const hasData = chartData.some(
          (data) => data.timeSpent > 0 || data.quizCount > 0
        );
        console.log(
          "Has data:",
          hasData,
          "Non-zero entries:",
          chartData.filter((d) => d.timeSpent > 0 || d.quizCount > 0).length
        );
        setHasChartData(hasData);
      } catch (error) {
        console.error("Fetch error:", error);
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

  // Handle quiz deletion
  const handleDeleteSelected = async () => {
    if (selectedQuizzes.length === 0) return;

    try {
      const { error } = await supabase
        .from("quizzes")
        .delete()
        .in("id", selectedQuizzes);

      if (error) throw new Error("Failed to delete quizzes");

      setQuizzes(quizzes.filter((quiz) => !selectedQuizzes.includes(quiz.id)));
      setSelectedQuizzes([]);
      toast.success("Selected quizzes deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        style: { background: "#F0F4FF", color: "#4361ee" },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete quizzes", {
        position: "top-right",
        autoClose: 3000,
        style: { background: "#F0F4FF", color: "#4361ee" },
      });
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (quizId: string) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
    );
  };

  // Sort quizzes
  const handleSort = (column: keyof Quiz, order: "asc" | "desc") => {
    const sorted = [...quizzes].sort((a, b) => {
      if (column === "timestamp") {
        return order === "asc"
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (column === "subject") {
        return order === "asc"
          ? a.subject.localeCompare(b.subject)
          : b.subject.localeCompare(a.subject);
      } else if (
        column === "score" ||
        column === "time_spent" ||
        column === "hints_used"
      ) {
        return order === "asc"
          ? (a[column] || 0) - (b[column] || 0)
          : (b[column] || 0) - (a[column] || 0);
      } else if (column === "calculator_used") {
        return order === "asc"
          ? Number(a.calculator_used) - Number(b.calculator_used)
          : Number(b.calculator_used) - Number(a.calculator_used);
      }
      return 0;
    });
    setQuizzes(sorted);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex-grow px-[25px] py-[25px]">
        {/* Metrics Section */}
        <div
          className="rounded-[16px] p-[25px] mb-[30px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          style={{ backgroundColor: "white", width: "100%" }}
        >
          <h2 className="text-[20px] font-bold text-[#333] mb-[15px]">
            Quiz Metrics
          </h2>
          <div className="flex flex-row gap-[15px] max-[640px]:grid max-[640px]:grid-cols-2">
            {/* Quiz Completion Rate */}
            <div className="flex-1 bg-[#f0f4ff] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#2f4ac7] rounded-[4px] w-[25px] h-[25px] flex items-center justify-center mb-[8px] border border-[#f0f4ff]">
                <CheckCircle className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Quiz Completion Rate
              </p>
              <p className="text-[20px] font-extrabold text-[#4361ee]">
                {loading ? "Loading..." : `${metrics.completionRate}%`}
              </p>
            </div>
            {/* Total Quiz Time */}
            <div className="flex-1 bg-[#ecfdf5] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#099465] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#ecfdf5]">
                <Clock className="text-[white] w-[16px] h-[16px]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Total Quiz Time
              </p>
              <p className="text-[20px] font-extrabold text-[#10b981]">
                {loading ? "Loading..." : `${metrics.totalQuizTime} min`}
              </p>
            </div>
            {/* Average Quiz Time */}
            <div className="flex-1 bg-[#f5f3ff] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#6d43c7] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#f5f3ff]">
                <Clock className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Average Quiz Time
              </p>
              <p className="text-[20px] font-extrabold text-[#8b5cf6]">
                {loading ? "Loading..." : `${metrics.averageQuizTime} min`}
              </p>
            </div>
            {/* Average Hints Used */}
            <div className="flex-1 bg-[#fff7ed] rounded-[10px] p-[10px] flex flex-col items-start shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="bg-[#d97706] w-[25px] h-[25px] rounded-[4px] flex items-center justify-center mb-[8px] border border-[#fff7ed]">
                <Lightbulb className="w-[16px] h-[16px] text-[white]" />
              </div>
              <p className="text-[13px] text-[#555] mb-[3px]">
                Average Hints Used
              </p>
              <p className="text-[20px] font-extrabold text-[#f97316]">
                {loading ? "Loading..." : metrics.averageHintsUsed}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div
          className="rounded-[16px] p-[25px] mb-[30px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          style={{ backgroundColor: "white", width: "100%" }}
        >
          <h2 className="text-[18px] font-bold text-[#333] mb-[15px]">
            Quiz Activity Trends
          </h2>
          <div className="grid grid-cols-2 gap-[15px] max-[768px]:grid-cols-1">
            {/* Time Spent per Day */}
            <div ref={timeSpentChartRef}>
              <h3 className="text-[16px] font-semibold text-[#333] mb-[15px]">
                Time Spent per Day
              </h3>
              {loading ? (
                <p className="text-[16px] text-[#555] text-center">
                  Loading charts...
                </p>
              ) : !hasChartData ? (
                <p className="text-[16px] text-[#555] text-center">
                  No quiz data available for the last 30 days
                </p>
              ) : (
                <>
                  <div className="text-sm text-gray-500 mb-2">
                    Data points:{" "}
                    {
                      chartData.filter(
                        (d) => d.timeSpent > 0 || d.quizCount > 0
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Total time spent:{" "}
                    {chartData.reduce((sum, d) => sum + d.timeSpent, 0)} seconds
                  </div>
                  <Charts
                    type="line"
                    data={chartData}
                    dataKey="timeSpent"
                    stroke="#4361ee"
                  />
                </>
              )}
            </div>
            {/* Quizzes per Day */}
            <div ref={quizzesChartRef}>
              <h3 className="text-[16px] font-semibold text-[#333] mb-[15px]">
                Quizzes per Day
              </h3>
              {loading ? (
                <p className="text-[16px] text-[#555] text-center">
                  Loading charts...
                </p>
              ) : !hasChartData ? (
                <p className="text-[16px] text-[#555] text-center">
                  No quiz data available for the last 30 days
                </p>
              ) : (
                <>
                  <div className="text-sm text-gray-500 mb-2">
                    Data points:{" "}
                    {
                      chartData.filter(
                        (d) => d.timeSpent > 0 || d.quizCount > 0
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Total quizzes:{" "}
                    {chartData.reduce((sum, d) => sum + d.quizCount, 0)}
                  </div>
                  <Charts
                    type="bar"
                    data={chartData}
                    dataKey="quizCount"
                    fill="#4361ee"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quizzes Table */}
        <div
          className="rounded-[16px] p-[25px] mb-[30px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-x-auto"
          style={{ backgroundColor: "white", width: "100%" }}
        >
          <div className="flex justify-between items-center mb-[15px]">
            <h2 className="text-[18px] font-bold text-[#333]">Quiz History</h2>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedQuizzes.length === 0}
              className={`rounded-[6px] px-[16px] py-[8px] text-white font-semibold ${
                selectedQuizzes.length === 0 ? "bg-gray-400" : "bg-[#dc2626]"
              }`}
            >
              Delete Selected
            </button>
          </div>
          <table className="w-full text-[14px] text-[#333] border-collapse">
            <thead>
              <tr className="bg-[#f0f4ff] text-[#4361ee]">
                <th className="p-[10px] text-left border-b border-[#E5E7EB]">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedQuizzes(
                        e.target.checked ? quizzes.map((q) => q.id) : []
                      )
                    }
                  />
                </th>
                <th
                  className="p-[10px] text-left border-b border-[#E5E7EB] cursor-pointer hover:text-[#1e40af]"
                  onClick={() => handleSort("timestamp", "asc")}
                >
                  Time
                </th>
                <th className="p-[10px] text-left border-b border-[#E5E7EB]">
                  Date
                </th>
                <th
                  className="p-[10px] text-left border-b border-[#E5E7EB] cursor-pointer hover:text-[#1e40af]"
                  onClick={() => handleSort("subject", "asc")}
                >
                  Subject
                </th>
                <th
                  className="p-[10px] text-left border-b border-[#E5E7EB] cursor-pointer hover:text-[#1e40af]"
                  onClick={() => handleSort("score", "asc")}
                >
                  Score
                </th>
                <th
                  className="p-[10px] text-left border-b border-[#E5E7EB] cursor-pointer hover:text-[#1e40af]"
                  onClick={() => handleSort("time_spent", "asc")}
                >
                  Time Spent
                </th>
                <th
                  className="p-[10px] text-left border-b border-[#E5E7EB] cursor-pointer hover:text-[#1e40af]"
                  onClick={() => handleSort("hints_used", "asc")}
                >
                  Hints Used
                </th>
                <th
                  className="p-[10px] text-left border-b border-[#E5E7EB] cursor-pointer hover:text-[#1e40af]"
                  onClick={() => handleSort("calculator_used", "asc")}
                >
                  Calculator
                </th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr
                  key={quiz.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                  } hover:bg-[#E0E7FF] transition-colors`}
                >
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    <input
                      type="checkbox"
                      checked={selectedQuizzes.includes(quiz.id)}
                      onChange={() => handleCheckboxChange(quiz.id)}
                    />
                  </td>
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    {new Date(quiz.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    {new Date(quiz.timestamp).toLocaleDateString()}
                  </td>
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    {quiz.subject}
                  </td>
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    {quiz.score}
                  </td>
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    {Math.round(quiz.time_spent / 60)} min
                  </td>
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    {quiz.hints_used}
                  </td>
                  <td className="p-[10px] border-b border-[#E5E7EB]">
                    {quiz.calculator_used ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
