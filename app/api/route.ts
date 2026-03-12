import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { ingredients } = await request.json();

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json(
      { error: "Invalid input. Please provide an array of ingredients." },
      { status: 400 }
    );
  }

  // Simulate recipe generation based on ingredients
  const recipe = `Here's a delicious recipe you can make with ${ingredients.join(
    ", "
  )}: ...`;

  return NextResponse.json({ recipe });
}