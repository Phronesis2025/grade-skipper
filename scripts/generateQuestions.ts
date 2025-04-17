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

async function generateQuestions(
  subject: string,
  topic: string,
  numQuestions: number
) {
  const response = await fetch("http://localhost:3000/api/generate-questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, topic, numQuestions }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.questions;
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
