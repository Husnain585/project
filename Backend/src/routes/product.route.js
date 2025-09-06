const router = require("express").Router();
const authMiddleware = require("../middleware/authCheck.middleware"); // optional: only admin can create/update/delete
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const { adminCheck } = require("../middleware/adminCheck.middleware");

// Public routes
router.get("/", getAllProducts);
router.get("/:productId", getProductById);

// Protected routes (admin)
router.post("/", authMiddleware, adminCheck, createProduct);
router.put("/:productId", authMiddleware, adminCheck, updateProduct);
router.delete("/:productId", authMiddleware, adminCheck, deleteProduct);

module.exports = router;
