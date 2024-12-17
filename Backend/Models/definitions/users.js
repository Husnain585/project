const { DataTypes, Model } = require("sequelize");
const connection = require("../../dbConnection");
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");

class users extends Model {}
users.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.STRING(60),
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
      defaultValue: "",
    },
  },
    {
    name: "users",
    timestamps: true,
    paranoid: true,
    sequelize: connection,
    });

users.beforeCreate(async (user) => {
  user.userId = uuid();
  user.password = await hash(user.password, 5);
});
users.afterCreate((user) => {
  delete user.dataValues.password;
  delete user.dataValues.userId;
});

module.exports = users;
