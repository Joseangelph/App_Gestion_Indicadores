import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createDestino } from '../../../Services/destinos.api';
import { getCategorias } from '../../../Services/categorias.api';

const FormCrearDestino = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
    categoria_analisis: '',
  });

  const [categorias, setCategorias] = useState([]); 
  const [errors, setErrors] = useState({}); // Estado para los errores
  const { usuario } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
  const categoriasHabilitadas = categorias.filter(categoria => categoria.habilitado);


  const navegar= useNavigate();

  useEffect(() => {
    // Función para obtener las categorías desde la API
    const fetchCategorias = async () => {
      try {
        const response = await getCategorias(usuario.tokenAccess); // Función para llamar la API
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategorias();
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
        const response = await createDestino(formData,usuario.tokenAccess)
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
    if (!formData.categoria_analisis) {
      tempErrors.selects = "Debe seleccionar una categoría de análisis.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarDestinos"); // Redirige después de cerrar el diálogo
  };

  return (
    
    <Box className="form-container flex flex-col items-center justify-center mt-10 w-1/2 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar destinos de impacto
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

        {/* Select para elegir categoría */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría de análisis a la que pertenece</InputLabel>
          <Select
            name="categoria_analisis"
            value={formData.categoria_analisis}
            onChange={handleChange}
            label="Categoría de análisis a la que pertenece"
          >
            {categoriasHabilitadas.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
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
          onClick={() => navegar('/gestionarDestinos')}
          style={{ marginLeft: '10px' }}
          fullWidth
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Destino de impacto creado"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El destino de impacto ha sido creado exitosamente.
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

export default FormCrearDestino;