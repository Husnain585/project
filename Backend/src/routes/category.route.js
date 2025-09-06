const express = require("express");
const router = express.Router();
const {createCategory, getCategories, getCategoryById} = require("../controller/category.controller");
const authMiddleware = require("../middleware/authCheck.middleware");
const authCheckMiddleware = require("../middleware/authCheck.middleware");

// Protected Routes
router.post("/", authMiddleware, authCheckMiddleware, createCategory);

// Public 
router.get("/",  getCategories);
router.get("/:id",  getCategoryById);

module.exports = router;
