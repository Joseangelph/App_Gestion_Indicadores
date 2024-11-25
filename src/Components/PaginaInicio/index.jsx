import React from "react";
import FormAutenticar from "../FormAutenticar";
import Logo from "./Logo.png";
import { Box, Typography, Paper } from "@mui/material";

export const PaginaInicio = () => {
  return (
    <Box
      className="paginaInicio"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#646464", // Fondo gris claro
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={10}
        className="flex flex-col items-center"
        sx={{
          padding: 4,
          borderRadius: 4,
          maxWidth: 450,
          textAlign: "center",
          backgroundColor: "#f4f4f4",
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: "90px", height:"85px" ,marginBottom: "5px" }} />
        <Typography variant="h5" style={{marginBottom:"20px"}} fontWeight="bold" gutterBottom>
          Sistema de Gestion de indicadores para la medicion de impacto
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Inicia sesión para continuar.
        </Typography>
        <FormAutenticar />
      </Paper>
    </Box>
  );
};