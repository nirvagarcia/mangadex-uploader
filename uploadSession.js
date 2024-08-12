const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { API_BASE_URL, AUTH_TOKEN, MANGA_ID, GROUP_ID } = require('./config');


async function checkActiveSession() {
    try {
        const response = await axios.get(`${API_BASE_URL}/upload`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        return response.data.data ? response.data.data.id : null;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('No active upload session found.');
            return null;
        }
        throw error;
    }
}

async function createUploadSession() {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload/begin`, {
            manga: MANGA_ID,
            groups: [GROUP_ID]
        }, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        console.log('Session created with ID:', response.data.data.id);
        return response.data.data.id;
    } catch (error) {
        console.error('Error creating session:', error.response ? error.response.data : error.message);
    }
}

async function uploadFiles(sessionId) {
    const directoryPath = './chapter'; 
    let files = fs.readdirSync(directoryPath);    
    files.sort();

    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append(`file${index}`, fs.createReadStream(`${directoryPath}/${file}`), file);
    });

    try {
        const response = await axios.post(`${API_BASE_URL}/upload/${sessionId}`, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${AUTH_TOKEN}`
            }
        });
        console.log('Files uploaded:', response.data);
        return response.data.data.map(file => file.id);
    } catch (error) {
        console.error('Error uploading files:', error.response ? error.response.data : error.message);
    }
}

async function commitUploadSession(sessionId, fileIds) {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload/${sessionId}/commit`, {
            chapterDraft: {
                volume: '2',
                chapter: '98',
                title: 'ChapterName',
                translatedLanguage: 'en'
            },
            pageOrder: fileIds
        }, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        console.log('Upload session committed:', response.data);
    } catch (error) {
        console.error('Error committing upload session:', error.response ? error.response.data : error.message);
    }
}

async function processUpload() {
    let sessionId = await checkActiveSession();
    if (!sessionId) {
        sessionId = await createUploadSession();
    }
    if (sessionId) {
        const fileIds = await uploadFiles(sessionId);
        if (fileIds && fileIds.length > 0) {
            await commitUploadSession(sessionId, fileIds);
        }
    }
}

processUpload();