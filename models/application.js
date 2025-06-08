const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Application = sequelize.define("application",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending'
    },
    rating: {
        type: DataTypes.INTEGER
    },
    feedback: {
        type: DataTypes.TEXT
    },
    understood: {
        type: DataTypes.BOOLEAN
    },
    would_recommend: {
        type: DataTypes.BOOLEAN
    },
});

module.exports = Application;
