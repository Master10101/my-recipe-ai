import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

// We force this to only run when requested, preventing build errors
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Get the Key from Vercel's environment variables
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key in Vercel settings" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });
    const { ingredients, dishType } = await req.json();

    // 2. Ask the AI (Llama 3) for the recipe
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a master chef. Provide a recipe." },
        { role: "user", content: `I have ${ingredients}. I want to make ${dishType}.` }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return NextResponse.json({ recipe: chatCompletion.choices[0]?.message?.content });
  } catch (error) {
    return NextResponse.json({ error: "Check your Groq API Key" }, { status: 500 });
  }
}