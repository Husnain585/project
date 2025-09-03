// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import ProductGrid from "../components/products/ProductGrid";
import { useGlobalContext } from "../context/GlobalContext";

const Products = () => {
  const { products, loadingProducts, categories } = useGlobalContext();

  // Local state for search, filter, and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      const catId = Number(selectedCategory);
      result = result.filter(
        (p) => (p.category ? p.category.id : p.categoryId) === catId
      );
    }

    // Search by name
    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortOrder]);

  return (
    <div className="min-h-screen container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        All Products
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Categories</option>
          {categories.map((cat, index) => (
            <option key={cat.id || index} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={loadingProducts ? [] : filteredProducts}
        loading={loadingProducts}
      />
    </div>
  );
};

export default Products;
