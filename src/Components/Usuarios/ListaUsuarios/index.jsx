import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../../../api/users.api'
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
import { AuthContext } from '../../../Context/AuthContext';

const ListaUsuarios = () => {
    const [userList,setUserList]= useState([])
    const { usuario } = useContext(AuthContext);
    const navegar = useNavigate();

    const [openDialog, setOpenDialog] = useState(false); // Estado para controlar si el diálogo está abierto o cerrado
const [selectedId, setSelectedId] = useState(null);  // Estado para almacenar el ID del usuario seleccionado para eliminar
    
    useEffect(() => {
        async function loadUsers(){
            const response= await getAllUsers(usuario.tokenAccess);
            setUserList(response.data);
        }
        loadUsers(usuario.tokenAccess);

    }, [usuario.tokenAccess])

    const handleDelete = async () => {

      try {
        const response = await deleteUser(selectedId,usuario.tokenAccess);
        if (response.status === 204) {
          // Si la eliminación fue exitosa, actualiza la lista de usuarios
          setUserList(userList.filter(user => user.id !== selectedId));
          console.log('Usuario eliminado exitosamente');
        } else {
          console.error('Error al eliminar el usuario');
        }
        setOpenDialog(false); // Cierra el diálogo después de eliminar
      } catch (error) {
        console.error('Error al conectar con la API', error);
        setOpenDialog(false); // Cierra el diálogo si hay error
      }
    };

    const handleOpenDialog = (id) => {
      setSelectedId(id);  // Guarda el ID del usuario seleccionado
      setOpenDialog(true); // Abre el diálogo de confirmación
    };

    const handleCloseDialog = () => {
      setOpenDialog(false); // Cierra el diálogo sin eliminar
      setSelectedId(null); // Limpia el ID seleccionado
    };

    // Función para manejar la edición del usuario
    const handleEdit = (id) => {
      navegar(`/editarUsuarios/${id}`); // Redirigir a la página de edición con el ID del usuario
    };

    const columns = [
        {field: 'id', headerName: 'ID', width: 90 },
        {field: 'first_name', headerName: 'First name', width: 150, editable: true,},
        {field: 'last_name', headerName: 'Last name', width: 150, editable: true,},
        {field: 'role', headerName: 'role', width: 110, editable: true,},
        {field: 'username',headerName: 'username',width: 160,editable: true},
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

    const rows = userList.map((user) => ({ ...user, id: user.id }));

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
            ¿Estás seguro de que deseas eliminar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleDelete} color="error" autoFocus>
                Eliminar
              </Button>
        </DialogActions>
      </Dialog>
  </Box>
    )
}
export default ListaUsuarios
