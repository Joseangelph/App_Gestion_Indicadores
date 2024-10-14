import axios from "axios"

export const getCategorias = (token) => axios.get('http://localhost:8000/gestion_indicadores/api/categorias/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createCategoria = (data, token) => axios.post('http://localhost:8000/gestion_indicadores/api/categorias/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const updateCategoria = (id, data, token) => axios.put(`http://localhost:8000/gestion_indicadores/api/categorias/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const deleteCategoria = (id, token) => axios.delete(`http://localhost:8000/gestion_indicadores/api/categorias/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });