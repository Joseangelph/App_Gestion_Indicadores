
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import CardUsuario from '../CardUsuario'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import { BiSolidDetail } from "react-icons/bi";
import { FaPenToSquare } from "react-icons/fa6";

import { AuthContext } from '../../../Context/AuthContext';
import { deleteDimension, getDimensiones } from '../../../api/dimensiones.api';
import { toggleHabilitado} from "../../../api/toggleHabilitado.api";


const ListaDimensiones = () => {
    const [dimensionList,setDimensionList]= useState([])
    const { usuario } = useContext(AuthContext);
    const navegar = useNavigate();

    const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
    const [selectedId, setSelectedId] = useState(null); // Estado para el ID del indicador a eliminar
    // console.log(usuario)

    useEffect(() => {
        async function loadDimensiones(){
            const response= await getDimensiones(usuario.tokenAccess);
            setDimensionList(response.data);
        }
        loadDimensiones();

    }, [usuario.tokenAccess])


    const handleToggleHabilitado = async (id) => {
      try {
          const response = await toggleHabilitado('dimension', id, usuario.tokenAccess);
          const updatedDimensiones = dimensionList.map((dimension) =>
              dimension.id === id ? { ...dimension, habilitado: response.data.habilitado } : dimension
          );
          setDimensionList(updatedDimensiones);
      } catch (error) {
          console.error('Error al alternar el estado:', error);
      }
  };

    const handleDelete = async () => {
      try {
        const response = await deleteDimension(selectedId,usuario.tokenAccess);
        if (response.status === 204) {
          // Si la eliminación fue exitosa, actualiza la lista de indicadores
          setDimensionList(dimensionList.filter(dimension => dimension.id !== selectedId));
          console.log('Dimension eliminada exitosamente');
        } else {
          console.error('Error al eliminar la dimension');
        }
        setOpenDialog(false); // Cierra el diálogo después de eliminar
      } catch (error) {
        console.error('Error al conectar con la API', error);
        setOpenDialog(false); // Cierra el diálogo si hay error
      }
    };

    const handleOpenDialog = (id) => {
      setSelectedId(id); // Guarda el ID de la dimension a eliminar
      setOpenDialog(true); // Abre el diálogo
    };

    // Función para manejar la edición de la dimension
    const handleEdit = (id) => {
      navegar(`/editarDimensiones/${id}`); // Redirigir a la página de edición con el ID de la dimension seleccionada
    };

    const handleShow = (id) => {
      navegar(`/mostrarDimensiones/${id}`); // Redirigir a la página de mostrar con el ID de la dimension
    };


    const handleCloseDialog = () => {
      setOpenDialog(false); // Cierra el diálogo sin eliminar
      setSelectedId(null); // Limpia el ID seleccionado
    };

    const columns = [
        {field: 'habilitado', headerName: 'Habilitado', width: 90, renderCell: (params) => (
          <Switch
              checked={params.row.habilitado}
              onChange={() => handleToggleHabilitado(params.row.id)}
              color="primary"
          />
        )},
        {field: 'nombre', headerName: 'Nombre', width: 250, editable: true},
        { field: 'destino_impacto_nombre', headerName: 'Destino de impacto', width: 250, editable: false },
        { field: 'componente_nombre', headerName: 'Componente', width: 250, editable: false },
        {
          field: 'actions',
          headerName: 'Acciones',
          width: 130,
          renderCell: (params) => (
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: '30px', maxHeight:"30px", padding: '8px' }}
                onClick={() => handleShow(params.row.id)} // Abre el diálogo de confirmación
                style={{ marginRight: 10 }}
              >
                <BiSolidDetail />
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: '30px', maxHeight:"30px", padding: '8px' }}
                onClick={() => handleEdit(params.row.id)}
                style={{ marginRight: 10 }}
              >
                <FaPenToSquare />
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ minWidth: '30px', maxHeight:"30px", padding: '8px' }}
                onClick={() => handleOpenDialog(params.row.id)} // Abre el diálogo de confirmación
              >
                <DeleteIcon />
              </Button>
            </Box>
          ),
        },
      ];

    const rows = dimensionList.map((dimension) => ({ ...dimension, id: dimension.id }));

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

      {/* Diálogo de confirmación */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta dimensión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleCloseDialog()} color="primary">
            Cancelar
          </Button>
          <Button onClick={()=>handleDelete()} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
  </Box>

    )

}
export default ListaDimensiones