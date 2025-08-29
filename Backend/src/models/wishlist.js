const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");

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
      references: { model: "users", key: "userId" },
    },
    productId: {
      type: DataTypes.UUID,
      references: { model: "products", key: "productId" },
    },
  },
  {
    sequelize: connection,
    modelName: "Wishlist",
    tableName: "wishlists",
    timestamps: true,
  }
);

module.exports = Wishlist;
