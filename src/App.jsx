import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./Auth";
import Product from "./Product";
import GetProduct from "./component/product/getProduct";
import CreateProduct from "./component/product/CreateProduct";
import AdminDashboard from "./component/product/AdminPage";
import ProductLayout from "./productLayout";
import MainLayout from "./Layout/mainLayout";
import Home from "./Pages/Home";
import ForYou from "./Pages/ForYou";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

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
            <Route path="about" element={<About />}/>
            <Route path="for-you" element={<ForYou />}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="shopping" element={<ProductLayout />}>
              <Route index element={<Product />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="get-product" element={<GetProduct />} />
            </Route>
          </Routes>
        </MainLayout>
      )}
    </div>
  );
};

export default App;
