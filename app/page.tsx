"use client";

import { useState } from "react";
import { ChefHat } from "lucide-react";
import IngredientsList from "./components/IngredientsList";
import Recipe from "./components/Recipe";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setRecipe("Cooking up something delicious...");
    try {

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("no body stream");
    const decoder = new TextDecoder();

    let result = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;
        
      const chunk = decoder.decode(value);
      result += chunk;

      setRecipe(result);
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    setRecipe("An error occurred while fetching the recipe. Please try again.");
  } finally {
    setLoading(false);
  }
}

function newRecipe() {
  setRecipe(null);
  setIngredients([]);
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 mt-4">
      <div className="flex items-center gap-1 ">
        <ChefHat size={48} className={`text-red-500 ${loading ? "animate-spin" : ""}`} />
        <h1 className="text-2xl font-bold">Open Chef</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          required
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 w-full max-w-lg"
          name="ingredients"
          type="text"
          placeholder="Apples, Chicken, Bacon..."
          maxLength={50}
        />
      </form>
      
      {ingredients.length < 1 && <p className="text-gray-500">Add at least 3 ingredients to get a recipe</p>}
      {ingredients.length > 0 && 
      <IngredientsList 
      ingredients={ingredients}
      />}
      
      {ingredients.length >= 3 && <button
        onClick={!recipe ? getRecipe : newRecipe}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${recipe ? "bg-green-500 hover:bg-green-600" : ""} 
        ${loading ? "cursor-not-allowed opacity-50" : ""}  `}
        disabled={loading}
      >
        {recipe ? "New Recipe" : "Get Recipe"}
      </button>}
      
      {recipe && <Recipe 
      recipe={recipe}/>}
    </main>
  );
}
