import './App.css'
import AppRouter from '../routes/AppRouter'
import { AuthProvider } from '../../Context/AuthContext'


function App() {

  return (
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
  )
}

export default App
