const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const company = sequelize.define("company", {
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
   address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING
  },
    categories: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
  });


module.exports = company;