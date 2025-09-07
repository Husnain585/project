import React, { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";

const AdminDashboard = () => {
  const { getAllOrders, statusOrder, createCategory, createProduct } = useAdmin();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Category form
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  // Product form
  const [productData, setProductData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    originalPrice: "",
  });

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
      await fetchOrders(); // refresh after update
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  // Create category
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryData.name || !categoryData.description) return;
    try {
      await createCategory(categoryData);
      alert("Category created successfully!");
      setCategoryData({ name: "", description: "" });
    } catch (err) {
      alert(err.message || "Failed to create category");
    }
  };

  // Create product
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (
      !productData.categoryId ||
      !productData.name ||
      !productData.description ||
      !productData.price ||
      !productData.stock ||
      !productData.originalPrice
    )
      return;

    try {
      await createProduct(productData);
      alert("Product created successfully!");
      setProductData({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        originalPrice: "",
      });
    } catch (err) {
      alert(err.message || "Failed to create product");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Orders Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
        {loading && <div>Loading orders...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {orders.length === 0 && !loading ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <div className="mb-2">
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  <p><strong>User ID:</strong> {order.userId}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                  <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                </div>

                {/* Order Items */}
                <div className="mt-3">
                  <h3 className="font-semibold">Items:</h3>
                  <table className="w-full border mt-2">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">Product</th>
                        <th className="border px-3 py-2">Description</th>
                        <th className="border px-3 py-2">Quantity</th>
                        <th className="border px-3 py-2">Price</th>
                        <th className="border px-3 py-2">Stock</th>
                        <th className="border px-3 py-2">Original Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item) => (
                        <tr key={item.orderItemId}>
                          <td className="border px-3 py-2">{item.product?.name}</td>
                          <td className="border px-3 py-2">{item.product?.description}</td>
                          <td className="border px-3 py-2">{item.quantity}</td>
                          <td className="border px-3 py-2">₹{item.price}</td>
                          <td className="border px-3 py-2">{item.product?.stock}</td>
                          <td className="border px-3 py-2">₹{item.product?.originalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Actions */}
                <div className="mt-3 space-x-2">
                  {order.status !== "paid" && (
                    <button
                      onClick={() => updateStatus(order.orderId, "paid")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Mark Paid
                    </button>
                  )}
                  {order.status !== "canceled" && (
                    <button
                      onClick={() => updateStatus(order.orderId, "canceled")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Create Category */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
        <form onSubmit={handleCategorySubmit} className="space-y-3 max-w-md">
          <input
            type="text"
            placeholder="Category name"
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <textarea
            placeholder="Category description"
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Add Category
          </button>
        </form>
      </section>

      {/* Create Product */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Create Product</h2>
        <form onSubmit={handleProductSubmit} className="space-y-3 max-w-md">
          <input
            type="text"
            placeholder="Category ID"
            value={productData.categoryId}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, categoryId: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Product name"
            value={productData.name}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <textarea
            placeholder="Product description"
            value={productData.description}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={productData.price}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Stock"
            value={productData.stock}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, stock: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Original Price"
            value={productData.originalPrice}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, originalPrice: e.target.value }))
            }
            className="border px-3 py-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded w-full"
          >
            Add Product
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;
