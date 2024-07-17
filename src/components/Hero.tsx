import { IoSearchOutline } from "react-icons/io5"
import { NavLink } from "react-router-dom"


const Hero = () => {
  return (
    <div className="px-5 mb-10 xl:px-10 md:w-1/2">
        <h1 className="mt-6 mb-10 text-5xl xl:text-6xl text-center font-bold text-[#2A3342] leading-normal xl:leading-relaxed">
            Un blog fait pour les amoureux de la 
            <span className="text-orange-300"> cuisine du monde</span></h1>

            <form action="/search" className="relative flex items-center p-4 bg-white rounded">
            <NavLink to="/search" className="absolute inset-y-0 left-0 flex items-center pl-3"></NavLink>
            <IoSearchOutline className="w-5 h-5 mr-2 text-neutral-400"/>
            <input className="outline-none w-full placeholder:text-[#1b2629]" name="query" type="search" placeholder="Cherche une recette" id="search" required />
            </form>
    </div>
  )
}

export default Hero