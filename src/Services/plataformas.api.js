import axios from "axios"

export const getPlataformas = (token) => axios.get('http://localhost:8000/gestion_plataformas/api/plataformas/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createPlataforma = (data, token) => axios.post('http://localhost:8000/gestion_plataformas/api/plataformas/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updatePlataforma = (id, data, token) => axios.put(`http://localhost:8000/gestion_plataformas/api/plataformas/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const deletePlataforma = (id, token) => axios.delete(`http://localhost:8000/gestion_plataformas/api/plataformas/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});