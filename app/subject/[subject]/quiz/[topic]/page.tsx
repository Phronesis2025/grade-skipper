"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calculator, HelpCircle, FileText, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

// Math quiz questions
const questionsData = {
  algebra: [
    {
      id: 1,
      question: "What is the result of simplifying the fraction 24/32?",
      options: ["3/4", "4/3", "2/3", "5/8"],
      correctAnswer: 0,
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
  // Format the subject name for display
  const formattedSubject = params.subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [currentQuestion, setCurrentQuestion] = useState(7); // For "Question 8 of 10"
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [notesChecked, setNotesChecked] = useState(false);

  // Get questions for this topic, fallback to empty array if none found
  const questions =
    questionsData[params.topic as keyof typeof questionsData] || [];

  // For display purposes in the screenshot (8 of 10 = 80%)
  const totalQuestions = 10;
  const currentQuestionNumber = currentQuestion + 1;

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (currentQuestionNumber / totalQuestions) * 100
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Subject Header */}
      <div className="flex items-center mb-6">
        <Image
          src="/icons/math.svg"
          alt="Mathematics"
          width={24}
          height={24}
          className="mr-2"
        />
        <h1 className="text-2xl font-bold text-black">Mathematics</h1>
      </div>

      {/* Progress Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-md">
          <p className="text-sm text-black mb-2">
            Question {currentQuestionNumber} of {totalQuestions}
          </p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="text-sm text-black">
          Progress: {progressPercentage}%
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden p-6">
        <h2 className="text-base text-center text-black mb-8">
          What is the result of simplifying the fraction 24/32?
        </h2>

        <div className="space-y-4 mb-8">
          {["3/4", "4/3", "2/3", "5/8"].map((option, index) => (
            <div
              key={index}
              className={`p-3 rounded-md border transition-all cursor-pointer flex items-center ${
                selectedAnswer === index
                  ? "border-black bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setSelectedAnswer(index)}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                  selectedAnswer === index ? "border-black" : "border-gray-400"
                }`}
              >
                {selectedAnswer === index && (
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                )}
              </div>
              <span className="text-black">{option}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="#"
            className="text-sm text-black hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Previous
          </Link>
          <button className="px-4 py-2 rounded-md font-medium bg-black text-white hover:bg-gray-800 transition-all">
            Submit Answer
          </button>
        </div>
      </div>

      {/* Action Tools */}
      <div className="flex justify-center gap-6">
        <div className="flex items-center gap-1 text-xs text-black">
          <HelpCircle size={16} className="text-black" />
          <span>Hint</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-black">
          <Calculator size={16} className="text-black" />
          <span>Calculator</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-black">
          <input
            type="checkbox"
            checked={notesChecked}
            onChange={() => setNotesChecked(!notesChecked)}
            className="mr-1"
          />
          <FileText size={16} className="text-black" />
          <span>Notes</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 mt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-black mb-4 md:mb-0">
            © 2025 Grade Skipper. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/help" className="text-xs text-black hover:underline">
              Help
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-black hover:underline"
            >
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-black hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
