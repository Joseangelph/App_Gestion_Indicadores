import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../Context/AuthContext';
import { getIndicadores } from '../../../api/indicadores.api';
import { createSeleccionIndicadores } from '../../../api/seleccionIndicadores.api';

const SeleccionarIndicadores = () => {
    const [indicadores, setIndicadores] = useState([]);
    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const { usuario } = useContext(AuthContext);
    const { id } = useParams(); // ID de la evaluación
    const navigate = useNavigate();

    useEffect(() => {
        async function loadIndicadores() {
            const response = await getIndicadores(usuario.tokenAccess);
            setIndicadores(response.data);
        }
        loadIndicadores();
    }, [usuario.tokenAccess]);

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
                alert('Indicadores seleccionados con éxito.');
                navigate('/gestionarEvaluacionesPlataformas');
            } catch (error) {
                console.error('Error al seleccionar indicadores:', error);
                alert('Hubo un error al seleccionar los indicadores.');
            }
        };

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'subdimension_nombre', headerName: 'Subdimension', width: 150 },
        { field: 'dimension_nombre', headerName: 'Dimension', width: 150 },
        { field: 'componente_nombre', headerName: 'Componente', width: 150 },
        { field: 'destino_nombre', headerName: 'Destino de impacto', width: 150 },
        { field: 'categoria_nombre', headerName: 'Categoría de análisis', width: 150 },
    ];

    const rows = indicadores.map((indicador) => ({
        ...indicador,
        id: indicador.id,
    }));

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                selectionModel={selectedIndicadores}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: 2 }}
            >
                Confirmar Selección de Indicadores
            </Button>
        </Box>
    );
};

export default SeleccionarIndicadores;