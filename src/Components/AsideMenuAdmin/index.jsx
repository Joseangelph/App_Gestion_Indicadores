import { NavLink } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaUserPen } from "react-icons/fa6";
import './styles.css'


function AsideMenuAdmin(){

    const activeStyle = 'underline underline-offset-4'

    return (
        <div className="aside-menu-container relative w-1/5 mb-32">
            <aside className="aside-menu border rounded-sm fixed bg-sky-600 border-black w-1/5 overflow-y-auto h-screen">

                <ul className="flex flex-col items-start py-5 px-5 text-lg">
                    
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
                                Inicio
                            </div>
                            
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarUsuarios'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <FaUserPen className="icon"/>
                                Gestionar Usuarios
                            </div>
                            
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarIndicadores'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Gestionar Indicadores
                            </div>
                            
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarCategorias'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Gestionar categorías de análisis
                            </div>
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarDestinos'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Gestionar destinos de Impactos
                            </div>
                            
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarComponentes'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Gestionar componentes
                            </div>
                            
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarDimensiones'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Gestionar dimensiones
                            </div>
                            
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarSubdimensiones'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Gestionar subdimensiones
                            </div>
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <NavLink 
                            to='/gestionarPlataformas'
                            className={({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <div className="flex">
                                <IoIosCreate className="icon" />
                                Gestionar plataformas tecnológicas
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </aside>
        </div>
        
    )

}

export default AsideMenuAdmin