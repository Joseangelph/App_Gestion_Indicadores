import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const FormCrearEvaluacionIndicador = ({ agregarEvaluacion, seleccionesIndicadores }) => {
  // const [formData, setFormData] = useState({
  //   seleccionIndicador: '',
  //   observaciones: '',
  //   evaluacion: '',
  // });

  const [seleccionIndicador, setSeleccionIndicador] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [evaluacion, setEvaluacion] = useState("");
 

  // const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo

  
  const handleAgregarEvaluacion = () => {
    const selectedIndicador = seleccionesIndicadores.find(ind => ind.id === seleccionIndicador);
    // Agregar la evaluación al array temporal
    agregarEvaluacion({
        seleccionIndicador,
        observaciones,
        indicador_nombre: selectedIndicador.indicador_nombre,
        evaluacion,
    });
    // setOpenDialog(true);
    // Limpiar campos después de agregar
    setSeleccionIndicador("");
    setObservaciones("");
    setEvaluacion("");
};

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  return (
    
    <Box className="form-container flex flex-col items-center justify-center rounded-lg">
      <div className="w-full max-w-lg p-1">
        
        {/* Contenedor con display flex para los dos selects */}
        <Box display="flex" gap={2}>

          {/* Select para elegir las selecciones de indicadores */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="seleccionIndicadores-label">Indicadores seleccionados</InputLabel>
            <Select
              labelId="seleccionIndicadores-label"
              name="seleccionIndicador"
              value={seleccionIndicador}
              onChange={(e) => setSeleccionIndicador(e.target.value)}
              label="Indicadores seleccionados"
            >
              {seleccionesIndicadores.map((indicador) => (
                <MenuItem key={indicador.id} value={indicador.id}>
                  {indicador.indicador_nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select para elegir la evaluación */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="evaluacion-label">Evaluación</InputLabel>
            <Select
              labelId="evaluacion-label"
              id="evaluacion"
              name="evaluacion"
              value={evaluacion}
              onChange={(e) => setEvaluacion(e.target.value)}
              label="Evaluación"
            >
              <MenuItem value="">
                <em>Selecciona la evaluación</em>
              </MenuItem>
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

        </Box>
        
        <TextField
          label="Observaciones"
          name="observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline // Convierte el TextField en un textarea
          rows={4} // Número de filas visibles iniciales
        />
        
        <Button 
          variant="contained"
          color="primary"
          onClick={handleAgregarEvaluacion} 
          fullWidth
          disabled={!seleccionIndicador || !evaluacion || !observaciones}
        >
          Agregar evaluación de Indicador
        </Button>

      </div>

      {/* Diálogo de confirmación */}
      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Evaluación de Indicador creada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La evaluación de Indicador ha sido creado exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
);
};

FormCrearEvaluacionIndicador.propTypes = {
  agregarEvaluacion: PropTypes.func.isRequired, // Requiere que agregarEvaluacion sea una función
  seleccionesIndicadores: PropTypes.array.isRequired,
};

export default FormCrearEvaluacionIndicador;