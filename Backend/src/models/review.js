const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");

class Review extends Model {}

Review.init(
  {
    reviewId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "userId" },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "products", key: "productId" },
    },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT },
  },
  {
    sequelize: connection,
    modelName: "Review",
    tableName: "reviews",
    timestamps: true,
  }
);

module.exports = Review;
