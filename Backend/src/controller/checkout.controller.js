// backend/controllers/checkout.controller.js
require("dotenv").config();
const Stripe = require("stripe");
const config = require("../config/config"); // Add STRIPE_SECRET_KEY in your config
const stripe = new Stripe(config.stripeSecretKey);

const { Order, OrderItem, Product } = require("../models"); // adjust models import

module.exports = {
  createPaymentIntent: async (req, res) => {
    try {
      const { cart, shipping } = req.body;

      if (!cart || cart.length === 0)
        return res.status(400).json({ error: "Cart is empty" });

      // Calculate total amount in cents
      const totalAmount = cart.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
      }, 0);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100), // cents
        currency: "usd",
        metadata: {
          shippingName: shipping.fullName,
          shippingEmail: shipping.email,
        },
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Stripe Payment Intent Error:", error);
      res.status(500).json({ error: "Server error", details: error.message });
    }
  },

  confirmOrder: async (req, res) => {
    try {
      const { cart, shipping, paymentIntentId, userId } = req.body;

      // Create order
      const order = await Order.create({
        userId,
        totalAmount: cart.reduce(
          (acc, item) => acc + Number(item.product.price) * item.quantity,
          0
        ),
        shippingAddress: JSON.stringify(shipping),
        paymentStatus: "Paid",
        paymentIntentId,
      });

      // Create order items
      for (const item of cart) {
        await OrderItem.create({
          orderId: order.id,
          productId: item.product.productId,
          quantity: item.quantity,
          price: item.product.price,
        });
      }

      res.status(200).json({ message: "Order confirmed", order });
    } catch (error) {
      console.error("Confirm Order Error:", error);
      res.status(500).json({ error: "Server error", details: error.message });
    }
  },
};
