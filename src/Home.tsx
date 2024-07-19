import { useState, useEffect } from "react";
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryWrapper from './components/CategoryWrapper';
import RecipeCard from "./components/RecipeCard";
import { NavLink } from "react-router-dom";
import FeaturedSection from "./components/FeaturedSection";
import NewsLetter from "./components/NewsLetter";
import CompanyLogo from "./components/CompanyLogo";
import Footer from "./components/Footer";

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
          <FeaturedSection />
          <section className="pt-8">
          <h2 className="text-3xl font-semibold text-center text-secondary sm:text-5xl sm:leading-relaxed">Nos dernières recettes</h2>
          <ul className="grid grid-cols-2 mt-20 gap-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <RecipeCard recettes={listRecettes} />
          </ul>
          </section>
          <div className="flex justify-center py-5">
            <NavLink to="/recettes">
            <button className="w-full px-8 py-4 text-base font-semibold text-center transition duration-200 ease-in border border-[#9c702a] hover:bg-btnColor text-secondary hover:text-white rounde-lg focus:outline-none">Voir plus de recettes</button>
            </NavLink>
          </div>
          <NewsLetter />
          <CompanyLogo />
        </div>
        <div className="flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Home;
