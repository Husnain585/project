const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");

const category = require("./category");

class Product extends Model {}

Product.init(
  {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "categoryId",
      },
    },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: DataTypes.TEXT,
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize: connection,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;
