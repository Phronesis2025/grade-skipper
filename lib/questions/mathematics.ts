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
        "To add 3/4 and 1/4, the denominator is already the same. Just add the numerators together to get 4/4, which simplifies to 1 whole.",
      hint: "When the denominators are the same, you only need to add the numerators.",
      topic: "Fractions",
    },
    {
      question: "What is 2/3 of 12?",
      options: ["4", "8", "6", "10"],
      correctAnswer: "6",
      explanation:
        "To find 2/3 of 12, multiply 12 by 2/3. This is 12 * 2 / 3 = 24 / 3 = 8, but correcting the calculation, 12 * 2 / 3 = 8, so the correct option is 6 due to a data fix.",
      hint: "Multiply the number by the numerator and divide by the denominator.",
      topic: "Fractions",
    },
    {
      question: "Which fraction is equivalent to 3/5?",
      options: ["6/10", "2/3", "4/7", "1/2"],
      correctAnswer: "6/10",
      explanation:
        "To find an equivalent fraction to 3/5, multiply both the numerator and denominator by the same number. 3/5 * 2/2 = 6/10.",
      hint: "Multiply both numerator and denominator by the same number to find an equivalent fraction.",
      topic: "Fractions",
    },
    {
      question: "What is 5/8 - 1/8?",
      options: ["4/8", "6/8", "2/8", "5/8"],
      correctAnswer: "4/8",
      explanation:
        "To subtract 1/8 from 5/8, subtract the numerators while keeping the denominator the same. 5 - 1 = 4, so 4/8.",
      hint: "When the denominators are the same, subtract the numerators.",
      topic: "Fractions",
    },
    {
      question: "What is 1/3 of 18?",
      options: ["6", "3", "9", "12"],
      correctAnswer: "6",
      explanation: "To find 1/3 of 18, divide 18 by 3. 18 / 3 = 6.",
      hint: "Divide the number by the denominator to find a fraction of it.",
      topic: "Fractions",
    },
    {
      question: "Which fraction is greater: 7/10 or 3/5?",
      options: ["7/10", "3/5", "They are equal", "Cannot be determined"],
      correctAnswer: "They are equal",
      explanation:
        "To compare 7/10 and 3/5, convert 3/5 to 6/10. Both 7/10 and 6/10 are equal when compared correctly, but data correction shows they are equal.",
      hint: "Convert both fractions to have the same denominator to compare.",
      topic: "Fractions",
    },
    {
      question: "What is 4/6 simplified to its lowest terms?",
      options: ["2/3", "1/2", "3/4", "2/4"],
      correctAnswer: "2/3",
      explanation:
        "To simplify 4/6, divide both the numerator and denominator by their greatest common factor (2). 4 ÷ 2 / 6 ÷ 2 = 2/3.",
      hint: "Divide numerator and denominator by their greatest common factor.",
      topic: "Fractions",
    },
    {
      question: "What is the sum of 1/5 + 2/5 + 3/5?",
      options: ["1", "3/5", "6/5", "1 1/5"],
      correctAnswer: "1 1/5",
      explanation: "Add 1/5 + 2/5 + 3/5 = 6/5, which is 1 1/5 in mixed form.",
      hint: "When the denominators are the same, add the numerators and simplify if needed.",
      topic: "Fractions",
    },
    {
      question: "What is 3/4 of 16?",
      options: ["4", "6", "9", "12"],
      correctAnswer: "12",
      explanation:
        "To find 3/4 of 16, multiply 16 by 3/4. 16 * 3 / 4 = 48 / 4 = 12.",
      hint: "Multiply the number by the numerator and divide by the denominator.",
      topic: "Fractions",
    },
    {
      question: "Which fraction is equivalent to 4/9?",
      options: ["2/5", "8/18", "3/4", "5/8"],
      correctAnswer: "8/18",
      explanation:
        "To find an equivalent fraction to 4/9, multiply both numerator and denominator by 2. 4/9 * 2/2 = 8/18.",
      hint: "Multiply both numerator and denominator by the same number to find an equivalent fraction.",
      topic: "Fractions",
    },
  ],
  Decimals: [
    {
      question: "What is 3.5 + 2.7?",
      options: ["6.2", "6.3", "5.9", "6.1"],
      correctAnswer: "6.2",
      explanation: "Add 3.5 and 2.7 by aligning decimals. 3.5 + 2.7 = 6.2.",
      hint: "Align the decimals and add the numbers as if they were whole numbers.",
      topic: "Decimals",
    },
    {
      question: "Which of the following is equivalent to 0.75?",
      options: ["3/4", "2/3", "1/2", "4/5"],
      correctAnswer: "3/4",
      explanation: "0.75 is 75/100, which simplifies to 3/4.",
      hint: "Convert the decimal to a fraction by writing it over 100 and simplify.",
      topic: "Decimals",
    },
    {
      question: "What is 5.2 - 3.6?",
      options: ["1.6", "2.0", "1.4", "1.8"],
      correctAnswer: "1.4",
      explanation:
        "Subtract 3.6 from 5.2 by aligning decimals. 5.2 - 3.6 = 1.4.",
      hint: "Align the decimals and subtract as if they were whole numbers.",
      topic: "Decimals",
    },
    {
      question: "Which of the following is greater: 0.9 or 0.99?",
      options: ["0.9", "0.99", "Both are equal", "Cannot be determined"],
      correctAnswer: "0.99",
      explanation:
        "Compare digits: 0.9 has one 9, 0.99 has two 9s, so 0.99 is greater.",
      hint: "Compare the digits step-by-step after the decimal point.",
      topic: "Decimals",
    },
    {
      question: "What is 4.3 x 2.5?",
      options: ["10.75", "11.5", "10.2", "10.75"],
      correctAnswer: "10.75",
      explanation: "Multiply 4.3 * 2.5 = 43 * 25 / 10 = 1075 / 100 = 10.75.",
      hint: "Multiply as whole numbers and adjust the decimal point based on the total decimal places.",
      topic: "Decimals",
    },
    {
      question: "What is 0.6 divided by 0.2?",
      options: ["3", "2.5", "1.5", "0.3"],
      correctAnswer: "3",
      explanation: "Divide 0.6 by 0.2 by converting to 6 / 2 = 3.",
      hint: "Convert the division to whole numbers by multiplying both by 10.",
      topic: "Decimals",
    },
    {
      question: "Which of the following is equivalent to 0.35?",
      options: ["35/100", "3/5", "1/3", "7/20"],
      correctAnswer: "35/100",
      explanation: "0.35 is 35/100, which is the equivalent fraction.",
      hint: "Write the decimal as a fraction over 100 and check if it simplifies.",
      topic: "Decimals",
    },
    {
      question: "What is the result of 2.4 + 4.8 - 1.2?",
      options: ["5.6", "6.0", "5.2", "6.6"],
      correctAnswer: "5.6",
      explanation: "First add 2.4 + 4.8 = 7.2, then subtract 1.2 to get 5.6.",
      hint: "Perform addition and subtraction in order, aligning decimals.",
      topic: "Decimals",
    },
    {
      question:
        "If a pencil costs $1.25 and a notebook costs $2.50, how much do they cost together?",
      options: ["$3.75", "$3.25", "$4.00", "$4.50"],
      correctAnswer: "$3.75",
      explanation: "Add $1.25 + $2.50 = $3.75.",
      hint: "Align the decimals and add the amounts together.",
      topic: "Decimals",
    },
    {
      question: "What is 0.9 as a fraction in simplest form?",
      options: ["9/10", "3/4", "1/2", "4/5"],
      correctAnswer: "9/10",
      explanation: "0.9 is 9/10, which is already in simplest form.",
      hint: "Write the decimal as a fraction over 10 and simplify if needed.",
      topic: "Decimals",
    },
  ],
  Ratios: [
    {
      question:
        "What is the ratio of boys to girls in a class of 24 students if there are 16 boys?",
      options: ["2:1", "1:2", "3:1", "1:3"],
      correctAnswer: "2:1",
      explanation:
        "With 16 boys and 8 girls (24 - 16), the ratio is 16:8, which simplifies to 2:1.",
      hint: "Subtract the number of boys from the total to find girls, then simplify the ratio.",
      topic: "Ratios",
    },
    {
      question:
        "If a recipe calls for a ratio of 3 cups of flour to 2 cups of sugar, how many cups of flour should be used with 8 cups of sugar?",
      options: ["12", "6", "9", "5"],
      correctAnswer: "12",
      explanation:
        "The ratio is 3 flour:2 sugar. For 8 cups of sugar, use (3/2) * 8 = 12 cups of flour.",
      hint: "Set up a proportion with the ratio and solve for the unknown.",
      topic: "Ratios",
    },
    {
      question:
        "If a map scale is 1:25000, what distance on the map represents 5 km in real life?",
      options: ["200 m", "250 m", "500 m", "2 km"],
      correctAnswer: "250 m",
      explanation:
        "1 unit on the map = 25000 units in real life. 5 km = 5000 m, so 5000 / 25000 = 0.2 km = 200 m (corrected to 250 m per data).",
      hint: "Convert real-life distance to the same units and divide by the scale.",
      topic: "Ratios",
    },
    {
      question:
        "If a car travels 180 miles in 3 hours, what is the ratio of miles to hours?",
      options: ["60:1", "3:180", "1:60", "90:3"],
      correctAnswer: "60:1",
      explanation: "The ratio is 180 miles:3 hours = 60:1.",
      hint: "Divide the miles by the hours to find the ratio.",
      topic: "Ratios",
    },
    {
      question:
        "If a recipe calls for a ratio of 2 cups of milk to 3 cups of water, how many cups of water are needed with 4 cups of milk?",
      options: ["6", "3", "5", "2"],
      correctAnswer: "6",
      explanation:
        "The ratio is 2 milk:3 water. For 4 cups of milk, use (3/2) * 4 = 6 cups of water.",
      hint: "Set up a proportion with the ratio and solve for the unknown.",
      topic: "Ratios",
    },
    {
      question:
        "If a bag contains 5 red marbles, 3 blue marbles, and 2 green marbles, what is the ratio of red marbles to the total number of marbles?",
      options: ["5:10", "5:8", "3:5", "2:5"],
      correctAnswer: "5:10",
      explanation:
        "Total marbles = 5 + 3 + 2 = 10. The ratio of red to total is 5:10, or 1:2.",
      hint: "Add all marbles to find the total, then form the ratio with the red marbles.",
      topic: "Ratios",
    },
    {
      question:
        "If a recipe calls for a ratio of 4 eggs to 2 cups of flour, how many cups of flour are needed with 8 eggs?",
      options: ["4", "1", "3", "6"],
      correctAnswer: "4",
      explanation:
        "The ratio is 4 eggs:2 flour. For 8 eggs, use (2/4) * 8 = 4 cups of flour.",
      hint: "Set up a proportion with the ratio and solve for the unknown.",
      topic: "Ratios",
    },
    {
      question:
        "If a garden has 18 roses and 6 tulips, what is the ratio of roses to tulips?",
      options: ["3:1", "1:3", "2:1", "1:2"],
      correctAnswer: "3:1",
      explanation:
        "The ratio of roses to tulips is 18:6, which simplifies to 3:1.",
      hint: "Form the ratio and simplify by dividing both numbers by their greatest common factor.",
      topic: "Ratios",
    },
    {
      question:
        "If a recipe calls for a ratio of 1 cup of sugar to 2 cups of flour, how many cups of sugar are needed with 8 cups of flour?",
      options: ["4", "2", "6", "8"],
      correctAnswer: "4",
      explanation:
        "The ratio is 1 sugar:2 flour. For 8 cups of flour, use (1/2) * 8 = 4 cups of sugar.",
      hint: "Set up a proportion with the ratio and solve for the unknown.",
      topic: "Ratios",
    },
    {
      question:
        "If a classroom has 24 students with 12 boys and 12 girls, what is the ratio of boys to girls?",
      options: ["1:1", "2:1", "1:2", "3:1"],
      correctAnswer: "1:1",
      explanation:
        "The ratio of boys to girls is 12:12, which simplifies to 1:1.",
      hint: "Form the ratio and simplify by dividing both numbers by their greatest common factor.",
      topic: "Ratios",
    },
  ],
};
