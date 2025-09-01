import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistCount, setWishlistCount, addToCart } = useContext(GlobalContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/wishlist");
      setWishlistItems(res.data.items || []);
      setWishlistCount(res.data.items?.length || 0);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      await axiosInstance.delete(`/wishlist/${itemId}`);
      setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
      setWishlistCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
    }
  };

  const moveToCart = async (item) => {
    try {
      await axiosInstance.post("/cart", { productId: item.product.id, quantity: 1 });
      removeFromWishlist(item.id);
      addToCart();
    } catch (err) {
      console.error("Error moving item to cart:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">❤️ Your Wishlist</h1>
      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlistItems.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images?.[0]?.url || ""}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-semibold hover:underline"
                    >
                      {item.product.name}
                    </Link>
                    <p>${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
