const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, //unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, //unique
        validate: {
            isEmail: true, // valid mail
        },
    },
    gender: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0, // age positif
        },
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    tags: { 
        type: DataTypes.STRING, 
        allowNull: true,
    },
}, {
    tableName: 'users', 
    timestamps: true, //createdAt et updatedAt
});

module.exports = User;
