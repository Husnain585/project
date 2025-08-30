const express = require("express");
const router = express.Router();
const {createCategory, getCategories, getCategoryById} = require("../controller/category.controller");

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);

module.exports = router;
