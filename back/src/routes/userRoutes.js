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
 *               tags:                  
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
router.post('/register', userController.registerUser);



/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudoOrEmail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       404:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Mot de passe incorrect
 *       500:
 *         description: Erreur lors de la connexion
 */
router.post('/login', userController.loginUser)


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   pseudo:
 *                     type: string
 *                   name:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   mail:
 *                     type: string
 *                   gender:
 *                     type: boolean
 *                   bio:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   admin:
 *                     type: boolean
 *                   tags:
 *                     type: string
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 */
router.get('/', userController.getAllUsers);
module.exports = router;
