const axios = require('axios');

async function authenticate() {
    const username = 'huabi'; // Reemplaza con tu usuario de MangaDex
    const password = 'melminiwa01'; // Reemplaza con tu contraseña de MangaDex

    try {
        const response = await axios.post('https://api.mangadex.org/auth/login', {
            username: username,
            password: password
        });

        const authToken = response.data.token.session;
        console.log('Token de autenticación:', authToken);
        return authToken;
    } catch (error) {
        console.error('Error autenticando:', error.response ? error.response.data : error.message);
    }
}

authenticate();
