import { HiBars3BottomRight } from "react-icons/hi2"
import { RiCloseCircleLine } from "react-icons/ri"
import { NavLink } from "react-router-dom"

interface MobileNavProps {
    menuItems: string[];
    onClose: () => void;
    onOpen: () => void;
    hideLeft: string;
}

const MobileNav = ({ menuItems, onClose, onOpen, hideLeft }: MobileNavProps) => {
    return (
        <div className="flex items-center justify-between h-16 px-6 lg:px-12">
            <NavLink to="/">
            <img src="/logo.jpg" alt="logo" className="w-20 h-20" />
            </NavLink>
            <button className="border rounded border-primary" onClick={onOpen}>
                <HiBars3BottomRight className="w-7 h-7" />
            </button>

            <div className={`transition-all w-full h-full fixed bg-primary z-50 top-0 ${hideLeft} flex justify-center items-center`}>
                <button className="absolute right-8 top-32" onClick={onClose}>
                    <RiCloseCircleLine className="w-7 h-7" />
                </button>

                <div>
                    <ul className="flex flex-col gap-5">
                        {
                            menuItems?.map((item: string, index: number) => (
                                <li key={index}>
                                    <NavLink to={item} className='font-medium capitalize text-secondary'>{item}</NavLink>
                                </li>
                            ))}
                    </ul>

                    <ul className="flex items-center gap-4 mt-10 font-medium">
                        <li>
                            <button className="px-4 py-2 border-2 rounded text-secondary border-secondary">Login</button>
                        </li>
                        <li>
                            <button className="px-4 py-2 border-2 rounded text-secondary border-secondary">Sign up</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default MobileNav