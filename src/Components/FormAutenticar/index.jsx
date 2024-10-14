import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

import { decodeToken, isExpired } from "react-jwt";
import { types } from '../../types/types';
// import PropTypes from 'prop-types';

const FormAutenticar = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const context = useContext(AuthContext)

  const navegar= useNavigate();

  const { dispatch } = useContext(AuthContext);


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/sesion/api/token/', { username, password });
  //     // Almacenar el token en el localstorage
  //     console.log(response)
  //     localStorage.setItem('access_token', response.data.access);
  //     localStorage.setItem('refresh_token', response.data.refresh);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
  //     navigate("/home");
  //     context.setPush(!context.push)

  //   } catch (error) {
  //     // alert("Error al iniciar sesión");
  //     if (error.response) {
  //       console.log('Error de autenticación:', error.response.data);
  //       alert('Error: ' + error.response.data.detail); // El mensaje exacto del backend
  //     } else {
  //       console.log('Error en la solicitud:', error.message);
  //     }
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/sesion/api/token/', { username, password });
      // Almacenar el token en el localstorage
      console.log(response)
      // localStorage.setItem('access_token', response.data.access);
      // localStorage.setItem('refresh_token', response.data.refresh);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

      const tokenAccess = response.data.access;
      const tokenRefresh = response.data.refresh;
      const role= response.data.role;
      const first_name= response.data.first_name;
      const last_name= response.data.last_name;
      const nombreUsuario= response.data.username;


      const usuario = decodeToken(tokenAccess).username;

      localStorage.setItem('access_token', tokenAccess);
      localStorage.setItem('refresh_token', tokenRefresh);
      
      if (!isExpired(tokenAccess)) {

      

        const accion = {
            type: types.login,
            payload: {
                usuario,
                nombreUsuario,
                first_name,
                last_name,
                role,
                tokenAccess,
                tokenRefresh
            }
        }

        dispatch(accion);
        
        navegar('/home', {
            replace: true
        });
        
      }

    } catch (error) {
      alert("Error al iniciar sesión");
      if (error.response) {
        console.log('Error de autenticación:', error.response.data);
        alert('Error: ' + error.response.data.detail); // El mensaje exacto del backend
      } else {
        console.log('Error en la solicitud:', error.message);
      }
    }
  };

  
  return (
    <div className="form-container z-10 shadow-2xl flex  flex-col items-center justify-center w-1/3 h-96 bg-sky-200 rounded-lg">
      {/* <p className=' Titulo pb-5 text-2xl '> Bienvenido a SIGIMI </p> */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs rounded-sm bg-sky-200 p-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-semibold  mb-2" htmlFor="username">
            Nombre de usuario
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Introduzca el nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Introduzca la contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex items-center justify-center">
            
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Aceptar
          </button>
          
        </div>
      </form>

            {/* <button
                className="btnCuenta mt-3"
                onClick={() => setTieneCuenta(false)}
            >
                ¿No tienes cuenta?
            </button> */}
    </div>
  );

};

// FormAutenticar.propTypes = {
//   setTieneCuenta: PropTypes.func.isRequired
// }

export default FormAutenticar;
