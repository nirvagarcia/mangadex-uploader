const axios = require('axios');
const baseUrl = 'https://api.mangadex.org';
const sessionToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHSHg0Qmk2THhvdVRGLWZuQmg0WXhMbUtUbGZzT2tmTm9fQ05yT1pMZHNrIn0.eyJleHAiOjE3MjM0MjI0MDUsImlhdCI6MTcyMzQyMTUwNSwianRpIjoiYjQ4NDI2YWYtZjFkZS00NzI2LThhNjctNGU2OGJjYjNhM2IzIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1hbmdhZGV4Lm9yZy9yZWFsbXMvbWFuZ2FkZXgiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNmY3NjRiZWYtN2QxOS00ZDEwLThlZjEtMTE3NzdjYWY5MDgyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGVyc29uYWwtY2xpZW50LTZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4Mi00NzNhMDVkNCIsInNlc3Npb25fc3RhdGUiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJhY3IiOiIxIiwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBzIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhYzk3ZjA5OC1lYTkyLTRjMDktOWJhMy1mNDU2OTQ5NTEwYTUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbWFuZ2FkZXgiXSwiZ3JvdXBzIjpbIkdST1VQX1VTRVIiXSwiY2xpZW50X3R5cGUiOiJwZXJzb25hbCIsIm9pZCI6IjZmNzY0YmVmLTdkMTktNGQxMC04ZWYxLTExNzc3Y2FmOTA4MiIsInByZWZlcnJlZF91c2VybmFtZSI6Imh1YWJpIiwiZW1haWwiOiJtYXJpbmNoZW5nZ0BvdXRsb29rLmNvbSJ9.D8H4f-aFn75CkoN72QEhabEis4pImccbzRfEQLTQgVucjRnTT3uRAhrwMsvDpHP0hEfCkzgnoShSJp3lnk5u7oKxGvs0ab3PX3w-SqgeeR72nJONlj3w1eLNQt4KWBTTrc-fagnTUOgQcBraEeS6XemD6HTo7pviygAnDXM7ndV-JQ5vOX2Isq0QA2Ugut34CUtW7ao9CEU7C-XupfZ3pdD_EUWCnNQMzaQJPll-bwat83aPgA5ZYx-gly_A02iJljXAGt2U_t_Is-WHsTF0dopd1fTSKWdYI5aqITR410P2S-9KtYNXV5mcxaz64QvvftW1hhPo0yViX4NCcNg6wg';
const sessionID = '71c4db17-ac2e-447b-9f97-69c14cf95df6';

let successful = [
    { id: '97e28998-112e-471a-8000-2288e511c314', filename: 'greenlesbians-spanish-1.png' },
    { id: '1463cea6-c89f-4d65-812e-8c1a5e7d5691', filename: 'greenlesbians-spanish-2.png' },
    { id: '4ef937e4-bb45-4547-94b5-eeda13b41dc4', filename: 'greenlesbians-spanish-3.png' },
    { id: '224de56c-5482-4586-ab24-c4f077d48c19', filename: 'greenlesbians-spanish-4.png' }
];

successful.sort((a, b) => a.filename.localeCompare(b.filename));
const pageOrder = successful.map(page => page.id);

async function commitUploadSession() {
    try {
        const response = await axios.post(`${baseUrl}/upload/${sessionID}/commit`, {
            chapterDraft: {
                volume: '2',
                chapter: '97',
                title: 'The Guy She Was Interested in Wasnt a Guy at All',
                translatedLanguage: 'es'
            },
            pageOrder: pageOrder
        }, {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Upload session committed:', response.data);
    } catch (error) {
        console.error('Error committing upload session:', error.response ? error.response.data : error.message);
    }
}

commitUploadSession();
