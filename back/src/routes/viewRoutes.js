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


/**
 * @swagger
 * /views/average/{id_google}:
 *   get:
 *     summary: Récupérer la moyenne des notes et la liste des avis pour un id_google
 *     tags: [View]
 *     parameters:
 *       - in: path
 *         name: id_google
 *         schema:
 *           type: string
 *         required: true
 *         description: ID Google du livre pour lequel on veut récupérer les avis et la moyenne des notes
 *     responses:
 *       200:
 *         description: Moyenne des notes et liste des avis récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageNote:
 *                   type: string
 *                   description: Moyenne des notes pour cet id_google
 *                 views:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de l'avis
 *                       note:
 *                         type: integer
 *                         description: Note donnée dans l'avis
 *                       comment:
 *                         type: string
 *                         description: Commentaire de l'avis
 *                       id_google:
 *                         type: string
 *                         description: ID Google associé à l'avis
 *                       id_user:
 *                         type: string
 *                         description: ID de l'utilisateur qui a donné l'avis
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date de création de l'avis
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date de mise à jour de l'avis
 *       404:
 *         description: Aucun avis trouvé pour cet id_google
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Aucun avis trouvé pour cet id_google
 *       500:
 *         description: Erreur lors de la récupération des avis ou du calcul de la moyenne
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erreur lors de la récupération des avis et du calcul de la moyenne
 */
router.get('/average/:id_google', viewController.getAverageNoteByIdGoogle);




module.exports = router;
