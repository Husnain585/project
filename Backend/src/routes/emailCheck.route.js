const routes = require("express").Router();
const {
  sendVerificationEmail,
  verifyEmailCode,
  verifyEmailLink,
} = require("../controller/emailCheck.controller");

// Send email (after register)
routes.post("/send-verification", sendVerificationEmail);

// Verify via OTP code
routes.post("/verify-email", verifyEmailCode);

// Verify via clickable link
routes.get("/verify-email/:token", verifyEmailLink);

module.exports = routes;
