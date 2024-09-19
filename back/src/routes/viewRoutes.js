const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

/**
 * @swagger
 * /views/create:
 *   post:
 *     summary: Créer un nouvel avis
 *     tags: [View]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: integer
 *               comment:
 *                 type: string
 *               id_google:
 *                 type: string
 *               id_user:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Avis créé avec succès
 *       500:
 *         description: Erreur lors de la création de l'avis
 */
router.post('/create', viewController.createView);

/**
 * @swagger
 * /views:
 *   get:
 *     summary: Récupérer tous les avis
 *     tags: [View]
 *     responses:
 *       200:
 *         description: Liste des avis récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idview:
 *                     type: integer
 *                   note:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   id_google:
 *                     type: string
 *                   id_user:
 *                     type: integer
 *       500:
 *         description: Erreur lors de la récupération des avis
 */
router.get('/', viewController.getAllViews);


router.get('/', viewController.getAllViews);

/**
 * @swagger
 * /views/id_google/{id_google}:
 *   get:
 *     summary: Récupérer tous les avis par id_google
 *     tags: [View]
 *     parameters:
 *       - in: path
 *         name: id_google
 *         required: true
 *         description: L'ID Google pour récupérer les avis
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des avis récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idview:
 *                     type: integer
 *                   note:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   id_google:
 *                     type: string
 *                   id_user:
 *                     type: integer
 *       500:
 *         description: Erreur lors de la récupération des avis
 */
router.get('/id_google/:id_google', viewController.getViewsByIdGoogle);



module.exports = router;
