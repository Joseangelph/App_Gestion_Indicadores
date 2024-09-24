import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../Context/AuthContext';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


const FormModificarUsuario = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [user, setUser] = useState(null);
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
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
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
        Editar Usuario
        </Typography>
      <TextField
        label="Nombre"
        name="first_name"
        value={user.first_name}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Apellido"
        name="last_name"
        value={user.last_name}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Username"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Role"
        name="role"
        value={user.role}
        onChange={handleInputChange}
        margin="normal"
      />
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


  