import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createPlataforma } from '../../../api/plataformas.api';

const FormCrearPlataforma = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    proyecto: '',
    url: '',
    alcance: '',
  });

  const { usuario } = useContext(AuthContext);
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
    try {
      const response = await createPlataforma(formData,usuario.tokenAccess)
      setOpenDialog(true); // Abre el diálogo de éxito
      return response.data;
    } catch (error) {
      console.error('Error en el registro:', error);
    }
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
        Registrar Plataforma Tecnológica
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
          label="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="proyecto"
          name="proyecto"
          value={formData.proyecto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="alcance"
          name="alcance"
          value={formData.alcance}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <Box mt={2} className="flex items-center justify-between">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Crear Plataforma Tecnológica
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
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Plataforma Tecnológica creada"}</DialogTitle>
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