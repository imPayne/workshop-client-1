const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Enregistrer un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { pseudo, password, name, firstname, mail, gender, age } = req.body;

    try {
        // Vérifier si le pseudo existe déjà
        const existingUserByPseudo = await User.findOne({ where: { pseudo } });
        if (existingUserByPseudo) {
            return res.status(400).json({ error: 'Le pseudo est déjà utilisé.' });
        }

        // Vérifier si l'email existe déjà
        const existingUserByEmail = await User.findOne({ where: { mail } });
        if (existingUserByEmail) {
            return res.status(400).json({ error: 'L\'email est déjà utilisé.' });
        }

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
        // Vérifier si l'utilisateur existe en fonction du pseudo ou de l'email
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

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        // Connexion réussie
        res.status(200).json({ id: user.id, pseudo: user.pseudo, mail: user.mail });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
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
