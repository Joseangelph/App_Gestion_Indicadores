import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createComponente } from '../../../Services/componentes.api';
import { getDestinos } from '../../../Services/destinos.api';

const FormCrearComponente = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
    destino_impacto: '',
  });

  const [destinos, setDestinos] = useState([]); 
  const [errors, setErrors] = useState({}); // Estado para los errores
  const { usuario } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
  const destinosHabilitados = destinos.filter(destino => destino.habilitado);

  const navegar= useNavigate();


  useEffect(() => {
    // Función para obtener lo destinos desde la API
    const fetchDestinos = async () => {
      try {
        const response = await getDestinos(usuario.tokenAccess); // Función para llamar la API
        setDestinos(response.data);
      } catch (error) {
        console.error('Error al obtener los destinos de impacto:', error);
      }
    };

    fetchDestinos();
  }, [usuario.tokenAccess]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Datos enviados:', formData);
    if (validateForm()) {
      try {
        const response = await createComponente(formData,usuario.tokenAccess)
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
      tempErrors.selects = "Debe seleccionar un destino de impacto.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarComponentes"); // Redirige después de cerrar el diálogo
  };


  return (
    
    <Box className="form-container flex flex-col items-center justify-center mt-10 w-1/2 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar Componentes
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-1">
        <TextField
          label="nombre"
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
          label="concepto"
          name="concepto"
          value={formData.concepto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(errors.concepto)}
          helperText={errors.concepto}
        />

        {/* Select para elegir el destino de impacto */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Destino de impacto al que pertenece</InputLabel>
          <Select
            name="destino_impacto"
            value={formData.destino_impacto}
            onChange={handleChange}
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
        
        <Box mt={2} className="flex items-center justify-between">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Crear Componente
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
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Componente creado"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El Componente ha sido creado exitosamente.
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

export default FormCrearComponente;