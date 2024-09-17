import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import PropTypes from 'prop-types';
import { AuthContext } from "../../Context/AuthContext";


export const RutasExperto = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    const tokenExpired = isExpired(usuario.tokenAccess);

    console.log("este es el experto")

    if(!tokenExpired ){
        if((usuario.role === "experto")){
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



RutasExperto.propTypes = {
    children: PropTypes.element
}
