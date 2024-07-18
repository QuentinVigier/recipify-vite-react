

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center w-full p-10 mx-auto md:w-2/3">
        <h3 className="text-2xl font-semibold text-center text-secondary">Abonnez-vous à notre newsletter hebdomadaire</h3>
        <p className="flex mt-6 text-lg font-light leading-normal text-center text-gray-600">Un email par semaine avec nos dernière recettes, des astuces de cuisine <br /> et des recommandations de produits</p>
        
        <div className="flex flex-col items-center justify-center w-full gap-4 mt-6 mb-20 md:flex-row md:px-8">
            <input className="flex flex-grow px-4 py-4 text-gray-400 rounded outline-none placeholder:text-[#1b2629]" type="text" placeholder="Name" />
            <input className="flex flex-grow px-4 py-4 text-gray-400 rounded outline-none placeholder:text-[#1b2629]" type="text" placeholder="Email Adress" />
            <button className="px-8 py-4 text-base font-semibold text-center transition duration-200 ease-in border border-[#9c702a] hover:bg-btnColor text-secondary hover:text-white rounde-lg focus:outline-none">S'inscrire</button>
        </div>
    </div>
  )
}

export default NewsLetter