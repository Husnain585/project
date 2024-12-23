import React from "react";
import SummarySales from "../Features/MainComponent/SummarySales";
import Banner from "../Features/MainComponent/Banner";
import WhyTrustUs from "../Features/MainComponent/whyTrustUs";
import SaleSection from "../Features/MainComponent/SalesSection";
import CounterUp from "../Features/MainComponent/counterFunction";
import Testimonials from "../Features/MainComponent/Testimonials";

const Home = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1 mt-20">
        {children}
        <Banner />
        <WhyTrustUs/>
        <Testimonials />
        <SaleSection />
        <CounterUp />
      </div>
    </div>
  );
};

export default Home;
