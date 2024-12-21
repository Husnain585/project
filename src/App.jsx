import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./Auth";
import AuthLayout from "./Layout/authLayout"
import Index from "./component/index";
import Product from "./Product";
import GetProduct from "./component/product/getProduct";
import CreateProduct from "./component/product/CreateProduct";
import Layout from "./component/Layout/layout";
import AdminDashboard from "./component/product/AdminPage";
import ProductLayout from "./productLayout";
import MainLayout from "./Layout/mainLayout"
import Home from "./Pages/Home"
import ShopLayout from "./Layout/ShoppingLayout"

const App = () => {
  const location = useLocation();
  const isAuthPath = location.pathname === "/";

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {isAuthPath ? (
        <Routes>
          <Route index element={<AuthLayout />} />
        </Routes>
      ) : (
        
        <MainLayout>
          <Routes>
            <Route path="index" element={<Index />} />
            <Route path="Home" element={<Home/>}/>
          </Routes>
        </MainLayout>
         

      )
      }
    </div>
  );
};

export default App;
