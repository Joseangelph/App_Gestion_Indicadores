import { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel,
  FormControl,  Dialog, DialogActions, DialogContent, DialogContentText,
   DialogTitle, Radio, FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createIndicador } from '../../../Services/indicadores.api';
import { getDimensiones } from '../../../Services/dimensiones.api';
import { getSubdimensiones } from '../../../Services/subdimensiones.api';

const FormCrearIndicador = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
    dimension: '',
    subdimension: '',
    tipo: '',
  });

  const [errors, setErrors] = useState({}); // Estado para los errores
  const [dimensiones, setDimensiones] = useState([]);
  const [subdimensiones, setSubdimensiones] = useState([]);
  const [herencia, setHerencia] = useState('dimension'); // Estado para controlar qué select está habilitado
  const { usuario } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
  const dimensionesHabilitadas = dimensiones.filter(dimension => dimension.habilitado);
  const subdimensionesHabilitadas = subdimensiones.filter(subdimension => subdimension.habilitado);
  const navegar= useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData); // Verifica los datos antes de enviarlos
    if (validateForm()) {
      try {
        const response = await createIndicador(formData,usuario.tokenAccess)
        // navegar("/gestionarIndicadores")
        setOpenDialog(true); // Abre el diálogo de éxito
        return response.data;
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarIndicadores"); // Redirige después de cerrar el diálogo
  };

  useEffect(() => {
    // Función para obtSubdimensiones Dimensiones desde la API
    const fetchDimensiones = async () => {
      try {
        const response = await getDimensiones(usuario.tokenAccess); // Función para llamar la API
        setDimensiones(response.data);
      } catch (error) {
        console.error('Error al obtener los Dimensiones :', error);
      }
    };

    const fetchSubdimensiones = async () => {
      try {
        const response = await getSubdimensiones(usuario.tokenAccess); // Función para llamar la API
        setSubdimensiones(response.data);
      } catch (error) {
        console.error('Error al obtener las subdimensiones:', error);
      }
    };
    fetchSubdimensiones();
    fetchDimensiones();
  }, [usuario.tokenAccess]);

  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};

    if (!formData.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(formData.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }
    
    if (!formData.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";
    if (!formData.tipo) tempErrors.tipo = "Debe seleccionar un tipo.";
    if (herencia === 'dimension' && !formData.dimension) {
      tempErrors.selects = "Debe seleccionar una dimensión.";
    }
    if (herencia === 'subdimension' && !formData.subdimension) {
      tempErrors.selects = "Debe seleccionar una subdimensión.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleHerenciaChange = (event) => {
    const newHerencia = event.target.value;
    setHerencia(newHerencia);
    // Limpia el campo deshabilitado para evitar que se envíe su valor
    setFormData({
      ...formData,
      dimension: newHerencia === 'subdimension' ? '' : formData.dimension,
      subdimension: newHerencia === 'dimension' ? '' : formData.subdimension,
    });
  };

  return (
    
<Box className="form-container flex flex-col items-center justify-center mt-10 w-3/4 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar Indicador
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full max-w-3xl p-1">
        <Box display="flex" gap={2} width="100%">
          <TextField
            label="Introducir nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              label="Tipo"
            >
              <MenuItem value="">
                <em>Selecciona el Tipo</em>
              </MenuItem>
              <MenuItem value="potencial">Potencial</MenuItem>
              <MenuItem value="transversal">Transversal</MenuItem>
            </Select>
            {errors.tipo && (
              <Typography color="error" variant="body2">
                {errors.tipo}
              </Typography>
            )}
          </FormControl>

        </Box>
        
        <TextField
          label="concepto"
          name="concepto"
          value={formData.concepto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline // Convierte el TextField en un textarea
          rows={4} // Número de filas visibles iniciales
          error={Boolean(errors.concepto)}
          helperText={errors.nombre}
        />


        {/* Contenedor para Dimensión */}
      <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
          <FormControl fullWidth disabled={herencia === 'subdimension'} >
            <InputLabel >Dimensión a la que pertenece</InputLabel>
            <Select
              name="dimension"
              value={formData.dimension}
              onChange={handleChange}
              label="Dimensión a la que pertenece"
            >
              {dimensionesHabilitadas.map((dimension) => (
                <MenuItem key={dimension.id} value={dimension.id}>
                  {dimension.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Radio 
                checked={herencia === 'dimension'} 
                onChange={handleHerenciaChange} 
                value="dimension" 
                color="primary" 
              />
            }
            label=""
          />
        </Box>

        {/* Contenedor para Subdimension */}
        <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
          <FormControl fullWidth disabled={herencia === 'dimension'}>
            <InputLabel>Subdimensión a la que pertenece</InputLabel>
            <Select
              name="subdimension"
              value={formData.subdimension}
              onChange={handleChange}
              label="Subimensión a la que pertenece"
            >
              {subdimensionesHabilitadas.map((subdimension) => (
                <MenuItem key={subdimension.id} value={subdimension.id}>
                  {subdimension.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Radio 
                checked={herencia === 'subdimension'} 
                onChange={handleHerenciaChange} 
                value="subdimension" 
                color="primary" 
              />
            }
            label=""
          />
        </Box>

        {errors.selects && (
          <Typography color="error" variant="body2">
            {errors.selects}
          </Typography>
        )}

        <Box mt={2} className="flex items-center justify-between">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth
          >
            Crear
          </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navegar('/gestionarIndicadores')}
          style={{ marginLeft: '10px' }}
          fullWidth
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Indicador creado"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El indicador ha sido creado exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
);
};

export default FormCrearIndicador;