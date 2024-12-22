import React from "react";
import WhyChooseUs from "./whyChoose";
import Header from "./header";
import CounterUp from "./counterFunction";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 mt-20">
        {children}

        <Header />

        {/* WhyChooseUs Section */}
        <div className="mt-12">
          <WhyChooseUs />
        </div>
        <CounterUp />
      </div>
    </div>
  );
};

export default Layout;
