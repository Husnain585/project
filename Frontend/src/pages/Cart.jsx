// src/pages/Cart.jsx
import React from "react";
import useCart from "../hooks/UseCart";

function Cart() {
  const { cart, loading, removeFromCart, calculateTotal } = useCart();

  if (loading) {
    return (
      <div className="container mt-10">
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product?.name || "Unnamed Product"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Price: ${item.product?.price ?? 0}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">
                    Subtotal: ${(Number(item.product?.price) || 0) * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
