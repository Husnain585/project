const routes = require("express").Router();
const {
  sendVerificationEmail,
  verifyEmail,
} = require("../controller/emailCheck.controller");

// Send email (call after register)
routes.post("/send-verification", sendVerificationEmail);

// Verify link
routes.get("/verify-email/:token", verifyEmail);

module.exports = routes;
