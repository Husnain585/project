// src/pages/Checkout.jsx
import React, { useState } from "react";
import useCart from "../hooks/useCart";

const Checkout = () => {
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

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for payment integration
    console.log("Order submitted:", { shipping, cart });
    setSuccess(true);
    clearCart();
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-3xl font-bold mb-5">Checkout</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-3xl font-bold mb-5">Order Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={shipping.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={shipping.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={shipping.address}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={shipping.city}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                value={shipping.state}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">ZIP</label>
              <input
                type="text"
                name="zip"
                value={shipping.zip}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={shipping.country}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-100 p-6 rounded space-y-4">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          {cart.map((item, index) => (
            <div
              key={item.productId || index}
              className="flex justify-between text-gray-700"
            >
              <span>
                {item.product?.name} x {item.quantity}
              </span>
              <span>
                ${((Number(item.product?.price) || 0) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
