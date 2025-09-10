const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const Category = require("./category");
const Vendor = require("./vendor"); 

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
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Category, key: "categoryId" },
    },
    vendorId: {
      type: DataTypes.UUID,
      allowNull: true, 
      references: { model: Vendor, key: "vendorId" },
    },
  },
  {
    sequelize: connection,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    paranoid: true, 
  }
);

module.exports = Product;
