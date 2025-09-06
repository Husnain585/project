import React, { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";

const AdminDashboard = () => {
  const { getAllOrders, statusOrder } = useAdmin();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllOrders();
      setOrders(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      await statusOrder(orderId, status);
      // refresh orders after update
      await fetchOrders();
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel - Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Total Items</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id || order.orderId}>
              <td>{order._id || order.orderId}</td>
              <td>{order.user?.username || "Unknown"}</td>
              <td>{order.status}</td>
              <td>{order.items?.length || 0}</td>
              <td>
                {order.status !== "completed" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id || order.orderId, "completed")
                    }
                  >
                    Mark Completed
                  </button>
                )}
                {order.status !== "canceled" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id || order.orderId, "canceled")
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
