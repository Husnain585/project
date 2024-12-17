// import Auth from "./Auth";
// import Index from "./component";
// import { Route, Routes, useLocation } from "react-router-dom";
// import Product from "./product";
// import GetProduct from "./component/product/getProduct";
// import CreateProduct from "./component/product/createProduct";
// import Layout from "./component/Layout/layout";
// import AdminDashboard from "./component/product/adminPage";
// import productLayout from "./productLayout";


// const App = () => {
//   const location = useLocation();
//   const isAuthPath = location.pathname === "/";
//   return (
//     <>
//       <div className="flex flex-col justify-center items-center h-fulll  w-full">
//         {isAuthPath ? (
//           <Routes>
//             <Route index element={<Auth />} />
//           </Routes>
//         ) : (
//           <Layout>
//             <Routes>
//               <Route path="index" element={<Index />} />
//               <Route path="admin" element={<AdminDashboard/>} />
//               <Route path="/shopping" element={<productLayout/>}/>
//               <Route path="product">
//                 <Route index element={<Product />} />
//                 <Route path="create-product" element={
//                   <Product> <CreateProduct /> </Product> } />
//                 <Route path="get-product" element={
//                   <Product> 
//                     <GetProduct />
//                      </Product> } />
//               </Route>
//             </Routes>
//           </Layout>
//         )}
//       </div>
//     </>
//   );
// };

// export default App;




import Auth from "./Auth";
import Index from "./component";
import { Route, Routes, useLocation } from "react-router-dom";
import Product from "./product";
import GetProduct from "./component/product/getProduct";
import CreateProduct from "./component/product/createProduct";
import Layout from "./component/Layout/layout";
import AdminDashboard from "./component/product/adminPage";
import ProductLayout from "./productLayout"; // Updated to uppercase

const App = () => {
  const location = useLocation();
  const isAuthPath = location.pathname === "/";
  return (
    <>
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
              <Route path="/shopping" element={<ProductLayout />} /> {/* Updated */}
              <Route path="product">
                <Route index element={<Product />} />
                <Route
                  path="create-product"
                  element={
                    <Product>
                      <CreateProduct />
                    </Product>
                  }
                />
                <Route
                  path="get-product"
                  element={
                    <Product>
                      <GetProduct />
                    </Product>
                  }
                />
              </Route>
            </Routes>
          </Layout>
        )}
      </div>
    </>
  );
};

export default App;
