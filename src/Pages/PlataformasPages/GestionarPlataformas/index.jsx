import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ListaPlataforma from "../../../Components/Plataformas/ListaPlataformas";


function GestionarPlataformas() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Gestionar Plataformas Tecnológicas
            </Typography>
            <div className=" flex justify-between mt-5 mb-5">
              <Button onClick={()=>navegar('/crearPlataformas')} variant="contained">Crear Plataformas Tecnológicas</Button>
            </div>
            <div>
              <ListaPlataforma/>
            </div>
          </div>
          
          
        </Layout>
    )
  }
  
  export default GestionarPlataformas