const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const Product = require("./product");

class ProductImage extends Model {}

ProductImage.init(
  {
    imageId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid, // UUIDv4
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "productId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    altText: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "ProductImage",
    tableName: "product_images",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = ProductImage;
