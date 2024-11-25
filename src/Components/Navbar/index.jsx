import { useNavigate, NavLink } from "react-router-dom";
import DefaultProfilePic from "./DefaultProfilePic.jpeg";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { types } from "../../types/types";
import logo from "./Logo.png";

function Navbar() {
    const profilePicture = DefaultProfilePic;
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch({ type: types.logout });
        navigate("/", { replace: true });
    };

    return (
        <nav className="flex justify-between items-center bg-slate-200 border-b border-gray-300 fixed top-0 z-10 w-full py-3 shadow-sm">
            {/* Logo y Título */}
            <div className="flex items-center justify-center text-sm  w-1/5">
                <NavLink to="/home" className="flex justify-center items-center text-3xl font-bold text-gray-800 hover:text-gray-600">
                    <img src={logo} alt="Logo" className="w-14 mx-2 object-contain" />
                    SIGIMI
                </NavLink>
            </div>

            {/* Información del usuario */}
            <div className="flex items-center gap-5 mr-10">
                <div className="flex items-center">
                    <p className="text-lg text-gray-700">Bienvenido,</p>
                    <span className="ml-2 text-lg font-semibold text-gray-800">{usuario.nombreUsuario}</span>
                </div>
                <Tooltip
                    title={
                        <div className="text-center">
                            <p className="font-semibold">{usuario.first_name} {usuario.last_name}</p>
                            <p className="text-sm text-gray-50">{usuario.role}</p>
                        </div>
                    }
                >
                    <IconButton>
                        <img src={profilePicture} alt="Perfil" className="w-10 h-10 rounded-full object-cover" />
                    </IconButton>
                </Tooltip>
                {/* Botón de Logout */}
                <button
                    onClick={logout}
                    className="flex items-center text-gray-700 hover:text-red-500 transition-all duration-200"
                >
                    <IoIosLogOut size={24} />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;



