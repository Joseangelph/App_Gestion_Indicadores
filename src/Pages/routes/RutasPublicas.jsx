import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import PropTypes from 'prop-types';
import { AuthContext } from "../../Context/AuthContext";



export const RutasPublicas = ({ children }) => {

    const {usuario} = useContext(AuthContext)

    // console.log()
    const tokenExpired = isExpired(usuario.tokenAccess);
 


    return !tokenExpired ? <Navigate to='/' /> : children;
}


RutasPublicas.propTypes = {
    children: PropTypes.element.isRequired
}

