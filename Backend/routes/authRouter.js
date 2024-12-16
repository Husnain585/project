const routes = require("express").Router();
const { Login } = require("../Controller/authController");


routes.post("/login", Login);
module.exports = routes;
