import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../Context/AuthContext';
import Box from '@mui/material/Box';
import { Typography, Paper, TextareaAutosize} from '@mui/material';


const MostrarDestino = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [destino, setDestino] = useState(null);
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos del Destino  seleccionado
    const loadDestino = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/destinos/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setDestino(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    loadDestino();
  }, [id, usuario.tokenAccess]);

  if (!destino) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 2,
        px: 2,
        width:"100%"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
          textAlign: 'center',
        }}
      >
        Detalles del destino de impacto
      </Typography>

      <Paper
        elevation={5}
        sx={{
          p: 4,
          maxWidth: 800,
          width: '100%',
          overflow: 'auto',
          borderRadius: 4,
          backgroundColor: '#f9f9f9',
  
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {[
            { label: 'Nombre', value: destino.nombre },
            { label: 'Categoría de análisis', value: destino.categoria_analisis_nombre },
          ].map(({ label, value }, index) => (
            <Box sx={{display: 'flex'}} key={index}>
              <Typography variant="h6" gutterBottom>
                {label}: 
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: '6px',
                  marginLeft: '5px',
                  wordBreak: 'break-word',
                  color: 'text.secondary',
                }}
              >
                {value || 'No disponible'}
              </Typography>
            </Box>
          ))}

          <Box>
            <Typography variant="h6" gutterBottom>
              Concepto:
            </Typography>
            <TextareaAutosize
              value={destino.concepto}
              minRows={4}
              readOnly
              style={{
                width: '100%',
                resize: 'none',
                padding: '2px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                backgroundColor: '#ffffff',
              }}
            />
          </Box>
        </Box>

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navegar('/gestionarDestinos')}
            sx={{ borderRadius: 2 }}
          >
            Aceptar
          </Button>
        </Box>
      </Paper>
    </Box>

  );
};

export default MostrarDestino;


  