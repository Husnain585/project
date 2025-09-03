// src/context/GlobalContext.js
import React, { createContext, useEffect, useState, useContext, useMemo } from "react";
import config from "../config/config";
import axiosInstance from "../utils/axiosInstance";

export const GlobalContext = createContext(null);

// Small helpers
const getId = (p) => (p?.id ?? p?.productId ?? p);
const safeNum = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0);

export const GlobalProvider = ({ children }) => {
  // Auth (kept but optional)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(config.storageKeys.authToken) || null
  );
  const [loadingUser, setLoadingUser] = useState(false);

  // Products & Categories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Cart
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Wishlist
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ---------------------------------------------------
  // Auth token persistence (optional)
  // ---------------------------------------------------
  useEffect(() => {
    if (token) localStorage.setItem(config.storageKeys.authToken, token);
    else localStorage.removeItem(config.storageKeys.authToken);
  }, [token]);

  // ---------------------------------------------------
  // Initial hydration from localStorage (cart + wishlist)
  // ---------------------------------------------------
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(config.storageKeys.cart) || "[]");
      const normalizedCart = Array.isArray(savedCart) ? savedCart : [];
      setCart(normalizedCart);
      setCartCount(normalizedCart.reduce((acc, i) => acc + safeNum(i.quantity), 0));
    } catch {
      setCart([]);
      setCartCount(0);
    }

    try {
      const savedWishlist = JSON.parse(localStorage.getItem(config.storageKeys.wishlist) || "[]");
      const normalizedWishlist = Array.isArray(savedWishlist) ? savedWishlist : [];
      setWishlist(normalizedWishlist);
      setWishlistCount(normalizedWishlist.length);
    } catch {
      setWishlist([]);
      setWishlistCount(0);
    }
  }, []);

  // ---------------------------------------------------
  // Optional: fetch current user if token present
  // ---------------------------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
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
  // Fetch products & categories
  // ---------------------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await axiosInstance.get("/product");
        setProducts(res.data.products || res.data || []);
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
        setCategories(res.data.categories || res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // ---------------------------------------------------
  // Cart
  // ---------------------------------------------------
  const persistCart = (next) => {
    localStorage.setItem(config.storageKeys.cart, JSON.stringify(next));
    setCartCount(next.reduce((acc, item) => acc + safeNum(item.quantity), 0));
  };

  /**
   * addToCart can accept either a full product object or a productId.
   * We normalize and store items as: { productId, product, quantity }
   */
  const addToCart = (input, quantity = 1) => {
    const product =
      typeof input === "object"
        ? input
        : products.find((p) => getId(p) === getId(input));

    if (!product) {
      console.warn("addToCart: product not found for", input);
      return;
    }

    const pid = getId(product);
    setCart((prev) => {
      const ix = prev.findIndex((i) => i.productId === pid);
      let next;
      if (ix >= 0) {
        next = [...prev];
        next[ix] = {
          ...next[ix],
          quantity: safeNum(next[ix].quantity) + safeNum(quantity),
        };
      } else {
        next = [...prev, { productId: pid, product, quantity: safeNum(quantity) }];
      }
      persistCart(next);
      return next;
    });
  };

  const updateQty = (productId, nextQty) => {
    const pid = getId(productId);
    setCart((prev) => {
      const next = prev
        .map((i) =>
          i.productId === pid ? { ...i, quantity: Math.max(1, safeNum(nextQty)) } : i
        )
        .filter((i) => i.quantity > 0);
      persistCart(next);
      return next;
    });
  };

  const removeFromCart = (productId) => {
    const pid = getId(productId);
    setCart((prev) => {
      const next = prev.filter((i) => i.productId !== pid);
      persistCart(next);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem(config.storageKeys.cart);
  };

  const calculateTotal = useMemo(
    () =>
      () =>
        cart.reduce(
          (acc, item) => acc + safeNum(item.product?.price) * safeNum(item.quantity),
          0
        ),
    [cart]
  );

  // ---------------------------------------------------
  // Wishlist
  // ---------------------------------------------------
  const persistWishlist = (next) => {
    localStorage.setItem(config.storageKeys.wishlist, JSON.stringify(next));
    setWishlistCount(next.length);
  };

  const addToWishlist = (product) => {
    const pid = getId(product);
    setWishlist((prev) => {
      if (prev.some((p) => getId(p) === pid)) return prev;
      const next = [...prev, product];
      persistWishlist(next);
      return next;
    });
  };

  const removeFromWishlist = (productId) => {
    const pid = getId(productId);
    setWishlist((prev) => {
      const next = prev.filter((p) => getId(p) !== pid);
      persistWishlist(next);
      return next;
    });
  };

  const toggleWishlist = (product) => {
    const pid = getId(product);
    setWishlist((prev) => {
      const exists = prev.some((p) => getId(p) === pid);
      const next = exists ? prev.filter((p) => getId(p) !== pid) : [...prev, product];
      persistWishlist(next);
      return next;
    });
  };

  const isInWishlist = (productId) =>
    wishlist.some((p) => getId(p) === getId(productId));

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
        updateQty,
        removeFromCart,
        clearCart,
        calculateTotal,

        // Wishlist
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Optional convenience hook (prevents “no export named useGlobalContext”)
export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobalContext must be used inside <GlobalProvider>");
  return ctx;
};

export default GlobalContext;
