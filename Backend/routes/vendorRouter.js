const routes = require("express").Router();

const {create, } = require("../Controller/vendorController");

routes.post("/create", create);
module.exports = routes;


