import * as React from 'react';
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../api/users.api'
// import CardUsuario from '../CardUsuario'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const ListaUsuarios = () => {

    const [userList,setUserList]= useState([])

    useEffect(() => {
        async function loadUsers(){
            const response= await getAllUsers();
            setUserList(response.data);
        }
        loadUsers();

    }, [])



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
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
          width: 160,
        //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
          editable: true
        },
      ];


      const rows = userList.map(user => user);

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
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
        
        
        // <div>
        //     {user.map(user =>(
        //         <CardUsuario key={user.id} user={user} />
        //     ))}
        // </div>
    )

}

export default ListaUsuarios
