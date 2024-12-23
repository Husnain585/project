import React from "react";
import ProductDetail from "./Features/productLayout/productDetails";
import Card from "./Features/productLayout/shoeProduct";
import FeaturedProducts from "./Features/productLayout/featureProduct";
import CategoriesOfTheMonth from "./Features/productLayout/topOfMonth";
import BannerHero from "./Features/productLayout/banner";
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
    </div>
  );
};

export default ProductLayout;
