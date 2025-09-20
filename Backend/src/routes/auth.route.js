// routes/auth.routes.js
const routes = require("express").Router();
const {
  Login,
  Logout,
  Register,
  LoginWithGoogle,
  googleCallback,
  LoginWithGithub,
  githubCallback,
} = require("../controller/auth.controller");

const authMiddleware = require("../middleware/authCheck.middleware");
const {loginSchema, registerSchema} = require("../validation/user.validator")
const validate = require("../middleware/validate.middleware");

routes.post("/login", validate(loginSchema), Login);
routes.post("/logout", Logout);
routes.post("/register", validate(registerSchema), Register);

// Google OAuth
routes.get("/google", LoginWithGoogle);
routes.get("/google/callback", googleCallback);

// GitHub OAuth
routes.get("/github", LoginWithGithub);
routes.get("/github/callback", githubCallback);

// Example of a protected route
routes.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

module.exports = routes;
