import Layout from "../../../Components/Layout"
import ListaIndicadores from "../../../Components/Indicadores/ListaIndicadores";
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
              Administrar indicadores
            </Typography>
            <div className=" flex justify-between mt-5 mb-5">
              <Button onClick={()=>navegar('/crearIndicadores')} variant="contained">Crear Indicador</Button>
              {/* <Button onClick={()=>navegar('/gestionarCategorias')} variant="contained">Crear Indicador</Button>
              <Button onClick={()=>navegar('/gestionarDestinos')} variant="contained">Crear Indicador</Button>
              <Button onClick={()=>navegar('/gestionarComponentes')} variant="contained">Crear Indicador</Button>
              <Button onClick={()=>navegar('/gestionarDimensiones')} variant="contained">Crear Indicador</Button>
              <Button onClick={()=>navegar('/gestionarSubdimensiones')} variant="contained">Crear Indicador</Button> */}
            </div>
            <div>
              <ListaIndicadores/>
            </div>
          </div>
          
          
        </Layout>
    )
  }
  
  export default GestionarUsuarios