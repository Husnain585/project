const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const Category = require("./category");

class Product extends Model {}

Product.init(
  {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid, // UUIDv4
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Category, key: "categoryId" },
    },
  },
  {
    sequelize: connection,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    paranoid: true, // soft deletes
  }
);

module.exports = Product;
