import React from "react";
import useCart from "../hooks/useCart";

function Cart() {
  const { cart, removeFromCart, calculateTotal } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="container mt-10">
        <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li
            key={item.productId || index}
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
                Subtotal: $
                {((Number(item.product?.price) || 0) * item.quantity).toFixed(2)}
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
  );
}

export default Cart;
