import React, { createContext, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

const AdminContext = createContext(null);

export const AdminProvider = ({ token, children }) => {
  // Get all orders (admin)
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

  // Update order status (admin)
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

  return (
    <AdminContext.Provider value={{ getAllOrders, statusOrder }}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook for easy usage
export const useAdminContext = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminContext must be used inside <AdminProvider>");
  return ctx;
};

export default AdminContext;
