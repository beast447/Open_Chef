"use client";

import { useState } from "react";
import { ChefHat } from "lucide-react";
import IngredientsList from "./components/IngredientsList";
import Recipe from "./components/Recipe";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string | null>(null);


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredients");

    setIngredients(prevIngredients => [
      ...prevIngredients,
      newIngredient as string
    ]);
    event.currentTarget.reset();
  }

  async function getRecipe() {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await res.json();
    setRecipe(data.recipe);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 mt-4">
      <div className="flex items-center gap-1 ">
        <ChefHat size={48} className="text-red-500" />
        <h1 className="text-2xl font-bold">Open Chef</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          required
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="ingredients"
          type="text"
          placeholder="Apples, Chicken, Bacon..."
        />
      </form>
      {ingredients.length < 1 && <p className="text-gray-500">Add at least 3 ingredients to get a recipe</p>}
      {ingredients.length > 0 && 
      <IngredientsList 
      ingredients={ingredients}
      />}
      {ingredients.length >= 3 && <button
        onClick={getRecipe}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {recipe ? "New Recipe" : "Get Recipe"}
      </button>}
      {recipe && <Recipe 
      recipe={recipe}/>}
    </main>
  );
}