import React, { createContext, useEffect, useState } from "react";
import config from "../config/config";
import axiosInstance from "../utils/axiosInstance";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(config.storageKeys.authToken) || null
  );

  const [cart, setCart] = useState([]); // <-- add cart array
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);

  // Actions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartCount((c) => c + 1);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
    setCartCount((c) => Math.max(0, c - 1));
  };

  const toggleWishlist = (isAdding = true) =>
    setWishlistCount((c) => Math.max(0, c + (isAdding ? 1 : -1)));

  // Save/remove token in localStorage
  useEffect(() => {
    if (token) localStorage.setItem(config.storageKeys.authToken, token);
    else localStorage.removeItem(config.storageKeys.authToken);
  }, [token]);

  // Fetch user profile if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
      try {
        setLoadingUser(true);
        const res = await axiosInstance.get("/user/me");
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
        setToken(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        cart,
        setCart,
        cartCount,
        setCartCount,
        wishlistCount,
        setWishlistCount,
        addToCart,
        removeFromCart,
        toggleWishlist,
        loadingUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

