import axios from "axios"

export const getComponentes = (token) => axios.get('http://localhost:8000/gestion_indicadores/api/componentes/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createComponente = (data, token) => axios.post('http://localhost:8000/gestion_indicadores/api/componentes/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const updateComponente = (id, data, token) => axios.put(`http://localhost:8000/gestion_indicadores/api/componentes/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const deleteComponente = (id, token) => axios.delete(`http://localhost:8000/gestion_indicadores/api/componentes/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });