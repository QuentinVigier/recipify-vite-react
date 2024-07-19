import { useState, useEffect } from "react";
import Header from "../components/Header"
import RecipeCardCategory from "../components/RecipeCardCategory";
import CategoryWrapper from "../components/CategoryWrapper";

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

const Recettes = () => {
    const [listRecettes, setListRecettes] = useState([]);
    const [error, setError] = useState("");

    const fetchRecettes = async () => {
        const url = 'https://recettes-api.vercel.app/recettes';
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "False") {
                setListRecettes([]);
            } else {
                setListRecettes(data);
            }
            console.log("Data fetched: ", data);
        } catch (error) {
            setError("Une erreur est survenue lors de la récupération des recettes");
        }
    };

    useEffect(() => {
        fetchRecettes();
    }, []);
    return (
        <div className="mx-auto max-w-screen-2xl">
            <Header />
            <div className='flex flex-col items-center justify-center w-full py-20'>
                <CategoryWrapper />
            </div>
            <h1 className="py-10 text-3xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">Toutes les recettes</h1>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="grid grid-cols-2 gap-8 mt-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {listRecettes && listRecettes.map((item: Recipe) => (
                    <RecipeCardCategory item={item} key={item.id} />
                ))}
            </ul>
        </div>
    )
}

export default Recettes