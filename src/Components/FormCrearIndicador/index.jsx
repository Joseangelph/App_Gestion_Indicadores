import { useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { createIndicador } from '../../api/indicadores.api';

const FormCrearIndicador = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });
  const { usuario } = useContext(AuthContext);

  const navegar= useNavigate();

//   const registerUser = async (userData) => {
//         try {
//             const response = await axios.post(`http://localhost:8000/sesion/registrar/`, userData);
//             alert("Indicador creado correctamente")
//             navegar("/gestionarIndicadores")
//             return response.data;
//         } 
//         catch (error) {
//             alert("Error al registrar el indicador")
//             console.error('Error al registrar el indicador:', error);
//             throw error;
//         }
//     }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createIndicador(formData,usuario.tokenAccess)
      // const response = await axios.post('http://localhost:8000/gestion_indicadores/api/indicadores/', formData ,{
      //   headers: {
      //       Authorization: `Bearer ${usuario.tokenAccess}`,
      //     },
      // } );
      navegar("/gestionarIndicadores")
      console.log('Indicador registrado con éxito:', response);
      return response.data;
      // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    
<Box className="form-container flex flex-col items-center justify-center mt-10 w-1/2 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar Indicador
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
        
        <Box mt={2} className="flex items-center justify-between">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Crear Indicador
          </Button>
          <Button
          variant="outlined"
          color="secondary"
          onClick={() => navegar('/gestionarIndicadores')}
          style={{ marginLeft: '10px' }}
        >
          Cancelar
        </Button>
        </Box>
      </form>
    </Box>


);


};

export default FormCrearIndicador;