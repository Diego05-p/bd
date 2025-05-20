const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../bd/bd");
const Role = require("./role.models");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "first name is required" },
      },
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "last name is required" },
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: { msg: "email is required" },
      },
    },
    telephone: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "telephone is required" },
      },
    },
    avatar: {
      type: DataTypes.STRING(150),
      defaultValue: "http://localhost:3000/images/users/avatar/avatar-user.png",
    },
    imagePath: {
      type: DataTypes.STRING(150),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;