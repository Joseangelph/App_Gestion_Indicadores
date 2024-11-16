import axios from "axios"

export const createSeleccionIndicadores = (evaluacionPlataformaId, indicadoresSeleccionados, token) => { 
  return axios.post('http://localhost:8000/gestion_evaluaciones/api/seleccionesindicadores/',
    {
      evaluacionPlataformaId,
      indicadoresSeleccionados
    },
    {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSeleccionesIndicadores = (token) => axios.get('http://localhost:8000/gestion_evaluaciones/api/seleccionesindicadores/',{
  headers: {
      Authorization: `Bearer ${token}`,
    },
});