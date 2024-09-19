const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const viewRoutes = require('./routes/viewRoutes');
const sequelize = require('./config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// swagger config
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API pour gérer les utilisateurs',
        },
    },
    apis: ['./src/routes/*.js'], // chemin
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// sync models avec bdd
sequelize.sync()
    .then(() => {
        console.log('Les modèles ont été synchronisés avec la base de données.');
    })
    .catch(err => {
        console.error('Erreur de synchronisation des modèles :', err);
    });

// routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/views', viewRoutes);

// run
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
