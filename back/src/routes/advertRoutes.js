const express = require('express');
const advertController = require('../controllers/advertController');

const router = express.Router();

/**
 * @swagger
 * /adverts:
 *   get:
 *     summary: Récupérer toutes les annonces
 *     tags: [Advert]
 *     responses:
 *       200:
 *         description: Liste des annonces récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idadvert:
 *                     type: integer
 *                   titre:
 *                     type: string
 *                   annonce:
 *                     type: string
 *       500:
 *         description: Erreur lors de la récupération des annonces
 */
router.get('/', advertController.getAllAdverts);

/**
 * @swagger
 * /adverts/create:
 *   post:
 *     summary: Ajouter un nouvel advert
 *     tags: [Advert]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               annonce:
 *                 type: string
 *     responses:
 *       201:
 *         description: Advert créé avec succès
 *       500:
 *         description: Erreur lors de la création de l'advert
 */
router.post('/create', advertController.addAdvert);

/**
 * @swagger
 * /adverts/{idadvert}:
 *   delete:
 *     summary: Supprimer un advert par ID
 *     tags: [Advert]
 *     parameters:
 *       - in: path
 *         name: idadvert
 *         required: true
 *         description: ID de l'advert à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Advert supprimé avec succès
 *       404:
 *         description: Advert non trouvé
 *       500:
 *         description: Erreur lors de la suppression de l'advert
 */
router.delete('/:idadvert', advertController.deleteAdvert);



module.exports = router;
