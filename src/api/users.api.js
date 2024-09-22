import axios from "axios"

export const getAllUsers= ()=>{
    return axios.get('http://localhost:8000/sesion/api/users/')
}

export const createUser= (user)=>{
    return axios.post('http://localhost:8000/sesion/api/users/', user)
}