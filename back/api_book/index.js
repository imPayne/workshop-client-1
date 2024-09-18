const axios = require('axios');
const config = require('./config');

const searchBooks = async (query = '', limit = 12, genre = '', authors = '') => {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';

    if (query) {
        url += `${encodeURIComponent(query)}`;
    }
    if (genre) {
        url += `+subject:${encodeURIComponent(genre)}`;
    }
    if (authors) {
        url += `+inauthor:${encodeURIComponent(authors)}`;
    }

    if (!query && !genre && !authors) {
        console.error('Veuillez fournir au moins un terme de recherche (nom de livre, genre ou auteur).');
        return;
    }

    url += `&maxResults=${limit}&key=${config.apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.items && response.data.items.length > 0) {
            const books = response.data.items.map(item => ({
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || ['Inconnu'],
                summary: item.volumeInfo.description || 'Pas de description disponible.',
                genre: item.volumeInfo.categories || ['Inconnu'],
                publishedDate: item.volumeInfo.publishedDate || 'Date de publication inconnue',
                publisher: item.volumeInfo.publisher || 'Éditeur inconnu',
                image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'Pas d\'image disponible'
            }));
            console.table(books);
        } else {
            console.log(`Aucun livre trouvé avec ces critères.`);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

// Exemple
searchBooks('', 5, 'Programming'); // recherche genre seulement
searchBooks('', 5, '', 'Doe'); // recherche auteur seulement
