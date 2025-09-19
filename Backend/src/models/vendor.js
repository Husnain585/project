const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const User = require("./users");
class Vendor extends Model {}

Vendor.init(
  {
    vendorId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID, 
      references: {
        model: User, 
        key: "userId", 
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: { isEmail: true },
    },
    contactPhone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "suspended", "deactivated"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize: connection,
    modelName: "Vendor",
    tableName: "vendors",
    timestamps: true,
    paranoid: true, // soft delete
  }
);

module.exports = Vendor;
