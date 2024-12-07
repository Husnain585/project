const connection = require("../dbConnection");
const users = require("./Tables/users");
// const customer = require("./definitions/customer");
// const admin = require("./definitions/admin");
// const cart = require("./definitions/cart");
// const cartItem = require("./definitions/cartItem");
// const products = require("./definitions/products");
// const vendors  = require("./definitions/vendor");
// const attributes = require("./definitions/attributes")
// const variationHasAttributes = require("./definitions/variationHasAttributes");
// const productVariations = require("./definitions/productsVariations");
// const productsVariations = require("./definitions/productsVariations");


const models = { 
    users, 
    // customer, 
    // admin, 
    // cart, 
    // cartItem, 
    // products, 
    // vendors, 
    // attributes,
    // productVariations,
    // variationHasAttributes,
};   // all table are here after the execution

// relations

// vendor product 1:M
// vendors.hasMany(products, {foreignKey: "vendorId" });
// products.belongsTo(vendors, {foreignKey: "vendorId" });

// product productVaiations 1:M
// products.hasMany(productsVariations, {foreignKey: "variationId"});
// productsVariations.belongsTo(products, {foreignKey: "variationId"});

// variations attribute M:M through variationHasAttribute

// productsVariations.hasMany(variationHasAttributes, {foreignKey: "productsVariationId"}, {through: attributes});
// variationHasAttributes.belongsTo(productsVariations, {foreignKey: "productsVariationId"}, {through: attributes});

// attributes.hasMany(variationHasAttributes, {foreignKey: "attribueteId", as: "attribute"});
// variationHasAttributes.belongsTo(attributes, {foreignKey: "attributeId", as: "attribuete"});


const db = {};
db.connection = connection;
connection.models = models;

module.exports = { db, models };