import { NavLink } from "react-router-dom"

interface CategoryItemProps {
    name: string;
    href: string;
    backgroundColor: string;
    color: string;
}

function CategoyItem({ name, href, backgroundColor, color }: CategoryItemProps) {
    const style = {
        backgroundColor: backgroundColor,
        color: color,
        borderColor: color,
    };
    return (
        <NavLink to={href}>
            <div className="px-6 py-2 text-center uppercase rounded-full" style={style}>{name}</div>
        </NavLink>
    )
}

function CategoryList() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            <CategoyItem name="entrées" href="/categories/entrées" backgroundColor="#f0f5c4" color="#59871f" />
            <CategoyItem name="petit-déjeuner" href="/categories/petit-déjeuner" backgroundColor="#efedfa" color="#3c3a8f" />
            <CategoyItem name="déjeuner" href="/categories/déjeuner" backgroundColor="#e5f7f3" color="#1f8787" />
            <CategoyItem name="desserts" href="/categories/desserts" backgroundColor="#e8f5fa" color="#397a9e" />
            <CategoyItem name="accompagnements" href="/categories/accompagnements" backgroundColor="#feefc9" color="#d16400" />
            <CategoyItem name="boissons" href="/categories/boissons" backgroundColor="#ffeae3" color="#f0493e" />
        </div>
    )
}

const CategoryWrapper = () => {
    return (
        <div>
            <CategoryList />
        </div>
    )
}

export default CategoryWrapper