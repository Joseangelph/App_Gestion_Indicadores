import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

import { decodeToken, isExpired } from "react-jwt";
import { types } from '../../types/types';
// import PropTypes from 'prop-types';

const FormAutenticar = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navegar= useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post('http://127.0.0.1:8000/sesion/api/token/', { username, password });
      console.log(response)

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
      setError("Error al iniciar sesión. Por favor, revisa tus credenciales.");
      if (error.response) {
        console.log('Error de autenticación:', error.response.data);
      } else {
        console.log('Error en la solicitud:', error.message);
      }
    }
  };

  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="Nombre de usuario"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 3, width:"90%" }}
        required
      />
      <TextField
        fullWidth
        type="password"
        label="Contraseña"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 4, width:"90%" }}
        required
      />
      <Button
        type="submit"
        variant="contained"
        // color="primary"
        fullWidth
        sx={{
          padding: "10px 0",
          fontSize: "16px",
          textTransform: "none",
          fontWeight: "bold",
          width:"40%",
          backgroundColor:"#242424"
        }}
      >
        Iniciar sesión
      </Button>
    </Box>
  );

};

export default FormAutenticar;
