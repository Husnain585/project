// routes/auth.routes.js
const routes = require("express").Router();
const { Login, Logout, Register } = require("../controller/auth.controller");
const authCheck = require("../middleware/authCheck.middleware");

routes.post("/login", Login);
routes.post("/logout", Logout);
routes.post("/register", Register);

// Example of a protected route
routes.get("/me", authCheck, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

module.exports = routes;
