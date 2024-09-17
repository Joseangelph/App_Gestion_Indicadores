
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import Home from '../../Pages/Home'
import CrearIndicadores from '../CrearIndicadores'
import AsideMenuAdmin from '../../Components/AsideMenuAdmin';


const RouterAdmin = () => {
  return (
    <>
        <Navbar/>
        <div className='flex'>
            <AsideMenuAdmin/>
            
            <Routes>
                <Route path="/home" element={<Home/> }/> 
                <Route path="/crearIndicadores" element={<CrearIndicadores/>}/>
            </Routes>
              
        </div>
    </>   
  )
}

export default RouterAdmin


    
      
    
    