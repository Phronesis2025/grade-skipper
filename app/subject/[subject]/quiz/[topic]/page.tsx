import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Mock questions for topics
const questionsData = {
  algebra: [
    {
      id: 1,
      question: "Solve for x: 3x + 5 = 14",
      options: ["x = 2", "x = 3", "x = 4", "x = 5"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "If y = 2x + 3, what is y when x = 4?",
      options: ["y = 8", "y = 10", "y = 11", "y = 12"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Factor the expression: x² - 9",
      options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)²", "(x+3)²"],
      correctAnswer: 0,
    },
  ],
  calculus: [
    {
      id: 1,
      question: "What is the derivative of f(x) = x²?",
      options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Evaluate the integral: ∫ 2x dx",
      options: ["x + C", "x² + C", "2x² + C", "x² - x + C"],
      correctAnswer: 2,
    },
  ],
  // Add more topics as needed
};

interface TopicQuizPageProps {
  params: {
    subject: string;
    topic: string;
  };
}

export async function generateMetadata({
  params,
}: TopicQuizPageProps): Promise<Metadata> {
  // Format the subject and topic names to have proper capitalization
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedTopic = params.topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTopic} Quiz - ${formattedSubject} - Grade Skipper`,
    description: `Take a quiz on ${formattedTopic} in ${formattedSubject}.`,
  };
}

export default function TopicQuizPage({ params }: TopicQuizPageProps) {
  // Format the subject and topic names to have proper capitalization
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedTopic = params.topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-cyan-400">
        {formattedTopic} Quiz
      </h1>
      <p className="text-lg">
        Test your knowledge on {formattedTopic} in {formattedSubject}. This quiz
        is under construction.
      </p>

      <div className="bg-gray-800 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quiz Questions</h2>
        <p className="text-gray-400">Questions coming soon...</p>
      </div>
    </div>
  );
}
