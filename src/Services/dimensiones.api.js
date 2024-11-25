import axios from "axios"

export const getDimensiones = (token) => axios.get('http://localhost:8000/gestion_indicadores/api/dimensiones/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createDimension = (data, token) => axios.post('http://localhost:8000/gestion_indicadores/api/dimensiones/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const updateDimension = (id, data, token) => axios.put(`http://localhost:8000/gestion_indicadores/api/dimensiones/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const deleteDimension = (id, token) => axios.delete(`http://localhost:8000/gestion_indicadores/api/dimensiones/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });