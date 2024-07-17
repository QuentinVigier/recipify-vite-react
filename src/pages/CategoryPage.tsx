import { useParams } from "react-router-dom";
import Header from "../components/Header";
import CategoryWrapper from "../components/CategoryWrapper";
import { useEffect, useState } from "react";

interface Recipe {
  id: string;
  name: string;
  img: string;
  tempsprépa: string;
  difficulté: string;
  type: string;
  région: string;
  ingrédients: string;
  instructions: string;
  portions: string;
  conseils: string;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string | undefined }>();
  const [results, setResults] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) {
      setError("Aucune catégorie sélectionnée.");
      return;
    }

    const fetchItems = async () => {
      console.log("Fetching items..."); // Log pour déboguer
      try {
        const response = await fetch(`https://recettes-api.vercel.app/recettes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Recipe[] = await response.json();
        console.log("Data fetched:", data); // Log pour déboguer
        const filteredData = data.filter((item: Recipe) =>
          item.type.toLowerCase().includes(category.toLowerCase())
        );
        setResults(filteredData);
        console.log("Filtered data:", filteredData); // Log pour déboguer
      } catch (err) {
        if (err instanceof Error) {
          console.error("Fetch error:", err); // Log pour déboguer
          setError(err.message);
        } else {
          setError("Une erreur est survenue lors de la recherche");
        }
      }
    };
    fetchItems();
  }, [category]);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />
      <div className="px-6 py-20 lg:px-12">
        <h1 className="py-10 text-3xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">
          {category || "Catégorie"}
        </h1>
        <CategoryWrapper />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {results && results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
