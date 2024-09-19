const Advert = require('../models/Advert');

// Ajouter un nouvel advert
exports.addAdvert = async (req, res) => {
    const { titre, annonce } = req.body;

    try {
        const newAdvert = await Advert.create({ titre, annonce });
        res.status(201).json(newAdvert); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'advert' });
    }
};

// Supprimer un advert par ID
exports.deleteAdvert = async (req, res) => {
    const { idadvert } = req.params;

    try {
        const advert = await Advert.findByPk(idadvert);

        if (!advert) {
            return res.status(404).json({ error: 'Advert non trouvé.' });
        }

        await advert.destroy(); 
        res.status(200).json({ message: 'Advert supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'advert' });
    }
};

// Récupérer toutes les annonces
exports.getAllAdverts = async (req, res) => {
    try {
        const adverts = await Advert.findAll(); 
        res.status(200).json(adverts); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
    }
};
