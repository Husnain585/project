const express = require("express");
const router = express.Router();
const {createCategory, getCategories, getCategoryById} = require("../controller/category.controller");
const authMiddleware = require("../middleware/authCheck.middleware");

router.post("/", authMiddleware,  createCategory);
router.get("/",  getCategories);
router.get("/:id",  getCategoryById);

module.exports = router;
