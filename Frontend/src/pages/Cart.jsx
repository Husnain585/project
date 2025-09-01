import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cartCount, setCartCount } = useContext(GlobalContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cart");
      setCartItems(res.data.items || []);
      setCartCount(res.data.items?.length || 0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      await axiosInstance.delete(`/cart/${itemId}`);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      setCartCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>
      {loading ? (
        <p>Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => (
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
                    <h2 className="font-semibold">{item.product.name}</h2>
                    <p>${item.product.price.toFixed(2)}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-6 flex justify-end text-xl font-bold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
