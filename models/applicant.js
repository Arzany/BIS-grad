const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

const Applicant = sequelize.define("applicant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  disability_type: {
    type: DataTypes.STRING,
  },
  major: {
    type: DataTypes.STRING,
  },
  language: {
    type: DataTypes.STRING,
  },
  education: {
    type: DataTypes.STRING,
  },
  my_experience: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Applicant;
