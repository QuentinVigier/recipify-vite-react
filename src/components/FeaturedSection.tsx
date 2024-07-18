import FeaturedImg from "../assets/featured.webp"


const FeaturedSection = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-12 px-5 my-4 overflow-hidden md:flex-row sm:my-20 md:gap-20 lg:px-10">
        <div className="relative">
            <div className="absolute top-4 left6( bg-white text-secondary px-3 py-1 rounded-md uppercase trackind-wider">Featured Recipe</div>
            <img src={FeaturedImg} alt="Featured Image"></img>
        </div>

        <div className="text-start sm:w-1/2">
            <h2 className="text-3xl font-semibold text-secondary sm:text-5xl sm:leading-relaxed">Pizza à l'ananas et au jacquier fumé</h2>
            <p className="mt-4 text-xl text-[#5c5c5c]">Découvrez notre recette de la semaine, pizza à l'ananas et au jacquier fumé, avec des ingrédients variés et des préparations délicieuses. Servir avec une salade et des tomates pour un repas équilibré</p>
            <div className="lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex mt-12">
                    <button className="w-full px-8 py-4 text-base font-semibold text-center transition duration-200 ease-in border border-[#9c702a] hover:bg-btnColor text-secondary hover:text-white rounde-lg focus:outline-none">Voir la recette</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedSection