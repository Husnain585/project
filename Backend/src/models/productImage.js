const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const Product = require("./product");

// models/productImage.js
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
      references: {
        model: Product,
        key: "productId",
      },
      onDelete: "CASCADE",
    },
    data: {
      type: DataTypes.BLOB, // store binary data
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: "ProductImage",
    tableName: "product_images",
    timestamps: true,
    paranoid: true,
    hooks: {
      async beforeSave(image) {
        if (image.isPrimary) {
          await ProductImage.update(
            { isPrimary: false },
            {
              where: {
                productId: image.productId,
                imageId: { [connection.Sequelize.Op.ne]: image.imageId },
              },
            }
          );
        }
      },
    },
  }
);

module.exports = ProductImage;
