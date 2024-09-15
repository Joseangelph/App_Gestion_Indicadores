import {BrowserRouter, Routes, Route } from 'react-router-dom'
// import RouterInterno from './RouterInterno'
import { PaginaInicio } from '../../Components/PaginaInicio'
import { RutasPublicas } from './RutasPublicas'
import { RutasAdministrador } from './RutasAdministrador'
import { RutasExperto } from './RutasExperto'
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
                <RutasExperto >
                    <RouterExp/>
                </RutasExperto>
            } />

            <Route path="/*" element={
                <RutasAdministrador >
                    <RouterAdmin/>
                </RutasAdministrador>
            } />

            

        </Routes>
    </BrowserRouter>

)
}

export default AppRouter