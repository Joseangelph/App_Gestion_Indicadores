import { useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users.api';
import { AuthContext } from '../../Context/AuthContext';

const FormCrearUsuario = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role: ''
  });

  const { usuario } = useContext(AuthContext);

  const navegar= useNavigate();

  const registerUser = async (userData) => {
        try {
            const response = await axios.post(`http://localhost:8000/sesion/registrar/`, userData,{
              headers: {
                Authorization: `Bearer ${usuario.tokenAccess}`,
              }, 
            });
            alert("Usuario creado correctamente")
            navegar("/gestionarUsuarios")
            return response.data;
        } 
        catch (error) {
            alert("Error al registrar el usuario")
            console.error('Error al registrar el usuario:', error);
            throw error;
        }
    }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log('Usuario registrado con éxito:', response);
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
        Registrar Usuario
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-1">
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value="">
              <em>Selecciona el Rol</em>
            </MenuItem>
            <MenuItem value="experto">Experto</MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
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
    </Box>


);


};

export default FormCrearUsuario;



//     <div className="form-container z-10 flex  flex-col items-center justify-center w-1/2 rounded-lg">
    
//     <p className=' Titulo pb-3 text-2xl '> Registrar Usuario </p>
//     <form onSubmit={handleSubmit} className="w-full max-w-xs rounded-sm p-1">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="username">
//           Username
//         </label>
//         <input 
//           className="shadow appearance-none border rounded w-full py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
//           id="username" 
//           type="text" 
//           name="username" 
//           value={formData.username} 
//           onChange={handleChange} 
//           required 
//         />
//       </div>
//       <div className="mb-2">
//         <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">
//           Password
//         </label>
//         <input 
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
//           id="password" 
//           type="password" 
//           name="password" 
//           value={formData.password} 
//           onChange={handleChange} 
//           required 
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="first_name">
//           First Name
//         </label>
//         <input 
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
//           id="first_name" 
//           type="text" 
//           name="first_name" 
//           value={formData.first_name} 
//           onChange={handleChange} 
//           required 
//           />
//       </div>
//       <div className="mb-2">
//         <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="last_name">
//           Last Name
//         </label>
//         <input 
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" 
//           id="last_name" 
//           type="text" 
//           name="last_name" 
//           value={formData.last_name} 
//           onChange={handleChange} 
//           required 
//           />
//       </div>
//       <div className="mb-2">
//         <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="role">
//           Role
//         </label>
//         <select 
//           className="shadow appearance-none rounded w-full py-2 px-3 bg-white text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-blue-500" 
//           id="role" 
//           name="role" 
//           value={formData.role} 
//           onChange={handleChange}
//           >
//           <option value="">Select a role</option>
//           <option value="experto">experto</option>
//           <option value="administrador">administrador</option>
//         </select>
//       </div>
//       <div className="flex items-center justify-between mt-2">
//         <button 
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="submit"
//         >
//           Crear Usuario
//         </button>
//       </div>
//     </form>       
// </div>