import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import PropTypes from 'prop-types';
import { AuthContext } from "../../Context/AuthContext";
// import { RutasExperto } from "./RutasExperto";


export const RutasAdministrador = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    const tokenExpired = isExpired(usuario.tokenAccess);

    console.log('este es el administador')

    if(!tokenExpired){
        if(usuario.role === "administrador"){
            return <>{children} </>
        }
        // else {
        //     return <Navigate to='/home'/>
        // }
        
    }

    else{
        return <Navigate to='/' />
    }

}



RutasAdministrador.propTypes = {
    children: PropTypes.element
}
