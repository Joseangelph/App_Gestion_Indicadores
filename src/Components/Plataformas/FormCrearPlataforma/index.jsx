import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createPlataforma } from '../../../Services/plataformas.api';

const FormCrearPlataforma = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    proyecto: '',
    url: '',
    alcance: '',
  });

  const { usuario } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo

  const navegar= useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await createPlataforma(formData,usuario.tokenAccess)
        setOpenDialog(true); // Abre el diálogo de éxito
        return response.data;
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  };


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;%=]*)?$/;
    const tempErrors = {};

    // Validación del campo 'nombre'
    if (!formData.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(formData.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }

    // Validación de la descripción
    if (!formData.descripcion.trim()) {
      tempErrors.descripcion = "El campo 'descripcion' es obligatorio.";
    }

    // Validación del campo 'proyecto'
    if (!formData.proyecto.trim()) {
      tempErrors.proyecto = "El campo 'proyecto' es obligatorio.";
    } else if (!nombreRegex.test(formData.proyecto)) {
      tempErrors.proyecto = "El proyecto no puede contener números ni caracteres especiales.";
    }

    // Validación del campo 'url'
    if (!formData.url.trim()) {
      tempErrors.url = "El campo 'URL' es obligatorio.";
    } else if (!urlRegex.test(formData.url)) {
      tempErrors.url = "La URL no es válida. Ejemplo: https://example.com";
    }

    //Validación del campo 'alcance'
    if (!formData.alcance) tempErrors.alcance = "Debe seleccionar un alcance.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Retorna true si no hay errores
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarPlataformas"); // Redirige después de cerrar el diálogo
  };

  return (
    
<Box className="form-container flex flex-col items-center justify-center mt-10 w-1/2 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar plataforma tecnológica
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full p-1">
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.nombre}
          helperText={errors.nombre}
        />
        
        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(errors.descripcion)}
          helperText={errors.descripcion}
          multiline // Convierte el TextField en un textarea
          rows={4} // Número de filas visibles iniciales
        />

        <TextField
          label="Proyecto"
          name="proyecto"
          value={formData.proyecto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.proyecto}
          helperText={errors.proyecto}
        />

        <TextField
          label="URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.url}
          helperText={errors.url}
        />

        {/* <TextField
          label="Alcance"
          name="alcance"
          value={formData.alcance}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(errors.alcance)}
          helperText={errors.alcance}
        /> */}

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="tipo-label">Alcance</InputLabel>
          <Select
            labelId="alcance-label"
            id="alcance"
            name="alcance"
            value={formData.alcance}
            onChange={handleChange}
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
        
        <Box mt={2} className="flex items-center justify-between">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Crear
          </Button>

          <Button
          variant="outlined"
          color="secondary"
          onClick={() => navegar('/gestionarPlataformas')}
          style={{ marginLeft: '10px' }}
          fullWidth
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Plataforma tecnológica creada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La plataforma tecnológica ha sido creado exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
);
};

export default FormCrearPlataforma;