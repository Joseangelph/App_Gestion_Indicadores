import {BrowserRouter, Routes, Route } from 'react-router-dom'
// import RouterInterno from './RouterInterno'
import { PaginaInicio } from '../../Components/PaginaInicio'
import { RutasPublicas } from './RutasPublicas'
import { RutasAdministrador } from './RutasAdministrador'
import { RutasExperto } from './RutasExperto'
import { RutasGenerales } from './RutasGenerales'
import RouterAdmin from './RouterAdmin'
import RouterExp from './RouterExp'


function AppRouter() {

  return (
    <BrowserRouter>
        <Routes>
        
            <Route path="/" element={
                <RutasPublicas>
                    <PaginaInicio />
                </RutasPublicas>
            } />

            <Route path="/*" element={
                <RutasGenerales>
                    <>
                    <RutasAdministrador >
                        <RouterAdmin/>
                    </RutasAdministrador>

                    <RutasExperto >
                        <RouterExp/>
                    </RutasExperto>

                    
                    </>
                    
                </RutasGenerales> 
            } />
  
        </Routes>
    </BrowserRouter>

)
}

export default AppRouter