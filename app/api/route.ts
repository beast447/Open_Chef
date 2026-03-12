import { NextResponse } from "next/server";
import {streamText} from 'ai'
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL,
  });

export async function POST(request: Request) {
    try{

  const { ingredients } = await request.json();

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json(
      { error: "Invalid input. Please provide an array of ingredients." },
      { status: 400 }
    );
  }

  const completion = await openai.chat.completions.create({
    model: process.env.MODEL || "gpt-5-nano",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          `You are a helpful and precise assistant for creating recipes based on the ingredients provided by a user. 
           You will generate a recipe that includes a title, a time to prep and cook, a list of ingredients, and step-by-step instructions. 
           The recipe should be easy to follow and use the provided ingredients effectively.
           If the user inputs text that is not an ingredient, please ignore it and do not include it in the recipe.
           If the user appears to be prompting you for something other than a recipe, please respond with a polite message indicating that you can only create recipes based on the ingredients provided.
           If the user provides a large number of ingredients, please create a recipe that uses as many of them as possible, but do not feel obligated to use all of them if it does not make sense for the recipe.
           If the user provides numbers or measurements as part of the ingredients, please incorporate them into the recipe appropriately.`
      },
      {
        role: "user",
        content: `Create a recipe using the following ingredients: ${ingredients.join(
          ", "
        )}. Please provide a title, a list of ingredients, and step-by-step instructions.`,
      },
    ],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        controller.enqueue(encoder.encode(text));
      }

      controller.close();
    }
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    }
  });
}

catch (error) {
  console.error("Error generating recipe:", error);
  return NextResponse.json(
    { error: "An error occurred while generating the recipe." },
    { status: 500 }
  );}
}