const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.connection");
const { v4: uuid } = require("uuid");

class Admin extends Model {}

Admin.init(
  {
    adminId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "manager", "support"),
      defaultValue: "manager",
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: true,
  }
);

module.exports = Admin;
