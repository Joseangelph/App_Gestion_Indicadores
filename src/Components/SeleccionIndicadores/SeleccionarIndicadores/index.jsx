import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../../../Context/AuthContext';
import { getIndicadores } from '../../../Services/indicadores.api';
import { createSeleccionIndicadores, getPlataformaByEvaluacion } from '../../../Services/seleccionIndicadores.api';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize
  } from '@mui/material';

const SeleccionarIndicadores = () => {
    const [indicadores, setIndicadores] = useState([]);
    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const [plataforma, setPlataforma] = useState(null);
    const indicadoresHabilitados = indicadores.filter(indicador => indicador.habilitado);
    const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
    const { usuario } = useContext(AuthContext);
    const { id } = useParams(); // ID de la evaluación
    const navigate = useNavigate();


    useEffect(() => {

        async function loadIndicadores() {
            const response = await getIndicadores(usuario.tokenAccess);
            setIndicadores(response.data);
        }

        // Cargar datos de la plataforma tecnológica asociada
        async function loadPlataforma() {
            try {
                const response = await getPlataformaByEvaluacion(id, usuario.tokenAccess);
                setPlataforma(response.data); // Guardar los datos de la plataforma
            } catch (error) {
                console.error('Error al cargar la plataforma tecnológica:', error);
            }
        }

        loadIndicadores();
        loadPlataforma();
    }, [id,usuario.tokenAccess]);

    const handleSelectionChange = (newSelection) => {
        setSelectedIndicadores(newSelection);
    };

        const handleSubmit = async () => {
            if (selectedIndicadores.length === 0) {
                alert('Por favor selecciona al menos un indicador.');
                return;
            }

            try {
                await createSeleccionIndicadores(id, selectedIndicadores, usuario.tokenAccess);
                setOpenDialog(true)
            } catch (error) {
                console.error('Error al seleccionar indicadores:', error);
                alert('Hubo un error al seleccionar los indicadores.');
            }
        };

        const handleCloseDialog = () => {
            setOpenDialog(false);
            navigate("/gestionarEvaluacionesPlataformas"); // Redirige después de cerrar el diálogo
          };

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'tipo', headerName: 'Tipo', width: 100 },
        { field: 'subdimension_nombre', headerName: 'Subdimensión', width: 150 },
        { field: 'dimension_nombre', headerName: 'Dimensión', width: 150 },
        { field: 'componente_nombre', headerName: 'Componente', width: 150 },
        { field: 'destino_nombre', headerName: 'Destino de impacto', width: 150 },
        { field: 'categoria_nombre', headerName: 'Categoría de análisis', width: 150 },
    ];

    const rows = indicadoresHabilitados.map((indicador) => ({
        ...indicador,
        id: indicador.id,
    }));

    return (

        <Box sx={{ padding: 2 }}>
            {/* Mostrar datos de la plataforma tecnológica */}
            {plataforma && (
                <Box
                    sx={{
                        padding: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)', // Dos columnas
                        gap: 1,
                    }}
                >
                    {/* Primera fila: Nombre y Proyecto */}
                    <Typography><strong>Nombre:</strong> {plataforma.nombre}</Typography>
                    <Typography><strong>Proyecto:</strong> {plataforma.proyecto}</Typography>

                    {/* Segunda fila: URL y Alcance */}
                    <Typography>
                        <strong>URL:</strong>{' '}
                        <a href={plataforma.url} target="_blank" rel="noopener noreferrer">
                            {plataforma.url}
                        </a>
                    </Typography>
                    <Typography><strong>Alcance:</strong> {plataforma.alcance}</Typography>

                    
                    <Box>
                        <Typography   gutterBottom>
                        <strong> Descripción: </strong>
                        </Typography>
                        <TextareaAutosize
                        value={plataforma.descripcion}
                        minRows={3}
                        readOnly
                        style={{
                            width: '200%',
                            resize: 'none',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '2px solid rgba(0, 0, 0, 0.40)',
                            backgroundColor: '#ffffff',
                        }}
                        />
                    </Box>
                    
                </Box>
            )}

            {/* Tabla de indicadores */}
            <Box sx={{ height: 320, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionChange}
                    selectionModel={selectedIndicadores}
                />
            </Box>

            <Box mt={4} className="flex items-center justify-center">
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ width: '200px'}}
                    fullWidth
                >
                        Confirmar selección
                </Button>

                <Button
                variant="outlined"
                color="secondary"
                
                onClick={() => navigate('/gestionarEvaluacionesPlataformas')}
                style={{ marginLeft: '10px', width:'200px'}}
                fullWidth
                >
                    Cancelar
                </Button>
            </Box>

            {/* Diálogo de confirmación */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Indicadores seleccionados"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Los indicadores han sido seleccionados exitosamente.
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

export default SeleccionarIndicadores;