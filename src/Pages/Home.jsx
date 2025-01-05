import React from "react";
import Banner from "../Features/MainComponent/Banner";
import WhyTrustUs from "../Features/MainComponent/whyTrustUs";
import SaleSection from "../Features/MainComponent/SalesSection";
import CounterUp from "../Features/MainComponent/counterFunction";
import Testimonials from "../Features/MainComponent/Testimonials";
import "../App.css"

const Home = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col appear">
      <div className="flex-1">
        {children}
        <Banner />
        <WhyTrustUs />
        <Testimonials />
        <SaleSection />
        <CounterUp />
      </div>
    </div>
  );
};

export default Home;



/* Optional Intersection Observer for better support */
/* .appear.observed {
    animation: appear 1s ease-out both;
} */
