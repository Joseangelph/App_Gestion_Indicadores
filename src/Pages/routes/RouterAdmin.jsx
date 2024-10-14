
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import Home from '../../Pages/Home'
import AsideMenuAdmin from '../../Components/AsideMenuAdmin';
import GestionarIndicadores from '../IndicadoresPages/GestionarIndicadores';
import CrearIndicadores from '../IndicadoresPages/CrearIndicadores';
import EditarIndicadores from '../IndicadoresPages/EditarIndicadores';
import GestionarUsuarios from '../UsuariosPages/GestionarUsuarios';
import CrearUsuarios from '../UsuariosPages/CrearUsuarios';
import EditarUsuarios from '../UsuariosPages/EditarUsuarios';
import Footer from '../../Components/Footer';
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
import GestionarPlataformas from '../PlataformasPages/GestionarPlataformas';
import CrearPlataformas from '../PlataformasPages/CrearPlataformas';
import EditarPlataformas from '../PlataformasPages/EditarPlataformas';


const RouterAdmin = () => {
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

                <Route path="/gestionarCategorias" element={<GestionarCategorias/>}/>
                <Route path="/crearCategorias" element={<CrearCategorias/>}/>
                <Route path="/editarCategorias/:id" element={<EditarCategorias/>}/>

                <Route path="/gestionarDestinos" element={<GestionarDestinos/>} />
                <Route path="/crearDestinos" element={<CrearDestinos/>}/>
                <Route path="/editarDestinos/:id" element={<EditarDestinos/>} />

                <Route path="/gestionarComponentes" element={<GestionarComponentes/>} />
                <Route path="/crearComponentes" element={<CrearComponentes/>}/>
                <Route path="/editarComponentes/:id" element={<EditarComponentes/>} />

                <Route path="/gestionarDimensiones" element={<GestionarDimensiones/>} />
                <Route path="/crearDimensiones" element={<CrearDimensiones/>}/>
                <Route path="/editarDimensiones/:id" element={<EditarDimensiones/>} />

                <Route path="/gestionarSubdimensiones" element={<GestionarSubdimensiones/>} />
                <Route path="/crearSubdimensiones" element={<CrearSubdimensiones/>}/>
                <Route path="/editarSubdimensiones/:id" element={<EditarSubdimensiones/>} />

                <Route path="/gestionarPlataformas" element={<GestionarPlataformas/>}/>
                <Route path="/crearPlataformas" element={<CrearPlataformas/>}/>
                <Route path="/editarPlataformas/:id" element={<EditarPlataformas/>}/>

                <Route path="/gestionarUsuarios" element={<GestionarUsuarios/>} />
                <Route path="/crearUsuarios" element={<CrearUsuarios/>}/>
                <Route path="/editarUsuarios/:id" element={<EditarUsuarios/>} />

                
            </Routes>
              
        </div>
        <Footer/>
    </>   
  )
}

export default RouterAdmin


    
      
    
    