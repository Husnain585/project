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

// Protected routes (admin/vendor)
router.post(
  "/",
  authMiddleware,
  adminCheck,                 // or remove adminCheck if vendors also allowed
  upload.array("images", 5),  // must match frontend input name
  createProduct
);

router.put(
  "/:productId",
  authMiddleware,
  adminCheck,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:productId", authMiddleware, adminCheck, deleteProduct);

module.exports = router;
