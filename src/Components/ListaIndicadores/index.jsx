
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteIndicador, getIndicadores } from '../../api/indicadores.api';
// import CardUsuario from '../CardUsuario'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { AuthContext } from '../../Context/AuthContext';


const ListaIndicadores = () => {
    const [indicatorList,setIndicatorList]= useState([])
    const { usuario } = useContext(AuthContext);
    const navegar = useNavigate();
    console.log(usuario)

    useEffect(() => {
        async function loadIndicadores(){
            const response= await getIndicadores(usuario.tokenAccess);
            setIndicatorList(response.data);
        }
        loadIndicadores();

    }, [usuario.tokenAccess])

    const handleDelete = async (id) => {
      try {
        const response = await deleteIndicador(id,usuario.tokenAccess);
        // const response = await axios.delete(`http://127.0.0.1:8000/sesion/api/indicadores/${id}/`, {
        //   headers: {
        //     'Authorization': `Bearer ${usuario.tokenAccess}`,
        //   },
        // } 
      // );

        if (response.status === 204) {
          // Si la eliminación fue exitosa, actualiza la lista de indicadores
          setIndicatorList(indicatorList.filter(indicador => indicador.id !== id));
          console.log('Indicador eliminado exitosamente');
        } else {
          console.error('Error al eliminar el indicador');
        }
      } catch (error) {
        console.error('Error al conectar con la API', error);
      }
    };

        // Función para manejar la edición del usuario
        const handleEdit = (id) => {
          navegar(`/editarIndicadores/${id}`); // Redirigir a la página de edición con el ID del indicador
        };


    const columns = [
        {field: 'id', headerName: 'ID', width: 90 },
        {field: 'nombre', headerName: 'nombre', width: 90, editable: true},
        {field: 'descripcion', headerName: 'descripcion', width: 150, editable: true,},
        {
          field: 'actions',
          headerName: 'Acciones',
          width: 200,
          renderCell: (params) => (
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleEdit(params.row.id)}
                style={{ marginRight: 10 }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(params.row.id)}
              >
                Eliminar
              </Button>
            </Box>
          ),
        },
      ];


    const rows = indicatorList.map((indicador) => ({ ...indicador, id: indicador.id }));

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
        checkboxSelection
        disableRowSelectionOnClick
      />
  </Box>

    )

}

export default ListaIndicadores