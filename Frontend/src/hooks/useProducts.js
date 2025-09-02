// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";
import mockProducts from "../data/mockProducts";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${config.apiBaseUrl}/product`);
        if (Array.isArray(res.data?.products)) {
          setProducts(res.data.products);
        } else {
          setProducts(mockProducts);
        }
      } catch (err) {
        console.warn("API failed, using mock products", err);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get product by ID from local array
  const getProductById = (id) => {
    if (!id) return null;
    return products.find((p) => String(p.id ?? p.productId) === String(id)) || null;
  };

  // Fetch product by ID directly from API
  const getProductByIdFromApi = async (id) => {
    if (!id) return null;
    try {
      const res = await axios.get(`${config.apiBaseUrl}/product/${id}`);
      return res.data.product;
    } catch (err) {
      console.error("Failed to fetch product by ID", err);
      return null;
    }
  };

  return { products, loading, getProductById, getProductByIdFromApi };
};

export default useProducts;
