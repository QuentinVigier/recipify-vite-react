import { useState, useEffect } from "react";
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryWrapper from './components/CategoryWrapper';
import RecipeCard from "./components/RecipeCard";
import { NavLink } from "react-router-dom";
import FeaturedSection from "./components/FeaturedSection";
import LatestRecipes from "./components/LatestRecipes";

function Home() {
  const [listRecettes, setListRecettes] = useState([]);
  const [error, setError] = useState("");

  const fetchRecettes = async () => {
    const url = 'https://recettes-api.vercel.app/recettes?_limit=5';
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "False") {
        setListRecettes([]);
      } else {
        setListRecettes(data.slice(0,5));
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
    <>
      <div className="mx-auto max-w-screen-2xl">
        <Header />
        <p className="text-center text-red-500">{error ? error : ""}</p>
        <div className='container mx-auto'>
          <div className='flex flex-col items-center justify-center w-full py-20'>
            <Hero />
            <CategoryWrapper />
          </div>
          <ul className="grid grid-cols-2 mt-20 gap-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <RecipeCard recettes={listRecettes} />
          </ul>
          <div className="flex justify-center py-5">
            <NavLink to="/recettes">
            <button className="px-6 py-2 text-center uppercase bg-orange-300 rounded-2xl">Voir plus de recettes</button>
            </NavLink>
          </div>
          <FeaturedSection />
          <LatestRecipes />
        </div>
      </div>
    </>
  )
}

export default Home;
