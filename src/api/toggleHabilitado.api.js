import axios from 'axios';

export const toggleHabilitado = async (modelName, id, token) => {
    const response = await axios.post(
        `http://localhost:8000/gestion_indicadores/${modelName}/${id}/toggle-habilitado/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
};