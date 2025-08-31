const router = require("express").Router();
const authMiddleware = require("../middleware/authCheck.middleware");
const isAdmin = require("../middleware/adminCheck.middleware"); // to restrict admin-only actions
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controller/order.controller");

// ===== User Routes =====
router.post("/", authMiddleware, createOrder); // Create order from cart
router.get("/", authMiddleware, getUserOrders); // Get logged-in user's orders
router.get("/:orderId", authMiddleware, getOrderById); // Get single order
router.put("/:orderId/cancel", authMiddleware, cancelOrder); // Cancel order (only if pending)

// ===== Admin Routes =====
router.get("/admin/all", authMiddleware,  getAllOrders); // Get all orders
router.put("/admin/:orderId/status", authMiddleware,  updateOrderStatus); // Update order status

module.exports = router;
