const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Application = sequelize.define("application", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    defaultValue: "Pending",
  },
  cover_letter: {
    type: DataTypes.TEXT,
  },
  cv_path: {
    type: DataTypes.STRING,
  },
});

module.exports = Application;
