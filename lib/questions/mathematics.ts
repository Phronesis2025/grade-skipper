export interface MathQuestion {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  explanations: {
    correct: string;
    incorrect: string;
  };
}

export const mathematicsQuestions: MathQuestion[] = [
  {
    topic: "Fractions",
    question: "What is 1/2 + 1/4?",
    options: ["A) 1/4", "B) 3/4", "C) 1/2", "D) 1"],
    correctAnswer: "B",
    explanation:
      "To add 1/2 and 1/4, find a common denominator. The least common denominator is 4. Convert 1/2 to 2/4, then add: 2/4 + 1/4 = 3/4.",
    hint: "Convert both fractions to have the same denominator before adding.",
    explanations: {
      correct: "Great job! You correctly added the fractions to get 3/4.",
      incorrect:
        "Option A (1/4) is incorrect because it ignores the first fraction...",
    },
  },
  {
    topic: "Decimals",
    question: "What is 0.75 × 0.4?",
    options: ["A) 0.3", "B) 0.4", "C) 0.25", "D) 0.5"],
    correctAnswer: "A",
    explanation:
      "Multiply 0.75 by 0.4: 0.75 × 0.4 = 0.3. You can compute this by multiplying 75 × 4 = 300, then adjusting for decimals: 300 ÷ 1000 = 0.3.",
    hint: "Convert the decimals to fractions or multiply directly and adjust the decimal point.",
    explanations: {
      correct: "Nice work! You correctly calculated 0.75 × 0.4 = 0.3.",
      incorrect:
        "Option B (0.4) is incorrect because it doesn't account for the proper multiplication...",
    },
  },
  {
    topic: "Algebra",
    question: "If 2x + 3 = 11, what is the value of x?",
    options: ["A) 3", "B) 4", "C) 5", "D) 6"],
    correctAnswer: "B",
    explanation:
      "Solve for x: 2x + 3 = 11. Subtract 3 from both sides: 2x = 8. Divide both sides by 2: x = 4.",
    hint: "Isolate x by subtracting 3, then divide by 2.",
    explanations: {
      correct: "Great job! You correctly solved for x = 4.",
      incorrect: "Option A (3) is incorrect because 2(3) + 3 = 9, not 11...",
    },
  },
  {
    topic: "Geometry",
    question:
      "What is the area of a rectangle with length 5 cm and width 3 cm?",
    options: ["A) 8 cm²", "B) 15 cm²", "C) 16 cm²", "D) 10 cm²"],
    correctAnswer: "B",
    explanation:
      "The area of a rectangle is length × width. Here, 5 × 3 = 15 cm².",
    hint: "Multiply the length by the width to find the area.",
    explanations: {
      correct: "Nice work! The area is correctly calculated as 15 cm².",
      incorrect:
        "Option A (8 cm²) is incorrect because it doesn't match 5 × 3...",
    },
  },
  {
    topic: "Word Problems",
    question:
      "If a book costs $12 and you have $40, how much change will you get?",
    options: ["A) $28", "B) $30", "C) $26", "D) $32"],
    correctAnswer: "A",
    explanation:
      "Subtract the cost of the book from your money: $40 - $12 = $28.",
    hint: "Subtract the cost of the book from the amount you have.",
    explanations: {
      correct: "Great job! You correctly calculated the change as $28.",
      incorrect: "Option B (30) is incorrect because 40 - 12 is 28, not 30...",
    },
  },
  {
    topic: "Fractions",
    question: "What is 3/5 - 1/5?",
    options: ["A) 1/5", "B) 2/5", "C) 3/5", "D) 4/5"],
    correctAnswer: "B",
    explanation:
      "Since the denominators are the same, subtract the numerators: 3/5 - 1/5 = (3-1)/5 = 2/5.",
    hint: "Subtract the numerators since the denominators are the same.",
    explanations: {
      correct: "Nice work! You correctly subtracted to get 2/5.",
      incorrect: "Option A (1/5) is incorrect because 3 - 1 is 2, not 1...",
    },
  },
  {
    topic: "Decimals",
    question: "What is 1.2 + 0.8?",
    options: ["A) 1.8", "B) 2.0", "C) 2.2", "D) 1.6"],
    correctAnswer: "B",
    explanation: "Add the decimals: 1.2 + 0.8 = 2.0.",
    hint: "Add the numbers as you would whole numbers, then place the decimal point.",
    explanations: {
      correct: "Great job! You correctly added to get 2.0.",
      incorrect: "Option A (1.8) is incorrect because 1.2 + 0.8 is 2.0...",
    },
  },
  {
    topic: "Algebra",
    question: "If x - 7 = 10, what is the value of x?",
    options: ["A) 15", "B) 17", "C) 13", "D) 19"],
    correctAnswer: "B",
    explanation: "Solve for x: x - 7 = 10. Add 7 to both sides: x = 17.",
    hint: "Add 7 to both sides to isolate x.",
    explanations: {
      correct: "Nice work! You correctly solved for x = 17.",
      incorrect: "Option A (15) is incorrect because 15 - 7 = 8, not 10...",
    },
  },
  {
    topic: "Geometry",
    question: "What is the perimeter of a square with side length 4 cm?",
    options: ["A) 12 cm", "B) 16 cm", "C) 14 cm", "D) 18 cm"],
    correctAnswer: "B",
    explanation:
      "The perimeter of a square is 4 × side length. Here, 4 × 4 = 16 cm.",
    hint: "Multiply the side length by 4 to find the perimeter.",
    explanations: {
      correct: "Great job! The perimeter is correctly calculated as 16 cm.",
      incorrect: "Option A (12 cm) is incorrect because 4 × 4 is 16, not 12...",
    },
  },
  {
    topic: "Word Problems",
    question: "If you buy 3 pencils at $2 each, how much do you spend?",
    options: ["A) $5", "B) $6", "C) $7", "D) $8"],
    correctAnswer: "B",
    explanation:
      "Multiply the cost per pencil by the number of pencils: 3 × $2 = $6.",
    hint: "Multiply the cost of one pencil by the number of pencils.",
    explanations: {
      correct: "Nice work! You correctly calculated the total as $6.",
      incorrect: "Option A ($5) is incorrect because 3 × 2 is 6, not 5...",
    },
  },
];
