import { Metadata } from "next";
import Link from "next/link";

interface ChallengeQuizPageProps {
  params: {
    subject: string;
  };
}

export async function generateMetadata({
  params,
}: ChallengeQuizPageProps): Promise<Metadata> {
  // Format the subject name to have proper capitalization
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Challenge Quiz - ${formattedSubject} - Grade Skipper`,
    description: `Take on a challenge quiz in ${formattedSubject}.`,
  };
}

export default function ChallengeQuizPage({ params }: ChallengeQuizPageProps) {
  // Format the subject name to have proper capitalization
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-cyan-400">Challenge Quiz</h1>
      <p className="text-lg">
        Test your advanced knowledge in {formattedSubject}. This challenge quiz
        is under construction.
      </p>

      <div className="bg-gray-800 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Challenge Questions</h2>
        <p className="text-gray-400">
          These questions will test your skills at a higher level.
        </p>
        <p className="text-gray-400 mt-4">Challenge questions coming soon...</p>
      </div>
    </div>
  );
}
