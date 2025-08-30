const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const Cart = require("./cart");
const Product = require("./product");

class CartItem extends Model {}

CartItem.init(
  {
    cartItemId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuid(),
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Cart, key: "cartId" },
      onDelete: "CASCADE",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Product, key: "productId" },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "CartItem",
    tableName: "cart_items",
    timestamps: true,
    paranoid: true,
  }
);


module.exports = CartItem;
