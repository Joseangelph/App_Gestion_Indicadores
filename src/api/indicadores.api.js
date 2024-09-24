import axios from "axios"

export const getIndicadores = (token) => axios.get('http://localhost:8000/gestion_indicadores/api/indicadores/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createIndicador = (data, token) => axios.post('http://localhost:8000/gestion_indicadores/api/indicadores/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const updateIndicador = (id, data, token) => axios.put(`http://localhost:8000/gestion_indicadores/api/indicadores/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const deleteIndicador = (id, token) => axios.delete(`http://localhost:8000/gestion_indicadores/api/indicadores/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });