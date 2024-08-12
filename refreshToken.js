const axios = require('axios');

async function refreshToken() {
    const creds = {
        grant_type: 'refresh_token',
        refresh_token: 'REFRESH_TOKEN',
        client_id: 'CLIENT_ID',
        client_secret: 'CLIENT_SECRET'
    }

    try {
        const resp = await axios({
            method: 'POST',
            url: 'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
            data: new URLSearchParams(creds).toString(), 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        });

        const accessToken = resp.data.access_token;
        console.log('Access Token:', accessToken);
    } catch (error) {
        console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    }
}

refreshToken();