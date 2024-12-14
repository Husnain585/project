// const routes = require("express").Router();
// const {Login} = require("../Controller/authController");
// routes.get("/auth", (req, res) => {
//     res.send("Auth Page");
// })

// routes.post("/login", Login);
// module.exports = routes;

const routes = require("express").Router();

const { Login } = require("../Controller/authController");

routes.post("/login", Login);

module.exports = routes;
