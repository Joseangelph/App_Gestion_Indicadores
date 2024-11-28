import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';


const EditarDestino = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [destino, setDestino] = useState(null);
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [errors, setErrors] = useState({}); // Estado para los errores
  const categoriasHabilitadas = categorias.filter(categoria => categoria.habilitado);
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


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};

    if (!destino.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(destino.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }
    
    if (!destino.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";
    if (!destino.categoria_analisis) {
      tempErrors.selects = "Debe seleccionar una categoría de análisis.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDestino({ ...destino, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    if (validateForm()) {
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
          Editar destino de impacto
          </Typography>

          <TextField
            label="Nombre"
            name="nombre"
            value={destino.nombre}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
          />

          <TextField
            label="Concepto"
            name="concepto"
            value={destino.concepto}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.concepto)}
            helperText={errors.concepto}
            multiline // Convierte el TextField en un textarea
            rows={4} // Número de filas visibles iniciales
          />

          {/* Select para elegir categoría */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría de análisis a la que pertenece</InputLabel>
          <Select
            name="categoria_analisis"
            value={destino.categoria_analisis}
            onChange={handleInputChange}
            label="Categoría de Análisis a la que pertenece"
          >
            {categoriasHabilitadas.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

          {/* <TextField
            label="Categoría de Análisis"
            name="categoria_analisis"
            value={destino.categoria_analisis_nombre || ''}
            disabled 
            margin="normal"
          />  */}
        
          {errors.selects && (
            <Typography color="error" variant="body2">
              {errors.selects}
            </Typography>
          )}
        
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


  