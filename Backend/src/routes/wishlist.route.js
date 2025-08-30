const router = require("express").Router();
const authMiddleware = require("../middleware/authCheck.middleware");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controller/wishlist.controller");

// Protect all wishlist routes
router.use(authMiddleware);

router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:wishlistId", removeFromWishlist);

module.exports = router;
