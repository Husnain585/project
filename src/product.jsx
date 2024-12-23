import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      {/* Particle Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent mix-blend-overlay" />
      </div>

      {/* Glassmorphic Container */}
      <div className="container h-[50%] relative z-10 text-center bg-black/10 backdrop-blur-md rounded-xl shadow-xl p-6 lg:p-12 border border-white/40">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold capitalize mb-6  bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text drop-shadow-lg">
          Welcome to the <strong className=" bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">Product Section</strong>
        </h1>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mt-8">
          <Link
            to="/product/create-product"
            className="font-bold border-2 border-[#64AdA2] rounded-md px-6 py-3 uppercase text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text transition-transform duration-300 transform hover:scale-110 shadow-lg"
          >
            Create Product
          </Link>
          <Link
            to="/product/get"
            className="font-bold border-2 border-[#64AdA2] border-transparent rounded-md px-6 py-3 uppercase text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text  transition-transform duration-300 transform hover:scale-110 shadow-lg"
          >
            Get Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
