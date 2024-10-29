import { NextResponse, NextRequest } from "next/server";
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const completion = await client.chat.completions.create({
    messages: messages,
    model: 'gpt-4o-mini',
  });

  return NextResponse.json(
    { success: true, content: completion.choices[0].message.content },
    { status: 200 }
  );
}
