const express = require("express");
const router = express.Router();
const checkoutController = require("../controller/checkout.controller");
const authCheckMiddleware = require("../middleware/authCheck.middleware");

router.post("/payment-intent", authCheckMiddleware,  checkoutController.createPaymentIntent);
router.post("/confirm-order", authCheckMiddleware, checkoutController.confirmOrder);

module.exports = router;
