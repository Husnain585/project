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
      onDelete: "CASCADE", // delete images when product is deleted
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : "https://unsplash.com/photos/white-and-brown-plastic-bottles-nwOip8AOZz0",
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
      // Before saving (create/update), enforce one primary image per product
      async beforeSave(image) {
        if (image.isPrimary) {
          await ProductImage.update(
            { isPrimary: false },
            {
              where: {
                productId: image.productId,
                imageId: { [connection.Sequelize.Op.ne]: image.imageId }, // exclude current image
              },
            }
          );
        }
      },
    },
  }
);

module.exports = ProductImage;
