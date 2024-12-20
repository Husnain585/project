import React from 'react';
import NavBar from './nav-bar';
import Footer from './footer';
import WhyChooseUs from './whyChoose';
import Header from './header';
import CounterUp from './counterFunction';
import ProductDetails from "../productLayout/productDetails"
import Card from "../productLayout/shoeProduct"

const Layout = ({children}) => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        {/* Header */}
        <div className="reltive  w-full z-50">
          <NavBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 mt-20">
          {children}
          <Header/>
          <ProductDetails/>
          <Card/>

          {/* WhyChooseUs Section */}
          <div className="mt-12">
            <WhyChooseUs />
          </div>
          <CounterUp/>
        </div>

        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
