import { useParams } from "react-router-dom"
import Header from "../components/Header"
import CategoryWrapper from "../components/CategoryWrapper";


const CategoryPage = () => {
    const {category} = useParams();
  return (
    <div className="mx-auto max-w-screen-2xl">
    <Header />
    <div px-6 lg:px-12 py-20>
        <h1 className="py-10 text-3xl font-semibold text-center capitalize text-secondary sm:text-6xl sm:leading-relaxed">{category}</h1>
        <CategoryWrapper />
    </div>
    </div>
  )
}

export default CategoryPage