const View = require('../models/View');

// Créer un nouvel avis
exports.createView = async (req, res) => {
    const { note, comment, id_google, id_user } = req.body;

    try {
        const newView = await View.create({
            note,
            comment,
            id_google,
            id_user,
        });
        res.status(201).json(newView); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'avis' });
    }
};

// Récupérer tous les avis
exports.getAllViews = async (req, res) => {
    try {
        const views = await View.findAll(); 
        res.status(200).json(views); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des avis' });
    }
};


//Recup avis via idgoogle
exports.getViewsByIdGoogle = async (req, res) => {
    const { id_google } = req.params;

    try {
        const views = await View.findAll({ where: { id_google } }); 
        res.status(200).json(views); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des avis' });
    }
};