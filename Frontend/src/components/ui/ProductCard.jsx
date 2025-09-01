import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer"
    >
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-500">📦 No Image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
        <button
          onClick={onAddToCart}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
