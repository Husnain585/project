import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// import pages as before...
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
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
        <Route path="/categories" element={<PageWrapper><Categories /></PageWrapper>} />
        <Route path="/category/:categoryId" element={<PageWrapper><CategoryProducts /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <PageWrapper><Wishlist /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/product/:productId" element={<PageWrapper><ProductDetails /></PageWrapper>} />
        <Route path="/order-success" element={<PageWrapper><OrderSuccess /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
