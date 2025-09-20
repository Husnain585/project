import React, { useState } from "react";
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
import ProductQuickViewModal from "./ProductQuickViewModal";

const Stars = ({ rating = 0 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const blanks = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <FontAwesomeIcon
          key={`f${i}`}
          icon={faStar}
          className="text-yellow-500"
        />
      ))}
      {half && (
        <FontAwesomeIcon icon={faStarHalfStroke} className="text-yellow-500" />
      )}
      {Array.from({ length: blanks }).map((_, i) => (
        <span
          key={`b${i}`}
          className="w-3 h-3 rounded-sm bg-gray-200 inline-block"
        />
      ))}
    </div>
  );
};

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const liked = isInWishlist(product.productId);
  const discounted =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = discounted
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const getImageSrc = (img, fallbackIndex) => {
    if (!img || !img.data)
      return `https://picsum.photos/600/600?random=3`;
    return img.data; // already full data URL
  };

  const images = product.images?.length
    ? product.images.map((img) => getImageSrc(img, index))
    : [getImageSrc(null, index)];

  const image = images[0];

  const handleWishlistClick = () => toggleWishlist(product);
  const handleAddToCart = () => addToCart(product, 1);

  return (
    <>
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg border border-gray-100 overflow-hidden transition">
        {discounted && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
            -{discountPercent}%
          </span>
        )}

        <div className="relative">
          <img
            src={image}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
          />

          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 bg-white/90 dark:bg-gray-700/80 backdrop-blur px-2 py-2 rounded-full shadow hover:scale-105 transition"
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={liked ? "text-red-500" : "text-gray-700"}
            />
          </button>
        </div>

        <div className="p-4 flex flex-col justify-between">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {product.category?.name || "General"}
          </p>
          <h3 className="font-semibold mt-1 line-clamp-1 text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <Stars rating={product.rating} />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(product.price)}
            </span>
            {discounted && (
              <span className="line-through text-gray-400 text-sm">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p
            className={`mt-1 text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCartPlus} />
              Add to Cart
            </button>

            <button
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>

      {quickViewOpen && (
        <ProductQuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
