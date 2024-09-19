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
 *               mail:
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

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 pseudo:
 *                   type: string
 *                 name:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 mail:
 *                   type: string
 *                 gender:
 *                   type: boolean
 *                 bio:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 admin:
 *                   type: boolean
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la récupération de l'utilisateur
 */
router.get('/:userId', userController.getUserById);


/**
 * @swagger
 * /users/update-admin:
 *   put:  
 *     summary: Modifier le statut admin d'un utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Statut admin mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du statut admin
 */
router.put('/update-admin', userController.updateAdminStatus); 


/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la suppression de l'utilisateur
 */
router.delete('/:userId', userController.deleteUser);


module.exports = router;
