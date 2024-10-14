import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createDestino } from '../../../api/destinos.api';
import { getCategorias } from '../../../api/categorias.api';

const FormCrearDestino = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
    categoria_analisis: '',
  });

  const [categorias, setCategorias] = useState([]); 
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
    console.log('Datos enviados:', formData); // Verifica los datos antes de enviarlos

    try {
      const response = await createDestino(formData,usuario.tokenAccess)
      setOpenDialog(true); // Abre el diálogo de éxito
      return response.data;
    } catch (error) {
      console.error('Error en el registro:', error);
    }
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
        Registrar Destinos de impacto
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
        />
        
        <TextField
          label="concepto"
          name="concepto"
          value={formData.concepto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Select para elegir categoría */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría de Análisis a la que pertenece</InputLabel>
          <Select
            name="categoria_analisis"
            value={formData.categoria_analisis}
            onChange={handleChange}
          >
            {categoriasHabilitadas.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box mt={2} className="flex items-center justify-between">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Crear Destino de impacto
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
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Destino de impacto creado"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El Destino de impacto ha sido creado exitosamente.
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