import Link from "next/link";
import { notFound } from "next/navigation";

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

interface QuizPageProps {
  params: {
    subject: string;
    topic: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const { subject, topic } = params;

  // Get questions for the topic or show 404 if topic not found
  const questions = questionsData[topic as keyof typeof questionsData];
  if (!questions) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold neon-text mb-2">
          {topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Test your knowledge on this topic.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        {questions.map((question, index) => (
          <div key={question.id} className="card mb-6 neon-border">
            <h3 className="text-xl font-semibold mb-4">
              Question {index + 1}: {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`q${question.id}_a${optionIndex}`}
                    name={`question_${question.id}`}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`q${question.id}_a${optionIndex}`}
                    className="flex items-center p-3 w-full bg-gray-700 rounded-md peer-checked:bg-cyan-900 peer-checked:border-cyan-500 border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 mr-3">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-8">
          <Link
            href={`/subject/${subject}`}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Back to Topics
          </Link>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-8 rounded transition-colors">
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  );
}
