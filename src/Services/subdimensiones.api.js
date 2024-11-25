import axios from "axios"

export const getSubdimensiones = (token) => axios.get('http://localhost:8000/gestion_indicadores/api/subdimensiones/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createSubdimension = (data, token) => axios.post('http://localhost:8000/gestion_indicadores/api/subdimensiones/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const updateSubdimension = (id, data, token) => axios.put(`http://localhost:8000/gestion_indicadores/api/subdimensiones/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const deleteSubdimension = (id, token) => axios.delete(`http://localhost:8000/gestion_indicadores/api/subdimensiones/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });