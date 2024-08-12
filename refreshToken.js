const axios = require('axios');

async function refreshToken() {
    const creds = {
        grant_type: 'refresh_token',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5NTIxYTI5NC01YTRmLTQwNTgtYTdhNC1jZjI2YzU2NDhkMzIifQ.eyJleHAiOjE3MzExOTM4NjMsImlhdCI6MTcyMzQxNzg2MywianRpIjoiNzhlMDUxNWYtYWRkZS00OTRjLWJiN2EtNjM3YjAzNTljMGQ4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1hbmdhZGV4Lm9yZy9yZWFsbXMvbWFuZ2FkZXgiLCJhdWQiOiJodHRwczovL2F1dGgubWFuZ2FkZXgub3JnL3JlYWxtcy9tYW5nYWRleCIsInN1YiI6IjZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4MiIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJwZXJzb25hbC1jbGllbnQtNmY3NjRiZWYtN2QxOS00ZDEwLThlZjEtMTE3NzdjYWY5MDgyLTQ3M2EwNWQ0Iiwic2Vzc2lvbl9zdGF0ZSI6ImFjOTdmMDk4LWVhOTItNGMwOS05YmEzLWY0NTY5NDk1MTBhNSIsInNjb3BlIjoiZ3JvdXBzIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUifQ.-Njnj4UhL1Ug-tTJY7bZtqhyYCQZDcIilApO6Qr4ey8',
        client_id: 'personal-client-6f764bef-7d19-4d10-8ef1-11777caf9082-473a05d4', // Igual aquí, elimina los '<>'
        client_secret: 'wwuYzQZX3LtlEouXCF32ugwypaoWQQl5'
    }

    try {
        const resp = await axios({
            method: 'POST',
            url: 'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
            data: new URLSearchParams(creds).toString(), // Codificación adecuada para cuerpo de la petición
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Encabezado correcto para este tipo de petición
            }
        });

        const accessToken = resp.data.access_token;
        console.log('Access Token:', accessToken);
    } catch (error) {
        console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    }
}

refreshToken();
