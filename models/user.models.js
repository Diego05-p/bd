const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "users",
  timestamps: false,
});

module.exports = User;
