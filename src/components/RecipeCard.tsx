import { GoClock } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Card {
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

interface Recettes {
    recettes: Card[],
}

const RecipeCard = ({ recettes }: Recettes) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites.map((fav: Card) => fav.id));
    }, []);

    const handleFavoriteClick = (recette: Card) => {
        let storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (favorites.includes(recette.id)) {
            storedFavorites = storedFavorites.filter((fav: Card) => fav.id !== recette.id);
        } else {
            storedFavorites.push(recette);
        }

        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        setFavorites(storedFavorites.map((fav: Card) => fav.id));
    };

    return (
        <>
            {recettes.map((recette: Card) => (
                <div className="container flex justify-center mx-auto md:justify-start" key={recette.id}>
                    <div className="max-w-sm">
                        <div className="relative transition duration-500 bg-white rounded-lg shadow-lg hover:shadow-xl">
                            <div className="w-64 h-48 overflow-hidden rounded-t-lg">
                                <img src={recette.img} alt={recette.name} className="object-cover w-full h-full" />
                            </div>
                            <div className="px-5 py-6 bg-white rounded-lg">
                                <NavLink to={`/recette/${recette.id}`}>
                                    <h1 className="mb-8 text-2xl font-bold text-gray-700 hover:text-gray-900 hover:cursor-pointer">{recette.name}</h1>
                                </NavLink>
                            </div>

                            <div className="flex flex-wrap items-center justify-between">
                                <button className={`px-4 py-2 mt-6 font-medium transition duration-300 rounded-lg shadow-md hover:shadow-lg`}>{recette.type}</button>

                                <div className="flex items-center py-2 mt-6">
                                    <GoClock />
                                    <span className="mx-1">{recette.tempsprépa}</span>
                                </div>
                            </div>
                            <div className="absolute px-4 py-2 bg-white rounded-lg top-2 right-2">
                                <span className="font-medium">{recette.difficulté}</span>
                            </div>
                            <div className="absolute cursor-pointer top-2 left-2" onClick={() => handleFavoriteClick(recette)}>
                                {favorites.includes(recette.id) ? <AiFillHeart className="text-red-500 w-7 h-7" /> : <AiOutlineHeart className="text-red-500 w-7 h-7" />}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default RecipeCard;
