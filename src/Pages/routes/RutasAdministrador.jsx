import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import PropTypes from 'prop-types';
import { AuthContext } from "../../Context/AuthContext";


export const RutasAdministrador = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    const tokenExpired = isExpired(usuario.token_access);

    console.log(usuario)

    if( usuario.role === "administrador" && tokenExpired ){
        return <>{children}</>
    }

    else{
        return <Navigate to='/home' />
    }

}



RutasAdministrador.propTypes = {
    children: PropTypes.element
}
