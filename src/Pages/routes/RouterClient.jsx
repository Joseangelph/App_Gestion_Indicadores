import { Route, Routes } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import Home from '../Home';
import Footer from '../../Components/Footer';
// import AsideMenuExpert from '../../Components/AsideMenuExpert';
import AsideMenuAdmin from '../../Components/AsideMenuAdmin';
import CrearPlataformas from '../PlataformasPages/CrearPlataformas';
import EditarPlataformas from '../PlataformasPages/EditarPlataformas';
import GestionarPlataformas from '../PlataformasPages/GestionarPlataformas';
import MostrarPlataformas from '../PlataformasPages/MostrarPlataformas';
import GestionarEvaluacionesPlataformas from '../EvaluacionesPlataformasPages/GestionarEvaluacionesPlataformas';
import MostrarEvaluacionesPlataformas from '../EvaluacionesPlataformasPages/MostrarEvaluacionesPlataformas';




const RouterClient = () => {
  return (
    <>
        <Navbar/>
        <div className='flex'>
            <AsideMenuAdmin/>

            <Routes>
                <Route path="/home" element={<Home/> }/> 

                <Route path="/gestionarPlataformas" element={<GestionarPlataformas/>}/>
                <Route path="/crearPlataformas" element={<CrearPlataformas/>}/>
                <Route path="/editarPlataformas/:id" element={<EditarPlataformas/>}/>
                <Route path="/mostrarPlataformas/:id" element={<MostrarPlataformas/>}/>

                <Route path="/gestionarEvaluacionesPlataformas" element={<GestionarEvaluacionesPlataformas/>} />
                <Route path="/mostrarEvaluacionesPlataformas/:id" element={<MostrarEvaluacionesPlataformas/>}/>

            </Routes>
        </div>
        <Footer/>
    </>   
  )
}

export default RouterClient