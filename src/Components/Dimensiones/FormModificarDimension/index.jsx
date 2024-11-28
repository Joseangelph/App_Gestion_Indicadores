import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,Radio, FormControlLabel} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';
import { getComponentes } from '../../../Services/componentes.api';
import { getDestinos } from '../../../Services/destinos.api';


const EditarDimension = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [dimension, setDimension] = useState(null);
  const [errors, setErrors] = useState({}); // Estado para los errores
  const [componentes, setComponentes] = useState([]); // Estado para los componentes
  const [destinos, setDestinos] = useState([]); 
  const [herencia, setHerencia] = useState('destino'); // Estado para controlar qué select está habilitado
  const componentesHabilitados = componentes.filter(componente => componente.habilitado);
  const destinosHabilitados = destinos.filter(destino => destino.habilitado);
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
        setDimension({
          ...response.data,
          destino_impacto: "", // Vacío si no está definido
          componente: "", // Vacío si no está definido
        });
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    // Cargar los componentes
    const fetchComponentes = async () => {
      try {
        const response = await getComponentes(usuario.tokenAccess); // Función para llamar la API
        setComponentes(response.data);
      } catch (error) {
        console.error('Error al obtener los Componentes :', error);
      }
    };

     // Cargar los destinos de impacto
     const fetchDestinos = async () => {
      try {
        const response = await getDestinos(usuario.tokenAccess); // Función para llamar la API
        setDestinos(response.data);
      } catch (error) {
        console.error('Error al obtener los Destinos :', error);
      }
    };

    loadDimension();
    fetchComponentes();
    fetchDestinos();
  }, [id, usuario.tokenAccess]);


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};

    if (!dimension.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(dimension.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }

    if (!dimension.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";

    if (herencia === 'destino' && !dimension.destino_impacto) {
      tempErrors.selects = "Debe seleccionar un destino de impacto.";
    }
    if (herencia === 'componente' && !dimension.componente) {
      tempErrors.selects = "Debe seleccionar un componente.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimension({ ...dimension, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    if (validateForm()) {  
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
    }
  };


  const handleHerenciaChange = (event) => {
    const newHerencia = event.target.value;
    setHerencia(newHerencia);
    
    // Limpia el campo deshabilitado para evitar que se envíe su valor
    setDimension({
      ...dimension,
      destino_impacto: newHerencia === 'componente' ? '' : dimension.destino_impacto,
      componente: newHerencia === 'destino' ? '' : dimension.componente,
    });
  };


  if (!dimension) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar dimensión
          </Typography>

          <TextField
            label="Nombre"
            name="nombre"
            value={dimension.nombre}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
          />

          <TextField
            label="Concepto"
            name="concepto"
            value={dimension.concepto}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.concepto)}
            helperText={errors.concepto}
            multiline // Convierte el TextField en un textarea
            rows={4} // Número de filas visibles iniciales
          />

          {/* Contenedor para Destino de Impacto */}
          <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
            <FormControl fullWidth disabled={herencia === 'componente'}>
              <InputLabel>Destino de impacto al que pertenece</InputLabel>
              <Select
                name="destino_impacto"
                value={dimension.destino_impacto}
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
            <FormControlLabel
              control={
                <Radio 
                  checked={herencia === 'destino'} 
                  onChange={handleHerenciaChange} 
                  value="destino" 
                  color="primary" 
                />
              }
              label=""
            />
          </Box>

          {/* Contenedor para Componente */}
          <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
            <FormControl fullWidth disabled={herencia === 'destino'}>
              <InputLabel>Componente al que pertenece</InputLabel>
              <Select
                name="componente"
                value={dimension.componente}
                onChange={handleInputChange}
                label="Componente al que pertenece"
              >
                {componentesHabilitados.map((componente) => (
                  <MenuItem key={componente.id} value={componente.id}>
                    {componente.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Radio 
                  checked={herencia === 'componente'} 
                  onChange={handleHerenciaChange} 
                  value="componente" 
                  color="primary" 
                />
              }
              label=""
            />
          </Box>

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


  