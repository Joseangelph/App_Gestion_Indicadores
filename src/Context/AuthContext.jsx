// import { createContext, useState, useEffect } from "react";
// import  {jwtDecode}  from "jwt-decode";
import { createContext } from "react"


export const AuthContext = createContext();


// export const AuthProvider= ({children})=>{
//     const [usuario, setUsuario]= useState('')
//     const [autenticado, setAutenticado]= useState(false)
//     const [username, setUsername]= useState("")
//     const [push, setPush]= useState(true)


//     useEffect(() => {
//         // Recupera el token y decodifica el usuario
//         const token = localStorage.getItem('access_token');
//         // console.log('holaaaaa')
//         if (token) {
//           const decodedUser = jwtDecode(token);
//         //   console.log('Token decodificado:', decodedUser); // Aquí debería mostrar el rol
//           setUsuario(decodedUser);
//           setAutenticado(true)
//         }
//       }, [push]);

//         // Función para cerrar sesión
    

//     return(
//         <AuthContext.Provider value={{
//             usuario,
//             setUsuario,
//             autenticado,
//             setAutenticado,
//             username,
//             setUsername,
//             push,
//             setPush
//         }}>
//             {children}
//         </AuthContext.Provider>
//     )

// }