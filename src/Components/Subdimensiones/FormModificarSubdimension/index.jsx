import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';


const EditarSubdimension = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [subdimension, setSubdimension] = useState(null);
  const [dimensiones, setDimensiones] = useState([]); // Estado para las dimensiones
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos de la Subdimension seleccionada
    const loadSubdimension = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/subdimensiones/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setSubdimension(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    // Cargar las dimensiones
    const loadDimensiones = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/gestion_indicadores/api/dimensiones/', {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setDimensiones(response.data);
      } catch (error) {
        console.error('Error al cargar las dimensiones', error);
      }
    };

    loadSubdimension();
    loadDimensiones();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubdimension({ ...subdimension, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/gestion_indicadores/api/subdimensiones/${id}/`, subdimension, {
        headers: {
          Authorization: `Bearer ${usuario.tokenAccess}`,
        },
      });

      if (response.status === 200) {
        console.log('Subdimension actualizada exitosamente');
        navegar('/gestionarSubdimensiones');  // Redirigir a la lista de usuarios después de guardar
      }
    } catch (error) {
      console.error('Error al actualizar la subdimension', error);
    }
  };

  if (!subdimension) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col items-center justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar Subdimensión
          </Typography>

          <TextField
            label="nombre"
            name="nombre"
            value={subdimension.nombre}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="concepto"
            name="concepto"
            value={subdimension.concepto}
            onChange={handleInputChange}
            margin="normal"
          />

          {/* TextField deshabilitado para mostrar la dimension */}
          <TextField
            label="Dimensión"
            name="dimension"
            value={subdimension.dimension_nombre || ''} // Asegúrate de que este valor exista
            disabled // Propiedad para deshabilitar el campo
            margin="normal"
          />
        
        
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navegar('/gestionarSubdimensiones')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      
    </Box>
  );
};

export default EditarSubdimension;


  