const axios = require('axios');
const config = require('../configapi');

///////////////////////////////////////////////////////
//                                                   //
//       Fonction pour rechercher des livres         //
//                                                   //
///////////////////////////////////////////////////////
const searchBooks = async (query = '', limit = 30, genre = '', authors = '') => {
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
        throw new Error('Veuillez fournir au moins un terme de recherche.');
    }

    url += `&maxResults=${limit}&key=${config.apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.items && response.data.items.length > 0) {
            return response.data.items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || ['Inconnu'],
                summary: item.volumeInfo.description || 'Pas de description disponible.',
                genre: item.volumeInfo.categories || ['Inconnu'],
                publishedDate: item.volumeInfo.publishedDate || 'Date de publication inconnue',
                publisher: item.volumeInfo.publisher || 'Éditeur inconnu',
                image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'Pas d\'image disponible'
            }));
        } else {
            return [];
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des données : ' + error.message);
    }
};

///////////////////////////////////////////////////////
//                                                   //
//      Fonction pour rechercher un livre par ID     //
//                                                   //
///////////////////////////////////////////////////////
const searchBookById = async (id) => {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${config.apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data) {
            const item = response.data;
            return {
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || ['Inconnu'],
                summary: item.volumeInfo.description || 'Pas de description disponible.',
                genre: item.volumeInfo.categories || ['Inconnu'],
                publishedDate: item.volumeInfo.publishedDate || 'Date de publication inconnue',
                publisher: item.volumeInfo.publisher || 'Éditeur inconnu',
                image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'Pas d\'image disponible'
            };
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des données : ' + error.message);
    }
};


// Fonction pour récupérer les genres uniques
const getUniqueGenres = async () => {
    try {
        const genres = new Set();
        const terms = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        // Effectuer une recherche pour chaque terme
        for (const term of terms) {
            const books = await searchBooks(term); 
            books.forEach(book => {
                if (book.genre) {
                    book.genre.forEach(g => genres.add(g)); // Ajouter chaque genre au Set
                }
            });
        }

        return Array.from(genres); // Convertir le Set en tableau
    } catch (error) {
        throw new Error('Erreur lors de la récupération des genres : ' + error.message);
    }
};






module.exports = {
    searchBooks,
    searchBookById,
    getUniqueGenres 
};
