import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

// This connects to Groq instead of OpenAI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { ingredients, dishType } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful chef. Create a recipe based on ingredients. Use Markdown formatting."
        },
        {
          role: "user",
          content: `I have: ${ingredients}. I want to make: ${dishType}.`
        }
      ],
      model: "llama-3.3-70b-versatile", // This is a powerful FREE model
    });

    return NextResponse.json({ recipe: chatCompletion.choices[0]?.message?.content });
  } catch (error) {
    return NextResponse.json({ error: "API Error" }, { status: 500 });
  }
}