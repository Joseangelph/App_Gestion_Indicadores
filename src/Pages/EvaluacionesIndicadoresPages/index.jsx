import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../../Context/AuthContext';
import Layout from "../../Components/Layout";
import { Button, Typography } from "@mui/material";
import FormCrearEvaluacionIndicador from "../../Components/EvaluacionesIndicadores/FormCrearEvaluacionIndicador";
import ListaEvaluacionIndicadores from "../../Components/EvaluacionesIndicadores/ListaEvaluacionIndicadores";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { getSeleccionesIndicadores } from '../../Services/seleccionIndicadores.api';

function GestionarEvaluacionesIndicadores() {
    const [evaluacionesIndicadores, setEvaluacionesIndicadores] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [seleccionesIndicadores, setSeleccionesIndicadores] = useState([]); // Estado para almacenar selecciones de indicadores
    const { usuario } = useContext(AuthContext);

    // Función para agregar una evaluación de indicador al array temporal
    const agregarEvaluacion = (evaluacion) => {
        setEvaluacionesIndicadores([...evaluacionesIndicadores, evaluacion]);
        // Filtra la selección recién evaluada
        setSeleccionesIndicadores(seleccionesIndicadores.filter(
            seleccion => seleccion.id !== evaluacion.seleccionIndicador
        ));
    };


     // Carga de selecciones de indicadores al montar el componente
    useEffect(() => {
        const fetchSeleccionesIndicadores = async () => {
        try {
            const response = await getSeleccionesIndicadores(usuario.tokenAccess);
            setSeleccionesIndicadores(response.data.filter(selectIndicador => selectIndicador.evaluacionPlataforma == id));
        } catch (error) {
            console.error('Error al cargar las selecciones de indicadores:', error);
        }
        };
        fetchSeleccionesIndicadores();
    }, [id,usuario.tokenAccess]);


    const finalizarEvaluacion = async () => {
        try {
            const response = await axios.post("http://localhost:8000/gestion_evaluaciones/api/evaluacionesindicadores/crear_evaluaciones/", {
                evaluaciones: evaluacionesIndicadores.map((evaluacion) => ({
                    seleccionIndicador: evaluacion.seleccionIndicador,
                    observaciones: evaluacion.observaciones,
                    evaluacion: evaluacion.evaluacion,})),
                }, {
                    headers: {
                        Authorization: `Bearer ${usuario.tokenAccess}`
                    }
                }
            );
            if (response.status === 201) {
                // Actualiza el estado y fecha de la evaluacion de plataforma
                await axios.patch(`http://localhost:8000/gestion_evaluaciones/api/evaluacionesplataformas/${id}/finalizar_evaluacion/`, {},
                {
                    headers: {
                        Authorization: `Bearer ${usuario.tokenAccess}`
                    }
                });
                setEvaluacionesIndicadores([]); // Limpia el array después de guardar
                navigate("/gestionarEvaluacionesPlataformas"); // Redirige a la página de gestión
            }
        } catch (error) {
            console.error("Error al finalizar la evaluación:", error);
        }
    };


    // Función para cancelar la evaluación
    const cancelarEvaluacion = () => {
        setEvaluacionesIndicadores([]); // Limpia el array sin guardar
        navigate("/gestionarEvaluacionesPlataformas"); // Redirige a la página de gestión
    };


    return (
        <Layout>
            <div className="flex flex-col justify-center items-center">
                <Typography
                    variant="h4"
                    className="text-4xl font-bold text-blue-600"
                    sx={{ fontFamily: "Roboto, sans-serif", marginTop: 5 }}
                >
                    Evaluación de indicadores
                </Typography>
                <div>
                    {/* Formulario para agregar una evaluación de indicador */}
                    <FormCrearEvaluacionIndicador 
                        agregarEvaluacion={agregarEvaluacion} 
                        seleccionesIndicadores={seleccionesIndicadores}
                    />
                    
                    {/* Tabla para mostrar las evaluaciones guardadas temporalmente */}
                    <ListaEvaluacionIndicadores evaluacionesIndicadores={evaluacionesIndicadores} />
                    
                    {/* Botones de finalizar y cancelar */}
                    <div className="flex justify-center mt-4">

                        <Button
                            variant="contained" 
                            color="primary" 
                            onClick={finalizarEvaluacion}
                            disabled={seleccionesIndicadores.length > 0} // Deshabilita si hay selecciones sin evaluar
                        >
                            Finalizar Evaluación de Indicadores
                        </Button>

                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={cancelarEvaluacion} 
                            sx={{ marginLeft: 2 }}
                        >
                            Cancelar
                        </Button>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default GestionarEvaluacionesIndicadores;
