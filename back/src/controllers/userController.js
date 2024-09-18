const User = require('../models/User');
const bcrypt = require('bcryptjs');

// enregistrer nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { pseudo, password, name, firstname, mail, gender, age} = req.body;

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
