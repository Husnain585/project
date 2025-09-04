const express = require("express");
const router = express.Router();
const checkoutController = require("../controller/checkout.controller");

router.post("/payment-intent", checkoutController.createPaymentIntent);
router.post("/confirm-order", checkoutController.confirmOrder);

module.exports = router;
