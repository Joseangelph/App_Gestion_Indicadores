import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import Button from '@mui/material/Button';
import { AuthContext } from '../../../Context/AuthContext';
import Box from '@mui/material/Box';
import { Typography, Paper, TextareaAutosize} from '@mui/material';


const MostrarDimension = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [dimension, setDimension] = useState(null);
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos de la Dimension seleccionada
    const loadDimension = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/dimensiones/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setDimension(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    loadDimension();
  }, [id, usuario.tokenAccess]);

  if (!dimension) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box className="flex flex-col items-center justify-center mt-10">
      <Typography 
        variant="h4" 
        className="text-4xl font-bold text-blue-600"
        sx={{ fontFamily: 'Roboto, sans-serif', marginBottom: 3 }}
      >
        Detalles de la Dimensión
      </Typography>

      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Nombre:
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ marginBottom: 2, wordBreak: 'break-word' }}
        >
          {dimension.nombre}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Componente:
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ marginBottom: 2, wordBreak: 'break-word' }}
        >
          {dimension.componente_nombre}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Destino de impacto:
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ marginBottom: 2, wordBreak: 'break-word' }}
        >
          {dimension.destino_impacto_nombre}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Categoría de análisis:
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ marginBottom: 2, wordBreak: 'break-word' }}
        >
          {dimension.categoria_analisis_nombre}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Concepto:
        </Typography>
        <TextareaAutosize
          value={dimension.concepto}
          minRows={5}
          readOnly
          style={{
            width: '100%',
            resize: 'none',
            padding: '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            backgroundColor: '#f9f9f9',
          }}
        />

        <Box mt={4} display="flex" justifyContent="center">
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navegar('/gestionarDimensiones')}
          >
            Aceptar
          </Button>
        </Box>
      </Paper>
    </Box>

  );
};

export default MostrarDimension;


  