const routes = require("express").Router();

const productModel = require("../models/productModel");
const {create , getAll } = require("../controller/productController");


routes.post("/create", create);
routes.get("/get-all", getAll);
module.exports = routes;




