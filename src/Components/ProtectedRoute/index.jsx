import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const ProtectedRoute = ({ children , allowedRoles }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    // Si el usuario no está autenticado, redirigir al login
    alert("1")
    return <Navigate to="/" />;
   
  }

  // Verificar si el rol del usuario está en la lista de roles permitidos
  if (!allowedRoles.includes(usuario.role)) {
    console.log(usuario)
    // Si el rol no es permitido, redirigir a otra página o mostrar un mensaje
    alert('El rol no es permitido')
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;