export default function Recipe({recipe}: Readonly<{recipe: string | null}>) {

    return (
        <div className="max-w-md bg-gray-900 rounded-lg shadow-md p-4 mt-4 mb-10">
          <h2 className="text-xl font-semibold mb-4">Open Chef Recommends</h2>
          <pre className="whitespace-pre-wrap text-white-700 p-4 bg-gray-800 rounded-md">{recipe}</pre>
        </div>
      );
}