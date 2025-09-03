// src/pages/Wishlist.jsx
import React from "react";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-3xl font-bold mb-5">Your Wishlist</h1>
        <p className="text-gray-500">You haven’t added any products yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      <ul className="space-y-4">
        {wishlist.map((item, index) => (
          <li
            key={item.id || index}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">
                Price: ${item.price ?? 0}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => addToCart(item, 1)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
