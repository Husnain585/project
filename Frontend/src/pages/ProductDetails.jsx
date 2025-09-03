import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import config from "../config/config";

const ProductDetails = () => {
  const { productId } = useParams();
  const productsHook = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useContext(GlobalContext);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [adding, setAdding] = useState(false);

  const isInWishlist = product && wishlist.some((item) => item.id === product.id);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      let p = productsHook.getProductById(productId);
      setProduct(p || null);
    };
    fetchProduct();
  }, [productId, productsHook]);

  // Fetch product images
  useEffect(() => {
    const fetchImages = async () => {
      if (!productId) return;
      try {
        setLoadingImages(true);
        const res = await axios.get(
          `${config.apiBaseUrl}/product-image/${productId}`
        );
        setImages(res.data.images || []);
      } catch {
        setImages([]);
      } finally {
        setLoadingImages(false);
      }
    };
    fetchImages();
  }, [productId]);

  if (productsHook.loading || !product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product, 1);
    } catch (err) {
      console.error("Failed to add to cart", err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-10"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {loadingImages ? (
            <p>Loading images...</p>
          ) : images.length > 0 ? (
            images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.imageUrl}
                alt={img.imageId || product.name}
                className="w-full h-64 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
              />
            ))
          ) : (
            <img
              src="https://via.placeholder.com/400x300"
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-4">
              ${product.price ?? "N/A"}
            </p>
            <p className="mb-4">{product.description || "No description."}</p>
            <p className="text-sm text-gray-500 mb-6">
              Category: <em>{product.categoryId || "N/A"}</em>
            </p>
            <p className="text-sm text-gray-400">
              Product ID: <strong>{productId}</strong>
            </p>
          </div>

          <div className="flex gap-4 flex-wrap mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={adding}
              className={`bg-blue-600 text-white py-3 rounded-lg transition font-semibold hover:bg-blue-700 ${
                adding ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => !isInWishlist && addToWishlist(product)}
              disabled={isInWishlist}
              className={`py-3 px-6 rounded-lg transition font-semibold ${
                isInWishlist
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
