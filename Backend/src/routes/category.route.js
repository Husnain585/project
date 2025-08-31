const express = require("express");
const router = express.Router();
const {createCategory, getCategories, getCategoryById} = require("../controller/category.controller");
const authMiddleware = require("../middleware/authCheck.middleware");

router.post("/", authMiddleware, createCategory);
router.get("/", authMiddleware, getCategories);
router.get("/:id", authMiddleware, getCategoryById);

module.exports = router;
