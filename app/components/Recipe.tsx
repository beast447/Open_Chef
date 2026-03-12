type RecipeProps = {
  recipe: string;
};

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 shadow max-w-2xl mb-5">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        Recipe
      </h2>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {recipe}
      </p>
    </div>
  );
}