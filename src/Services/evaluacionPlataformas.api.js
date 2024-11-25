import axios from "axios"

export const getEvaluacionPlataformas = (token) => axios.get('http://localhost:8000/gestion_evaluaciones/api/evaluacionesplataformas/',{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

export const createEvaluacionPlataforma = (data, token) => axios.post('http://localhost:8000/gestion_evaluaciones/api/evaluacionesplataformas/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteEvaluacionPlataforma= (id, token) => axios.delete(`http://localhost:8000/gestion_evaluaciones/api/evaluacionesplataformas/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});  


  // export const fetchIndicadoresFinales = (evaluacionId) => 
  //   axios.post(`http://localhost:8000/gestion_evaluaciones/api/evaluacionesplataformas/${evaluacionId}/indicadores_finales/`);

