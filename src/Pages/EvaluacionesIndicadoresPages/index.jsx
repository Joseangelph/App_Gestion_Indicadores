import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../../Context/AuthContext';
import Layout from "../../Components/Layout";
import { Button, Typography, Box, Divider, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,TextareaAutosize } from "@mui/material";
import FormCrearEvaluacionIndicador from "../../Components/EvaluacionesIndicadores/FormCrearEvaluacionIndicador";
import ListaEvaluacionIndicadores from "../../Components/EvaluacionesIndicadores/ListaEvaluacionIndicadores";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { getSeleccionesIndicadores } from '../../Services/seleccionIndicadores.api';

function GestionarEvaluacionesIndicadores() {
    const [evaluacionesIndicadores, setEvaluacionesIndicadores] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
    const navigate = useNavigate();
    const { id } = useParams();
    const [evaluacionPlataforma, setEvaluacionPlataforma] = useState(null);
    const [seleccionesIndicadores, setSeleccionesIndicadores] = useState([]); // Estado para almacenar selecciones de indicadores
    const { usuario } = useContext(AuthContext);

    // Función para agregar una evaluación de indicador al array temporal
    const agregarEvaluacion = (evaluacion) => {
        setEvaluacionesIndicadores([...evaluacionesIndicadores, evaluacion]);
        // Filtra la selección recién evaluada
        setSeleccionesIndicadores(seleccionesIndicadores.filter(
            seleccion => seleccion.id !== evaluacion.seleccionIndicador
        ));
    };


     // Carga de selecciones de indicadores al montar el componente
    useEffect(() => {
        const fetchEvaluacionPlataforma = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/gestion_evaluaciones/api/evaluacionesplataformas/${id}/`,{
                    headers: {
                        Authorization: `Bearer ${usuario.tokenAccess}`,
                      },
                });
              setEvaluacionPlataforma(response.data);
            } catch (error) {
              console.error('Error al obtener las evaluaciones de plataforma :', error);
            }
          };


        const fetchSeleccionesIndicadores = async () => {
        try {
            const response = await getSeleccionesIndicadores(usuario.tokenAccess);
            setSeleccionesIndicadores(response.data.filter(selectIndicador => selectIndicador.evaluacionPlataforma == id));
        } catch (error) {
            console.error('Error al cargar las selecciones de indicadores:', error);
        }
        };

        fetchEvaluacionPlataforma();
        fetchSeleccionesIndicadores();
    }, [id,usuario.tokenAccess]);


    const finalizarEvaluacion = async () => {
        try {
            const response = await axios.post("http://localhost:8000/gestion_evaluaciones/api/evaluacionesindicadores/crear_evaluaciones/", {
                evaluaciones: evaluacionesIndicadores.map((evaluacion) => ({
                    seleccionIndicador: evaluacion.seleccionIndicador,
                    observaciones: evaluacion.observaciones,
                    evaluacion: evaluacion.evaluacion,})),
                }, {
                    headers: {
                        Authorization: `Bearer ${usuario.tokenAccess}`
                    }
                }
            );
            if (response.status === 201) {
                // Actualiza el estado y fecha de la evaluacion de plataforma
                await axios.patch(`http://localhost:8000/gestion_evaluaciones/api/evaluacionesplataformas/${id}/finalizar_evaluacion/`, {},
                {
                    headers: {
                        Authorization: `Bearer ${usuario.tokenAccess}`
                    }
                });
                setOpenDialog(true); // Abre el diálogo de éxito
                setEvaluacionesIndicadores([]); // Limpia el array después de guardar
            }
        } catch (error) {
            console.error("Error al finalizar la evaluación:", error);
        }
    };


    // Función para cancelar la evaluación
    const cancelarEvaluacion = () => {
        setEvaluacionesIndicadores([]); // Limpia el array sin guardar
        navigate("/gestionarEvaluacionesPlataformas"); // Redirige a la página de gestión
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate("/gestionarEvaluacionesPlataformas"); // Redirige después de cerrar el diálogo
      };


    return (
    <Layout>
      <div className="flex flex-col items-center">
        <Typography
          variant="h4"
          className="text-4xl font-bold text-blue-600"
          sx={{ fontFamily: "Roboto, sans-serif", marginTop: 5 }}
        >
          Evaluación de indicadores
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ width: "100%" }}>
  <Typography gutterBottom><strong> Objetivos: </strong></Typography>

  {/* Verifica si evaluacionPlataforma está cargada */}
  {evaluacionPlataforma ? (
    <TextareaAutosize
      value={evaluacionPlataforma.objetivo}
      minRows={3}
      readOnly
      style={{
        width: '100%',
        resize: 'none',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        borderRadius: '5px',
        border: '2px solid rgba(0, 0, 0, 0.40)',
        backgroundColor: '#ffffff',
      }}
    />
  ) : (
    <Typography variant="body1">Cargando objetivo...</Typography> // Mensaje de carga
  )}
</Box>

{/* Asegúrate de que el resto de la estructura de los formularios y tablas no se vean afectadas */}
<Box
  display="flex"
  gap={0}
  sx={{
    width: "120%",
    marginTop: 4,
  }}
>
  {/* Formulario a la izquierda */}
  <Box flex={1}>
    <FormCrearEvaluacionIndicador
      agregarEvaluacion={agregarEvaluacion}
      seleccionesIndicadores={seleccionesIndicadores}
    />
  </Box>

  {/* Línea divisoria */}
  <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

  {/* Tabla a la derecha */}
  <Box flex={2}>
    <ListaEvaluacionIndicadores
      evaluacionesIndicadores={evaluacionesIndicadores}
    />
  </Box>
</Box>

        {/* Botones debajo */}
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          sx={{ marginTop: 13 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={finalizarEvaluacion}
            disabled={seleccionesIndicadores.length > 0}
          >
            Finalizar Evaluación de Indicadores
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={cancelarEvaluacion}
          >
            Cancelar
          </Button>
        </Box>
      </div>
      
          {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Evaluación de plataforma tecnológica finalizada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se ha finalizado la evaluación de la plataforma tecnológica exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </Layout>
    );
}

export default GestionarEvaluacionesIndicadores;
