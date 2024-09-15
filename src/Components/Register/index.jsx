import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Register = ({setTieneCuenta}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role: ''
  });

  const registerUser = async (userData) => {
        try {
            const response = await axios.post(`http://localhost:8000/sesion/registrar/`, userData);
            return response.data;
        } 
        catch (error) {
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
    
    <div className="form-container z-10 shadow-2xl flex  flex-col items-center justify-center w-1/3 bg-sky-200 rounded-lg">
    
    <p className=' Titulo pb-5 text-2xl '> Bienvenido a SIGIMI </p>
    <form onSubmit={handleSubmit} className="w-full max-w-xs rounded-sm bg-sky-200 p-3">
      <div className="mb-4">
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="username">
          Username
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="username" 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="password" 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="first_name">
          First Name
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="first_name" 
          type="text" 
          name="first_name" 
          value={formData.first_name} 
          onChange={handleChange} 
          required 
          />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="last_name">
          Last Name
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="last_name" 
          type="text" 
          name="last_name" 
          value={formData.last_name} 
          onChange={handleChange} 
          required 
          />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="role">
          Role
        </label>
        <select 
          className="shadow appearance-none rounded w-full py-2 px-3 bg-white text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-blue-500" 
          id="role" 
          name="role" 
          value={formData.role} 
          onChange={handleChange}
          >
          <option value="">Select a role</option>
          <option value="experto">experto</option>
          <option value="administrador">administrador</option>
        </select>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button 
          onClick={() => setTieneCuenta(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>

            <button
                className="btnCuenta mt-3"
                onClick={() => setTieneCuenta(true)}
            >
                ¿No tienes cuenta?
            </button>
</div>
);
};

export default Register;

          //     <form onSubmit={handleSubmit}>
          //       <div>
          //         <label>Username</label>
          //         <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          //       </div>
          //       <div>
          //         <label>Password</label>
          //         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          //       </div>
          //       <div>
          //         <label>First Name</label>
          //         <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          //       </div>
          //       <div>
          //         <label>Last Name</label>
          //         <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          //       </div>
          //       <div>
          //         <label>Role</label>
          //         <select name="role" value={formData.role} onChange={handleChange}>
          //           <option value="experto">User</option>
          //           <option value="administrador">Admin</option>
          //         </select>
          //       </div>
          //       <button type="submit">Register</button>
          //     </form>