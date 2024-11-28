import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';
import { getDimensiones } from '../../../Services/dimensiones.api';


const EditarSubdimension = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [subdimension, setSubdimension] = useState(null);
  const [dimensiones, setDimensiones] = useState([]); // Estado para las dimensiones
  const dimensionesHabilitadas = dimensiones.filter(dimension => dimension.habilitado);
  const [errors, setErrors] = useState({}); // Estado para los errores
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
        const response = await getDimensiones(usuario.tokenAccess); // Función para llamar la API);
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
    if (validateForm()) {
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
    }
  };


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};
    if (!subdimension.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(subdimension.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }
    if (!subdimension.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";
    if (!subdimension.dimension) {
      tempErrors.selects = "Debe seleccionar una dimensión";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
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
            label="Nombre"
            name="nombre"
            value={subdimension.nombre}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
          />

          <TextField
            label="Concepto"
            name="concepto"
            value={subdimension.concepto}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.concepto)}
            helperText={errors.concepto}
            multiline // Convierte el TextField en un textarea
            rows={4} // Número de filas visibles iniciales
          />

            {/* Select para elegir la dimension */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Dimensión a la que pertenece</InputLabel>
            <Select
              name="dimension"
              value={subdimension.dimension}
              onChange={handleInputChange}
              label="Dimensión a la que pertenece"
            >
              {dimensionesHabilitadas.map((dimension) => (
                <MenuItem key={dimension.id} value={dimension.id}>
                  {dimension.nombre}
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
            label="Dimensión"
            name="dimension"
            value={subdimension.dimension_nombre || ''} 
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


  