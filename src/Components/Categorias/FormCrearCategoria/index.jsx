import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createCategoria } from '../../../Services/categorias.api';

const FormCrearCategoria = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
  });

  const { usuario } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
  const [errors, setErrors] = useState({}); // Estado para los errores

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
        const response = await createCategoria(formData,usuario.tokenAccess)
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
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarCategorias"); // Redirige después de cerrar el diálogo
  };

  return (
    
    <Box className="form-container flex flex-col items-center justify-center mt-10 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar categoría de análisis
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full min-w-xs p-1">
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
          onClick={() => navegar('/gestionarCategorias')}
          style={{ marginLeft: '10px' }}
          fullWidth
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Categoria creada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La categoria de análisis ha sido creado exitosamente.
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

export default FormCrearCategoria;