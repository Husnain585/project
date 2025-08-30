// models/users.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db.connection"); 

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // enforce unique username
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // enforce unique email
    validate: {
      isEmail: true, // ensures proper email format
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  paranoid: true, // enables soft delete (since you used paranoid: false in queries)
  timestamps: true,
  tableName: "users",
});

module.exports = User;
