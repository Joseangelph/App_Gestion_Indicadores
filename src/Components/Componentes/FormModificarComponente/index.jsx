import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';


const EditarComponente = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [componente, setComponente] = useState(null);
  const [destinos, setDestinos] = useState([]); // Estado para los destinos de impacto
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos del Componente seleccionado
    const loadComponente = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/componentes/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setComponente(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    // Cargar los destinos de impacto
    const loadDestinos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/gestion_indicadores/api/destinos/', {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setDestinos(response.data);
      } catch (error) {
        console.error('Error al cargar los destinos de impacto', error);
      }
    };

    loadComponente();
    loadDestinos();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComponente({ ...componente, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/gestion_indicadores/api/componentes/${id}/`, componente, {
        headers: {
          Authorization: `Bearer ${usuario.tokenAccess}`,
        },
      });

      if (response.status === 200) {
        console.log('Usuario actualizado exitosamente');
        navegar('/gestionarComponentes');  // Redirigir a la lista de usuarios después de guardar
      }
    } catch (error) {
      console.error('Error al actualizar el indicador', error);
    }
  };

  if (!componente) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col items-center justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar Componente de impacto
          </Typography>

          <TextField
            label="nombre"
            name="nombre"
            value={componente.nombre}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            label="concepto"
            name="concepto"
            value={componente.concepto}
            onChange={handleInputChange}
            margin="normal"
          />

          {/* TextField deshabilitado para mostrar el destino de impacto */}
          <TextField
            label="Destino de impacto"
            name="destino_impacto"
            value={componente.destino_impacto_nombre || ''} // Asegúrate de que este valor exista
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
              onClick={() => navegar('/gestionarComponentes')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      
    </Box>
  );
};

export default EditarComponente;


  