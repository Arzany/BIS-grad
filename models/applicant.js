const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

const applicant = sequelize.define("applicant",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    disability_type: {
        type: DataTypes.STRING
    },
    major: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    },
    education: {
        type: DataTypes.STRING
    },
    my_experience: {
        type: DataTypes.TEXT
    },
});

module.exports = applicant ;
