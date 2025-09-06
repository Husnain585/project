const router = require("express").Router();
const authMiddleware = require("../middleware/authCheck.middleware");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controller/wishlist.controller");

router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);
router.delete("/:wishlistId", authMiddleware, removeFromWishlist);

module.exports = router;
