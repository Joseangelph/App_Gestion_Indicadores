import Layout from "../../../Components/Layout"
import ListaUsuarios from "../../../Components/Usuarios/ListaUsuarios"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"

function GestionarUsuarios() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Gestionar Usuarios
            </Typography>
            <div className="mt-5 mb-5">
              <Button onClick={()=>navegar('/crearUsuarios')} variant="contained">Crear Usuario</Button>

            </div>
            <div>
              <ListaUsuarios/>
            </div>
          </div>
          
          
        </Layout>
    )
  }
  
  export default GestionarUsuarios