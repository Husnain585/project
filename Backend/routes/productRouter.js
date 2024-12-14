const routes = require("express").Router();
const {create , getAll, delProduct , getOneProduct, Update} = require("../Controller/productController");
const {middleWare} = require("../middleware");
const { updateProduct } = require("../Models/productModel");

routes.post("/create", create);
routes.get("/get-all",  getAll);
routes.get("/delete", delProduct);
routes.get("/get", getOneProduct);
routes.patch("/update", Update);

module.exports = routes;