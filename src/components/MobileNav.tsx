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
        <div className="h-16 flex justify-between items-center px-6 lg:px-12">
            <NavLink to="/">Recipify</NavLink>
            <button className="border border-primary rounded" onClick={onOpen}>
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

                    <ul className="flex items-center gap-4 font-medium mt-10">
                        <li>
                            <button className="text-secondary px-4 py-2 rounded border-2 border-secondary">Login</button>
                        </li>
                        <li>
                            <button className="text-secondary px-4 py-2 rounded border-2 border-secondary">Sign up</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default MobileNav