;const connection = require("../dbConnection");
const users = require("./definitions/users");
const customer = require("./definitions/customer");
const admin = require("./definitions/admin");
const cart = require("./definitions/cart");
const cartItem = require("./definitions/cartItem");
const products = require("./definitions/products");
const vendors  = require("./definitions/vendor");
const attributes = require("./definitions/attributes")
const variationHasAttributes = require("./definitions/variationHasAttributes");
const productVariations = require("./definitions/productsVariations");
const productsVariations = require("./definitions/productsVariations");


const models = { 
    users, 
    customer, 
    admin, 
    cart, 
    cartItem, 
    products, 
    vendors, 
    attributes,
    productVariations,
    variationHasAttributes
};   // all table are here after the execution

// relations

// vendor product 1:M
vendors.hasMany(products, {foreignKey: "productId", as: "Product" });
products.belongsTo(vendors, {foreignKey: "vendorId", as: "vendor" });

// product productVaiations 1:M

products.hasMany(productVariations, {foreignKey: "productId ", as: "productVariations"});
productVariations.belongsTo(products, {foreignKey: "productId", as: "products"});

// variations attribute M:M through variationHasAttribute

  productVariations.hasMany(variationHasAttributes, {
    foreignKey: "productVariationId ",
    as: "variationsHasAttribute",
  });
  variationHasAttributes.belongsTo(productVariations, {
    foreignKey: "productVariationId",
    as: "productVariations",
  });
  
  attributes.hasMany(variationHasAttributes, {
    foreignKey: "attributeId ",
    as: "variationsHasAttribute",
  });
  variationHasAttributes.belongsTo(attributes, {
    foreignKey: "attributeId",
    as: "attributes",
  });
  

const db = {};
db.connection = connection;
connection.models = models;

module.exports = { db, models };