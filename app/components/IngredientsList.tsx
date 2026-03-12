export default function IngredientsList({
  ingredients,
}: Readonly<{
  ingredients: string[];
}>) {
  return (
    <div className="w-full max-w-md bg-grey rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Ingredients List</h2>
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