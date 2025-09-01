import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="h-72 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id || product.name}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-800"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to={`/product/${product.productId}`}
            className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          >
            {product.images?.[0]?.url ? (
              <img
                src={product.images[0].url}
                alt={product.name || "Product"}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                No Image
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.name || "Unnamed Product"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                ${product.price ?? "N/A"}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
