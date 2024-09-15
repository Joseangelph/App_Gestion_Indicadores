import { NavLink } from "react-router-dom"
import './styles.css'
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";


function AsideMenuExpert(){

    const activeStyle = 'underline underline-offset-4'

    return (
        <div className="aside-menu-container relative w-1/5">
            <aside className="aside-menu border rounded-sm fixed bg-sky-600 border-black w-1/5">

                <ul className="flex flex-col items-start py-5 px-8 text-lg">
                    
                    <li className="font-semibold text-xl py-2 mb-3">
                        Operaciones
                    </li>

                    <li className="py-2">
                        <NavLink 
                            to='/home'
                            className={({ isActive}) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <FaHome className="icon"/>
                                Home
                            </div>
                            
                        </NavLink>
                    </li>
                    {/* <li className="py-2">
                        <NavLink 
                            to='/crearIndicadores'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Crear Indicadores
                            </div>
                            
                        </NavLink>
                    </li> */}
                </ul>
            </aside>
        </div>
        
    )

}

export default AsideMenuExpert