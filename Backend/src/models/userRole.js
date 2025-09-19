// userRole.js
const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const {v4: uuid} = require("uuid")

class UserRole extends Model {}

UserRole.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "UserRole",
    tableName: "user_roles",
    timestamps: false,
  }
);

module.exports = UserRole;
