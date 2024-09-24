import axios from "axios"

export const getAllUsers= (token)=>{
    return axios.get('http://localhost:8000/sesion/api/users/',{
        headers: {
            Authorization: `Bearer ${token}`,
          }, 
    })
}

export const createUser= (data, token)=>{
    return axios.post('http://localhost:8000/sesion/api/users/', data, {
        headers: {
            Authorization: `Bearer ${token}`,
          }, 
    })
}

export const deleteUser= (id,token)=>{
    return axios.delete(`http://localhost:8000/sesion/api/users/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
          }, 
    })
}
