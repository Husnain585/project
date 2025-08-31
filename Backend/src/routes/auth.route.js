// routes/auth.routes.js
const routes = require("express").Router();
const { Login, Logout, Register } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/authCheck.middleware");

routes.post("/login", Login);
routes.post("/logout", Logout);
routes.post("/register", Register);

// Example of a protected route
routes.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

module.exports = routes;
