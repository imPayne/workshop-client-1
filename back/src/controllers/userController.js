const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Enregistrer un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { pseudo, password, name, firstname, mail, gender, age } = req.body;

    try {
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
        res.status(500).json({ error: 'Erreur création de l\'utilisateur' });
    }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Récupérer tous les utilisateurs
        res.status(200).json(users); // Retourner la liste des utilisateurs
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};
