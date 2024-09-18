const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               firstname:
 *                 type: string
 *               mail:
 *                 type: string
 *               gender:
 *                 type: boolean
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
router.post('/register', userController.registerUser);

module.exports = router;
