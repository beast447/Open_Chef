import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
    try{

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL,
  });

  const { ingredients } = await request.json();

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json(
      { error: "Invalid input. Please provide an array of ingredients." },
      { status: 400 }
    );
  }

  const completion = await openai.chat.completions.create({
    model: process.env.MODEL || "gpt-5-nano",
    messages: [
      {
        role: "system",
        content:
          `You are a helpful and precise assistant for creating recipes based on the ingredients provided by a user. 
           You will generate a recipe that includes a title, a list of ingredients, and step-by-step instructions. 
           The recipe should be easy to follow and use the provided ingredients effectively.`
      },
      {
        role: "user",
        content: `Create a recipe using the following ingredients: ${ingredients.join(
          ", "
        )}. Please provide a title, a list of ingredients, and step-by-step instructions.`,
      },
    ],
  });

  const recipe = completion.choices[0].message.content;

  return NextResponse.json({ recipe });
}
catch (error) {
  console.error("Error generating recipe:", error);
  return NextResponse.json(
    { error: "An error occurred while generating the recipe." },
    { status: 500 }
  );}
}