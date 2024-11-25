import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import PropTypes from 'prop-types';
import { AuthContext } from "../../Context/AuthContext";


export const RutasCliente = ({ children }) => {

    const { usuario } = useContext(AuthContext);

    const tokenExpired = isExpired(usuario.tokenAccess);

    console.log("este es el cliente")
    console.log(usuario)

    if(!tokenExpired ){
        if((usuario.role === "cliente")){
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



RutasCliente.propTypes = {
    children: PropTypes.element
}
