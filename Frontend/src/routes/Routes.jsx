import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import About from "../pages/About";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import ProtectedRoute from "../routes/ProtectedRoute";
import CategoryProducts from "../components/categoryProduct/CategoryProducts";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/categories" element={<Categories />} />
    {/* ✅ Dynamic route for category products */}
    <Route path="/category/:categoryId" element={<CategoryProducts />} />

    <Route path="/about" element={<About />} />
    <Route
      path="/wishlist"
      element={
        <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cart"
      element={
          <Cart />
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/product/:productId" element={<ProductDetails />} />
  </Routes>
);

export default AppRoutes;
