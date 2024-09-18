const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

/**
 * @swagger
 * /books/search:
 *   post:
 *     summary: Rechercher des livres
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *               limit:
 *                 type: integer
 *               genre:
 *                 type: string
 *               authors:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livres trouvés
 *       500:
 *         description: Erreur lors de la recherche
 */
router.post('/search', async (req, res) => {
    const { query, limit, genre, authors } = req.body;
    try {
        const books = await bookController.searchBooks(query, limit, genre, authors);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Rechercher un livre par ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du livre à rechercher
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livre trouvé
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Erreur lors de la recherche
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookController.searchBookById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
