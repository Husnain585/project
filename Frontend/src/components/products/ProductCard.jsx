// src/components/products/ProductCard.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartPlus,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import { formatCurrency } from "../../utils/format";

const Stars = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const blanks = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <FontAwesomeIcon key={`f${i}`} icon={faStar} className="text-yellow-500" />
      ))}
      {half && <FontAwesomeIcon icon={faStarHalfStroke} className="text-yellow-500" />}
      {Array.from({ length: blanks }).map((_, i) => (
        <span key={`b${i}`} className="w-3 h-3 rounded-sm bg-gray-200 inline-block" />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const pid = product?.id ?? product?.productId;
  const liked = isInWishlist(pid);

  const image =
    product?.images?.[0]?.imageUrl || "https://picsum.photos/seed/fallback/600/600";

  const handleWishlistClick = () => {
    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={image} alt={product?.name} className="w-full h-56 object-cover" />
        <button
          aria-label="wishlist"
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-2 rounded-full shadow hover:scale-105 transition"
          title={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FontAwesomeIcon icon={faHeart} className={liked ? "text-red-500" : "text-gray-700"} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product?.category?.name || "General"}
        </p>
        <h3 className="font-semibold mt-1 line-clamp-1">{product?.name}</h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">{formatCurrency(product?.price)}</span>
          <Stars rating={product?.rating} />
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faCartPlus} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
