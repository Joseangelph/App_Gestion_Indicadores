import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ListaDimensiones from "../../../Components/Dimensiones/ListaDimensiones";


function GestionarDimensiones() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Administrar dimensiones
            </Typography>
            <div className=" flex justify-between mt-5 mb-5">
              <Button onClick={()=>navegar('/crearDimensiones')} variant="contained">Crear Dimensiones</Button>
            </div>
            <div>
              <ListaDimensiones/>
            </div>
          </div>
        </Layout>
    )
  }
  
  export default GestionarDimensiones