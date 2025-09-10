const Product = require("../models/product");
const ProductImage = require("../models/productImage");

module.exports = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { name, description, price, stock, categoryId, originalPrice } =
        req.body;

      if (!name || !price || !categoryId) {
        return res
          .status(400)
          .json({ error: "Name, price, and categoryId are required" });
      }

      // Check for duplicate product name
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
        originalPrice: originalPrice || null,
      });

      return res.status(201).json({ message: "Product created", product });
    } catch (error) {
      console.error("Create Product Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", errorDetails: error.message });
    }
  },

  // Get all products with images
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: ProductImage,
            as: "images",
            attributes: ["imageId", "url", "altText", "isPrimary"],
          },
        ],
      });

      return res.status(200).json({ products });
    } catch (error) {
      console.error("Get Products Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", errorDetails: error.message });
    }
  },

  // Get product by ID with images
  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await Product.findByPk(productId, {
        include: [
          {
            model: ProductImage,
            as: "images",
            attributes: ["imageId", "url", "altText", "isPrimary"],
          },
        ],
      });

      if (!product) return res.status(404).json({ error: "Product not found" });

      return res.status(200).json({ product });
    } catch (error) {
      console.error("Get Product Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", errorDetails: error.message });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, description, price, stock, categoryId, originalPrice } =
        req.body;

      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock !== undefined ? stock : product.stock;
      product.categoryId = categoryId || product.categoryId;
      product.originalPrice =
        originalPrice !== undefined ? originalPrice : product.originalPrice;

      await product.save();

      return res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      console.error("Update Product Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", errorDetails: error.message });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      await product.destroy();
      return res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
      console.error("Delete Product Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", errorDetails: error.message });
    }
  },
  getProductsByVendorId: async (vendorId) => {
    return await Product.findAll({ where: { vendorId } });
  },
};
