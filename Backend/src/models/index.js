const sequelize = require("../config/db.connection");

// Import your models
const Cart = require("./cart");
const Admin = require("./admin");
const User = require("./users");
const Category = require("./category");
const Order = require("./order");
const Product = require("./product");
const OrderItem = require("./orderItem");
const ProductImage = require("./productImage");
const Review = require("./review");
const Wishlist = require("./wishlist");
const Address = require("./address");
const Payment = require("./payment");
const CartItem = require("./cartItem");
const emailCheck = require("./emailCheck");
const OAuthAccount = require("./oAuthAccounts");
const Vendor = require("./vendor"); // <-- NEW

// Attach models
const models = {
  Cart,
  Admin,
  User,
  Category,
  Order,
  Product,
  OrderItem,
  ProductImage,
  Review,
  Wishlist,
  Address,
  Payment,
  CartItem,
  emailCheck,
  OAuthAccount,
  Vendor, // <-- NEW
};

// ===== Relations =====

// Users ↔ Cart (one-to-many)
User.hasMany(Cart, { foreignKey: "userId", as: "carts" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

// Users ↔ Orders (one-to-many)
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Orders ↔ OrderItems (one-to-many)
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Products ↔ OrderItems (one-to-many)
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Orders ↔ Payment (one-to-one)
Order.hasOne(Payment, { foreignKey: "orderId", as: "payment" });
Payment.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Categories ↔ Products (one-to-many)
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// Products ↔ ProductImages (one-to-many)
Product.hasMany(ProductImage, { foreignKey: "productId", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Users ↔ Wishlist ↔ Products (many-to-many)
User.belongsToMany(Product, { through: Wishlist, foreignKey: "userId" });
Product.belongsToMany(User, { through: Wishlist, foreignKey: "productId" });
Wishlist.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Wishlist, { foreignKey: "productId" });

// Users ↔ Reviews ↔ Products (one-to-many both sides)
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Users ↔ Addresses (one-to-many)
User.hasMany(Address, { foreignKey: "userId", as: "addresses" });
Address.belongsTo(User, { foreignKey: "userId", as: "user" });

// CartItems ↔ Products (many-to-one)
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// Verify Email
User.hasOne(emailCheck, { foreignKey: "userId", as: "emailCheck" });
emailCheck.belongsTo(User, { foreignKey: "userId", as: "user" });

// One User can have multiple OAuth accounts (Google, GitHub, Apple, etc.)
User.hasMany(OAuthAccount, {
  foreignKey: "userId",
  as: "oauthAccounts",
  onDelete: "CASCADE", // delete OAuthAccounts when User is deleted
});

OAuthAccount.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// ===== Vendor Relations =====

// Vendors ↔ Products (one-to-many)
Vendor.hasMany(Product, { foreignKey: "vendorId", as: "products" });
Product.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

// Build db object
const db = {};
db.connection = sequelize;
db.models = models;

module.exports = { db, models };
