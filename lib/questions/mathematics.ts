export interface MathQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  topic: string;
}

export const mathematicsQuestions: Record<string, MathQuestion[]> = {
  Fractions: [
    {
      question: "What is 3/4 + 1/4?",
      options: ["1", "1/2", "1/4", "4/4"],
      correctAnswer: "4/4",
      explanation:
        "Add the numerators since denominators are the same: 3/4 + 1/4 = 4/4 = 1.",
      hint: "When the denominators are the same, you only need to add the numerators.",
      topic: "Fractions",
    },
    {
      question: "What is the result of simplifying the fraction 24/32?",
      options: ["3/4", "4/3", "2/3", "5/8"],
      correctAnswer: "3/4",
      explanation: "24/32 ÷ 8/8 = 3/4.",
      hint: "Divide numerator and denominator by their greatest common factor.",
      topic: "Fractions",
    },
  ],
  Decimals: [
    {
      question: "What is 0.75 as a fraction?",
      options: ["3/4", "7/10", "3/5", "4/5"],
      correctAnswer: "3/4",
      explanation: "0.75 = 75/100 = 3/4 after simplifying by dividing by 25.",
      hint: "Write the decimal as a fraction over 100 and simplify.",
      topic: "Decimals",
    },
  ],
  Ratios: [
    {
      question:
        "If a pencil costs $1.25 and a notebook costs $2.50, how much do they cost together?",
      options: ["$3.75", "$3.50", "$4.00", "$2.75"],
      correctAnswer: "$3.75",
      explanation: "$1.25 + $2.50 = $3.75.",
      hint: "Add the two amounts directly.",
      topic: "Ratios",
    },
  ],
};
