import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { forecast } = await req.json();

  if (!forecast) {
    return NextResponse.json({ error: "Missing forecast" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 150,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that gives brief and clear outfit recommendations.",
          },
          {
            role: "user",
            content: `You're a friendly outfit assistant. Based on the following weather data, suggest a short, helpful outfit idea.\n
      Keep your response under 2 sentences. Be concise and avoid repeating the weather data.\n
      Weather forecast:\n${JSON.stringify(forecast, null, 2)}`,
          },
        ],
      });

    const suggestion = completion.choices[0].message.content;
    return NextResponse.json({ suggestion });
  } catch (err) {
    console.error("OpenAI error:", err);
    return NextResponse.json({ error: "Failed to get suggestion" }, { status: 500 });
  }
}
