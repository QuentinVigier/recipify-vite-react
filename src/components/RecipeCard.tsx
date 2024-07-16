
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
    return (
        recettes.map((recette: Card) => (
            <div className="recette" key={recette.id}></div>
        ))
    )
}

export default RecipeCard