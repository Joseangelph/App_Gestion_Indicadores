import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../Context/AuthContext';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


const EditarPlataforma = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [plataforma, setPlataforma] = useState(null);
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos de la Plataforma seleccionada
    const loadPlataforma = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_plataformas/api/plataformas/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setPlataforma(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    loadPlataforma();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlataforma({ ...plataforma, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/gestion_plataformas/api/plataformas/${id}/`, plataforma, {
        headers: {
          Authorization: `Bearer ${usuario.tokenAccess}`,
        },
      });

      if (response.status === 200) {
        console.log('Usuario actualizado exitosamente');
        navegar('/gestionarPlataformas');  // Redirigir a la lista de usuarios después de guardar
      }
    } catch (error) {
      console.error('Error al actualizar el indicador', error);
    }
  };

  if (!plataforma) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col items-center justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar plataforma tecnológica
          </Typography>

          <TextField
            label="nombre"
            name="nombre"
            value={plataforma.nombre}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="descripcion"
            name="descripcion"
            value={plataforma.descripcion}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="proyecto"
            name="proyecto"
            value={plataforma.proyecto}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="url"
            name="url"
            value={plataforma.url}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="alcance"
            name="alcance"
            value={plataforma.alcance}
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
              onClick={() => navegar('/gestionarPlataformas')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      
    </Box>
  );
};

export default EditarPlataforma;


  