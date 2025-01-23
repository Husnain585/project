import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./Auth";
import Product from "./Product";
import GetProduct from "./Features/product/getProduct";
import CreateProduct from "./Features/product/createProduct";
import AdminDashboard from "./Features/product/AdminPage";
import ProductLayout from "./productLayout";
import MainLayout from "./Layout/mainLayout";
import Home from "./Pages/Home";   
import About from "./Pages/About";
import ContactSection from "./Pages/Contact";
import ProductDetail from "./Features/productLayout/productDetails";

const App = () => {
  const location = useLocation();
  const isAuthPath = location.pathname === "/";

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {isAuthPath ? (
        <Routes>
          <Route index element={<Auth />} />
        </Routes>
      ) : (
        <MainLayout>
          <Routes>
            <Route path="index" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="for-you" element={<ProductDetail />} />
            <Route path="contact" element={<ContactSection />} />
            <Route path="shopping" element={<ProductLayout />} />
          </Routes>
          <Routes>
            <Route path="admin" element={<AdminDashboard />} />
            <Route index path="product" element={<Product />} />
            <Route path="product/create-product"  element={<CreateProduct />} />
            <Route path="product/get" element={<GetProduct/>}/>
          </Routes>
        </MainLayout>
      )}
    </div>
  );
};

export default App;
