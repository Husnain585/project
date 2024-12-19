  // import React from "react";
  // import ProductDetail from "./component/productLayout/productDetails";
  // import Card from "./component/productLayout/shoeProduct";
  // import FeaturedProducts from "./component/productLayout/featureProduct";
  // import CategoriesOfTheMonth from "./component/productLayout/topOfMonth";
  // import BannerHero from "./component/productLayout/banner";
  // import Footer from "./component/Layout/footer";
  // import { Routes, Route } from "react-router-dom";


  // const productLayout = () => {
  //     return(<>
  //         <div className="w-full">
  //               <BannerHero />
  //               <FeaturedProducts />
  //               <CategoriesOfTheMonth />
  //               <Footer />
  //               <Routes>
  //                 <Route path="/shop" element={<Card /> }/>
  //               </Routes>
  //         </div>
  //     </>)  
  // };

  // export default productLayout;

  import React from "react";
import ProductDetail from "./component/productLayout/productDetails";
import Card from "./component/productLayout/shoeProduct";
import FeaturedProducts from "./component/productLayout/featureProduct";
import CategoriesOfTheMonth from "./component/productLayout/topOfMonth";
import BannerHero from "./component/productLayout/banner";
import Footer from "./component/Layout/footer";
import { Routes, Route } from "react-router-dom";

const ProductLayout = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BannerHero />
              <FeaturedProducts />
              <CategoriesOfTheMonth />
            </>
          }
        />
        <Route path="/shop" element={<Card />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="*"
          element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-red-600">404</h1>
              <p className="text-gray-600">Page not found!</p>
            </div>
          }
        />
      </Routes>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default ProductLayout;
