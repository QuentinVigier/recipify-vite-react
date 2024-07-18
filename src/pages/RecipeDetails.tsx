import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const RecipeDetails = () => {
    const { id } = useParams();
    const [recette, setRecette] = useState<Recipe[]>([]);

    const getOneRecippe = useCallback(async () => {
        try {
            const response = await fetch(`https://recettes-api.vercel.app/recettes`);
            const data = await response.json();
            const filteredData = data.filter((item: Recipe) => item.id == id);
            setRecette(filteredData);
            console.log(filteredData);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        getOneRecippe();
    }, [getOneRecippe]);

    // La chaîne de caractères contenant les instructions
    const instructions = "1. Laver et couper la laitue. 2. Ajouter les croûtons et le parmesan. 3. Mélanger avec la sauce César. 4. Ajouter le poulet grillé en tranches.";

    // Fonction pour découper les instructions en un tableau
    const parseInstructions = (instructions: string): string[] => {
        // Utiliser une expression régulière pour diviser la chaîne sur les numéros suivis d'un point
        return instructions.split(/(?=\d+\.)/).map(instruction => instruction.trim());
    };

    const instructionList = parseInstructions(instructions);

    return (
        <>
            <Header />
            <section className="items-center justify-center min-h-dvh md:flex md:bg-eggshell">
                <article>
                    <div className="bg-white md:my-[5rem] md:py-8 pb-8 md:rounded-xl">
                        {recette.length > 0 && (
                            <>
                                <picture>
                                    <img src={recette[0].img} alt="Recette" className="md:max-w-[90%] w-full md:h-[570px] md:rounded-xl md:mx-auto" />
                                </picture>

                                <div className="px-8">
                                    <h1 className="mt-12 text-4xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">{recette[0].name}</h1>
                                    <p className="text-xl text-center sm:text-3xl sm:leading-relaxed">Pour {recette[0].portions} personnes - {recette[0].région} - {recette[0].type}</p>

                                    <article className="p-5 mt-6 rounded bg-[#F9F9F9]">
                                    <p className="text-xl text-center sm:text-3xl sm:leading-relaxed">{recette[0].difficulté} - {recette[0].tempsprépa}</p>
                                        <h3 className="ml-2 text-xl font-semibold">Temps de préparation</h3>
                                        <ul className="mt-3 ml-8 text-lg list-disc marker:text-[#9c702a] text-secondary marker:align-middle">
                                            <li className="pl-3">Temps de préparation : {recette[0].tempsprépa}</li>
                                        </ul>

                                        <div className="mt-5">
                                            <h3 className="ml-2 text-xl font-semibold">Ingrédients</h3>
                                            <ul className="mt-4 ml-8 list-disc marker:text-[#9c702a] text-secondary marker:align-middle">
                                                {
                                                    recette[0].ingrédients.map((item, index) => (
                                                        <li key={index} className="pl-3">
                                                            <span>{item.nom} : </span>
                                                            <span>{item.quantité}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        <div className="mt-5">
                                            <h3 className="ml-2 text-xl font-semibold">Instructions</h3>
                                            <ul className="mt-4 ml-8 list-disc marker:text-[#9c702a] text-secondary marker:align-middle">
                                                {
                                                    instructionList.map((item, index) => (
                                                        <li key={index} className="pl-3">{item}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        <div className="mt-5">
                                            <h3 className="ml-2 text-xl font-semibold">Conseils</h3>
                                            <p className="mt-4 ml-8 text-secondary">{recette[0].conseils}</p>
                                        </div>

                                    </article>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </section>
            <div className="flex items-center justify-center">
                <Footer />
            </div>
        </>
    );
}

export default RecipeDetails;
