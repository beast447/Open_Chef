export default function IngredientsList({
  ingredients,
}: Readonly<{
  ingredients: string[];
}>) {
  return (
    <div className="max-w-md bg-gray-900 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
      <ul className="list-disc list-inside">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="text-white-700">
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
}   