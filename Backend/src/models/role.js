// role.js
const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const {v4: uuid} = require("uuid")

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid(),
    },
    name: {
      type: DataTypes.STRING(50), // e.g. "admin", "customer", "vendor"
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
