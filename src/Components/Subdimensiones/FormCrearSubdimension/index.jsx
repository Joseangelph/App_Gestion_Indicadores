import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createSubdimension } from '../../../Services/subdimensiones.api';
import { getDimensiones } from '../../../Services/dimensiones.api';

const FormCrearSubdimension = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
    dimension: '',
  });

  const [dimensiones, setDimensiones] = useState([]); 
  const [errors, setErrors] = useState({}); // Estado para los errores
  const { usuario } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
  const dimensionesHabilitadas = dimensiones.filter(dimension => dimension.habilitado);

  const navegar= useNavigate();

  useEffect(() => {
    // Función para obtener las Dimensiones desde la API
    const fetchDimensiones = async () => {
      try {
        const response = await getDimensiones(usuario.tokenAccess); // Función para llamar la API
        setDimensiones(response.data);
      } catch (error) {
        console.error('Error al obtener las Dimensiones:', error);
      }
    };

    fetchDimensiones();
  }, [usuario.tokenAccess]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Datos enviados:', formData); // Verifica los datos antes de enviarlos
    if (validateForm()) {
      try {
        const response = await createSubdimension(formData,usuario.tokenAccess)
        setOpenDialog(true); // Abre el diálogo de éxito
        return response.data;
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  };


  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};

    if (!formData.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(formData.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }
    
    if (!formData.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";
    if (!formData.dimension) {
      tempErrors.selects = "Debe seleccionar una dimensión";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarSubdimensiones"); // Redirige después de cerrar el diálogo
  };

  return (
    
<Box className="form-container flex flex-col items-center justify-center mt-10 w-1/2 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar Subdimensiones
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
          error={Boolean(errors.nombre)}
          helperText={errors.nombre}
        />
        
        <TextField
          label="Concepto"
          name="concepto"
          value={formData.concepto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
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
            value={formData.dimension}
            onChange={handleChange}
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
          onClick={() => navegar('/gestionarSubdimensiones')}
          style={{ marginLeft: '10px' }}
          fullWidth
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Subdimension creada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La subdimensión ha sido creada exitosamente.
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

export default FormCrearSubdimension;