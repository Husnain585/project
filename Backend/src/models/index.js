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

// Attach models
const models = {
  Cart: new Cart(sequelize),
  CartItem : new CartItem(sequelize),
  Admin: new Admin(sequelize),
  User: new User(sequelize),
  Category: new Category(sequelize),
  Payment: new Payment(sequelize),
  Order: new Order(sequelize),
  Product: new Product(sequelize),
  OrderItem: new OrderItem(sequelize),
  ProductImage: new ProductImage(sequelize),
  Review: new Review(sequelize),
  Wishlist: new Wishlist(sequelize),
  Address: new Address(sequelize),
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
User.belongsToMany(Product, {
  through: Wishlist,
  foreignKey: "userId",
  as: "wishlistProducts",
});
Product.belongsToMany(User, {
  through: Wishlist,
  foreignKey: "productId",
  as: "wishlistedBy",
});

// Users ↔ Reviews ↔ Products (one-to-many both sides)
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Users ↔ Addresses (one-to-many)
User.hasMany(Address, { foreignKey: "userId", as: "addresses" });
Address.belongsTo(User, { foreignKey: "userId", as: "user" });

// Cartitems ↔ Products (many-to-one)
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// Build db object
const db = {};
db.connection = sequelize;
db.models = models;

module.exports = { db, models };
