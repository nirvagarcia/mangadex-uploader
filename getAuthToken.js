const axios = require('axios');

async function getTokens() {
    const creds = {
        grant_type: "password", // Este debería ser 'password' si estás haciendo autenticación de contraseña
        username: 'huabi', // Asegúrate de no incluir '<>' alrededor de los valores
        password: 'melminiwa01',
        client_id: 'personal-client-6f764bef-7d19-4d10-8ef1-11777caf9082-473a05d4', // Igual aquí, elimina los '<>'
        client_secret: 'wwuYzQZX3LtlEouXCF32ugwypaoWQQl5'
    };

    try {
        const resp = await axios({
            method: 'POST',
            url: 'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
            data: new URLSearchParams(creds).toString(), // Utiliza URLSearchParams para codificar correctamente
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Esto es necesario para contenido de tipo URL encoded
            }
        });

        const { access_token, refresh_token } = resp.data;
        console.log('Access Token:', access_token);
        console.log('Refresh Token:', refresh_token);
    } catch (error) {
        console.error('Error fetching tokens:', error.response ? error.response.data : error.message);
    }
}

getTokens();