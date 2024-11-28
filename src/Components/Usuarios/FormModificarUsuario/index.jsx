import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';


const FormModificarUsuario = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [user, setUser] = useState(null);
  const [usernameError, setUsernameError] = useState(''); // Estado para el error del nombre de usuario
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos del usuario seleccionado
    const loadUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/sesion/api/users/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    loadUser();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/sesion/api/users/${id}/`, user, {
        headers: {
          Authorization: `Bearer ${usuario.tokenAccess}`,
        },
      });

      if (response.status === 200) {
        console.log('Usuario actualizado exitosamente');
        navegar('/gestionarUsuarios');  // Redirigir a la lista de usuarios después de guardar
      }
    }  
    catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.username) {
          // Captura el error de nombre de usuario duplicado
          setUsernameError(error.response.data.username[0]);
        } else {
          alert(error.response.data.detail || "Error al registrar el usuario");
        }
      } else {
        alert("Error al registrar el usuario");
      }
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  };

  if (!user) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >

        <div className='flex flex-col items-center justify-center mt-10'>
        <Typography 
        variant="h4" 
        className="text-4xl font-bold text-blue-600"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
        >
        Editar usuario
        </Typography>

      <TextField
        label="Nombre de usuario"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        margin="normal"
        error={!!usernameError} // Mostrar error si existe
        helperText={usernameError} // Mostrar mensaje de error personalizado
      />

      <TextField
        label="Nombre"
        name="first_name"
        value={user.first_name}
        onChange={handleInputChange}
        margin="normal"
      />

      <TextField
        label="Apellidos"
        name="last_name"
        value={user.last_name}
        onChange={handleInputChange}
        margin="normal"
      />

      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="role-label">Rol</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={user.role}
          onChange={handleInputChange}
          label="Rol"
        >
          <MenuItem value="">
            <em>Selecciona el Rol</em>
          </MenuItem>
          <MenuItem value="administrador">Administrador</MenuItem>
          <MenuItem value="experto">Experto</MenuItem>
          <MenuItem value="cliente">Cliente</MenuItem>
        </Select>
      </FormControl>

      <Box mt={2}>

        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar Cambios
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navegar('/gestionarUsuarios')}
          style={{ marginLeft: '10px' }}
        >
          Cancelar
        </Button>
        
      </Box>
      </div>
      
    </Box>
  );
};

export default FormModificarUsuario;


  