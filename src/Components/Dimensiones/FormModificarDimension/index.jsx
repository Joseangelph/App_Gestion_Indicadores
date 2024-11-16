import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';


const EditarDimension = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [dimension, setDimension] = useState(null);
  // const [componentes, setComponentes] = useState([]); // Estado para los componentes
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos de la Dimension seleccionada
    const loadDimension = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/dimensiones/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setDimension(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    // // Cargar los componentes
    // const loadComponentes = async () => {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:8000/gestion_indicadores/api/componentes/', {
    //       headers: {
    //         Authorization: `Bearer ${usuario.tokenAccess}`,
    //       },
    //     });
    //     setComponentes(response.data);
    //   } catch (error) {
    //     console.error('Error al cargar los componentes', error);
    //   }
    // };

    loadDimension();
    // loadComponentes();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimension({ ...dimension, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/gestion_indicadores/api/dimensiones/${id}/`, dimension, {
        headers: {
          Authorization: `Bearer ${usuario.tokenAccess}`,
        },
      });

      if (response.status === 200) {
        console.log('Usuario actualizado exitosamente');
        navegar('/gestionarDimensiones');  // Redirigir a la lista de usuarios después de guardar
      }
    } catch (error) {
      console.error('Error al actualizar la dimension', error);
    }
  };

  if (!dimension) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col items-center justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar Dimensión
          </Typography>

          <TextField
            label="nombre"
            name="nombre"
            value={dimension.nombre}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="concepto"
            name="concepto"
            value={dimension.concepto}
            onChange={handleInputChange}
            margin="normal"
          />

          {/* TextField deshabilitado para mostrar el componente */}
          <TextField
            label="Componente"
            name="componente"
            value={dimension.componente_nombre || ''}
            disabled // Propiedad para deshabilitar el campo
            margin="normal"
          />

          {/* TextField deshabilitado para mostrar el componente */}
          <TextField
            label="Destino de impacto"
            name="destino"
            value={dimension.destino_impacto_nombre || ''}
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
              onClick={() => navegar('/gestionarDimensiones')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      
    </Box>
  );
};

export default EditarDimension;


  