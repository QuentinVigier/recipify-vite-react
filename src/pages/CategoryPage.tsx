import { useParams } from "react-router-dom"
import Header from "../components/Header"
import CategoryWrapper from "../components/CategoryWrapper";


const CategoryPage = () => {
    const {category} = useParams();
  return (
    <>
    <Header />
    <div px-6 lg:px-12 py-20>
        <h1 className="text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed capitalize">{category}</h1>
        <CategoryWrapper />
    </div>
    </>
  )
}

export default CategoryPage