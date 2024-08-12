const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Configura la URL base de la API y tu token de autenticación
const API_BASE_URL = 'https://api.mangadex.org';
const AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHSHg0Qmk2THhvdVRGLWZuQmg0WXhMbUtUbGZzT2tmTm9fQ05yT1pMZHNrIn0.eyJleHAiOjE3MjM0MjM4MjcsImlhdCI6MTcyMzQyMjkyNywianRpIjoiY2IyNTExNDEtZWZkYy00MjdhLWJjZmMtNmNjNzc1ODhhMWE4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1hbmdhZGV4Lm9yZy9yZWFsbXMvbWFuZ2FkZXgiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNmY3NjRiZWYtN2QxOS00ZDEwLThlZjEtMTE3NzdjYWY5MDgyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGVyc29uYWwtY2xpZW50LTZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4Mi00NzNhMDVkNCIsInNlc3Npb25fc3RhdGUiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJhY3IiOiIxIiwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBzIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbWFuZ2FkZXgiXSwiZ3JvdXBzIjpbIkdST1VQX1VTRVIiXSwiY2xpZW50X3R5cGUiOiJwZXJzb25hbCIsIm9pZCI6IjZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4MiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1YWJpIiwiZW1haWwiOiJtYXJpbmNoZW5nZ0BvdXRsb29rLmNvbSJ9.NP-s1PyCkuaBVcKCf69_oG9OD2d7GlxnoRQx0dWFe__Ht0vrkNQrGi8h_H279DFbaygs_FRYtOhQSvlg_Ji4vIENbOG5i_NIig8N91K4d6QNvluxIVntth4zOAsXKctoeP44l8Osh4VVmxvH6LsSlAkygJjvmm7vLXB-zQdfje8jTKcvlqTc_c3JP9cTeFXgNYvbb2mNIbEjx0DVvczT-SdYXUB6TpiqcRwEkVOdf9lMwNzaLqbW-sChzZxXj1Huv9ir1Wt3g2g56adcK5Jjor_ujHEGLRA7VMNgNuviYz2ITUzMOcu5FtVOmQZRtqJWMqBQRwvrBU6hR7Ucf1fYtg'; // Reemplaza con tu token real

// Función para verificar si ya hay una sesión de carga activa
async function checkActiveSession() {
  try {
    const response = await axios.get(`${API_BASE_URL}/upload`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    return response.data.data.id; // Retorna el ID de la sesión de carga activa
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // No hay sesión activa
    }
    throw error;
  }
}

// Función para iniciar una nueva sesión de carga
async function beginUploadSession(mangaId, groupId) {
  const response = await axios.post(`${API_BASE_URL}/upload/begin`, {
    manga: mangaId,
    groups: [groupId]
  }, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  });
  return response.data.data.id; // Retorna el ID de la nueva sesión de carga
}

// Función para subir archivos a la sesión de carga
async function uploadFilesToSession(uploadSessionId, filePaths) {
  const formData = new FormData();
  filePaths.forEach((filePath, index) => {
    formData.append(`file${index}`, fs.createReadStream(filePath));
  });

  const response = await axios.post(`${API_BASE_URL}/upload/${uploadSessionId}`, formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  });

  return response.data;
}

// Función para confirmar y finalizar la sesión de carga
async function commitUploadSession(uploadSessionId, chapterMetadata, pageOrder) {
  const response = await axios.post(`${API_BASE_URL}/upload/${uploadSessionId}/commit`, {
    chapterDraft: chapterMetadata,
    pageOrder: pageOrder
  }, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  });

  return response.data;
}

// Función principal para subir un capítulo
async function uploadChapter() {
  try {
    const mangaId = '9d3d3403-1a87-4737-9803-bc3d99db1424';
    const groupId = 'c6912b6d-b42a-40d2-9b24-4d6c346b724a'; 

    // Verificar si hay una sesión activa
    let uploadSessionId = await checkActiveSession();
    if (!uploadSessionId) {
      // Iniciar una nueva sesión si no hay ninguna activa
      uploadSessionId = await beginUploadSession(mangaId, groupId);
      console.log(`Nueva sesión de carga iniciada: ${uploadSessionId}`);
    } else {
      console.log(`Sesión de carga activa: ${uploadSessionId}`);
    }

    // Subir archivos a la sesión
    const filePaths = [
        '.\\chapter\\greenlesbians-spanish-1.png',
        '.\\chapter\\greenlesbians-spanish-2.png',
        '.\\chapter\\greenlesbians-spanish-3.png',
        '.\\chapter\\greenlesbians-spanish-4.png'
    ]; // Rutas a tus imágenes     
    const uploadResponse = await uploadFilesToSession(uploadSessionId, filePaths);
    const uploadFileIds = uploadResponse.data.map(file => file.id);

    // Confirmar y finalizar la sesión de carga
    const chapterMetadata = {
      volume: '2',
      chapter: '97',
      title: 'Gracias',
      translatedLanguage: 'en'
    };

    const commitResponse = await commitUploadSession(uploadSessionId, chapterMetadata, uploadFileIds);

    if (commitResponse && commitResponse.data) {
      console.log(`Capítulo subido exitosamente: ${commitResponse.data.id}`);
    } else {
      console.log('No se pudo obtener el ID del capítulo después de la subida.');
    }
  } catch (error) {
    console.error('Error subiendo el capítulo:', error.response ? error.response.data : error.message);
  }
}

// Ejecutar la función principal para subir el capítulo
uploadChapter();
