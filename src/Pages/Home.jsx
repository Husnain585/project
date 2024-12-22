import React from "react";
import WhyChooseUs from "../Features/MainComponent/whyChoose";
import Header from "../Features/MainComponent/header";

const Home = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1 mt-20">
        {children}
        <Header />
          <WhyChooseUs />
      </div>
    </div>
  );
};

export default Home;
