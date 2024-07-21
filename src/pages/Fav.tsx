import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipeCardCategory from "../components/RecipeCardCategory";

interface Recipe {
    id: string,
    name: string,
    img: string,
    tempsprépa: string,
    difficulté: string,
    type: string,
    région: string,
    ingrédients: [{ nom: string, quantité: string }],
    instructions: string,
    portions: string,
    conseils: string,
}

const Fav = () => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
        // Retrieve favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
    }, []);

    return (
        <div className="mx-auto max-w-screen-2xl">
            <Header />
            <h1 className="py-10 text-3xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">Favoris</h1>
            <div className="container mx-auto my-40">
            <ul className="grid grid-cols-2 gap-8 mt-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {favorites.length > 0 ? (
                    favorites.map((item) => (
                        <li key={item.id}>
                            <RecipeCardCategory item={item} />
                        </li>
                    ))
                ) : (
                    <p className="text-center col-span-full">Aucun favori pour l'instant.</p>
                )}
            </ul>
                </div>
            <Footer />
        </div>
    );
}

export default Fav;
