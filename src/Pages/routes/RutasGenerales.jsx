import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import PropTypes from 'prop-types';
import { AuthContext } from "../../Context/AuthContext";


export const RutasGenerales = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    const tokenExpired = isExpired(usuario.tokenAccess);

    if(!tokenExpired ){
        if((usuario.role === "experto")|| (usuario.role === "administrador") || (usuario.role === "cliente") ){
            return <>{children} </>
        }
        else {
            return <Navigate to='/home'/>
        }
        
    }

    else{
        return <Navigate to='/' />
    }

}



RutasGenerales.propTypes = {
    children: PropTypes.element
}
