const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Advert = sequelize.define('Advert', {
    idadvert: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titre: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    annonce: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'adverts',
    timestamps: true, // createdAt et updatedAt
});

module.exports = Advert;
