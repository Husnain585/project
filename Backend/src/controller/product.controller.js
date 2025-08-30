const Product = require("../models/product");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, description, price, stock, categoryId } = req.body;

      if (!name || !price || !categoryId) {
        return res
          .status(400)
          .json({ error: "Name, price, and categoryId are required" });
      }
      // Check for duplicate product name globally
      const existingProduct = await Product.findOne({ where: { name } });
      if (existingProduct) {
        return res
          .status(400)
          .json({ error: "A product with this name already exists" });
      }

      const product = await Product.create({
        name,
        description,
        price,
        stock,
        categoryId,
      });
      return res.status(201).json({ message: "Product created", product });
    } catch (error) {
      console.error("Create Product Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", errorDetails: error.message });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json({ products });
    } catch (error) {
      console.error("Get Products Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },
  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json({ product });
    } catch (error) {
      console.error("Get Product Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, description, price, stock, categoryId } = req.body;

      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock !== undefined ? stock : product.stock;
      product.categoryId = categoryId || product.categoryId;

      await product.save();
      return res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      console.error("Update Product Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ error: "Product not found" , errorDetails: error.message});

      await product.destroy();
      return res.status(200).json({ message: "Product deleted", product});
    } catch (error) {
      console.error("Delete Product Error:", error);
      return res.status(500).json({ error: "Server error" , errorDetails: error.message});
    }
  },
};
