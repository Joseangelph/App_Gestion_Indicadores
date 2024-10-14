import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ListaComponentes from "../../../Components/Componentes/ListaComponentes";


function GestionarComponentes() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Gestionar Componente
            </Typography>
            <div className=" flex justify-between mt-5 mb-5">
              <Button onClick={()=>navegar('/crearComponentes')} variant="contained">Crear Componentes</Button>
            </div>
            <div>
              <ListaComponentes/>
            </div>
          </div>
        </Layout>
    )
  }
  
  export default GestionarComponentes