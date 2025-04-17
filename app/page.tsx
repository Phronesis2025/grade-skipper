import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Comprehensive subjects data
const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "/icons/math.svg",
    topics: 3,
  },
  {
    id: "reading",
    name: "Reading",
    icon: "/icons/reading.svg",
    topics: 3,
  },
  {
    id: "science",
    name: "Science",
    icon: "/icons/science.svg",
    topics: 3,
  },
  {
    id: "history",
    name: "History",
    icon: "/icons/history.svg",
    topics: 3,
  },
  {
    id: "english",
    name: "English",
    icon: "/icons/english.svg",
    topics: 3,
  },
  {
    id: "coding-ai",
    name: "Coding/AI",
    icon: "/icons/coding-ai.svg",
    topics: 3,
  },
  {
    id: "logic-puzzles",
    name: "Logic Puzzles",
    icon: "/icons/logic-puzzles.svg",
    topics: 3,
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">
          Welcome to Grade Skipper
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Accelerate your learning journey with our interactive lessons and
          quizzes. Master concepts faster and skip ahead to advanced material.
        </p>
      </section>

      <section className="py-8">
        <h2 className="text-3xl font-semibold mb-6">Choose a Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/subject/${subject.id}`}
              className="no-underline"
            >
              <Card className="h-full transition-all hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-400/20 bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex justify-center items-center p-4 rounded-md bg-gray-900 mb-2 h-32 w-full">
                    <Image
                      src={subject.icon}
                      alt={subject.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl text-white">
                    {subject.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {subject.topics} topics available
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <span className="text-sm bg-gray-900 px-3 py-1 rounded-full text-cyan-400">
                    Explore &rarr;
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6">Why Grade Skipper?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4 border border-cyan-400">
              <span className="text-2xl text-cyan-400">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accelerated Learning</h3>
            <p className="text-gray-400">
              Learn at your own pace and skip ahead when you're ready.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4 border border-cyan-400">
              <span className="text-2xl text-cyan-400">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              Visualize your progress and identify areas for improvement.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4 border border-cyan-400">
              <span className="text-2xl text-cyan-400">🏆</span>
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
