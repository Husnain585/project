import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./Auth";
import Index from "./component/index";
import Product from "./Product";
import GetProduct from "./component/product/getProduct";
import CreateProduct from "./component/product/CreateProduct";
import Layout from "./component/Layout/layout";
import AdminDashboard from "./component/product/AdminPage";
import ProductLayout from "./productLayout";

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
        <Layout>
          <Routes>
            <Route path="index" element={<Index />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="shopping" element={<ProductLayout />}>
              <Route index path="product" element={<Product />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="get-product" element={<GetProduct />} />
            </Route>
          </Routes>
        </Layout>
      )}
    </div>
  );
};

export default App;
