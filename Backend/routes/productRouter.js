const routes = require("express").Router();
const {create , getAll, DeleteProduct , getProduct, UpdateProduct} = require("../Controller/productController");
const {middleWare} = require("../middleware")
routes.post("/create", create);
routes.get("/get-all",  getAll);
routes.get("/delete", middleWare,DeleteProduct);
routes.get("/get", middleWare, getProduct);
routes.patch("/update",middleWare, UpdateProduct);

module.exports = routes;
