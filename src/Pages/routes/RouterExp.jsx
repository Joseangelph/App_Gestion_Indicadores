import { Route, Routes } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import Home from '../Home';
import Footer from '../../Components/Footer';
// import AsideMenuExpert from '../../Components/AsideMenuExpert';
import AsideMenuAdmin from '../../Components/AsideMenuAdmin';
import GestionarIndicadores from '../IndicadoresPages/GestionarIndicadores';
import CrearIndicadores from '../IndicadoresPages/CrearIndicadores';
import EditarIndicadores from '../IndicadoresPages/EditarIndicadores';
import EditarCategorias from '../CategoriasPages/EditarCategorias';
import CrearCategorias from '../CategoriasPages/CrearCategorias';
import GestionarCategorias from '../CategoriasPages/GestionarCategorias';
import GestionarDestinos from '../DestinosPages/GestionarDestinos';
import CrearDestinos from '../DestinosPages/CrearDestinos';
import EditarDestinos from '../DestinosPages/EditarDestinos';
import GestionarComponentes from '../ComponentesPages/GestionarComponentes';
import CrearComponentes from '../ComponentesPages/CrearComponentes';
import EditarComponentes from '../ComponentesPages/EditarComponentes';
import GestionarDimensiones from '../DimensionesPages/GestionarDimensiones';
import CrearDimensiones from '../DimensionesPages/CrearDimensiones';
import EditarDimensiones from '../DimensionesPages/EditarDimensiones';
import GestionarSubdimensiones from '../SubdimensionesPages/GestionarSubdimensiones';
import CrearSubdimensiones from '../SubdimensionesPages/CrearSubdimensiones';
import EditarSubdimensiones from '../SubdimensionesPages/EditarSubdimensiones';
import MostrarCategorias from '../CategoriasPages/MostrarCategorias';
import MostrarComponentes from '../ComponentesPages/MostrarComponentes';
import MostrarDestinos from '../DestinosPages/MostrarDestinos';
import MostrarDimensiones from '../DimensionesPages/MostrarDimensiones';
import MostrarSubdimensiones from '../SubdimensionesPages/MostrarSubdimensiones';
import MostrarIndicadores from '../IndicadoresPages/MostrarIndicadores';
import CrearEvaluacionesPlataformas from '../EvaluacionesPlataformasPages/CrearEvaluacionesPlataformas';
import GestionarEvaluacionesPlataformas from '../EvaluacionesPlataformasPages/GestionarEvaluacionesPlataformas';
import GestionarSeleccionesIndicadores from '../SeleccionesIndicadoresPages';
import GestionarEvaluacionesIndicadores from '../EvaluacionesIndicadoresPages';
import MostrarEvaluacionesPlataformas from '../EvaluacionesPlataformasPages/MostrarEvaluacionesPlataformas';




const RouterExp = () => {
  return (
    <>
        <Navbar/>
        <div className='flex'>
            <AsideMenuAdmin/>

            <Routes>
                <Route path="/home" element={<Home/> }/> 

                <Route path="/gestionarIndicadores" element={<GestionarIndicadores/>}/>
                <Route path="/crearIndicadores" element={<CrearIndicadores/>}/>
                <Route path="/editarIndicadores/:id" element={<EditarIndicadores/>}/>
                <Route path="/mostrarIndicadores/:id" element={<MostrarIndicadores/>}/>

                <Route path="/gestionarCategorias" element={<GestionarCategorias/>}/>
                <Route path="/crearCategorias" element={<CrearCategorias/>}/>
                <Route path="/editarCategorias/:id" element={<EditarCategorias/>}/>
                <Route path="/mostrarCategorias/:id" element={<MostrarCategorias/>}/>

                <Route path="/gestionarDestinos" element={<GestionarDestinos/>} />
                <Route path="/crearDestinos" element={<CrearDestinos/>}/>
                <Route path="/editarDestinos/:id" element={<EditarDestinos/>} />
                <Route path="/mostrarDestinos/:id" element={<MostrarDestinos/>}/>

                <Route path="/gestionarComponentes" element={<GestionarComponentes/>} />
                <Route path="/crearComponentes" element={<CrearComponentes/>}/>
                <Route path="/editarComponentes/:id" element={<EditarComponentes/>} />
                <Route path="/mostrarComponentes/:id" element={<MostrarComponentes/>}/>

                <Route path="/gestionarDimensiones" element={<GestionarDimensiones/>} />
                <Route path="/crearDimensiones" element={<CrearDimensiones/>}/>
                <Route path="/editarDimensiones/:id" element={<EditarDimensiones/>} />
                <Route path="/mostrarDimensiones/:id" element={<MostrarDimensiones/>}/>

                <Route path="/gestionarSubdimensiones" element={<GestionarSubdimensiones/>} />
                <Route path="/crearSubdimensiones" element={<CrearSubdimensiones/>}/>
                <Route path="/editarSubdimensiones/:id" element={<EditarSubdimensiones/>} />
                <Route path="/mostrarSubdimensiones/:id" element={<MostrarSubdimensiones/>}/>

                <Route path="/gestionarEvaluacionesPlataformas" element={<GestionarEvaluacionesPlataformas/>} />
                <Route path="/crearEvaluacionesPlataformas" element={<CrearEvaluacionesPlataformas/>}/>
                <Route path="/mostrarEvaluacionesPlataformas/:id" element={<MostrarEvaluacionesPlataformas/>}/>

                <Route path="/seleccionarIndicadores/:id" element={<GestionarSeleccionesIndicadores/>}/>

                <Route path="/evaluarIndicadores/:id" element={<GestionarEvaluacionesIndicadores/>}/>

            </Routes>
        </div>
        <Footer/>
    </>   
  )
}

export default RouterExp