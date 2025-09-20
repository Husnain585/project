import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import config from "../config/config";

const VendorContext = createContext(null);

// Helpers
const safeNum = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0);
const getId = (p) => p?.id ?? p?.productId ?? p;

export const VendorProvider = ({ token, children }) => {
  const [vendors, setVendors] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [loadingVendorProducts, setLoadingVendorProducts] = useState(false);

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
      // Refresh vendor list after creation
      fetchVendors();
      return res.data.vendor || res.data;
    } catch (err) {
      console.error("Failed to create vendor", err);
      throw err;
    }
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        vendorProducts,
        loadingVendors,
        loadingVendorProducts,
        fetchVendors,
        fetchVendorProducts,
        createVendor,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

// Hook for easy usage
export const useVendorContext = () => {
  const ctx = useContext(VendorContext);
  if (!ctx) throw new Error("useVendorContext must be used inside <VendorProvider>");
  return ctx;
};

export default VendorContext;
