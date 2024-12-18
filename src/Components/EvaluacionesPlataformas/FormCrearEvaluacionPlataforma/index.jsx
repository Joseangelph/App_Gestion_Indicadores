import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createEvaluacionPlataforma } from '../../../Services/evaluacionPlataformas.api';
import { getPlataformas } from '../../../Services/plataformas.api';

const FormCrearEvaluacionPlataforma = () => {
  const [formData, setFormData] = useState({
    plataforma: '',
    estado: 'pendiente a selección',
    objetivo: '',
  });

  const { usuario } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
  const [plataformas, setPlataformas] = useState([]); // Estado para almacenar plataformas
  const [errors, setErrors] = useState({}); // Estado para los errores
  const plataformasHabilitadas = plataformas.filter(plataforma => plataforma.habilitado);

  const navegar= useNavigate();


   // Carga de plataformas al montar el componente
   useEffect(() => {
    const fetchPlataformas = async () => {
      try {
        const response = await getPlataformas(usuario.tokenAccess);
        setPlataformas(response.data);
      } catch (error) {
        console.error('Error al cargar las plataformas:', error);
      }
    };
    fetchPlataformas();
  }, [usuario.tokenAccess]);


  const validateForm = () => {
    const tempErrors = {};

    if (!formData.plataforma) {
      tempErrors.plataforma = "Debe seleccionar una plataforma";
    } 
    
    if (!formData.objetivo.trim()) tempErrors.objetivo = "El campo 'objetivo' es obligatorio.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


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
          const response = await createEvaluacionPlataforma(formData,usuario.tokenAccess)
          setOpenDialog(true); // Abre el diálogo de éxito
          return response.data;
        } catch (error) {
          console.error('Error en el registro:', error);
        }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarEvaluacionesPlataformas"); // Redirige después de cerrar el diálogo
  };

  return (
    
<Box className="form-container flex flex-col items-center justify-center mt-10 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar evaluación de plataforma
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full p-1">
        
        {/* Select para elegir la plataforma */}
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="plataforma-label">Plataforma</InputLabel>
          <Select
            labelId="plataforma-label"
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            label="Plataforma"
          >
            {plataformasHabilitadas.map((plataforma) => (
              <MenuItem key={plataforma.id} value={plataforma.id}>
                {plataforma.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {errors.plataforma && (
          <Typography color="error" variant="body2">
            {errors.plataforma}
          </Typography>
        )}
        
        <TextField
          label="Objetivo"
          name="objetivo"
          value={formData.objetivo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline // Convierte el TextField en un textarea
          rows={4} // Número de filas visibles iniciales
          error={Boolean(errors.objetivo)}
          helperText={errors.objetivo}
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
          onClick={() => navegar('/gestionarEvaluacionesPlataformas')}
          style={{ marginLeft: '10px' }}
          fullWidth
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Evaluación de plataforma creada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La evaluación de plataforma ha sido creado exitosamente.
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

export default FormCrearEvaluacionPlataforma;