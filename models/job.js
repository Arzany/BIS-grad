const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Job = sequelize.define("Job",{
    id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allownull: false,
        primarykey: true,
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
        type: DataTypes.ENUM('Full time', 'Part time'),
        allowNull: false
    },
    salary_period: {
        type: DataTypes.ENUM('Monthly', 'Weekly', 'Daily')
    },
    questions: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('On Hold', 'Interview', 'Rejected')
    }    
});

module.exports = Job;
