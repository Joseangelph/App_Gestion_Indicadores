import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

const MostrarEvaluacionPlataforma = () => {
  const { id } = useParams(); // Obtén el ID de la evaluación de plataforma desde la URL
  const { usuario } = useContext(AuthContext);
  const [evaluacionesIndicadores, setEvaluacionesIndicadores] = useState([]);

  useEffect(() => {
    const fetchEvaluacionesIndicadores = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/gestion_evaluaciones/evaluaciones-indicadores/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${usuario.tokenAccess}`,
            },
          }
        );
        setEvaluacionesIndicadores(response.data);
      } catch (error) {
        console.error("Error al obtener las evaluaciones de indicadores:", error);
      }
    };

    fetchEvaluacionesIndicadores();
  }, [id, usuario.tokenAccess]);

  const columns = [
    { field: "indicador_nombre", headerName: "Indicador", width: 300 },
    { field: "observaciones", headerName: "Observaciones", width: 300 },
    { field: "evaluacion", headerName: "Evaluación", width: 150 },
    // { field: "fecha_seleccion", headerName: "Fecha de Selección", width: 200 },
  ];

  const rows = evaluacionesIndicadores.map((evaluacionIndicador) => ({
    ...evaluacionIndicador,
      id: evaluacionIndicador.id 
  }));

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

export default MostrarEvaluacionPlataforma;
