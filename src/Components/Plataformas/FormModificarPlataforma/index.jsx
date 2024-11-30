import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { AuthContext } from '../../../Context/AuthContext';




const EditarPlataforma = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [plataforma, setPlataforma] = useState(null);
  const { usuario } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos de la Plataforma seleccionada
    const loadPlataforma = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_plataformas/api/plataformas/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setPlataforma(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    loadPlataforma();
  }, [id, usuario.tokenAccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlataforma({ ...plataforma, [name]: value });  // Actualizar los valores del formulario
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/gestion_plataformas/api/plataformas/${id}/`, plataforma, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });

        if (response.status === 200) {
          console.log('Usuario actualizado exitosamente');
          navegar('/gestionarPlataformas');  // Redirigir a la lista de usuarios después de guardar
        }
      } catch (error) {
        console.error('Error al actualizar el indicador', error);
      }
    }
  };


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;%=]*)?$/;
    const tempErrors = {};

    // Validación del campo 'nombre'
    if (!plataforma.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(plataforma.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }

    // Validación de la descripción
    if (!plataforma.descripcion.trim()) {
      tempErrors.descripcion = "El campo 'descripcion' es obligatorio.";
    }

    // Validación del campo 'proyecto'
    if (!plataforma.proyecto.trim()) {
      tempErrors.proyecto = "El campo 'proyecto' es obligatorio.";
    } else if (!nombreRegex.test(plataforma.proyecto)) {
      tempErrors.proyecto = "El proyecto no puede contener números ni caracteres especiales.";
    }

    // Validación del campo 'url'
    if (!plataforma.url.trim()) {
      tempErrors.url = "El campo 'URL' es obligatorio.";
    } else if (!urlRegex.test(plataforma.url)) {
      tempErrors.url = "La URL no es válida. Ejemplo: https://example.com";
    }

    //Validación del campo 'alcance'
    if (!plataforma.alcance) tempErrors.alcance = "Debe seleccionar un alcance.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Retorna true si no hay errores
  };

  if (!plataforma) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box >
        <div className='flex flex-col items-center justify-center mt-10'>
          <Typography 
          variant="h4" 
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: 'Roboto, sans-serif' }}
          >
          Editar plataforma tecnológica
          </Typography>

          <TextField
            label="Nombre"
            name="nombre"
            value={plataforma.nombre}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={!!errors.nombre}
            helperText={errors.nombre}
          />

          <TextField
            label="Descripción"
            name="descripcion"
            value={plataforma.descripcion}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            multiline // Convierte el TextField en un textarea
            rows={4} // Número de filas visibles iniciales
            error={Boolean(errors.descripcion)}
            helperText={errors.descripcion}
          />

          <TextField
            label="Proyecto"
            name="proyecto"
            value={plataforma.proyecto}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.proyecto}
           helperText={errors.proyecto}
          />

          <TextField
            label="URL"
            name="url"
            value={plataforma.url}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            error={!!errors.url}
            helperText={errors.url}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="tipo-label">Alcance</InputLabel>
            <Select
              labelId="alcance-label"
              id="alcance"
              name="alcance"
              value={plataforma.alcance}
              onChange={handleInputChange}
              label="Alcance"
            >
              <MenuItem value="">
                <em>Selecciona el alcance</em>
              </MenuItem>
              <MenuItem value="nacional">Nacional</MenuItem>
              <MenuItem value="provincial">Provincial</MenuItem>
              <MenuItem value="municipal">Municipal</MenuItem>
            </Select>
            {errors.alcance && (
              <Typography color="error" variant="body2">
                {errors.alcance}
              </Typography>
            )}
          </FormControl>
        
        
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navegar('/gestionarPlataformas')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </Button>
          </Box>
        </div>
      
    </Box>
  );
};

export default EditarPlataforma;


  