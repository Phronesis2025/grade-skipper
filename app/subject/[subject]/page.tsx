import Link from "next/link";

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

export default function SubjectPage({ params }: SubjectPageProps) {
  const { subject } = params;
  const subjectData = subjectsData[subject as keyof typeof subjectsData] || {
    name: "Unknown Subject",
    topics: [],
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold neon-text mb-4">
          {subjectData.name}
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Select a topic to explore lessons and take quizzes.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Topics</h2>
          <Link
            href={`/subject/${subject}/quiz/challenge`}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Challenge Quiz
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectData.topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/subject/${subject}/quiz/${topic.id}`}
              className="no-underline"
            >
              <div className="card hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
                <p className="text-gray-400 mb-4">{topic.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400">Start learning</span>
                  <span className="inline-block px-3 py-1 text-sm bg-gray-700 rounded-full">
                    Quiz &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
