import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Obtener el parámetro ID de la URL
// import TextField from '@mui/material/TextField';
import { AuthContext } from '../../../Context/AuthContext';
import { Button, Box, Typography, Paper, TextareaAutosize, Grid } from '@mui/material';



const MostrarIndicador = () => {
  const { id } = useParams();  // Obtener el ID de la URL
  const [indicador, setIndicador] = useState(null);
  const { usuario } = useContext(AuthContext);
  const navegar = useNavigate();  // Para redirigir después de la actualización

  useEffect(() => {
    // Cargar los datos del Indicador  seleccionado
    const loadIndicador = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/gestion_indicadores/api/indicadores/${id}/`, {
          headers: {
            Authorization: `Bearer ${usuario.tokenAccess}`,
          },
        });
        setIndicador(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario', error);
      }
    };

    loadIndicador();
  }, [id, usuario.tokenAccess]);

  if (!indicador) return <div>Cargando...</div>;  // Mostrar un mensaje mientras se cargan los datos

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
        Detalles del indicador
      </Typography>

      <Paper
        elevation={5}
        sx={{
          p: 2,
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
            gap: 0,
          }}
        >
          {[
            { label: 'Nombre', value: indicador.nombre },
            { label: 'Tipo', value: indicador.tipo },
            { label: 'Subdimensión', value: indicador.subdimension },
            { label: 'Dimensión', value: indicador.dimension_nombre },
            { label: 'Componente', value: indicador.componente_nombre },
            { label: 'Destino de impacto', value: indicador.destino_nombre },
            { label: 'Categoría de análisis', value: indicador.categoria_nombre },
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
              value={indicador.concepto}
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
            onClick={() => navegar('/gestionarIndicadores')}
            sx={{ borderRadius: 2 }}
          >
            Aceptar
          </Button>
        </Box>
      </Paper>
    </Box>

  );
};

export default MostrarIndicador;


  