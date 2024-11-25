import axios from "axios"

export const getDestinos = (token) => axios.get('http://localhost:8000/gestion_indicadores/api/destinos/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createDestino = (data, token) => axios.post('http://localhost:8000/gestion_indicadores/api/destinos/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const updateDestino = (id, data, token) => axios.put(`http://localhost:8000/gestion_indicadores/api/destinos/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const deleteDestino = (id, token) => axios.delete(`http://localhost:8000/gestion_indicadores/api/destinos/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });