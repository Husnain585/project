const sequelize = require("../config/db.connection");

// Import your models
const cart = require("./cart");
const admin = require("./admin");
const users = require("./users");

// Attach models
const models = {
  cart: new cart(sequelize),
  admin: new admin(sequelize),
  users: new users(sequelize),
};

// Relations (example — expand later)
users.hasMany(cart, { foreignKey: "userId" });
cart.belongsTo(users, { foreignKey: "userId" });

// Build db object
const db = {};
db.connection = sequelize;
db.models = models;

module.exports = {db, models};
