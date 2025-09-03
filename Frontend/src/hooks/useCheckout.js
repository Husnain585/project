// src/hooks/useCheckout.js
import { useState } from "react";
import useCart from "./useCart";
import axiosInstance from "../utils/axiosInstance";

const useCheckout = () => {
  const { cart, calculateTotal, clearCart } = useCart();

  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // 🔹 In real app → Send order to backend
      await axiosInstance.post("/order", {
        shipping,
        items: cart,
        total: calculateTotal(),
      });

      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error("❌ Checkout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    shipping,
    success,
    loading,
    calculateTotal,
    handleChange,
    handleSubmit,
  };
};

export default useCheckout;
