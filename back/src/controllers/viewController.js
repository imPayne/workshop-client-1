const View = require('../models/View');
const { Sequelize } = require('sequelize');

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


// Récupérer les avis et calculer la moyenne des notes via id_google
exports.getAverageNoteByIdGoogle = async (req, res) => {
    const { id_google } = req.params;

    try {
        const views = await View.findAll({ where: { id_google } });
        
        // calcul moyenne avis
        if (views.length > 0) {
            const totalNotes = views.reduce((sum, view) => sum + view.note, 0);
            const averageNote = totalNotes / views.length;

            res.status(200).json({
                averageNote: averageNote.toFixed(2) // 2 décimales
            });
        } else {
            res.status(404).json({ error: 'Aucun avis trouvé pour cet id_google' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des avis et du calcul de la moyenne' });
    }
};



exports.getTopRatedBooks = async (req, res) => {
    try {
        // Récupérer tous les avis groupés par id_google et calculer la moyenne des notes
        const topRatedBooks = await View.findAll({
            attributes: [
                'id_google',
                [Sequelize.fn('AVG', Sequelize.col('note')), 'averageNote']
            ],
            group: ['id_google'],
            order: [[Sequelize.fn('AVG', Sequelize.col('note')), 'DESC']],
            limit: 5
        });

        res.status(200).json(topRatedBooks);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des livres les mieux notés' });
    }
};

