const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Article = sequelize.define("article",{
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

module.exports = Article;
