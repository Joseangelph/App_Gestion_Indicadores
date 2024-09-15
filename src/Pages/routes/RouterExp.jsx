import { Route, Routes } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import Home from '../Home';
import AsideMenuExpert from '../../Components/AsideMenuExpert';




const RouterExp = () => {
  return (
    <>
        <Navbar/>
        <div className='flex'>
            <AsideMenuExpert/>

            <Routes>
                <Route path="/home" element={<Home/> }/> 
            </Routes>

        </div>
    </>   
  )
}

export default RouterExp