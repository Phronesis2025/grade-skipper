import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { subject, topic, numQuestions } = await request.json();

    const prompt = `
    Generate ${numQuestions} multiple-choice questions for a 6th-grade level on the subject "${subject}" and topic "${topic}". Each question should have:
    - A question stem
    - 4 answer options (A, B, C, D)
    - The correct answer (e.g., "A")
    - A simple explanation using modern ideas or situations (e.g., relate fractions to splitting a playlist, or AI to a smart assistant).
    Format the response as a JSON array of objects, like this:
    [
      {
        "question": "What is 1/2 + 1/4?",
        "options": ["A) 3/4", "B) 1/2", "C) 1/4", "D) 1"],
        "correctAnswer": "A",
        "explanation": "To add 1/2 and 1/4, find a common denominator, like splitting a playlist into equal parts. 1/2 is 2/4, so 2/4 + 1/4 = 3/4."
      }
    ]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const questions = JSON.parse(completion.choices[0].message.content || "[]");

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
