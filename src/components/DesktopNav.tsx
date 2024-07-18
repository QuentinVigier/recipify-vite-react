import { NavLink } from "react-router-dom"

interface DesktopNavProps {
    menuItems: string[];
}

const DesktopNav = ({ menuItems }: DesktopNavProps) => {
    return (
        <div className="flex items-center justify-between h-16 px-6 lg:px-12">

            <NavLink to="/">
            <img src="/logo.jpg" alt="logo" className="w-20 h-20" />
            </NavLink>
            <ul className="flex gap-7">
                {menuItems.map((item: string, index: number) => (
                    <li key={index}>
                        <NavLink to={`/${item}`} className='font-medium capitalize text-secondary'>{item}</NavLink>
                    </li>
                ))}
            </ul>

            <ul className="flex items-center gap-4 font-medium">
                <li>
                    <button className="px-4 py-2 border rounded text-secondary border-secondary">Login</button>
                </li>
                <li>
                    <button className="px-4 py-2 border rounded text-secondary border-secondary">Sign up</button>
                </li>
            </ul>
        </div>

    )
}

export default DesktopNav