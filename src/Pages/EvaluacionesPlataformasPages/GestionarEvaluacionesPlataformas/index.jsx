import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ListaEvaluacionPlataforma from "../../../Components/EvaluacionesPlataformas/ListaEvaluacionPlataformas";
import { useContext } from "react";
import { AuthContext } from '../../../Context/AuthContext';


function GestionarEvaluacionesPlataformas() {

    const { usuario } = useContext(AuthContext);
    const isAdmin = usuario.role=== 'administrador';
    const isExpert = usuario.role === 'experto';
    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5, marginBottom:"15px" }}
              >
              Administrar evaluaciones de las plataformas tecnológicas
            </Typography>
            {(isAdmin||isExpert) &&(<div className=" flex justify-between mb-5">
              <Button onClick={()=>navegar('/crearEvaluacionesPlataformas')} variant="contained">Crear evaluación a plataforma tecnológica</Button>
            </div>)}
            <div>
              <ListaEvaluacionPlataforma/>
            </div>
          </div>
        </Layout>
    )
  }
  
  export default GestionarEvaluacionesPlataformas