import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { ingredients, dishType } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful chef." },
      { role: "user", content: `I have ${ingredients}. Make me a ${dishType}.` },
    ],
  });

  return NextResponse.json({ recipe: completion.choices[0].message.content });
}