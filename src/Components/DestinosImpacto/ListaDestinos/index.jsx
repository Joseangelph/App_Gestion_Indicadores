
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import CardUsuario from '../CardUsuario'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import { toggleHabilitado} from "../../../Services/toggleHabilitado.api"
import { BiSolidDetail } from "react-icons/bi";
import { FaPenToSquare } from "react-icons/fa6";

import { AuthContext } from '../../../Context/AuthContext';
import { deleteDestino, getDestinos } from '../../../Services/destinos.api';


const ListaDestinos = () => {
    const [destinoList,setDestinoList]= useState([])
    const { usuario } = useContext(AuthContext);
    const navegar = useNavigate();

    const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
    const [selectedId, setSelectedId] = useState(null); // Estado para el ID del indicador a eliminar
    // console.log(usuario)

    useEffect(() => {
        async function loadDestinos(){
            const response= await getDestinos(usuario.tokenAccess);
            setDestinoList(response.data);
        }
        loadDestinos();

    }, [usuario.tokenAccess])

    const handleToggleHabilitado = async (id) => {
      try {
          const response = await toggleHabilitado('destino', id, usuario.tokenAccess);
          const updatedDestinos = destinoList.map((destino) =>
              destino.id === id ? { ...destino, habilitado: response.data.habilitado } : destino
          );
          setDestinoList(updatedDestinos);
      } catch (error) {
          console.error('Error al alternar el estado:', error);
      }
  };

    const handleDelete = async () => {
      try {
        const response = await deleteDestino(selectedId,usuario.tokenAccess);
        if (response.status === 204) {
          // Si la eliminación fue exitosa, actualiza la lista de indicadores
          setDestinoList(destinoList.filter(destino => destino.id !== selectedId));
          console.log('Destino de impacto eliminado exitosamente');
        } else {
          console.error('Error al eliminar el destino de impacto');
        }
        setOpenDialog(false); // Cierra el diálogo después de eliminar
      } catch (error) {
        console.error('Error al conectar con la API', error);
        setOpenDialog(false); // Cierra el diálogo si hay error
      }
    };

    // const handleOpenDialog = (id) => {
    //   setSelectedId(id); // Guarda el ID del destino de impacto a eliminar
    //   setOpenDialog(true); // Abre el diálogo
    // };

    // Función para manejar la edición del Destino de impacto
    const handleEdit = (id) => {
      navegar(`/editarDestinos/${id}`); // Redirigir a la página de edición con el ID del Destino seleccionado
    };

    const handleShow = (id) => {
      navegar(`/mostrarDestinos/${id}`); // Redirigir a la página de mostrar con el ID del Componente
    };

    const handleCloseDialog = () => {
      setOpenDialog(false); // Cierra el diálogo sin eliminar
      setSelectedId(null); // Limpia el ID seleccionado
    };

    const columns = [
        {field: 'habilitado', headerName: 'Habilitado', width: 150, renderCell: (params) => (
          <Switch
              checked={params.row.habilitado}
              onChange={() => handleToggleHabilitado(params.row.id)}
              color="primary"
          />
        )},
        {field: 'nombre', headerName: 'Nombre', width: 350, editable: true},
        { field: 'categoria_analisis_nombre', headerName: 'Categoría', width: 350, editable: false }, // Cambiado aquí
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
              {/* <Button
                variant="contained"
                color="error"
                sx={{ minWidth: '30px', maxHeight:"30px", padding: '8px' }}
                onClick={() => handleOpenDialog(params.row.id)} // Abre el diálogo de confirmación
              >
                <DeleteIcon />
              </Button> */}
            </Box>
          ),
        },
      ];

    const rows = destinoList.map((destino) => ({ ...destino, id: destino.id }));

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
            ¿Estás seguro de que deseas eliminar este Destino de impacto?
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
export default ListaDestinos