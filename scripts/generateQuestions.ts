import fs from "fs/promises";
import path from "path";

const subjects = [
  { name: "Mathematics", topics: ["Fractions", "Decimals", "Ratios"] },
  {
    name: "Reading",
    topics: ["Comprehension", "Vocabulary", "Dystopian Themes"],
  },
  {
    name: "Science",
    topics: ["Earth Science", "Life Science", "Physical Science"],
  },
  {
    name: "History",
    topics: ["U.S. History", "Ancient Civilizations", "World Events"],
  },
  { name: "English", topics: ["Grammar", "Writing", "Spelling"] },
  { name: "Coding/AI", topics: ["What is AI?", "Basic Logic", "Sequencing"] },
  { name: "Logic Puzzles", topics: ["Patterns", "Riddles", "Sequences"] },
];

// Template for generating questions
function generateQuestionTemplate(topic: string, subject: string) {
  return {
    topic,
    question: `Sample question about ${topic} in ${subject}`,
    options: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
    correctAnswer: "A",
    explanation: "This is a sample explanation for the correct answer.",
    hint: "This is a sample hint to help students.",
    explanations: {
      correct: "This is a detailed explanation of why the answer is correct.",
      incorrect: {
        A: "This is why option A is incorrect.",
        B: "This is why option B is incorrect.",
        C: "This is why option C is incorrect.",
        D: "This is why option D is incorrect.",
      },
    },
  };
}

async function generateQuestions(
  subject: string,
  topic: string,
  numQuestions: number
) {
  // Generate questions using the template
  const questions = Array(numQuestions)
    .fill(null)
    .map((_, index) => ({
      ...generateQuestionTemplate(topic, subject),
      question: `Sample question ${index + 1} about ${topic} in ${subject}`,
    }));

  return questions;
}

async function saveQuestions() {
  for (const subject of subjects) {
    const subjectFile = subject.name.toLowerCase().replace(/\//g, "-") + ".ts";
    const questionsByTopic: Record<string, any[]> = {};

    for (const topic of subject.topics) {
      console.log(`Generating questions for ${subject.name} - ${topic}`);
      try {
        const questions = await generateQuestions(subject.name, topic, 10);
        questionsByTopic[topic] = questions;
      } catch (error) {
        console.error(
          `Error generating questions for ${subject.name} - ${topic}:`,
          error
        );
      }
    }

    const fileContent = `export const ${subject.name
      .toLowerCase()
      .replace(/\//g, "_")}Questions = ${JSON.stringify(
      questionsByTopic,
      null,
      2
    )};`;
    await fs.writeFile(path.join("lib/questions", subjectFile), fileContent);
  }
}

saveQuestions().then(() => console.log("Questions generated and saved!"));
