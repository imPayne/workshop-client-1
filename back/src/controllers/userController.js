const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configapi');
const { Op } = require('sequelize');

// Enregistrer un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { pseudo, password, name, firstname, mail, gender, age } = req.body;

    try {
        // pseudo verif
        const existingUserByPseudo = await User.findOne({ where: { pseudo } });
        if (existingUserByPseudo) {
            return res.status(400).json({ error: 'Le pseudo est déjà utilisé.' });
        }

        // mail verif
        const existingUserByEmail = await User.findOne({ where: { mail } });
        if (existingUserByEmail) {
            return res.status(400).json({ error: 'L\'email est déjà utilisé.' });
        }

        // Hachage mdp
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            pseudo,
            password: hashedPassword,
            name,
            firstname,
            mail,
            gender,
            age,
        });
        res.status(201).json({ id: user.id, pseudo: user.pseudo, name: user.name, firstname: user.firstname, mail: user.mail, gender: user.gender });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
    const { pseudoOrEmail, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { pseudo: pseudoOrEmail },
                    { mail: pseudoOrEmail }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        // mdp
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        // jeton jwt
        const token = jwt.sign(
            { id: user.id, pseudo: user.pseudo, mail: user.mail, name: user.name, firstname:user.firstname, admin: user.admin, gender: user.gender },
            config.jwtSecret, 
            { expiresIn: '1h' } 
        );


        res.status(200).json({ token }); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};
