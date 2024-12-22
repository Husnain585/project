import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="w-full flex flex-col">
        {/* Header */}
        <div className="reltive  w-full z-50">
          <Navbar />
        </div>
        {children}
      </div>
      {/* Footer */}
      <div className="w-full relative top-10">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
