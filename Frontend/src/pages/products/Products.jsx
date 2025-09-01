import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/product"); // backend endpoint
      setProducts(res.data.products || []);
      console.log(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((p) =>
      selectedCategory ? p.categoryId === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.images?.[0]?.url || null,
              }}
              onAddToCart={() => alert(`${product.name} added to cart`)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Products;
