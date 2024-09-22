import Layout from "../../Components/Layout"
import ListaUsuarios from "../../Components/ListaUsuarios"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"

function GestionarUsuarios() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="mt-10 mb-5">
          <Stack spacing={2} direction="row">
            <Button onClick={()=>navegar('/crearUsuarios')} variant="outlined">Crear Usuario</Button>
            {/* <Button variant="outlined">Outlined</Button>
            <Button variant="outlined">Outlined</Button> */}
          </Stack>
          </div>
          <div>
            <ListaUsuarios/>
          </div>
          
        </Layout>
    )
  }
  
  export default GestionarUsuarios