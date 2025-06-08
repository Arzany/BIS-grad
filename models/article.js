const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const article = sequelize.define("article",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = article;
