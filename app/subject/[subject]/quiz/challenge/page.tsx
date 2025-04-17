import Link from "next/link";

interface ChallengePageProps {
  params: {
    subject: string;
  };
}

export default function ChallengePage({ params }: ChallengePageProps) {
  const { subject } = params;

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold neon-text mb-4">Challenge Quiz</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Test your advanced knowledge on challenging topics.
        </p>
      </section>

      <section className="bg-gray-800 rounded-lg p-6 text-center max-w-4xl mx-auto">
        <div className="py-12">
          <div className="mb-8">
            <span className="text-7xl neon-text">🏆</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Challenge Quiz Coming Soon
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            We're creating challenging questions to test your mastery of this
            subject. Check back soon for advanced quizzes and earn special
            achievements.
          </p>

          <Link
            href={`/subject/${subject}`}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Back to Topics
          </Link>
        </div>
      </section>
    </div>
  );
}
