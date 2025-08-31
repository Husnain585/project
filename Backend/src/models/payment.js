const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const Order = require("./order");

class Payment extends Model {}

Payment.init(
  {
    paymentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Order, key: "orderId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("card", "paypal", "cod"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
  },
  {
    sequelize: connection,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
