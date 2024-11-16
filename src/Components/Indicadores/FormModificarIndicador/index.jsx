import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../Context/AuthContext';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


const EditarIndicador = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [indicador, setIndicador] = useState(null);
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos del usuario seleccionado
    const loadIndicador = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/indicadores/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setIndicador(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    loadIndicador();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIndicador({ ...indicador, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/gestion_indicadores/api/indicadores/${id}/`, indicador, {
        headers: {
          Authorization: `Bearer ${usuario.tokenAccess}`,
        },
      });

      if (response.status === 200) {
        console.log('Usuario actualizado exitosamente');
        navegar('/gestionarIndicadores');  // Redirigir a la lista de usuarios después de guardar
      }
    } catch (error) {
      console.error('Error al actualizar el indicador', error);
    }
  };

  if (!indicador) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col items-center justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar Indicador
          </Typography>

          <TextField
            label="Nombre"
            name="nombre"
            value={indicador.nombre}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="Concepto"
            name="concepto"
            value={indicador.concepto}
            onChange={handleInputChange}
            margin="normal"
          />

          {/* TextField deshabilitado para mostrar la dimension*/}
          <TextField
            label="Dimensión"
            name="dimension"
            value={indicador.dimension_nombre || ''}
            disabled // Propiedad para deshabilitar el campo
            margin="normal"
          />

          {/* TextField deshabilitado para mostrar la subdimension*/}
          <TextField
            label="Subdimensión"
            name="subdimension"
            value={indicador.subdimension_nombre || ''}
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
              onClick={() => navegar('/gestionarIndicadores')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      
    </Box>
  );
};

export default EditarIndicador;


  