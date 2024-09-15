import { useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import DefaultProfilePic from "./DefaultProfilePic.jpeg"
import { AuthContext } from "../../Context/AuthContext"
import { useContext } from "react"
import { IoIosLogOut } from "react-icons/io";


function Navbar() {

    const activeStyle = 'underline underline-offset-4'
    const  [profilePicture, setProfilePicture]= useState(DefaultProfilePic)
    const context = useContext(AuthContext)
    let navigate= useNavigate();

    const logout = () => {
        navigate("/")
        context.setUsuario("");
        context.setAutenticado(false);
        localStorage.removeItem('access_token');
      
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
                        <span className="font-semibold m-2"> {context.username}</span>
                        <img src={profilePicture} alt="Perfil" className="w-8 h-8 rounded-full object-cover" />
                    </div>
                    <div className="mt-1.5 ml-5">
                        <NavLink
                            onClick={()=>logout()}
                            to='/'
                            className={ ({ isActive}) =>
                            isActive ? activeStyle : undefined
                            }
                        >
                            <IoIosLogOut size={25} />
                        </NavLink>
                    </div>
                    

                </li>
            </ul>

        </nav>
    )
  }
  
  export default Navbar



