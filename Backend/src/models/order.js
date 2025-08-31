const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const User = require("./users");

class Order extends Model {}

Order.init(
  {
    orderId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "userId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    
  },
  {
    sequelize: connection,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;