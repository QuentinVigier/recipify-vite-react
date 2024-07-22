import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Ingredient {
    nom: string;
    quantité: string;
}

interface Recipe {
    name: string;
    img: string;
    tempsprépa: string;
    difficulté: string;
    type: string;
    région: string;
    ingrédients: Ingredient[];
    instructions: string;
    portions: string;
    conseils: string;
}

const RecipeForm: React.FC = () => {
    const [recipe, setRecipe] = useState<Recipe>({
        name: "",
        img: "",
        tempsprépa: "",
        difficulté: "",
        type: "",
        région: "",
        ingrédients: [{ nom: "", quantité: "" }],
        instructions: "",
        portions: "",
        conseils: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!recipe.name) newErrors.name = "Le nom est requis.";
        if (!recipe.img) newErrors.img = "L'URL de l'image est requise.";
        if (!recipe.tempsprépa)
            newErrors.tempsprépa = "Le temps de préparation est requis.";
        if (!recipe.difficulté) newErrors.difficulté = "La difficulté est requise.";
        if (!recipe.type) newErrors.type = "Le type est requis.";
        if (!recipe.région) newErrors.région = "La région est requise.";
        if (recipe.ingrédients.some((ing) => !ing.nom || !ing.quantité))
            newErrors.ingrédients =
                "Tous les ingrédients doivent avoir un nom et une quantité.";
        if (!recipe.instructions)
            newErrors.instructions = "Les instructions sont requises.";
        if (!recipe.portions)
            newErrors.portions = "Le nombre de portions est requis.";
        if (!recipe.conseils) newErrors.conseils = "Les conseils sont requis.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: value,
        });
    };

    const handleIngredientChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
    ) => {
        const { name, value } = e.target;
        const newIngrédients = [...recipe.ingrédients];
        newIngrédients[index] = {
            ...newIngrédients[index],
            [name]: value,
        };
        setRecipe({
            ...recipe,
            ingrédients: newIngrédients,
        });
    };

    const addIngredient = () => {
        setRecipe({
            ...recipe,
            ingrédients: [...recipe.ingrédients, { nom: "", quantité: "" }],
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log(recipe);
            // Envoyer les données à l'API
            fetch("https://recettes-api.vercel.app/recettes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipe),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    return (
        <>
            <Header />
            <div className="mx-auto max-w-screen-2xl">
                <h1 className="py-10 text-3xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">
                    Ajouter une recette
                </h1>
                <form
                    className="flex flex-col mb-32 bg-white rounded-lg shadow-md lg:flex-row"
                    onSubmit={handleSubmit}
                >
                    <div className="lg:w-1/3">
                        <img
                            src="https://images.unsplash.com/photo-1511189975737-b5939ef6a944?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Recette"
                            className="hidden object-cover w-full h-full rounded-l-lg lg:block"
                        />
                    </div>
                    <div className="flex-1 p-8 mx-12">
                        <label className="block mb-4">
                            Nom :
                            <input
                                className="w-full p-2 mt-1 border rounded"
                                placeholder="Nom de la recette"
                                type="text"
                                name="name"
                                value={recipe.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <span className="text-red-500">{errors.name}</span>
                            )}
                        </label>
                        <label className="block mb-4">
                            Image URL :
                            <input
                                className="w-full p-2 mt-1 border rounded"
                                placeholder="https://images.unsplash.com/photo"
                                type="text"
                                name="img"
                                value={recipe.img}
                                onChange={handleChange}
                            />
                            {errors.img && <span className="text-red-500">{errors.img}</span>}
                        </label>
                        <label className="block mb-4">
                            Temps de préparation :
                            <input
                                className="w-full p-2 mt-1 border rounded"
                                placeholder="1h"
                                type="text"
                                name="tempsprépa"
                                value={recipe.tempsprépa}
                                onChange={handleChange}
                            />
                            {errors.tempsprépa && (
                                <span className="text-red-500">{errors.tempsprépa}</span>
                            )}
                        </label>
                        <label className="block mb-4">
                            Difficulté :
                            <select
                                className="w-full p-2 mt-1 border rounded"
                                name="difficulté"
                                value={recipe.difficulté}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner une difficulté</option>
                                <option value="Facile">Facile</option>
                                <option value="Moyen">Moyen</option>
                                <option value="Difficile">Difficile</option>
                            </select>
                            {errors.difficulté && (
                                <span className="text-red-500">{errors.difficulté}</span>
                            )}
                        </label>
                        <label className="block mb-4">
                            Type :
                            <select
                                className="w-full p-2 mt-1 border rounded"
                                name="type"
                                value={recipe.type}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un type</option>
                                <option value="Entrée">Entrée</option>
                                <option value="Plat">Plat</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Accompagnement">Accompagnement</option>
                                <option value="Boisson">Boisson</option>
                            </select>
                            {errors.type && (
                                <span className="text-red-500">{errors.type}</span>
                            )}
                        </label>


                        <label className="block mb-4">
                            Pays :
                            <input
                                className="w-full p-2 mt-1 border rounded"
                                placeholder="Japon - Corée - Italie - France..."
                                type="text"
                                name="région"
                                value={recipe.région}
                                onChange={handleChange}
                            />
                            {errors.région && (
                                <span className="text-red-500">{errors.région}</span>
                            )}
                        </label>
                        {recipe.ingrédients.map((ingredient, index) => (
                            <div key={index} className="flex flex-row w-full">
                                <label className="block">
                                    Ingrédient Nom :
                                    <input
                                        className="w-1/2 p-2 mt-1 border rounded"
                                        placeholder="Parmesan"
                                        type="text"
                                        name="nom"
                                        value={ingredient.nom}
                                        onChange={(e) => handleIngredientChange(index, e)}
                                    />
                                </label>
                                <label className="block">
                                    Quantité :
                                    <input
                                        className="w-1/2 p-2 mt-1 border rounded"
                                        placeholder="50 grammes"
                                        type="text"
                                        name="quantité"
                                        value={ingredient.quantité}
                                        onChange={(e) => handleIngredientChange(index, e)}
                                    />
                                </label>
                            </div>
                        ))}
                        {errors.ingrédients && (
                            <span className="text-red-500">{errors.ingrédients}</span>
                        )}
                        <button
                            type="button"
                            onClick={addIngredient}
                            className="px-4 py-4 mb-4 my-4 text-base font-semibold text-center transition duration-200 ease-in border hover:border-[#9c702a] bg-btnColor hover:text-secondary hover:bg-amber-400 text-white rounde-lg focus:outline-none"
                        >
                            Ajouter un ingrédient
                        </button>
                        <label className="block mb-4">
                            Instructions :
                            <textarea
                                className="w-full p-2 mt-1 border rounded"
                                placeholder="1. Préchauffer le four à 200°C pour 10 minutes.
2. Faire cuire le fromage jusqu'à ce qu'il soit doré et épais. ..."
                                name="instructions"
                                value={recipe.instructions}
                                onChange={handleChange}
                            ></textarea>
                            {errors.instructions && (
                                <span className="text-red-500">{errors.instructions}</span>
                            )}
                        </label>
                        <label className="block mb-4">
                            Portions :
                            <input
                                className="w-full p-2 mt-1 border rounded"
                                placeholder="Pour 10 personnes"
                                type="text"
                                name="portions"
                                value={recipe.portions}
                                onChange={handleChange}
                            />
                            {errors.portions && (
                                <span className="text-red-500">{errors.portions}</span>
                            )}
                        </label>
                        <label className="block mb-4">
                            Conseils :
                            <textarea
                                className="w-full p-2 mt-1 border rounded"
                                placeholder="Servir avec un fromage de chèvre ou un fromage de chèvre grillé"
                                name="conseils"
                                value={recipe.conseils}
                                onChange={handleChange}
                            ></textarea>
                            {errors.conseils && (
                                <span className="text-red-500">{errors.conseils}</span>
                            )}
                        </label>
                        <button
                            type="submit"
                            className="w-full px-4 py-4 mb-4 text-base font-semibold text-center transition duration-200 ease-in border hover:border-[#9c702a] bg-btnColor hover:text-secondary hover:bg-amber-400 text-white rounde-lg focus:outline-none"
                        >
                            Soumettre
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default RecipeForm;
