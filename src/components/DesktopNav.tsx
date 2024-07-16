import { NavLink } from "react-router-dom"

interface DesktopNavProps {
    menuItems: string[];
}

const DesktopNav = ({ menuItems }: DesktopNavProps) => {
    return (
        <div className="h-16 flex justify-between items-center px-6 lg:px-12">

            <NavLink to="/">Recipify</NavLink>
            <ul className="flex gap-7">
                {menuItems.map((item: string, index: number) => (
                    <li key={index}>
                        <NavLink to={`/${item}`} className='font-medium capitalize text-secondary'>{item}</NavLink>
                    </li>
                ))}
            </ul>

            <ul className="flex items-center gap-4 font-medium">
                <li>
                    <button className="text-secondary px-4 py-2 rounded border border-secondary">Login</button>
                </li>
                <li>
                    <button className="text-secondary px-4 py-2 rounded border border-secondary">Sign up</button>
                </li>
            </ul>
        </div>

    )
}

export default DesktopNav