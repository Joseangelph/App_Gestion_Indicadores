
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import Home from '../../Pages/Home'
import CrearIndicadores from '../CrearIndicadores'
import AsideMenuAdmin from '../../Components/AsideMenuAdmin';
import GestionarUsuarios from '../GestionarUsuarios';
import CrearUsuarios from '../CrearUsuarios';
import Footer from '../../Components/Footer';
import EditarUsuarios from '../EditarUsuarios';


const RouterAdmin = () => {
  return (
    <>
        <Navbar/>
        <div className='flex'>
            <AsideMenuAdmin/>
            
            <Routes>
                <Route path="/home" element={<Home/> }/> 
                <Route path="/crearIndicadores" element={<CrearIndicadores/>}/>
                <Route path="/gestionarUsuarios" element={<GestionarUsuarios/>}/>
                <Route path="/crearUsuarios" element={<CrearUsuarios/>}/>
                <Route path="/editarUsuarios/:id" element={<EditarUsuarios/>} />

            </Routes>
              
        </div>
        <Footer/>
    </>   
  )
}

export default RouterAdmin


    
      
    
    