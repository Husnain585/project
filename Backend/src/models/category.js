const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.connection");
const { v4: uuid } = require("uuid");

class Category extends Model {}

Category.init(
  {
    categoryId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuid,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
  }
);

module.exports = Category;
