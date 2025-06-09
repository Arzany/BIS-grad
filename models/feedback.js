const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Feedback = sequelize.define("feedback", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_type: {
    type: DataTypes.ENUM("Applicant", "Company"),
    defaultValue: "Applicant",
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  imp_needed: {
    type: DataTypes.STRING,
  },
  recommend: {
    type: DataTypes.BOOLEAN,
  },
  understood: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Feedback;
