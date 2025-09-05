import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from "../routes/ProtectedRoute";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const Products = lazy(() => import("../pages/Products"));
const Categories = lazy(() => import("../pages/Categories"));
const About = lazy(() => import("../pages/About"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Cart = lazy(() => import("../pages/Cart"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Shop = lazy(() => import("../pages/Shop"));
const CategoryProducts = lazy(() => import("../components/categoryProduct/CategoryProducts"));
const Profile = lazy(() => import("../pages/Profile"));
const Contact = lazy(() => import("../pages/Contact"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));

const Spinner = lazy(() => import("../components/ui/loadingSpinner/Spinner"));

// Framer Motion page animation
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
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
          <Route path="/categories" element={<PageWrapper><Categories /></PageWrapper>} />
          <Route path="/category/:categoryId" element={<PageWrapper><CategoryProducts /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/product/:productId" element={<PageWrapper><ProductDetails /></PageWrapper>} />

          {/* Protected Routes */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <PageWrapper><Wishlist /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <PageWrapper><Cart /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PageWrapper><Profile /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <PageWrapper><Checkout /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <PageWrapper><OrderSuccess /></PageWrapper>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;
