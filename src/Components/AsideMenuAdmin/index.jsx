import { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { FaHome, FaUserFriends, FaClipboardList, FaLayerGroup } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { AuthContext } from '../../Context/AuthContext';
import './styles.css';

function AsideMenuAdmin() {
    const activeStyle = "hover:bg-green-900";
    const { usuario } = useContext(AuthContext);
    const isAdmin = usuario.role=== 'administrador';
    const isExpert = usuario.role === 'experto';
    const isClient = usuario.role === 'cliente';

    return (
        <div className="aside-menu-container relative w-1/5 h-screen bg-gray-800 text-white shadow-lg rounded-sm">
            <aside className="flex flex-col h-full">
                {/* Header */}
                <div className="py-4 text-center font-semibold text-xl border-b border-sky-800">
                    Panel de Administración
                </div>

                {/* Menu Items */}
                <ul className="flex flex-col py-4 space-y-2">
                    <li>
                        <NavLink to="/home" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-green-900"}`}>
                            <FaHome className="mr-3" />
                            Inicio
                        </NavLink>
                    </li>

                    {isAdmin && (<li>
                        <NavLink to="/gestionarUsuarios" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-green-900"}`}>
                            <FaUserFriends className="mr-3" />
                            Gestionar Usuarios
                        </NavLink>
                    </li>)}

                    {(isAdmin||isExpert)&&(<li>
                        <NavLink to="/gestionarIndicadores" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-green-900"}`}>
                            <FaClipboardList className="mr-3" />
                            Indicadores
                        </NavLink>
                    </li>)}

                    {(isAdmin||isExpert)&&(<li>
                        <NavLink to="/gestionarCategorias" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-green-900"}`}>
                            <MdCategory className="mr-3" />
                            Categorías de análisis
                        </NavLink>
                    </li>)}

                    {(isAdmin||isExpert)&&(<li>
                        <NavLink to="/gestionarDestinos" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-green-900"}`}>
                            <IoIosCreate className="mr-3" />
                            Destinos de impacto
                        </NavLink>
                    </li>)}

                    {(isAdmin||isExpert)&&(<li>
                        <NavLink to="/gestionarComponentes" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-sky-700"}`}>
                            <FaLayerGroup className="mr-3" />
                            Componentes
                        </NavLink>
                    </li>)}

                    {(isAdmin||isExpert)&&(<li>
                        <NavLink to="/gestionarDimensiones" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-sky-700"}`}>
                            <FaLayerGroup className="mr-3" />
                            Dimensiones
                        </NavLink>
                    </li>)}

                    {(isAdmin||isExpert)&&(<li>
                        <NavLink to="/gestionarSubdimensiones" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-sky-700"}`}>
                            <FaLayerGroup className="mr-3" />
                            Subdimensiones
                        </NavLink>
                    </li>)}

                    <li>
                        <NavLink to="/gestionarEvaluacionesPlataformas" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-sky-700"}`}>
                            <FaClipboardList className="mr-3" />
                            Evaluaciones de plataformas
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/gestionarPlataformas" className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? activeStyle : "hover:bg-sky-700"}`}>
                            <FaClipboardList className="mr-3" />
                            Plataformas tecnológicas
                        </NavLink>
                    </li>

                </ul>

                {/* Footer */}
                <div className="mt-auto py-4 text-center text-sm border-t border-sky-800">
                    &copy; 2024 PCTM
                </div>
            </aside>
        </div>
    );
}

export default AsideMenuAdmin;