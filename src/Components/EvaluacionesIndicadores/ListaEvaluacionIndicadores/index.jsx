import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ListaEvaluacionIndicadores = ({ evaluacionesIndicadores }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                marginTop: 2,
                maxHeight: 250, // Limita la altura máxima de la tabla
                overflow: "auto", // Permite scroll vertical y horizontal
            }}
        >
            <Table stickyHeader
            sx={{
                "& td, & th": {
                    borderRight: "1px solid rgba(0, 0, 0, 0.1)", // Borde sutil
                },
                "& th": {
                    backgroundColor: "#f5f5f5", // Fondo claro para encabezados
                    color: "#333", // Texto oscuro para contraste
                    fontWeight: "bold",
                },
                "& tr:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)", // Fondo al pasar el mouse
                },
            }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Indicador</TableCell>
                        <TableCell>Observaciones</TableCell>
                        <TableCell>Evaluación</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {evaluacionesIndicadores.map((evaluacion, index) => (
                        <TableRow key={index}>
                            <TableCell 
                            sx={{
                                maxWidth: 150, // Ancho máximo de la celda
                                overflow: "hidden", // Oculta contenido que excede
                                textOverflow: "ellipsis", // Muestra puntos suspensivos
                                whiteSpace: "nowrap", // Evita que el texto se envuelva
                            }}>
                                {evaluacion.indicador_nombre}
                            </TableCell>

                            <TableCell
                            sx={{
                                maxWidth: 150, // Ancho máximo de la celda
                                overflow: "hidden", // Oculta contenido que excede
                                textOverflow: "ellipsis", // Muestra puntos suspensivos
                                whiteSpace: "nowrap", // Evita que el texto se envuelva
                            }}
                            >
                                {evaluacion.observaciones}
                            </TableCell>

                            <TableCell
                            sx={{
                                maxWidth: 150, // Ancho máximo de la celda
                                overflow: "hidden", // Oculta contenido que excede
                                textOverflow: "ellipsis", // Muestra puntos suspensivos
                                whiteSpace: "nowrap", // Evita que el texto se envuelva
                            }}>
                                {evaluacion.evaluacion}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

ListaEvaluacionIndicadores.propTypes = {
    evaluacionesIndicadores: PropTypes.array.isRequired,
};

export default ListaEvaluacionIndicadores;