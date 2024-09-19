const axios = require('axios');
const config = require('../configapi');
const apiKey = config.apiKey;   

const testRequest = async () => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=a&orderBy=newest&maxResults=5&key=${apiKey}`);

        const bookIds = response.data.items.map(item => item.id);

        console.log('IDs des livres récupérés:', bookIds);
    } catch (error) {
        if (error.response) {
            console.error('Erreur HTTP:', error.response.status);
            console.error('Détails de l\'erreur:', error.response.data);
        } else {
            console.error('Erreur sans réponse:', error.message);
        }
    }
};

testRequest();
