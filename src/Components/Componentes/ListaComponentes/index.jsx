
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
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

import { AuthContext } from '../../../Context/AuthContext';
import { deleteComponente, getComponentes } from '../../../api/componentes.api';
import { toggleHabilitado} from "../../../api/toggleHabilitado.api";


const ListaComponentes = () => {
    const [componenteList,setComponenteList]= useState([])
    const { usuario } = useContext(AuthContext);
    const navegar = useNavigate();

    const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
    const [selectedId, setSelectedId] = useState(null); // Estado para el ID del indicador a eliminar
    // console.log(usuario)

    useEffect(() => {
        async function loadComponentes(){
            const response= await getComponentes(usuario.tokenAccess);
            setComponenteList(response.data);
        }
        loadComponentes();
    }, [usuario.tokenAccess])


    const handleToggleHabilitado = async (id) => {
      try {
          const response = await toggleHabilitado('componente', id, usuario.tokenAccess);
          const updatedComponentes = componenteList.map((componente) =>
              componente.id === id ? { ...componente, habilitado: response.data.habilitado } : componente
          );
          setComponenteList(updatedComponentes);
      } catch (error) {
          console.error('Error al alternar el estado:', error);
      }
    };


    const handleDelete = async () => {
      try {
        const response = await deleteComponente(selectedId,usuario.tokenAccess);
        if (response.status === 204) {
          // Si la eliminación fue exitosa, actualiza la lista de indicadores
          setComponenteList(componenteList.filter(componente => componente.id !== selectedId));
          console.log('Componente eliminado exitosamente');
        } else {
          console.error('Error al eliminar el componente');
        }
        setOpenDialog(false); // Cierra el diálogo después de eliminar
      } catch (error) {
        console.error('Error al conectar con la API', error);
        setOpenDialog(false); // Cierra el diálogo si hay error
      }
    };

    const handleOpenDialog = (id) => {
      setSelectedId(id); // Guarda el ID del componente a eliminar
      setOpenDialog(true); // Abre el diálogo
    };

    // Función para manejar la edición del componente
    const handleEdit = (id) => {
      navegar(`/editarComponentes/${id}`); // Redirigir a la página de edición con el ID del Componente seleccionado
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
        {field: 'nombre', headerName: 'nombre', width: 200, editable: true},
        {field: 'destino_impacto_nombre', headerName: 'Destino de impacto', width: 150, editable: false },
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
                onClick={() => handleOpenDialog(params.row.id)} // Abre el diálogo de confirmación
              >
                Eliminar
              </Button>
            </Box>
          ),
        },
      ];

    const rows = componenteList.map((componente) => ({ ...componente, id: componente.id }));

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
            ¿Estás seguro de que deseas eliminar este Componente?
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
export default ListaComponentes