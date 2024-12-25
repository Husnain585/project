const connection = require("../dbConnection");

const users = require("./definitions/users");
const customers = require("./definitions/customer");
const admins = require("./definitions/admin");
const vendors = require("./definitions/vendor");
const products = require("./definitions/products");
const productVariations = require("./definitions/productsVariations");
const attributes = require("./definitions/attributes");
const variationsHasAttribute = require("./definitions/variationHasAttributes");
const cart = require("./definitions/cart");

const models = {
  users,
  customers,
  admins,
  vendors,
  products,
  productVariations,
  attributes,
  variationsHasAttribute,
  cart
};

//  1:M relation between Product & Vendors
vendors.hasMany(products, { foreignKey: "vendorId", as: "products" });
products.belongsTo(vendors, { foreignKey: "vendorId", as: "vendors" });

// 1:M relation between Product & productVariations 
                        // as single product has multiple variant or varity it has
products.hasMany(productVariations, {foreignKey: "productId ", as: "productVariations"});
productVariations.belongsTo(products, {foreignKey: "productId", as: "products"});

// M:M relation 
productVariations.hasMany(variationsHasAttribute, {foreignKey: "productVariationId ", as: "variationsHasAttribute"});
variationsHasAttribute.belongsTo(productVariations, {foreignKey: "productVariationId", as: "productVariations"});

attributes.hasMany(variationsHasAttribute, {foreignKey: "attributeId ", as: "variationsHasAttribute"});
variationsHasAttribute.belongsTo(attributes, {foreignKey: "attributeId", as: "attributes"});

users.hasOne(cart, { foreignKey: "userId", as: "cart" });
cart.belongsTo(users, { foreignKey: "userId", as: "user" });

cart.belongsToMany(products, { through: "cart_products", foreignKey: "cartId", as: "products" });
products.belongsToMany(cart, { through: "cart_products", foreignKey: "productId", as: "carts" });



const db = {};
db.connection = connection;
connection.models = models;
module.exports = { db, models };
