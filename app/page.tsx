import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Sample subjects data
const subjects = [
  {
    id: "math",
    name: "Mathematics",
    topics: ["Algebra", "Calculus", "Geometry"],
  },
  {
    id: "science",
    name: "Science",
    topics: ["Physics", "Chemistry", "Biology"],
  },
  {
    id: "english",
    name: "English",
    topics: ["Literature", "Grammar", "Composition"],
  },
  {
    id: "history",
    name: "History",
    topics: ["World History", "U.S. History", "Ancient Civilizations"],
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold neon-text mb-4">
          Welcome to Grade Skipper
        </h1>
        <Button variant="outline">Test Button</Button>
        <p className="text-xl max-w-3xl mx-auto">
          Accelerate your learning journey with our interactive lessons and
          quizzes. Master concepts faster and skip ahead to advanced material.
        </p>
      </section>

      <section className="py-8">
        <h2 className="text-3xl font-semibold mb-6">Choose a Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/subject/${subject.id}`}
              className="no-underline"
            >
              <div className="card h-full flex flex-col justify-between">
                <div>
                  <div className="h-40 bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-4xl neon-text">
                      {subject.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                  <p className="text-gray-400 mb-4">
                    {subject.topics.length} topics available
                  </p>
                </div>
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1 text-sm bg-gray-700 rounded-full">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6">Why Grade Skipper?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-cyan-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl neon-text">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accelerated Learning</h3>
            <p className="text-gray-400">
              Learn at your own pace and skip ahead when you're ready.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-cyan-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl neon-text">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              Visualize your progress and identify areas for improvement.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-cyan-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl neon-text">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Challenge Yourself</h3>
            <p className="text-gray-400">
              Take on advanced quizzes and earn achievement badges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
