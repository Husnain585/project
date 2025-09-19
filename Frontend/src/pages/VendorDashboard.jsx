// src/pages/VendorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const VendorDashboard = () => {
  const { user, loadingUser, products, createProduct, categories } =
    useGlobalContext();

  const [vendorProducts, setVendorProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    contactEmail: "",
    contactPhone: "",
    status: "active",
    categoryId: "",
  });
  const [error, setError] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const navigate = useNavigate();

  // Redirect unauthorized users
  useEffect(() => {
    if (!loadingUser) {
      if (!user) navigate("/login");
      else if (user.role?.toLowerCase() !== "vendor") navigate("/");
    }
  }, [user, loadingUser, navigate]);

  // Filter products that belong to this vendor
  useEffect(() => {
    if (products?.length && user?.vendorId) {
      const filtered = products.filter((p) => p.vendorId === user.vendorId);
      setVendorProducts(filtered);
    }
  }, [products, user]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Create product
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!newProduct.name || !newProduct.price || !newProduct.categoryId) {
      setError("Name, price, and category are required");
      return;
    }
    if (!newProduct.contactEmail || !newProduct.contactPhone) {
      setError("Contact email and contact phone are required");
      return;
    }

    try {
      setLoadingCreate(true);
      await createProduct({
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock || 10),
        categoryId: newProduct.categoryId,
        vendorId: user.vendorId, // ✅ always attach vendorId from JWT
      });

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        contactEmail: "",
        contactPhone: "",
        status: "active",
        categoryId: "",
      });
      setModalOpen(false);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to create product"
      );
    } finally {
      setLoadingCreate(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Add New Product
        </button>
      </div>

      {/* Vendor Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            You have no products yet.
          </div>
        )}
        {vendorProducts.map((product) => (
          <div
            key={product.productId}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition relative flex flex-col"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
            <p className="text-purple-600 font-bold text-lg mb-1">
              ${product.price}
            </p>
            <p className="text-gray-400 text-sm mb-1">Stock: {product.stock}</p>
            <p className="text-gray-400 text-sm mb-1">
              Email: {product.contactEmail}
            </p>
            <p className="text-gray-400 text-sm mb-1">
              Phone: {product.contactPhone}
            </p>
            <p className="text-green-600 text-sm font-semibold">
              Status: {product.status}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form className="space-y-4" onSubmit={handleCreateProduct}>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                placeholder="Stock Quantity"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="email"
                name="contactEmail"
                value={newProduct.contactEmail}
                onChange={handleChange}
                placeholder="Contact Email"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                type="text"
                name="contactPhone"
                value={newProduct.contactPhone}
                onChange={handleChange}
                placeholder="Contact Phone"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />

              <select
                name="categoryId"
                value={newProduct.categoryId}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                name="status"
                value={newProduct.status}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button
                type="submit"
                disabled={loadingCreate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                {loadingCreate ? "Creating..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
