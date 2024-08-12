const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const pageMap = require('./imgmap'); // Asume que imgmap.js exporta `pageMap`

const baseUrl = 'https://api.mangadex.org';
const sessionToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHSHg0Qmk2THhvdVRGLWZuQmg0WXhMbUtUbGZzT2tmTm9fQ05yT1pMZHNrIn0.eyJleHAiOjE3MjM0MjEyMDAsImlhdCI6MTcyMzQyMDMwMCwianRpIjoiZDgzZTM5M2UtMWRiYS00OTAwLWE0NDUtMmQxOGYzYmY4OTBjIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1hbmdhZGV4Lm9yZy9yZWFsbXMvbWFuZ2FkZXgiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNmY3NjRiZWYtN2QxOS00ZDEwLThlZjEtMTE3NzdjYWY5MDgyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGVyc29uYWwtY2xpZW50LTZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4Mi00NzNhMDVkNCIsInNlc3Npb25fc3RhdGUiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJhY3IiOiIxIiwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBzIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbWFuZ2FkZXgiXSwiZ3JvdXBzIjpbIkdST1VQX1VTRVIiXSwiY2xpZW50X3R5cGUiOiJwZXJzb25hbCIsIm9pZCI6IjZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4MiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1YWJpIiwiZW1haWwiOiJtYXJpbmNoZW5nZ0BvdXRsb29rLmNvbSJ9.IdNMkZUoH0_har5dWaFTlR2hDq4crvLfjqmtyUT3zR0-lNSksRJ5V-ZlhFnODRZRT8oaw5E6idavSldUGx1t12gcqyLBt07vdb1p01xWBvkxuNgty_r8qPWuuUfOqd632hRbSijRMz4V0LybK-ypshrPMbTsaAq5xZWwdoebs_kA9TUv2a-D5qkQHR7H7JbxtEQdtYPYM8oG7dxdTxG-RG8vRNJX33hYFwuwxVdNrGj-sO2-RCSzrPlfzr-6_qo9b1fK_Jpz7S3EBKoFkenURgA29MCYF88fQs6fMmp5OaVFfIWR_9zzQMf0xUj0B56MUstlvT0T3tUCZZ46LdnfaA'; // Asegúrate de reemplazar esto
const sessionID = '71c4db17-ac2e-447b-9f97-69c14cf95df6'; // Reemplaza con el ID de la sesión creado

async function uploadImages() {
    for (const page of pageMap) {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(page.path), page.filename);

        try {
            const response = await axios({
                method: 'POST',
                url: `${baseUrl}/upload/${sessionID}`,
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                    ...formData.getHeaders()
                },
                data: formData
            });

            console.log(`Uploaded ${page.filename}:`, response.data);
        } catch (error) {
            console.error(`Error uploading ${page.filename}:`, error.response ? error.response.data : error.message);
        }
    }
}

uploadImages();
