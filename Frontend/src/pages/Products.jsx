import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";

function Products() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <motion.div
          key={product.id || product.productId}
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
        >
          <Link to={`/product/${product.id || product.productId}`}>
            <img
              src={product.imageUrl || "https://via.placeholder.com/300x200"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </Link>

          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-blue-600 font-bold mb-4">
              ${product.price ?? "N/A"}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product.id || product.productId, 1)}
              className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Products;
