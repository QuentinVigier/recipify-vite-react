import { useState } from "react";
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryWrapper from './components/CategoryWrapper';
import RecipeCard from "./components/RecipeCard";

function Home() {

  const [listRecettes, setListRecettes] = useState([]);
  const [error, setError] = useState("");

  const fetchRecettes = async () => {
    const url = 'https://recettes-api.vercel.app/recettes';
    try {
      const res = await fetch(url)
      const data = await res.json();
      if(data.Response === "False") {
        setListRecettes([]);
      } else {
        setListRecettes(data);
      }
      console.log("Data fetched : ", data);
    } catch (error) {
      setError("Une erreur est survenue lors de la récupération des recettes");
    }
  };

  fetchRecettes();

  return (
    <>
    <div className="max-w-screen-2xl mx-auto">
      <Header />
      <p className="text-center text-red-500">{error ? error : ""}</p>
      <div className='container mx-auto'>
        <div className='flex flex-col justify-center items-center w-full py-20'>
        <Hero />
        <CategoryWrapper />
        </div>
        <RecipeCard recettes={listRecettes} />
      </div>
    </div>
    </>
  )
}

export default Home
