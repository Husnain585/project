import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.apiBaseUrl}/product`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id || p.productId === id) || null;
  };

  const getProductByIdFromApi = async (id) => {
    try {
      const res = await axios.get(`${config.apiBaseUrl}/products/${id}`);
      return res.data || null;
    } catch (err) {
      console.error("Failed to fetch product by ID", err);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, getProductById, getProductByIdFromApi };
};

export default useProducts;
