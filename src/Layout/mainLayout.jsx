import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="w-full  flex flex-col">
          <Navbar />
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
