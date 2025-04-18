"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function ChallengePage() {
  // Get the subject ID from the route parameter
  const params = useParams();
  const subjectId = params.id as string;

  // Format the subject name for display
  const formattedSubject = subjectId
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
        {formattedSubject} Challenge Quiz
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-4">
          This is the challenge quiz for {formattedSubject}. Challenge quizzes
          combine questions from multiple topics to test your comprehensive
          knowledge.
        </p>
        <p>Challenge quiz content will be implemented in future iterations.</p>
      </div>
    </div>
  );
}
