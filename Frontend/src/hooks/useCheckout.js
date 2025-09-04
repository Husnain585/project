// src/hooks/useCheckout.js
import { useState, useContext } from "react";
import useCart from "./useCart";
import useUser from "./useUser";
import axiosInstance from "../utils/axiosInstance";
import { GlobalContext } from "../context/GlobalContext"; // 👈 import context

const useCheckout = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const { user } = useUser(); // logged-in user

  const { auth } = useContext(GlobalContext); // 👈 get auth from context (token, etc.)

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
    setLoading(true);

    try {
      const payload = {
        userId: user?.userId,
        items: cart.map((item) => ({
          productId: item.product?.productId,
          name: item.product?.name,
          quantity: item.quantity,
          price: parseFloat(item.product?.price),
        })),
        shippingAddress: shipping,
        totalPrice: calculateTotal(),
      };

      console.log("📦 Sending order payload:", payload);

      // ✅ send token via Authorization header
      const res = await axiosInstance.post("/order", payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // 👈 add token from context
        },
      });
      console.log(res.data);

      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error(
        "❌ Checkout failed:",
        error.response?.data || error.message
      );
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
