const { models } = require("../models");
const { Order, OrderItem, Cart, CartItem, Product, ProductImage, Payment } =
  models;

module.exports = {
  // Create a new Order from User's Cart
  createOrder: async (req, res) => {
    try {
      // ✅ Get user ID from JWT or payload
      const userId = req.user?.userId || req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // ✅ Get items and shipping from frontend payload
      const { items, shippingAddress } = req.body;
      if (!items || items.length === 0) {
        return res.status(400).json({ error: "No items provided" });
      }

      // ✅ Calculate total amount
      const totalAmount = items.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.price),
        0
      );

      // 1. Create the order
      const order = await Order.create({
        userId,
        status: "pending",
        totalAmount,
        shippingAddress: JSON.stringify(shippingAddress || {}),
      });

      // 2. Create order items
      const orderItems = await Promise.all(
        items.map((item) =>
          OrderItem.create({
            orderId: order.orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.price),
          })
        )
      );

      // 3. Create payment entry (default COD)
      const payment = await Payment.create({
        orderId: order.orderId,
        amount: totalAmount,
        status: "pending",
        method: "cod",
      });

      // ✅ Return success response
      res.status(201).json({
        message: "Order created successfully",
        order,
        items: orderItems,
        payment,
      });
    } catch (error) {
      console.error("Create Order Error:", error);
      res.status(500).json({ error: "Server error", details: error.message });
    }
  },
  // Get logged-in user's orders
  getUserOrders: async (req, res) => {
    try {
      const userId = req.user.userId; // from auth middleware

      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                include: [
                  { model: ProductImage, as: "images" }, // 👈 product images
                ],
              },
            ],
          },
          {
            model: Payment,
            as: "payment", // 👈 payment details
          },
        ],
      });

      res.status(200).json({ orders });
    } catch (error) {
      console.error("Get User Orders Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
  // Get single order by ID (only owner or admin can access)
  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.userId;

      const order = await Order.findOne({
        where: { orderId: orderId, userId },
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json({ order });
    } catch (error) {
      console.error("Get Order By ID Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  },

  // Admin: Get all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [{ model: OrderItem, as: "items", include: [{model:  Product, as: "product"}] }],
      });
      return res.status(200).json({ orders });
    } catch (error) {
      console.error("Get All Orders Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  },

  // Admin: Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;
      await order.save();

      return res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      console.error("Update Order Status Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  // User: Cancel order if still pending
  cancelOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.userId;

      const order = await Order.findOne({ where: { id: orderId, userId } });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (order.status !== "pending") {
        return res
          .status(400)
          .json({ error: "Cannot cancel non-pending order" });
      }

      order.status = "cancelled";
      await order.save();

      return res.status(200).json({ message: "Order cancelled", order });
    } catch (error) {
      console.error("Cancel Order Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },
};
