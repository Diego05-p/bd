const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Auth = sequelize.define("Auth", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Auth;
