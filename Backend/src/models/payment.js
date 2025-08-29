const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");

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
      references: { model: "orders", key: "orderId" },
    },
    method: { type: DataTypes.ENUM("credit_card","paypal","stripe"), allowNull: false },
    amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.ENUM("pending","successful","failed"), defaultValue: "pending" },
  },
  {
    sequelize: connection,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
