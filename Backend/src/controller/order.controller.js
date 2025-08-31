const { models } = require("../models");
const { Order, OrderItem, Cart, CartItem, Product, ProductImage, Payment } =
  models;

module.exports = {
  // Create a new Order from User's Cart
  createOrder: async (req, res) => {
    try {
      const userId = req.user.userId;

      // 1. Fetch user cart
      const cart = await Cart.findOne({
        where: { userId },
        include: [{ model: CartItem, include: [Product] }],
      });

      console.log(cart);
      if (!cart || cart.CartItems.length === 0) {
        return res.status(400).json({
          error: "Cart is empty",
          details: "Add items to cart before placing an order",
        });
      }

      // 2. Create new order
      const order = await Order.create({
        userId,
        status: "pending", // default
        totalAmount: cart.CartItems.reduce(
          (sum, item) => sum + item.quantity * item.Product.price,
          0
        ),
      });

      // 3. Create order items
      const orderItems = await Promise.all(
        cart.CartItems.map((item) =>
          OrderItem.create({
            orderId: order.orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.Product.price,
          })
        )
      );

      // 4. Optionally create Payment (default status pending)
      const payment = await Payment.create({
        orderId: order.orderId,
        amount: order.totalAmount,
        status: "pending",
        method: "cod", // or "cod", "card", etc.
      });

      // 5. Clear user cart
      await CartItem.destroy({ where: { cartId: cart.cartId } });

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
        include: [ {
      model: OrderItem,
      as: "items", 
      include: [
        {
          model: Product,
          as: "product", 
        },
      ],
    },],
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
        include: [{ model: OrderItem, include: [Product] }],
      });
      return res.status(200).json({ orders });
    } catch (error) {
      console.error("Get All Orders Error:", error);
      return res.status(500).json({ error: "Server error" });
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
