import './App.css'
import AppRouter from '../routes/AppRouter'
import { AuthContext } from '../../Context/AuthContext';
import { useEffect, useReducer } from 'react';
import { authReducer } from '../../auth/authReducer';
// import { AuthProvider } from '../../Context/AuthContext';

const init = () => {
  return JSON.parse( localStorage.getItem('usuario') ) || { logged: false, tokenAccess: '' };
}

function App() {

  const [ usuario, dispatch ] = useReducer( authReducer, {}, init )

  useEffect( () => {
    if( !usuario ) return;


    localStorage.setItem( 'usuario', JSON.stringify( usuario) );
  }, [usuario]);


  return (
      <AuthContext.Provider value={{
        usuario,
        dispatch,
      }}>
        <AppRouter/>
      </AuthContext.Provider>
  )
}

export default App
