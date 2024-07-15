import axios from 'axios';
import { logout, getToken, isLogged } from './account.service';

const Axios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor pour injecter le token JWT dans l'en-tête Authorization
Axios.interceptors.request.use(config => {
    if (isLogged()) {
        const token = getToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor pour gérer les réponses d'erreur 401 (Non autorisé)
Axios.interceptors.response.use(response => {
    return response;
}, async error => {
    if (error.response && error.response.status === 401) {
        // Gérer le cas où le serveur renvoie une erreur 401 (Non autorisé)
        try {
            // Effectuer une action de déconnexion ou de rafraîchissement du token si nécessaire
            await logout();
            window.location.reload();
        } catch (err) {
            console.error('Erreur lors de la gestion de l\'erreur 401:', err);
        }
    }
    return Promise.reject(error);
});

export default Axios;
