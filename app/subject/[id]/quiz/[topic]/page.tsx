"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface QuizPageProps {
  params: {
    id: string;
    topic: string;
  };
}

export default function QuizPage() {
  // Get the route parameters
  const params = useParams();
  const subjectId = params.id as string;
  const topicId = params.topic as string;

  // Format the subject and topic for display
  const formattedSubject = subjectId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedTopic = topicId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-8">
        <Link
          href={`/subject/${subjectId}`}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Back to {formattedSubject}
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-4">
        {formattedSubject}: {formattedTopic} Quiz
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-4">
          This is the quiz page for {formattedTopic} in {formattedSubject}.
        </p>
        <p>Quiz content will be implemented in future iterations.</p>
      </div>
    </div>
  );
}
