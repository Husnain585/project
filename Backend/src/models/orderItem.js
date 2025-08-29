const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");

class OrderItem extends Model {}

OrderItem.init(
  {
    orderItemId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "orders", key: "orderId" },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "products", key: "productId" },
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  },
  {
    sequelize: connection,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
  }
);

module.exports = OrderItem;
