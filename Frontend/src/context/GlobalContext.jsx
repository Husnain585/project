// src/context/GlobalContext.js
import React, { createContext, useEffect, useState } from "react";
import config from "../config/config";
import axiosInstance from "../utils/axiosInstance";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // 🔹 Auth state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(config.storageKeys.authToken) || null
  );

  // 🔹 Product & Category state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // 🔹 Cart state
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // 🔹 Wishlist state
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // 🔹 Loading user state
  const [loadingUser, setLoadingUser] = useState(true);

  // ---------------------------------------------------
  // 📌 AUTH
  // ---------------------------------------------------
  useEffect(() => {
    if (token) localStorage.setItem(config.storageKeys.authToken, token);
    else localStorage.removeItem(config.storageKeys.authToken);
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
      try {
        setLoadingUser(true);
        const res = await axiosInstance.get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
        setUser(null);
        setToken(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [token]);

  // ---------------------------------------------------
  // 📌 CART (Local + API Sync)
  // ---------------------------------------------------
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.productId === product.id);
      let updated;
      if (existing) {
        updated = prev.map((p) =>
          p.productId === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      } else {
        updated = [...prev, { productId: product.id, product, quantity }];
      }
      setCartCount(updated.reduce((acc, item) => acc + item.quantity, 0));
      localStorage.setItem(config.storageKeys.cart, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = prev.filter((p) => p.productId !== productId);
      setCartCount(updated.reduce((acc, item) => acc + item.quantity, 0));
      localStorage.setItem(config.storageKeys.cart, JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem(config.storageKeys.cart);
  };

  // ---------------------------------------------------
  // 📌 WISHLIST
  // ---------------------------------------------------
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const updated = [...prev, product];
      setWishlistCount(updated.length);
      localStorage.setItem(config.storageKeys.wishlist, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      setWishlistCount(updated.length);
      localStorage.setItem(config.storageKeys.wishlist, JSON.stringify(updated));
      return updated;
    });
  };

  // ---------------------------------------------------
  // 📌 FETCH PRODUCTS & CATEGORIES (on app load)
  // ---------------------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await axiosInstance.get("/product");
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("❌ Failed to fetch products", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await axiosInstance.get("/category");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("❌ Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        // Auth
        user,
        setUser,
        token,
        setToken,
        loadingUser,

        // Products & Categories
        products,
        categories,
        loadingProducts,
        loadingCategories,

        // Cart
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,

        // Wishlist
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
