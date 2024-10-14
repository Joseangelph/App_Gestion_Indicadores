import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createSubdimension } from '../../../api/subdimensiones.api';
import { getDimensiones } from '../../../api/dimensiones.api';

const FormCrearSubdimension = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
    dimension: '',
  });

  const [dimensiones, setDimensiones] = useState([]); 
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
    console.log('Datos enviados:', formData); // Verifica los datos antes de enviarlos

    try {
      const response = await createSubdimension(formData,usuario.tokenAccess)
      setOpenDialog(true); // Abre el diálogo de éxito
      return response.data;
    } catch (error) {
      console.error('Error en el registro:', error);
    }
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

        {/* Select para elegir la dimension */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Dimension a la que pertenece</InputLabel>
          <Select
            name="dimension"
            value={formData.dimension}
            onChange={handleChange}
          >
            {dimensionesHabilitadas.map((dimension) => (
              <MenuItem key={dimension.id} value={dimension.id}>
                {dimension.nombre}
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
            Crear Subdimensión
          </Button>

          <Button
          variant="outlined"
          color="secondary"
          onClick={() => navegar('/gestionarSubdimensiones')}
          style={{ marginLeft: '10px' }}
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
            La Subdimension ha sido creada exitosamente.
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