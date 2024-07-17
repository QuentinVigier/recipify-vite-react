import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

interface Recipe {
    id: string,
    name: string,
    img: string,
    tempsprépa: string,
    difficulté: string,
    type: string,
    région: string,
    ingrédients: string,
    instructions: string,
    portions: string,
    conseils: string,
}

const Search = () => {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Recipe[]>([]); // Utilisation de l'interface Recipe
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get("query");
        if (queryParam) {
            setQuery(queryParam);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchItems = async () => {
            if (query.trim() === "") return;
            setLoading(true);
            try {
                const response = await fetch(`https://recettes-api.vercel.app/recettes`);
                const data: Recipe[] = await response.json(); // Utilisation de l'interface Recipe
                // Filtrage des résultats
                const filteredData = data.filter((item: Recipe) => // Utilisation de l'interface Recipe
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filteredData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Une erreur est survenue lors de la recherche");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [query]);

    return (
        <div className="mx-auto max-w-screen-2xl">
        <Header />
        <div className="px-6 py-20 lg:px-12">
            <h1 className="py-10 text-3xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">Recherche</h1>
            <div className="relative flex items-center p-4 mx-auto bg-white rounded md:max-w-3xl">
                <IoSearchOutline className="w-5 h-5 mr-2 text-neutral-400" />
                <input 
                    className="outline-none w-full placeholder:text-[#1b2629]" 
                    name="query" 
                    type="search" 
                    placeholder="Cherche une recette" 
                    id="search" 
                    required 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}
            {!loading && results.length === 0 && <p>Aucune recette trouvée</p>}
            <ul>
                {results && results.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default Search;
