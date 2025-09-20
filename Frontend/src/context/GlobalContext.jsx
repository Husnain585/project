import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import config from "../config/config";
import axiosInstance from "../utils/axiosInstance";
import ThemeContext, { ThemeProvider } from "./ThemeContext";
import { jwtDecode } from "jwt-decode";
export const GlobalContext = createContext(null);

// Helpers
const getId = (p) => p?.id ?? p?.productId ?? p;
const safeNum = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0);

// -------------------------
// Helpers for user-scoped storage
// -------------------------
const CART_KEY = (userId) => `cart_${userId}`;
const WISHLIST_KEY = (userId) => `wishlist_${userId}`;

export const GlobalProvider = ({ children }) => {
  // -------------------------
  // Auth/User
  // -------------------------
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(config.storageKeys.authToken) || null
  );
  const [loadingUser, setLoadingUser] = useState(true);

  // -------------------------
  // Products & Categories
  // -------------------------
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // -------------------------
  // Vendors
  // -------------------------
  const [vendors, setVendors] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [loadingVendorProducts, setLoadingVendorProducts] = useState(false);

  // -------------------------
  // Cart
  // -------------------------
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // -------------------------
  // Wishlist
  // -------------------------
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // -------------------------
  // Auth token persistence
  // -------------------------
  useEffect(() => {
    if (token) localStorage.setItem(config.storageKeys.authToken, token);
    else localStorage.removeItem(config.storageKeys.authToken);
  }, [token]);

  // -------------------------
  // Hydrate cart & wishlist from localStorage
  // -------------------------
  // -------------------------
  // Load cart & wishlist when user changes
  // -------------------------
  useEffect(() => {
    if (!user) {
      setCart([]);
      setCartCount(0);
      setWishlist([]);
      setWishlistCount(0);
      return;
    }

    try {
      const savedCart = JSON.parse(
        localStorage.getItem(CART_KEY(user.userId)) || "[]"
      );
      setCart(savedCart);
      setCartCount(savedCart.reduce((acc, i) => acc + safeNum(i.quantity), 0));
    } catch {
      setCart([]);
      setCartCount(0);
    }

    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem(WISHLIST_KEY(user.userId)) || "[]"
      );
      setWishlist(savedWishlist);
      setWishlistCount(savedWishlist.length);
    } catch {
      setWishlist([]);
      setWishlistCount(0);
    }
  }, [user]);

  // -------------------------
  // Fetch current user
  // -------------------------
  const fetchUser = async () => {
    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }
    try {
      setLoadingUser(true);

      // Always decode JWT locally
      const decoded = jwtDecode(token);
      let enrichedUser = {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role,
        vendorId: decoded.vendorId ?? null, // ✅ persist vendorId
      };

      // Optionally fetch from backend to keep in sync
      const res = await axiosInstance.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.user) {
        enrichedUser = { ...enrichedUser, ...res.data.user };
      }

      // If your backend returns a fresh token, update storage
      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem(config.storageKeys.authToken, res.data.token);
      }

      setUser(enrichedUser);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      setToken(null);
      localStorage.removeItem(config.storageKeys.authToken);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  // -------------------------
  // User API actions
  // -------------------------
  const updateUser = async (data) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.put("/user/update", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user || res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteUser = async () => {
    if (!token) throw new Error("Not authenticated");
    try {
      await axiosInstance.delete("/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(null);
      setToken(null);
    } catch (err) {
      throw err;
    }
  };

  const changePassword = async (data) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.post("/user/change-password", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // -------------------------
  // Products & Categories
  // -------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await axiosInstance.get("/product");
        setProducts(res.data.products || res.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
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
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  // Vendor
  // Fetch all vendors
  const fetchVendors = async () => {
    try {
      setLoadingVendors(true);
      const res = await axiosInstance.get("/vendor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data.vendors || res.data || []);
    } catch (err) {
      console.error("Failed to fetch vendors", err);
    } finally {
      setLoadingVendors(false);
    }
  };

  // Fetch products for a specific vendor
  const fetchVendorProducts = async (vendorId) => {
    try {
      setLoadingVendorProducts(true);
      const res = await axiosInstance.get(`/vendor/${vendorId}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendorProducts(res.data.products || res.data || []);
    } catch (err) {
      console.error(`Failed to fetch products for vendor ${vendorId}`, err);
    } finally {
      setLoadingVendorProducts(false);
    }
  };

  // Create a new vendor
  const createVendor = async (vendorData) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.post("/vendor", vendorData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Optionally refresh the vendor list
      fetchVendors();
      return res.data.vendor || res.data;
    } catch (err) {
      console.error("Failed to create vendor", err);
      throw err;
    }
  };

  // -------------------------
  // Cart
  // -------------------------
  // -------------------------
  // Persist helpers
  // -------------------------
  const persistCart = (next) => {
    if (!user) return;
    localStorage.setItem(CART_KEY(user.userId), JSON.stringify(next));
    setCartCount(next.reduce((acc, i) => acc + safeNum(i.quantity), 0));
  };

  const addToCart = (input, quantity = 1) => {
    if (!user) return;

    const product =
      typeof input === "object"
        ? input
        : products.find((p) => getId(p) === getId(input));
    if (!product) return;

    const pid = getId(product);

    setCart((prev) => {
      const ix = prev.findIndex((i) => i.productId === pid);
      const next =
        ix >= 0
          ? prev.map((i, idx) =>
              idx === ix
                ? { ...i, quantity: safeNum(i.quantity) + safeNum(quantity) }
                : i
            )
          : [...prev, { productId: pid, product, quantity: safeNum(quantity) }];
      persistCart(next);
      return next;
    });
  };

  const updateQty = (productId, nextQty) => {
    if (!user) return;
    const pid = getId(productId);
    setCart((prev) => {
      const next = prev
        .map((i) =>
          i.productId === pid
            ? { ...i, quantity: Math.max(1, safeNum(nextQty)) }
            : i
        )
        .filter((i) => i.quantity > 0);
      persistCart(next);
      return next;
    });
  };

  const removeFromCart = (productId) => {
    if (!user) return;
    const pid = getId(productId);
    setCart((prev) => {
      const next = prev.filter((i) => i.productId !== pid);
      persistCart(next);
      return next;
    });
  };

  const clearCart = () => {
    if (!user) return;
    setCart([]);
    setCartCount(0);
    localStorage.removeItem(CART_KEY(user.userId));
  };
  const calculateTotal = useMemo(
    () => () =>
      cart.reduce(
        (acc, item) =>
          acc + safeNum(item.product?.price) * safeNum(item.quantity),
        0
      ),
    [cart]
  );

  // -------------------------
  // Wishlist
  // -------------------------
  const persistWishlist = (next) => {
    if (!user) return;
    localStorage.setItem(WISHLIST_KEY(user.userId), JSON.stringify(next));
    setWishlistCount(next.length);
  };
  const addToWishlist = (product) => {
    if (!user) return;
    const pid = getId(product);
    setWishlist((prev) => {
      const next = prev.some((p) => getId(p) === pid)
        ? prev
        : [...prev, product];
      persistWishlist(next);
      return next;
    });
  };

  const removeFromWishlist = (productId) => {
    if (!user) return;
    const pid = getId(productId);
    setWishlist((prev) => {
      const next = prev.filter((p) => getId(p) !== pid);
      persistWishlist(next);
      return next;
    });
  };

  const toggleWishlist = (product) => {
    if (!user) return;
    const pid = getId(product);
    setWishlist((prev) => {
      const next = prev.some((p) => getId(p) === pid)
        ? prev.filter((p) => getId(p) !== pid)
        : [...prev, product];
      persistWishlist(next);
      return next;
    });
  };

  const isInWishlist = (productId) => {
    if (!user) return false;
    return wishlist.some((p) => getId(p) === getId(productId));
  };

  // -------------------------
  // AdminDashboard
  // -------------------------
  const getAllOrders = async () => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.get("/order/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.orders || res.data;
    } catch (err) {
      console.error("Failed to fetch all orders", err);
      throw err;
    }
  };

  const statusOrder = async (orderId, status) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.put(
        `/order/admin/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.order || res.data;
    } catch (err) {
      console.error(`Failed to update order ${orderId} status`, err);
      throw err;
    }
  };

  // VendorProducts
  const createProduct = async (productData) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.post("/product", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res data", res.data);
      return res.data.product || res.data;
    } catch (err) {
      console.error(
        "Failed to create product",
        err.response?.data || err.message
      );
      console.log(err);
      throw err;
    }
  };

  const updateProduct = async (productId, productData) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.put(
        `/product/${productId}`,
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.product || res.data;
    } catch (err) {
      console.error(
        `Failed to update product ${productId}`,
        err.response?.data || err.message
      );
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.delete(`/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.product || res.data;
    } catch (err) {
      console.error(
        `Failed to delete product ${productId}`,
        err.response?.data || err.message
      );
      throw err;
    }
  };

  // Category

  const createCategory = async (categoryData) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axiosInstance.post("/category", categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.category || res.data;
    } catch (err) {
      console.error("Failed to create category", err);
      throw err;
    }
  };

  return (
    <ThemeProvider>
      <GlobalContext.Provider
        value={{
          // Auth/User
          user,
          setUser,
          token,
          setToken,
          loadingUser,
          fetchUser,
          updateUser,
          deleteUser,
          changePassword,
          // Products & Categories
          products,
          categories,
          loadingProducts,
          loadingCategories,
          createProduct,
          updateProduct,
          deleteProduct,
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
          // Admin
          getAllOrders,
          statusOrder,
          createCategory,
          createProduct,
          // Vendor
          fetchVendors,
          fetchVendorProducts,
          createVendor,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </ThemeProvider>
  );
};

// -------------------------
// Hook for easy usage
// -------------------------
export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error("useGlobalContext must be used inside <GlobalProvider>");
  return ctx;
};

export default GlobalContext;
