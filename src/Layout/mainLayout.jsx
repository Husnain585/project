import React from 'react';
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';
import Home from '../Pages/Home';

const MainLayout = ({children}) => {
  return (
    <>
      <div className="w-full flex flex-col">
        {/* Header */}
        <div className="reltive  w-full z-50">
          <Navbar />
        </div>
        <div className="w-full  relative top-10 ">
          
        </div>
      </div>
      {/* Footer */}
      <div className="w-full">
          <Footer />
        </div>
    </>
  );
};

export default MainLayout;
