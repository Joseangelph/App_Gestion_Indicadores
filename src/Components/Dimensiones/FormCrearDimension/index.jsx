import { useState, useEffect, useContext } from 'react';
import { 
    Box, Button, TextField, Typography, MenuItem, Select, InputLabel,
    FormControl, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,Radio, FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { createDimension } from '../../../Services/dimensiones.api';
import { getComponentes } from '../../../Services/componentes.api';
import { getDestinos } from '../../../Services/destinos.api';

const FormCrearDimension = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    concepto: '',
    destino_impacto: '',
    componente: '',
  });

  const [errors, setErrors] = useState({}); // Estado para los errores
  const [componentes, setComponentes] = useState([]); 
  const [destinos, setDestinos] = useState([]); 
  const { usuario } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo
  const [herencia, setHerencia] = useState('destino'); // Estado para controlar qué select está habilitado
  const componentesHabilitados = componentes.filter(componente => componente.habilitado);
  const destinosHabilitados = destinos.filter(destino => destino.habilitado);
  const navegar= useNavigate();

  useEffect(() => {
    // Función para obtener lo Componentes desde la API
    const fetchComponentes = async () => {
      try {
        const response = await getComponentes(usuario.tokenAccess); // Función para llamar la API
        setComponentes(response.data);
      } catch (error) {
        console.error('Error al obtener los Componentes :', error);
      }
    };

    const fetchDestinos = async () => {
      try {
        const response = await getDestinos(usuario.tokenAccess); // Función para llamar la API
        setDestinos(response.data);
      } catch (error) {
        console.error('Error al obtener los destinos de impacto:', error);
      }
    };

    fetchDestinos();
    fetchComponentes();
  }, [usuario.tokenAccess]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const nombreRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; // Solo letras y espacios permitidos
    const tempErrors = {};

    if (!formData.nombre.trim()) {
      tempErrors.nombre = "El campo 'nombre' es obligatorio.";
    } else if (!nombreRegex.test(formData.nombre)) {
      tempErrors.nombre = "El nombre no puede contener números ni caracteres especiales.";
    }

    if (!formData.concepto.trim()) tempErrors.concepto = "El campo 'concepto' es obligatorio.";

    if (herencia === 'destino' && !formData.destino_impacto) {
      tempErrors.selects = "Debe seleccionar un destino de impacto.";
    }
    if (herencia === 'componente' && !formData.componente) {
      tempErrors.selects = "Debe seleccionar un componente.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData); // Verifica los datos antes de enviarlos
    if (validateForm()) {
      try {
        const response = await createDimension(formData,usuario.tokenAccess)
        setOpenDialog(true); // Abre el diálogo de éxito
        return response.data;
      } 
      catch (error) {
        console.error('Error en el registro:', error);
      } 
    } 
  };


  const handleHerenciaChange = (event) => {
    const newHerencia = event.target.value;
    setHerencia(newHerencia);
    
    // Limpia el campo deshabilitado para evitar que se envíe su valor
    setFormData({
      ...formData,
      destino_impacto: newHerencia === 'componente' ? '' : formData.destino_impacto,
      componente: newHerencia === 'destino' ? '' : formData.componente,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navegar("/gestionarDimensiones"); // Redirige después de cerrar el diálogo
  };

return (
    
    <Box className="form-container flex flex-col items-center justify-center mt-10 w-1/2 rounded-lg">
      <Typography
        variant="h4"
        className="text-2xl font-bold text-blue-600 pb-3"
        sx={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Registrar dimensiones
      </Typography>
      
      <form onSubmit={handleSubmit} className="w-full p-1">
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(errors.nombre)}
          helperText={errors.nombre}
        />
        
        <TextField
          label="Concepto"
          name="concepto"
          value={formData.concepto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline // Convierte el TextField en un textarea
          rows={4} // Número de filas visibles iniciales
          error={Boolean(errors.concepto)}
          helperText={errors.concepto}
        />

       {/* Contenedor para Destino de Impacto */}
       <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
          <FormControl fullWidth disabled={herencia === 'componente'}>
            <InputLabel>Destino de impacto al que pertenece</InputLabel>
            <Select
              name="destino_impacto"
              value={formData.destino_impacto}
              onChange={handleChange}
              label="Destino de impacto al que pertenece"
            >
              {destinosHabilitados.map((destino) => (
                <MenuItem key={destino.id} value={destino.id}>
                  {destino.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Radio 
                checked={herencia === 'destino'} 
                onChange={handleHerenciaChange} 
                value="destino" 
                color="primary" 
              />
            }
            label=""
          />
        </Box>

        {/* Contenedor para Componente */}
        <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
          <FormControl fullWidth disabled={herencia === 'destino'}>
            <InputLabel>Componente al que pertenece</InputLabel>
            <Select
              name="componente"
              value={formData.componente}
              onChange={handleChange}
              label="Componente al que pertenece"
            >
              {componentesHabilitados.map((componente) => (
                <MenuItem key={componente.id} value={componente.id}>
                  {componente.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Radio 
                checked={herencia === 'componente'} 
                onChange={handleHerenciaChange} 
                value="componente" 
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
          fullWidth
          onClick={() => navegar('/gestionarDimensiones')}
          style={{ marginLeft: '10px' }}
        >
          Cancelar
        </Button>
        </Box>
      </form>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Dimension creada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La dimensión ha sido creada exitosamente.
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

export default FormCrearDimension;