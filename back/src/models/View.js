const { DataTypes } = require('sequelize');
const sequelize = require('../config'); 
const User = require('./User'); 

const View = sequelize.define('View', {
    idview: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5 // 0 à 5
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 300] // Limite de 300 caractères
        }
    },
    id_google: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'views', 
    timestamps: true, // createdAt et updatedAt
});

// Foreign key
View.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

module.exports = View;
