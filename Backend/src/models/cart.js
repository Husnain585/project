const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const User = require("./users");
const Product = require("./product");

class Cart extends Model {}

Cart.init(
  {
    cartId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: uuid,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "userId" },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Product, key: "productId" },
    },
     status: {
      type: DataTypes.ENUM("active", "completed"),
      allowNull: false,
      defaultValue: "active",
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Cart",
    tableName: "carts",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Cart;
