const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");

class ProductImage extends Model {}

ProductImage.init(
  {
    imageId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "products", key: "productId" },
    },
    url: { type: DataTypes.STRING, allowNull: false },
    altText: { type: DataTypes.STRING },
  },
  {
    sequelize : connection,
    modelName: "ProductImage",
    tableName: "product_images",
    timestamps: true,
  }
);

module.exports = ProductImage;
