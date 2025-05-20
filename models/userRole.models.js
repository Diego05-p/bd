const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.models");
const Role = require("./role.models");

const UserRole = sequelize.define("UserRole", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    },
  },
}, {
  tableName: "user_roles",
  timestamps: false,
});

// Asociaciones
UserRole.belongsTo(User, { as: "User", foreignKey: "userId" });
UserRole.belongsTo(Role, { as: "Role", foreignKey: "roleId" });

module.exports = UserRole;
