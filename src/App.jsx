import Auth from "./Auth";
import Index from "./component";
import { Route, Routes, useLocation } from "react-router-dom";
import Product from "./product";
import GetProduct from "./component/product/getProduct";
import CreateProduct from "./component/product/createProduct";
import Layout from "./component/Layout/layout";
import { createContext, useEffect, useState } from "react";

const productContext = createContext();


const App = () => {
  const [product, setProduct] = useState("saud");
  const location = useLocation();
  const isAuthPath = location.pathname === "/";
  return (
    <>
      <div className="flex flex-col justify-center items-center h-fulll  w-full">
        {isAuthPath ? (
          <Routes>
            <Route index element={<Auth />} />
          </Routes>
        ) : (
          <productContext.Provider value={{product}}>
          <Layout>
            <Routes>
              
              <Route path="index" element={<Index />} /> 
              <Route path="product">
                <Route index element={<Product />} />
                <Route path="create-product" element={
                  <Product> <CreateProduct /> </Product> } />
                <Route path="get-product" element={
                  <Product> 
                    <GetProduct />
                     </Product> } />
              </Route>
            </Routes>
          </Layout>
          </productContext.Provider>
        )}
      </div>
    </>
  );
};

export default App;