const axios = require('axios');

const baseUrl = 'https://api.mangadex.org';
const groupIDs = ['c6912b6d-b42a-40d2-9b24-4d6c346b724a'];
const mangaID = '9d3d3403-1a87-4737-9803-bc3d99db1424';

// Asegúrate de reemplazar 'tu_token_de_acceso' con tu token de sesión actual
const sessionToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHSHg0Qmk2THhvdVRGLWZuQmg0WXhMbUtUbGZzT2tmTm9fQ05yT1pMZHNrIn0.eyJleHAiOjE3MjM0MjEyMDAsImlhdCI6MTcyMzQyMDMwMCwianRpIjoiZDgzZTM5M2UtMWRiYS00OTAwLWE0NDUtMmQxOGYzYmY4OTBjIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1hbmdhZGV4Lm9yZy9yZWFsbXMvbWFuZ2FkZXgiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNmY3NjRiZWYtN2QxOS00ZDEwLThlZjEtMTE3NzdjYWY5MDgyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGVyc29uYWwtY2xpZW50LTZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4Mi00NzNhMDVkNCIsInNlc3Npb25fc3RhdGUiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJhY3IiOiIxIiwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBzIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbWFuZ2FkZXgiXSwiZ3JvdXBzIjpbIkdST1VQX1VTRVIiXSwiY2xpZW50X3R5cGUiOiJwZXJzb25hbCIsIm9pZCI6IjZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4MiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1YWJpIiwiZW1haWwiOiJtYXJpbmNoZW5nZ0BvdXRsb29rLmNvbSJ9.IdNMkZUoH0_har5dWaFTlR2hDq4crvLfjqmtyUT3zR0-lNSksRJ5V-ZlhFnODRZRT8oaw5E6idavSldUGx1t12gcqyLBt07vdb1p01xWBvkxuNgty_r8qPWuuUfOqd632hRbSijRMz4V0LybK-ypshrPMbTsaAq5xZWwdoebs_kA9TUv2a-D5qkQHR7H7JbxtEQdtYPYM8oG7dxdTxG-RG8vRNJX33hYFwuwxVdNrGj-sO2-RCSzrPlfzr-6_qo9b1fK_Jpz7S3EBKoFkenURgA29MCYF88fQs6fMmp5OaVFfIWR_9zzQMf0xUj0B56MUstlvT0T3tUCZZ46LdnfaA';

async function startUploadSession() {
    try {
        const resp = await axios({
            method: 'POST',
            url: `${baseUrl}/upload/begin`,
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                groups: groupIDs,
                manga: mangaID
            }
        });

        const sessionID = resp.data.data.id;
        console.log('Session created with ID:', sessionID);
        return sessionID;
    } catch (err) {
        if (err.response && err.response.data) {
            console.error('Error creating session:', err.response.data);
        } else {
            console.error('Error:', err.message);
        }
    }
}

// Llama a la función para iniciar la sesión de subida
startUploadSession();
