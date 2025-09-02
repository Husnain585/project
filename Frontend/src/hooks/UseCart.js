// src/hooks/UseCart.js
import { useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { GlobalContext } from "../context/GlobalContext";
import config from "../config/config";
import useProducts from "./useProducts";

const useCart = () => {
  const { cart, setCart, setCartCount, user } = useContext(GlobalContext);
  const { getProductById } = useProducts();
  const [loading, setLoading] = useState(false);

  const authConfig = {
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : "",
    },
    withCredentials: true,
  };

  // Fetch cart from backend or fallback to localStorage
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/cart/", authConfig);
      const items = res.data.cart?.CartItems || [];

      // Enrich cart items with product data from local state
      const enriched = items.map((item) => ({
        ...item,
        product: getProductById(item.productId) || {},
      }));

      setCart(enriched);
      setCartCount(enriched.reduce((acc, item) => acc + item.quantity, 0));
      localStorage.setItem(config.storageKeys.cart, JSON.stringify(enriched));
    } catch (err) {
      console.error("Error fetching cart, falling back to localStorage:", err);
      const savedCart =
        JSON.parse(localStorage.getItem(config.storageKeys.cart)) || [];
      setCart(savedCart);
      setCartCount(savedCart.reduce((acc, item) => acc + item.quantity, 0));
    } finally {
      setLoading(false);
    }
  };

  // Add product to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!productId) {
      console.error("Cannot add to cart, productId is missing");
      return;
    }

    try {
      // ✅ Send only productId and quantity to backend
      await axiosInstance.post(
        "/cart/add",
        { productId, quantity },
        authConfig
      );

      // Get local product data for UI updates
      const productData = getProductById(productId);

      setCart((prev) => {
        const existing = prev.find((p) => p.productId === productId);
        let updatedCart;

        if (existing) {
          updatedCart = prev.map((p) =>
            p.productId === productId
              ? { ...p, quantity: p.quantity + quantity }
              : p
          );
        } else {
          updatedCart = [
            ...prev,
            { productId, product: productData, quantity },
          ];
        }

        localStorage.setItem(
          config.storageKeys.cart,
          JSON.stringify(updatedCart)
        );
        setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
        return updatedCart;
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`, authConfig);
      setCart((prev) => {
        const updatedCart = prev.filter((p) => p.productId !== productId);
        localStorage.setItem(
          config.storageKeys.cart,
          JSON.stringify(updatedCart)
        );
        setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
        return updatedCart;
      });
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce(
      (sum, item) =>
        sum + (Number(item.product?.price) || 0) * (item.quantity || 1),
      0
    );

  // Auto-fetch cart when user logs in
  useEffect(() => {
    if (user?.token) fetchCart();
  }, [user]);

  return {
    cart,
    loading,
    fetchCart,
    addToCart,
    removeFromCart,
    calculateTotal,
  };
};

export default useCart;
