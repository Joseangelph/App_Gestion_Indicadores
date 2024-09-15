import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import PropTypes from 'prop-types';
import { AuthContext } from "../../Context/AuthContext";


export const RutasExperto = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    const tokenExpired = isExpired(usuario.token_access);

    if( (usuario.role === "administrador"||usuario.role === "experto") && tokenExpired ){
        return <>{children} </>
        
    }

    else{
        return <Navigate to='/home' />
    }

}



RutasExperto.propTypes = {
    children: PropTypes.element
}
