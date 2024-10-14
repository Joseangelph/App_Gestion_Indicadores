import { useNavigate, NavLink } from "react-router-dom"
import DefaultProfilePic from "./DefaultProfilePic.jpeg"
import { AuthContext } from "../../Context/AuthContext"
import { useContext } from "react"
import { IoIosLogOut } from "react-icons/io";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import NavigateNextSharp from "@mui/icons-material/NavigateNextSharp";
import { types } from '../../types/types';


function Navbar() {

    const profilePicture = DefaultProfilePic
    const {usuario} = useContext(AuthContext)

    const navegar = useNavigate();
    const { dispatch } = useContext(AuthContext);
    

    const logout = () => {
     
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        navegar('/', {
            replace: true
        });
        dispatch({ type: types.logout })
      
    };

    return (
        <nav className="flex justify-between border border-black bg-slate-200 items-center fixed top-0 z-10 w-full">
            <ul className="flex items-center justify-center py-5 px-8 text-sm  w-1/5 gap-9">
                <li className="font-semibold text-3xl">
                    <NavLink to='/home'>
                        SIGIMI
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-9 mr-10">
                <li className="flex">
                    
                    <div className="flex items-center ml-3">
                        <p>Bienvenido</p>
                        <span className="font-semibold m-2"> {usuario.nombreUsuario}</span>
                        <Tooltip title={[usuario.role," ",usuario.first_name," ", usuario.last_name]}>
                            <IconButton>
                            <img src={profilePicture} alt="Perfil" className="w-8 h-8 rounded-full object-cover" />
                            </IconButton>
                        </Tooltip>
                        
                    </div>
                    <div className="mt-1.5 ml-5">
                        <button
                            onClick={()=>logout()}
                        >
                            <IoIosLogOut size={25} />
                        </button>
                    </div>
                    

                </li>
            </ul>

        </nav>
    )
  }
  
  export default Navbar



