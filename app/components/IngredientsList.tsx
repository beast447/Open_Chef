type IngredientListProps = {
  ingredients: string[];
};

export default function IngredientsList({
  ingredients,
}: IngredientListProps) {
  return (
    <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Ingredients
      </h2>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="text-gray-700 dark:text-gray-300 flex items-center gap-2"
          >
            <span className="text-red-500">•</span>
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
}