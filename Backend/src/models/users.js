const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");

class User extends Model {
  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

User.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: uuid, // UUIDv4
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: { isEmail: true },
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true, // soft deletes
  }
);


module.exports = User;
