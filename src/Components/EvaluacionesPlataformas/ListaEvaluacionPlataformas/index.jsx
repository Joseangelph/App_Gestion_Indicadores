
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import CardUsuario from '../CardUsuario'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BiSolidDetail } from "react-icons/bi";

import { AuthContext } from '../../../Context/AuthContext';
import { deleteEvaluacionPlataforma,getEvaluacionPlataformas } from '../../../Services/evaluacionPlataformas.api';


const ListaEvaluacionPlataforma = () => {
    const [evaluacionPlataformaList,setEvaluacionPlataformaList]= useState([])
    const { usuario } = useContext(AuthContext);
    const navegar = useNavigate();
    // console.log(usuario)

    useEffect(() => {
        async function loadEvaluacionPlataformas(){
            const response= await getEvaluacionPlataformas(usuario.tokenAccess);
            setEvaluacionPlataformaList(response.data);
        }
        loadEvaluacionPlataformas();

    }, [usuario.tokenAccess])



    const handleDelete = async (id) => {
      try {
        const response = await deleteEvaluacionPlataforma(id,usuario.tokenAccess);
        if (response.status === 204) {
          // Si la eliminación fue exitosa, actualiza la lista de indicadores
          setEvaluacionPlataformaList(evaluacionPlataformaList.filter(evaluacionPlataforma => evaluacionPlataforma.id !== id));
          console.log('Evaluacion de plataforma eliminada exitosamente');
        } else {
          console.error('Error al eliminar la dimension');
        }
      } catch (error) {
        console.error('Error al conectar con la API', error);
      }
    };


    const handleSelectIndicadores = (id) => {
      navegar(`/seleccionarIndicadores/${id}`);
    };

    const handleEvaluarIndicadores = (id) => {
      navegar(`/evaluarIndicadores/${id}`);
    };

    const handleShow = (id) => {
      navegar(`/mostrarEvaluacionesPlataformas/${id}`); // Redirigir a la página de mostrar con el ID de la EvaluacionPlataforma
    };

    const columns = [
        {field: 'plataforma_nombre', headerName: 'Plataforma', width: 300, editable: true},
        {field: 'estado', headerName: 'Estado', width: 200, editable: true},
        {
          field: 'actions',
          headerName: 'Acciones',
          width: 350,
          renderCell: (params) => {
            const isPendienteEvaluacion = params.row.estado === 'pendiente a evaluar';
            const isPendienteSeleccion = params.row.estado === 'pendiente a selección';
            const isEvaluada = params.row.estado === 'evaluada';
            return(
              <Box>
                <Button
                          variant="contained"
                          color="primary"
                          sx={{ minWidth: '30px', maxHeight: "30px", padding: '8px' }}
                          onClick={() => handleDelete(params.row.id)}
                      >
                          Eliminar
                </Button>
                  {isPendienteSeleccion && (
                      <Button
                          variant="contained"
                          color="primary"
                          sx={{ minWidth: '30px', maxHeight: "30px", margin: "5px" , padding: '8px' }}
                          onClick={() => handleSelectIndicadores(params.row.id)}
                      >
                          Seleccionar Indicadores
                      </Button>
                  )} 
                  {isPendienteEvaluacion && (
                      <Button
                          variant="contained"
                          color="primary"
                          sx={{ minWidth: '30px', maxHeight: "30px", padding: '8px' }}
                          onClick={() => handleEvaluarIndicadores(params.row.id)}
                          style={{ marginRight: 10 }}
                      >
                          Evaluar indicadores
                      </Button>
                  )}
                  {isEvaluada && (
                      <Button
                          variant="contained"
                          color="primary"
                          sx={{ minWidth: '30px', maxHeight: "30px", padding: '8px' }}
                          onClick={() => handleShow(params.row.id)}
                          style={{ margin: '5px' }}
                      >
                          <BiSolidDetail />
                          Mostrar
                      </Button>
                  )}
              </Box>
            );
          },
                      
        },
      ];

    const rows = evaluacionPlataformaList.map((evaluacionPlataforma) => ({ 
      ...evaluacionPlataforma,
      id: evaluacionPlataforma.id 
    }));

    return (
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
  </Box>

    )

}
export default ListaEvaluacionPlataforma