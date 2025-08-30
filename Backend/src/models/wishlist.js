const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const User = require("./users");
const Product = require("./product");

class Wishlist extends Model {}

Wishlist.init(
  {
    wishlistId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
  },
  {
    sequelize: connection,
    modelName: "Wishlist",
    tableName: "wishlists",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Wishlist;
