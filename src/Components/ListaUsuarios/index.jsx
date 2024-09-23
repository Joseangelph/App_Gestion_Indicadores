import axios from 'axios';
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/users.api'
// import CardUsuario from '../CardUsuario'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { AuthContext } from '../../Context/AuthContext';



const ListaUsuarios = () => {
    const [userList,setUserList]= useState([])
    const { usuario } = useContext(AuthContext);
    const navegar = useNavigate();
    console.log(usuario)

    useEffect(() => {
        async function loadUsers(){
            const response= await getAllUsers();
            setUserList(response.data);
        }
        loadUsers();

    }, [])

    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/sesion/api/users/${id}/`, {
          headers: {
            'Authorization': `Bearer ${usuario.tokenAccess}`,
          },
        }
        
      );
        if (response.status === 204) {
          // Si la eliminación fue exitosa, actualiza la lista de usuarios
          setUserList(userList.filter(user => user.id !== id));
          console.log('Usuario eliminado exitosamente');
        } else {
          console.error('Error al eliminar el usuario');
        }
      } catch (error) {
        console.error('Error al conectar con la API', error);
      }
    };

        // Función para manejar la edición del usuario
        const handleEdit = (id) => {
          navegar(`/editarUsuarios/${id}`); // Redirigir a la página de edición con el ID del usuario
        };

 


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'first_name',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'last_name',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'role',
          headerName: 'role',
          width: 110,
          editable: true,
        },
        {
          field: 'username',
          headerName: 'username',
          width: 160,
          editable: true
        },
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
        checkboxSelection
        disableRowSelectionOnClick
      />
  </Box>



        
        
        // < >
        //     <div className='flex m-4 justify-between items-center'>
        //       <p>Username</p>
        //       <p>Nombre</p>
        //       <p>Apellido</p>
        //       <p>rol</p>

        //     </div>
        //     <div>
        //     {userList.map(user =>(
        //         <CardUsuario key={user.id} user={user} />
        //     ))}
        //     </div>
            
        // </>
    )

}

export default ListaUsuarios
