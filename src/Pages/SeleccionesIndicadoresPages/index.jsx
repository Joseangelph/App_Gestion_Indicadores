import Layout from "../../Components/Layout"
import {Typography} from '@mui/material';
import "./styles.css"
import SeleccionarIndicadores from "../../Components/SeleccionIndicadores/SeleccionarIndicadores";


function GestionarSeleccionesIndicadores() {

    return (
        <Layout>
          <div className="flex flex-col justify-center items-center">
            <Typography 
              variant="h4" 
              className="text-4xl font-bold text-blue-600"
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop:5 }}
              >
              Seleccionar indicadores para la plataforma tecnológica
            </Typography>
            <div>
              <SeleccionarIndicadores/>
            </div>
          </div>
        </Layout>
    )
  }
  
  export default GestionarSeleccionesIndicadores