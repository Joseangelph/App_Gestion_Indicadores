import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ListaEvaluacionIndicadores = ({ evaluacionesIndicadores }) => {

    return (
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
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
                            <TableCell>{evaluacion.indicador_nombre}</TableCell>
                            <TableCell>{evaluacion.observaciones}</TableCell>
                            <TableCell>{evaluacion.evaluacion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )

}

ListaEvaluacionIndicadores.propTypes = {
  evaluacionesIndicadores: PropTypes.array.isRequired,
};

export default ListaEvaluacionIndicadores