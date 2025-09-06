const router = require("express").Router();
const authMiddleware = require("../middleware/authCheck.middleware");
const {
  createProductImage,
  getProductImages,
  deleteProductImage,
} = require("../controller/productImage.controller");
const { adminCheck } = require("../middleware/adminCheck.middleware");

// Public route: Get all images of a product
router.get("/:productId", getProductImages);

// Protected routes (admin only)
router.post("/", authMiddleware, adminCheck,  createProductImage);
router.delete("/:imageId", authMiddleware, adminCheck, deleteProductImage);

module.exports = router;
