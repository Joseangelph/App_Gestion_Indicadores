import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel,
  FormControl, Radio, FormControlLabel
} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';
import { getDimensiones } from '../../../Services/dimensiones.api';
import { getSubdimensiones } from '../../../Services/subdimensiones.api';


const EditarIndicador = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [indicador, setIndicador] = useState(null);
  const [errors, setErrors] = useState({}); // Estado para los errores
  const [dimensiones, setDimensiones] = useState([]);
  const [subdimensiones, setSubdimensiones] = useState([]);
  const [herencia, setHerencia] = useState('dimension'); // Estado para controlar qué select está habilitado
  const dimensionesHabilitadas = dimensiones.filter(dimension => dimension.habilitado);
  const subdimensionesHabilitadas = subdimensiones.filter(subdimension => subdimension.habilitado);
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
        setIndicador({
          ...response.data,
          dimension: "", // Vacío
          subdimension: "", // Vacío
        });
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    // Cargar los componentes
    const fetchDimensiones = async () => {
      try {
        const response = await getDimensiones(usuario.tokenAccess); // Función para llamar la API
        setDimensiones(response.data);
      } catch (error) {
        console.error('Error al obtener las dimensiones :', error);
      }
    };

     // Cargar los destinos de impacto
     const fetchSubdimensiones = async () => {
      try {
        const response = await getSubdimensiones(usuario.tokenAccess); // Función para llamar la API
        setSubdimensiones(response.data);
      } catch (error) {
        console.error('Error al obtener las subdimensiones:', error);
      }
    };

    loadIndicador();
    fetchDimensiones();
    fetchSubdimensiones();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIndicador({ ...indicador, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    if (validateForm()) {  
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
    }
  };


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};

    if (!indicador.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(indicador.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }
    
    if (!indicador.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";
    if (!indicador.tipo) tempErrors.tipo = "Debe seleccionar un tipo.";
    if (herencia === 'dimension' && !indicador.dimension) {
      tempErrors.selects = "Debe seleccionar una dimensión.";
    }
    if (herencia === 'subdimension' && !indicador.subdimension) {
      tempErrors.selects = "Debe seleccionar una subdimensión.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleHerenciaChange = (event) => {
    const newHerencia = event.target.value;
    setHerencia(newHerencia);
    // Limpia el campo deshabilitado para evitar que se envíe su valor
    setIndicador({
      ...indicador,
      dimension: newHerencia === 'subdimension' ? '' : indicador.dimension,
      subdimension: newHerencia === 'dimension' ? '' : indicador.subdimension,
    });
  };


  if (!indicador) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar indicador
          </Typography>

          <TextField
            label="Nombre"
            name="nombre"
            value={indicador.nombre}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
          />

          <TextField
            label="Concepto"
            name="concepto"
            value={indicador.concepto}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={Boolean(errors.concepto)}
            helperText={errors.concepto}
            multiline // Convierte el TextField en un textarea
            rows={4} // Número de filas visibles iniciales
          />

          {/* Contenedor para Dimensión */}
          <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
            <FormControl fullWidth disabled={herencia === 'subdimension'} >
              <InputLabel >Dimensión a la que pertenece</InputLabel>
              <Select
                name="dimension"
                value={indicador.dimension}
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
            <FormControlLabel
              control={
                <Radio 
                  checked={herencia === 'dimension'} 
                  onChange={handleHerenciaChange} 
                  value="dimension" 
                  color="primary" 
                />
              }
              label=""
            />
          </Box>

          {/* Contenedor para Subdimension */}
          <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
            <FormControl fullWidth disabled={herencia === 'dimension'}>
              <InputLabel>Subdimensión a la que pertenece</InputLabel>
              <Select
                name="subdimension"
                value={indicador.subdimension}
                onChange={handleInputChange}
                label="Subimensión a la que pertenece"
              >
                {subdimensionesHabilitadas.map((subdimension) => (
                  <MenuItem key={subdimension.id} value={subdimension.id}>
                    {subdimension.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Radio 
                  checked={herencia === 'subdimension'} 
                  onChange={handleHerenciaChange} 
                  value="subdimension" 
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

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              name="tipo"
              value={indicador.tipo}
              onChange={handleInputChange}
              label="Tipo"
            >
              <MenuItem value="">
                <em>Selecciona el Tipo</em>
              </MenuItem>
              <MenuItem value="potencial">Potencial</MenuItem>
              <MenuItem value="transversal">Transversal</MenuItem>
            </Select>
          </FormControl>
        
        
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


  