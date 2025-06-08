const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Job = sequelize.define("job",{
    id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type : DataTypes.STRING
    },
    max_salary: {
        type: DataTypes.FLOAT
    },
    min_salary: {
        type: DataTypes.FLOAT
    },
    application_deadline: {
        type: DataTypes.DATE
    },
    type: {
        type: DataTypes.ENUM('Full-time', 'Part-time'),
        allowNull: false
    },
    salary_period: {
        type: DataTypes.ENUM('Monthly', 'Weekly', 'Daily')
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('Available', 'Unavailable')
    }    
});

module.exports = Job;
