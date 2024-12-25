const routes = require("express").Router();
const {createCartController} = require("../Controller/cartController");

routes.post("/create", createCartController);

module.exports = routes