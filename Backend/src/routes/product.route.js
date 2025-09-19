// routes/product.route.js
const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const authMiddleware = require("../middleware/authCheck.middleware");
const { adminCheck } = require("../middleware/adminCheck.middleware");
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
// ⬇️ accept multiple images (max 5 for example)
router.post("/", authMiddleware, adminCheck, upload.array("images", 5), createProduct);
router.put("/:productId", authMiddleware, adminCheck, upload.array("images", 5), updateProduct);
router.delete("/:productId", authMiddleware, adminCheck, deleteProduct);

module.exports = router;
