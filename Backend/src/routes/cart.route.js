const router = require("express").Router();
const authMiddleware = require("../middleware/authCheck.middleware");
const {adminCheck} = require("../middleware/adminCheck.middleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  
} = require("../controller/cart.controller");

router.get("/", authMiddleware,  getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/remove/:cartId", authMiddleware, removeCartItem);

module.exports = router;
