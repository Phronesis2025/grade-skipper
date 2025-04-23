"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { format, subDays } from "date-fns";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";

// Dynamically import recharts components with SSR disabled
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const Legend = dynamic(() => import("recharts").then((mod) => mod.Legend), {
  ssr: false,
});

interface Quiz {
  id: string;
  timestamp: string;
  subject: string;
  score: number;
  time_spent: number;
  hints_used: number;
  calculator_used: boolean;
}

interface EventLog {
  id: string;
  timestamp: string;
  event_type: string;
  details: Record<string, any>;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export default function AdminPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<{ completed: boolean }[]>(
    []
  );
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [quizSort, setQuizSort] = useState<SortConfig>({
    key: "timestamp",
    direction: "desc",
  });
  const [eventSort, setEventSort] = useState<SortConfig>({
    key: "timestamp",
    direction: "desc",
  });
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Simulate chart loading and toast visibility
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => setIsChartLoaded(true), 200);
      setShowToast(true);
    }
  }, []);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quizzes
        const { data: quizData, error: quizError } = await supabase
          .from("quizzes")
          .select("*");
        if (quizError)
          throw new Error(`Failed to fetch quizzes: ${quizError.message}`);
        console.log("Fetched quizzes:", quizData);
        setQuizzes(quizData || []);

        // Fetch quiz attempts
        const { data: attemptData, error: attemptError } = await supabase
          .from("quiz_attempts")
          .select("completed");
        if (attemptError)
          throw new Error(
            `Failed to fetch quiz attempts: ${attemptError.message}`
          );
        console.log("Fetched quiz attempts:", attemptData);
        setQuizAttempts(attemptData || []);

        // Fetch event logs
        const { data: logData, error: logError } = await supabase
          .from("event_logs")
          .select("*");
        if (logError)
          throw new Error(`Failed to fetch event logs: ${logError.message}`);
        console.log("Fetched event logs:", logData);
        setEventLogs(logData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          style: { backgroundColor: "#F0F4FF", color: "#4361ee" },
        });
      }
    };
    fetchData();
  }, []);

  // Calculate metrics
  const totalQuizzes = quizzes.length;
  const totalAttempts = quizAttempts.length;
  const completionRate =
    totalAttempts > 0 ? (totalQuizzes / totalAttempts) * 100 : 0;
  const totalQuizTime = quizzes.reduce(
    (sum, quiz) => sum + Number(quiz.time_spent || 0),
    0
  );
  const averageQuizTime = totalQuizzes > 0 ? totalQuizTime / totalQuizzes : 0;
  const promptTimes = eventLogs
    .filter((log) =>
      ["prompt_successful", "prompt_failed"].includes(log.event_type)
    )
    .map((log) => Number(log.details.time_ms || 0));
  const averagePromptTime =
    promptTimes.length > 0
      ? promptTimes.reduce((sum, time) => sum + time, 0) /
        promptTimes.length /
        1000
      : 0;

  // Prepare chart data (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), i), "yyyy-MM-dd"),
    time_spent: 0,
    quiz_count: 0,
  })).reverse();

  quizzes.forEach((quiz) => {
    const quizDate = format(new Date(quiz.timestamp), "yyyy-MM-dd");
    const day = last30Days.find((d) => d.date === quizDate);
    if (day) {
      day.time_spent += Number(quiz.time_spent || 0);
      day.quiz_count += 1;
    }
  });
  console.log("Chart data (last30Days):", last30Days);

  // Handle sorting
  const handleSort = (key: string, table: "quizzes" | "event_logs") => {
    const setSort = table === "quizzes" ? setQuizSort : setEventSort;
    const currentSort = table === "quizzes" ? quizSort : eventSort;
    const direction =
      currentSort.key === key && currentSort.direction === "asc"
        ? "desc"
        : "asc";
    setSort({ key, direction });

    const data = table === "quizzes" ? [...quizzes] : [...eventLogs];
    data.sort((a, b) => {
      const aValue = a[key as keyof typeof a];
      const bValue = b[key as keyof typeof b];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    table === "quizzes" ? setQuizzes(data) : setEventLogs(data);
  };

  // Handle quiz deletion
  const handleDeleteQuizzes = async () => {
    if (selectedQuizzes.length === 0) return;
    try {
      const { error } = await supabase
        .from("quizzes")
        .delete()
        .in("id", selectedQuizzes);
      if (error) throw error;
      setQuizzes(quizzes.filter((quiz) => !selectedQuizzes.includes(quiz.id)));
      setSelectedQuizzes([]);
      toast.success("Selected quizzes deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        style: { backgroundColor: "#F0F4FF", color: "#4361ee" },
      });
    } catch (error) {
      console.error("Error deleting quizzes:", error);
      toast.error("Failed to delete quizzes. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        style: { backgroundColor: "#F0F4FF", color: "#4361ee" },
      });
    }
  };

  return (
    <div className="bg-[#F0F1F2] min-h-screen p-[20px]">
      <h1 className="text-[24px] font-bold text-[#333] mb-[20px] text-center">
        Admin Dashboard
      </h1>

      {/* Toast Container (client-only) */}
      {showToast && <ToastContainer />}

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-[15px] max-sm:grid-cols-1 mb-[30px]">
        <div className="bg-[#f0f4ff] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <p className="text-[16px] font-semibold text-[#4361ee] mb-[3px]">
            Quiz Completion Rate
          </p>
          <p className="text-[20px] font-extrabold text-[#4361ee]">
            {completionRate.toFixed(1)}%
          </p>
        </div>
        <div className="bg-[#f0f4ff] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <p className="text-[16px] font-semibold text-[#4361ee] mb-[3px]">
            Total Quiz Time
          </p>
          <p className="text-[20px] font-extrabold text-[#4361ee]">
            {(totalQuizTime / 60).toFixed(1)} min
          </p>
        </div>
        <div className="bg-[#f0f4ff] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <p className="text-[16px] font-semibold text-[#4361ee] mb-[3px]">
            Average Quiz Time
          </p>
          <p className="text-[20px] font-extrabold text-[#4361ee]">
            {(averageQuizTime / 60).toFixed(1)} min
          </p>
        </div>
        <div className="bg-[#f0f4ff] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <p className="text-[16px] font-semibold text-[#4361ee] mb-[3px]">
            Average Prompt Time
          </p>
          <p className="text-[20px] font-extrabold text-[#4361ee]">
            {averagePromptTime.toFixed(2)} sec
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-[30px]">
        <h2 className="text-[18px] font-bold mb-[15px]">
          Quiz Activity (Last 30 Days)
        </h2>
        {isChartLoaded ? (
          <>
            <div className="bg-[white] rounded-[10px] p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] mb-[20px]">
              <h3 className="text-[16px] font-semibold mb-[10px]">
                Time Spent per Day (sec)
              </h3>
              <LineChart
                width={600}
                height={300}
                data={last30Days}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="time_spent"
                  stroke="#4361ee"
                  name="Time (sec)"
                />
              </LineChart>
            </div>
            <div className="bg-[white] rounded-[10px] p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <h3 className="text-[16px] font-semibold mb-[10px]">
                Quizzes Completed per Day
              </h3>
              <LineChart
                width={600}
                height={300}
                data={last30Days}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="quiz_count"
                  stroke="#4361ee"
                  name="Quizzes"
                />
              </LineChart>
            </div>
          </>
        ) : (
          <div className="text-center text-[16px] text-[#555]">
            Loading charts...
          </div>
        )}
      </div>

      {/* Quizzes Table */}
      <div className="mb-[30px]">
        <h2 className="text-[18px] font-bold mb-[15px]">Completed Quizzes</h2>
        <button
          onClick={handleDeleteQuizzes}
          className="bg-[#dc2626] text-[white] px-[16px] py-[8px] rounded-[6px] text-[14px] font-semibold mb-[10px] disabled:opacity-50"
          disabled={selectedQuizzes.length === 0}
        >
          Delete Selected
        </button>
        <div className="bg-[white] rounded-[10px] p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-x-auto">
          <table className="w-full text-[14px] text-[#333]">
            <thead>
              <tr className="border-b">
                <th className="p-[10px] text-left">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedQuizzes(
                        e.target.checked ? quizzes.map((q) => q.id) : []
                      )
                    }
                    checked={
                      selectedQuizzes.length === quizzes.length &&
                      quizzes.length > 0
                    }
                  />
                </th>
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("timestamp", "quizzes")}
                >
                  Time{" "}
                  {quizSort.key === "timestamp" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-[10px] text-left">Date</th>
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("subject", "quizzes")}
                >
                  Subject{" "}
                  {quizSort.key === "subject" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("score", "quizzes")}
                >
                  Score{" "}
                  {quizSort.key === "score" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("time_spent", "quizzes")}
                >
                  Time Spent{" "}
                  {quizSort.key === "time_spent" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("hints_used", "quizzes")}
                >
                  Hints Used{" "}
                  {quizSort.key === "hints_used" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("calculator_used", "quizzes")}
                >
                  Calculator{" "}
                  {quizSort.key === "calculator_used" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b">
                  <td className="p-[10px]">
                    <input
                      type="checkbox"
                      checked={selectedQuizzes.includes(quiz.id)}
                      onChange={() =>
                        setSelectedQuizzes(
                          selectedQuizzes.includes(quiz.id)
                            ? selectedQuizzes.filter((id) => id !== quiz.id)
                            : [...selectedQuizzes, quiz.id]
                        )
                      }
                    />
                  </td>
                  <td className="p-[10px]">
                    {format(new Date(quiz.timestamp), "M-d-yyyy h:mm a")}
                  </td>
                  <td className="p-[10px]">
                    {format(new Date(quiz.timestamp), "M-d-yyyy")}
                  </td>
                  <td className="p-[10px]">{quiz.subject}</td>
                  <td className="p-[10px]">{quiz.score}%</td>
                  <td className="p-[10px]">
                    {(quiz.time_spent / 60).toFixed(1)} min
                  </td>
                  <td className="p-[10px]">{quiz.hints_used}</td>
                  <td className="p-[10px]">
                    {quiz.calculator_used ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Logs Table */}
      <div>
        <h2 className="text-[18px] font-bold mb-[15px]">Event Logs</h2>
        <div className="bg-[white] rounded-[10px] p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-x-auto">
          <table className="w-full text-[14px] text-[#333]">
            <thead>
              <tr className="border-b">
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("timestamp", "event_logs")}
                >
                  Time{" "}
                  {eventSort.key === "timestamp" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-[10px] text-left cursor-pointer"
                  onClick={() => handleSort("event_type", "event_logs")}
                >
                  Event Type{" "}
                  {eventSort.key === "event_type" &&
                    (quizSort.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-[10px] text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {eventLogs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="p-[10px]">
                    {format(new Date(log.timestamp), "M-d-yyyy h:mm a")}
                  </td>
                  <td className="p-[10px]">{log.event_type}</td>
                  <td className="p-[10px]">{JSON.stringify(log.details)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
