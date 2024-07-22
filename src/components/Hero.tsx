import { IoSearchOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/search?query=' + event.currentTarget.query.value);

  };

  return (
    <div className="px-5 mb-10 xl:px-10 md:w-1/2">
      <h1 className="mt-6 mb-10 text-5xl xl:text-6xl text-center font-bold text-[#2A3342] leading-normal xl:leading-relaxed">
        Un blog fait pour les amoureux de la
        <span className="text-orange-300"> cuisine du monde</span></h1>

      <form className="relative flex items-center p-4 bg-white rounded" onSubmit={handleSubmit}>
        <IoSearchOutline className="w-5 h-5 mr-2 text-neutral-400" />
        <input className="outline-none w-full placeholder:text-[#1b2629]" name="query"
          type="search" placeholder="Chercher une recette" id="search" required />
      </form>
    </div>
  )
}

export default Hero