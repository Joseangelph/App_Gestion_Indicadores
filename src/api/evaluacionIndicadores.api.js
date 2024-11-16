import axios from "axios"

export const getEvaluacionIndicadores = (token) => axios.get('http://localhost:8000/gestion_evaluaciones/api/evaluacionesindicadores/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createEvaluacionIndicador = (data, token) => axios.post('http://localhost:8000/gestion_evaluaciones/api/evaluacionesindicadores/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });