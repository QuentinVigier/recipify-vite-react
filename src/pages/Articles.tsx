import Footer from "../components/Footer";
import Header from "../components/Header"
import { NavLink } from 'react-router-dom';
const blogData = [
    {
        "title": "Les Secrets d'un Risotto Crémeux",
        "date": "July 19, 2024",
        "description": "Découvrez comment préparer un risotto crémeux parfait à chaque fois avec nos astuces et techniques infaillibles.",
        "views": "3.5K views",
        "imgSrc": "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "category": "Recettes"
    },
    {
        "title": "La Magie des Pâtisseries Françaises",
        "date": "July 19, 2024",
        "description": "Plongez dans l'univers gourmand des pâtisseries françaises avec nos recettes détaillées et conseils de chef.",
        "views": "4.7K views",
        "imgSrc": "https://images.unsplash.com/photo-1606757870492-9fc7cf1e736d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "category": "Desserts"
    },
    {
        "title": "5 Salades d'Été Rafraîchissantes",
        "date": "July 19, 2024",
        "description": "Découvrez nos recettes de salades d'été, parfaites pour rester frais et en bonne santé pendant la saison chaude.",
        "views": "2.9K views",
        "imgSrc": "https://images.unsplash.com/photo-1623855244697-5d8fbe9c7892?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "category": "Salades"
    },
    {
        "title": "Le Poulet Rôti Parfait : Astuces et Recettes",
        "date": "July 19, 2024",
        "description": "Apprenez à maîtriser l'art du poulet rôti avec nos conseils d'experts et des recettes savoureuses.",
        "views": "5.1K views",
        "imgSrc": "https://images.unsplash.com/photo-1630564510846-09d14907db47?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "category": "Plats Principaux"
    },
];


const Articles = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
    <Header />
    <section className="px-6 py-20 lg:px-12">
    <h1 className="py-10 text-3xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">Articles</h1>

    <article className="py-6 sm:py-12">
        <div className="container p-6 mx-auto space-x-8">
            <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Lorem ipsum dolor sit amet.</h2>
            <p className="mb-16 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, corrupti repudiandae voluptates delectus dolor nihil?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    blogData.map((item, index) => (
                        <article key={index} className="flex flex-col mt-8 border rounded-md">
                            <NavLink to={`/articles/${item.title}`}>
                            <img className="object-cover w-full h-52" src={item.imgSrc} alt={item.title} />
                            </NavLink>
                            <div className="flex flex-col flex-1 p-6">
                                <NavLink to={`/articles/${item.title}`}>
                            <h3 className="flex-1 py-2 text-lg leading-snugfont-semibold">{item.title}</h3>
                                </NavLink>
                            <p className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600">{item.category}</p>
                            <p className="text-sm">{item.description}</p>
                            <p className="text-sm">{item.views}</p>
                            </div>
                        </article>
                    ))
                }
            </div>
        </div>
    </article>
    </section>
    <Footer />
    </div>
  )
}

export default Articles