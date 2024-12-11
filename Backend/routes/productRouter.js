const routes = require("express").Router();
const {create , getAll, delProduct } = require("../Controller/productController");

routes.post("/create", create);
routes.get("/get-all", getAll);
routes.get("/delete", delProduct);

module.exports = routes;