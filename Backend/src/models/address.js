const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");

class Address extends Model {}

Address.init(
  {
    addressId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "userId" },
    },
    street: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize : connection,
    modelName: "Address",
    tableName: "addresses",
    timestamps: true,
  }
);

module.exports = Address;
