import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ListaDestinos from "../../../Components/DestinosImpacto/ListaDestinos";


function GestionarDestinos() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Gestionar Destinos de impacto
            </Typography>
            <div className=" flex justify-between mt-5 mb-5">
              <Button onClick={()=>navegar('/crearDestinos')} variant="contained">Crear Destinos</Button>
            </div>
            <div>
              <ListaDestinos/>
            </div>
          </div>
        </Layout>
    )
  }
  
  export default GestionarDestinos