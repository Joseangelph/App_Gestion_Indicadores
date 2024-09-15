
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
// import Home from '../Home'
import CrearIndicadores from '../CrearIndicadores'
import AsideMenuAdmin from '../../Components/AsideMenuAdmin';


const RouterAdmin = () => {
  return (
    <>
        <Navbar/>
        <div className='flex'>
            <AsideMenuAdmin/>
            
            {/* <Routes>
                <Route path="/home" element={<Home /> }/> 
            </Routes> */}

            <Routes>
                <Route path="/crearIndicadores" element={<CrearIndicadores/>}/>
            </Routes>
                
              
        </div>
    </>   
  )
}

export default RouterAdmin


    
      
    
    