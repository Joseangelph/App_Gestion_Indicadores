import { useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
// import { createUser } from '../../api/users.api';

const FormCrearUsuario = () => {
  const [formData, setFormData] = useState({username: '',password: '',first_name: '',last_name: '',role: ''});
  const { usuario } = useContext(AuthContext);
  const [usernameError, setUsernameError] = useState(''); // Estado para el error del nombre de usuario
  const [passwordError, setPasswordError] = useState(false); // Estado para manejar el error de la contraseña
  const navegar= useNavigate();
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo

  const registerUser = async (userData) => {
        try {
            const response = await axios.post(`http://localhost:8000/sesion/registrar/`, userData,{
              headers: {
                Authorization: `Bearer ${usuario.tokenAccess}`,
              }, 
            });
            setOpenDialog(true); // Abre el diálogo de éxito
            return response.data;
        } 
        catch (error) {
          if (error.response && error.response.data) {
            if (error.response.data.username) {
              // Captura el error de nombre de usuario duplicado
              setUsernameError(error.response.data.username[0]);
            } else {
              alert(error.response.data.detail || "Error al registrar el usuario");
            }
          } else {
            alert("Error al registrar el usuario");
          }
          console.error('Error al registrar el usuario:', error);
          throw error;
        }
    }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'username') {
      setUsernameError(''); // Limpiar el error cuando el usuario escribe
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setPasswordError(true);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log('Usuario registrado con éxito:', response);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarUsuarios"); // Redirige después de cerrar el diálogo
  };

  return (
<Box className="form-container flex flex-col items-center justify-center mt-10 w-1/2 rounded-lg">
      <Typography variant="h4" className="text-2xl font-bold text-blue-600 pb-3" sx={{ fontFamily: 'Roboto, sans-serif' }}>
        Registrar usuario
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-1">
        <TextField
          label="Nombre de usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!usernameError} // Mostrar error si existe
          helperText={usernameError} // Mostrar mensaje de error personalizado
        />
        
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={passwordError} // Aplica estilo de error
          helperText={passwordError ? 'La contraseña debe tener al menos 8 caracteres' : ''} // Muestra el mensaje de error si es necesario
        />
        
        <TextField
          label="Nombre"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <TextField
          label="Apellidos"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Rol"
          >
            <MenuItem value="">
              <em>Selecciona el Rol</em>
            </MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
            <MenuItem value="experto">Experto</MenuItem>
            <MenuItem value="cliente">Cliente</MenuItem>
          </Select>
        </FormControl>
        
        <Box mt={2} className="flex items-center justify-between">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Crear Usuario
          </Button>
          <Button
          variant="outlined"
          color="secondary"
          onClick={() => navegar('/gestionarUsuarios')}
          style={{ marginLeft: '10px' }}
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Usuario Creado"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El usuario ha sido creado exitosamente.
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
export default FormCrearUsuario;
