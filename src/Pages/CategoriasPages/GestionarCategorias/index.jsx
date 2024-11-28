import Layout from "../../../Components/Layout"
import {Button, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ListaCategorias from "../../../Components/Categorias/ListaCategorias";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Importamos el ícono
import { green, grey } from "@mui/material/colors";

function GestionarCategorias() {

    const navegar = useNavigate();

    return (
        <Layout>
          <div className="flex flex-col">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600 text-center "
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Gestionar categorías de análisis
            </Typography>
            <div className=" flex justify-center mt-5 mb-2">
              <Button onClick={()=>navegar('/crearCategorias')} variant="contained">Crear categorías de análisis</Button>
            </div>
            <div>
              <ListaCategorias/>
            </div>
          </div>
          
          
        </Layout>
    )
  }
  
  export default GestionarCategorias