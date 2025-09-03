import React from "react";
import useWishlist from "../hooks/useWishlist";

function Wishlist() {
  const { wishlistCount, toggleWishlist } = useWishlist();

  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold mb-5">Wishlist</h1>
      <p>You have {wishlistCount} items in your wishlist.</p>
      <button
        onClick={() => toggleWishlist(true)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add Dummy Item
      </button>
      <button
        onClick={() => toggleWishlist(false)}
        className="mt-4 ml-2 bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Remove Item
      </button>
    </div>
  );
}

export default Wishlist;
