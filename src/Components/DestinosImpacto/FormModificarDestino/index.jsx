import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';


const EditarDestino = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [destino, setDestino] = useState(null);
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos del Destino seleccionado
    const loadDestino = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/destinos/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setDestino(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    // Cargar las categorías de análisis
    const loadCategorias = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/gestion_indicadores/api/categorias/', {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar categorías', error);
      }
    };

    loadDestino();
    loadCategorias();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDestino({ ...destino, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/gestion_indicadores/api/destinos/${id}/`, destino, {
        headers: {
          Authorization: `Bearer ${usuario.tokenAccess}`,
        },
      });

      if (response.status === 200) {
        console.log('Usuario actualizado exitosamente');
        navegar('/gestionarDestinos');  // Redirigir a la lista de usuarios después de guardar
      }
    } catch (error) {
      console.error('Error al actualizar el indicador', error);
    }
  };

  if (!destino) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col items-center justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar Destino de impacto
          </Typography>

          <TextField
            label="nombre"
            name="nombre"
            value={destino.nombre}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="concepto"
            name="concepto"
            value={destino.concepto}
            onChange={handleInputChange}
            margin="normal"
          />

          {/* TextField deshabilitado para mostrar la categoría de análisis */}
          <TextField
            label="Categoría de Análisis"
            name="categoria_analisis"
            value={destino.categoria_analisis_nombre || ''} // Asegúrate de que este valor exista
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
              onClick={() => navegar('/gestionarDestinos')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      
    </Box>
  );
};

export default EditarDestino;


  