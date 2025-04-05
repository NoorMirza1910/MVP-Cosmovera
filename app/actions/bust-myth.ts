"use server"

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function bustMyth(query: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable beauty and skincare expert. Analyze beauty myths and provide accurate, scientifically-backed responses."
        },
        {
          role: "user",
          content: `Analyze this beauty myth or question: "${query}". Please provide a structured response with these sections: 1. MYTH: Restate the myth or question clearly, 2. TRUTH: Provide a clear TRUE or FALSE or PARTIALLY TRUE verdict, 3. EXPLANATION: Give a scientific, evidence-based explanation in 2-3 sentences.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const textContent = response.choices[0].message.content || "";

    const mythMatch = textContent.match(/MYTH:(.+?)(?=TRUTH:|$)/);
    const truthMatch = textContent.match(/TRUTH:(.+?)(?=EXPLANATION:|$)/);
    const explanationMatch = textContent.match(/EXPLANATION:(.+?)(?=$)/);

    const result = {
      myth: mythMatch ? mythMatch[1].trim() : query,
      truth: truthMatch ? truthMatch[1].trim() : "ANALYSIS ERROR",
      explanation: explanationMatch ? explanationMatch[1].trim() : "Sorry, we couldn't analyze this myth properly.",
    };

    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error("Error busting myth:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

