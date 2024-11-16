import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ListaEvaluacionPlataforma from "../../../Components/EvaluacionesPlataformas/ListaEvaluacionPlataformas";


function GestionarEvaluacionesPlataformas() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Gestionar evaluaciones de las plataformas tecnológicas
            </Typography>
            <div className=" flex justify-between mt-5 mb-5">
              <Button onClick={()=>navegar('/crearEvaluacionesPlataformas')} variant="contained">Crear evaluación a plataforma tecnológica</Button>
            </div>
            <div>
              <ListaEvaluacionPlataforma/>
            </div>
          </div>
        </Layout>
    )
  }
  
  export default GestionarEvaluacionesPlataformas