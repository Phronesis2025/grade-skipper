import Link from "next/link";
import { Metadata } from "next";

// Sample subjects data
const subjectsData = {
  math: {
    name: "Mathematics",
    topics: [
      {
        id: "algebra",
        name: "Algebra",
        description:
          "Learn about equations, variables, and mathematical structures",
      },
      {
        id: "calculus",
        name: "Calculus",
        description: "Study of continuous change and its applications",
      },
      {
        id: "geometry",
        name: "Geometry",
        description: "Explore shapes, sizes, properties of space",
      },
    ],
  },
  science: {
    name: "Science",
    topics: [
      {
        id: "physics",
        name: "Physics",
        description:
          "Study of matter, energy, and the fundamental forces of nature",
      },
      {
        id: "chemistry",
        name: "Chemistry",
        description: "Explore substances, their properties, and reactions",
      },
      {
        id: "biology",
        name: "Biology",
        description: "Study of living organisms and their interactions",
      },
    ],
  },
  english: {
    name: "English",
    topics: [
      {
        id: "literature",
        name: "Literature",
        description:
          "Study of written works and their historical/cultural context",
      },
      {
        id: "grammar",
        name: "Grammar",
        description: "Rules for composing sentences and texts correctly",
      },
      {
        id: "composition",
        name: "Composition",
        description: "The art of writing effectively and persuasively",
      },
    ],
  },
  history: {
    name: "History",
    topics: [
      {
        id: "world-history",
        name: "World History",
        description: "Major events and developments throughout human history",
      },
      {
        id: "us-history",
        name: "U.S. History",
        description:
          "The history of the United States from founding to present",
      },
      {
        id: "ancient-civilizations",
        name: "Ancient Civilizations",
        description: "Study of early human societies and their cultures",
      },
    ],
  },
};

interface SubjectPageProps {
  params: {
    subject: string;
  };
}

export async function generateMetadata({
  params,
}: SubjectPageProps): Promise<Metadata> {
  // Format the subject name to have proper capitalization
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedSubject} - Grade Skipper`,
    description: `Learn ${formattedSubject} with interactive lessons and quizzes.`,
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  // Format the subject name to have proper capitalization
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-cyan-400">{formattedSubject}</h1>
      <p className="text-lg">
        Explore interactive lessons and quizzes for {formattedSubject}. This
        page is under construction.
      </p>

      <div className="bg-gray-800 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Available Topics</h2>
        <p className="text-gray-400">Topics coming soon...</p>
      </div>
    </div>
  );
}
