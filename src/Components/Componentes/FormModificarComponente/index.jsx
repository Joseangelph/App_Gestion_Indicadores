import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';


const EditarComponente = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [componente, setComponente] = useState(null);
  const [destinos, setDestinos] = useState([]); // Estado para los destinos de impacto
  const [errors, setErrors] = useState({}); // Estado para los errores
  const destinosHabilitados = destinos.filter(destino => destino.habilitado);
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


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};
    if (!componente.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(componente.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }
    if (!componente.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";
    if (!componente.destino_impacto) {
      tempErrors.selects = "Debe seleccionar un destino de impacto.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComponente({ ...componente, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    if (validateForm()) {  
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
          Editar componente 
          </Typography>

          <TextField
            label="Nombre"
            name="nombre"
            value={componente.nombre}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
          />

          <TextField
            label="Concepto"
            name="concepto"
            value={componente.concepto}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.concepto)}
            helperText={errors.concepto}
            multiline // Convierte el TextField en un textarea
            rows={4} // Número de filas visibles iniciales
          />

          {/* Select para elegir el destino de impacto */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Destino de impacto al que pertenece</InputLabel>
          <Select
            name="destino_impacto"
            value={componente.destino_impacto}
            onChange={handleInputChange}
            label="Destino de impacto al que pertenece"
          >
            {destinosHabilitados.map((destino) => (
              <MenuItem key={destino.id} value={destino.id}>
                {destino.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {errors.selects && (
          <Typography color="error" variant="body2">
            {errors.selects}
          </Typography>
        )}

          {/* <TextField
            label="Destino de impacto"
            name="destino_impacto"
            value={componente.destino_impacto_nombre || ''} 
            disabled 
            margin="normal"
          /> */}
        
        
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


  