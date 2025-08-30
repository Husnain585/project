const router = require("express").Router();
const authMiddleware = require("../middleware/authCheck.middleware"); // optional: only admin can create/update/delete
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

// Public routes
router.get("/", getAllProducts);
router.get("/:productId", getProductById);

// Protected routes (admin)
router.post("/", authMiddleware, createProduct);
router.put("/:productId", authMiddleware, updateProduct);
router.delete("/:productId", authMiddleware, deleteProduct);

module.exports = router;
