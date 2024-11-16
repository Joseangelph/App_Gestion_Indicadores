import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import MostrarEvaluacionPlataforma from "../../../Components/EvaluacionesPlataformas/MostrarEvaluacionPlataforma";

function MostrarEvaluacionesPlataformas() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Detalles de las evaluaciones de indicadores la plataforma
            </Typography>
            <div>
              <MostrarEvaluacionPlataforma/>
            </div>
            <div className=" flex justify-between mt-5 mb-5">
              <Button onClick={()=>navegar('/gestionarEvaluacionesPlataformas')} variant="contained">Aceptar</Button>
            </div>
          </div>
        </Layout>
    )
  }
  
  export default MostrarEvaluacionesPlataformas