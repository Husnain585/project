import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/order/admin/all", {
        credentials: "include", // if using cookies for auth
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
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
      const res = await fetch(
        `http://localhost:3000/api/order/admin/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // if using cookies
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      const updatedOrder = await res.json();

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? updatedOrder.order : order
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel - Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
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
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.user?.username || "Unknown"}</td>
              <td>{order.status}</td>
              <td>{order.items?.length || 0}</td>
              <td>
                {order.status !== "completed" && (
                  <button
                    onClick={() => updateStatus(order.orderId, "completed")}
                  >
                    Mark Completed
                  </button>
                )}
                {order.status !== "canceled" && (
                  <button
                    onClick={() => updateStatus(order.orderId, "canceled")}
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
