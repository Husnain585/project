import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useProducts from "../hooks/useProducts";

const Products = () => {
  const { products, loading } = useProducts();

  // Read query params (categoryId from URL)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");

  // Filter products if categoryId exists
  const filteredProducts = categoryId
    ? products.filter((p) => String(p.categoryId) === String(categoryId))
    : products;

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (!filteredProducts || filteredProducts.length === 0)
    return (
      <p className="text-center mt-10">
        {categoryId
          ? "No products found for this category."
          : "No products available."}
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {categoryId ? "Filtered Products" : "All Products"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const productId = product.id ?? product.productId;
          return (
            <motion.div
              key={productId}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to={`/product/${productId}`}>
                {product.images?.[0]?.imageUrl ? (
                  <img
                    src={product.images[0].imageUrl}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    {product.name || "Unnamed Product"}
                  </h2>
                  <p className="text-gray-600">${product.price ?? "N/A"}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
