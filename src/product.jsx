import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="container text-center">
        <div
          className="min-h-[calc(100vh)] bg-cover mb-3 bg-fixed relative flex justify-center items-center flex-col"
        >
          {/* Title */}
          <h1 className="text-gray-800 text-4xl md:text-6xl capitalize mb-4">
            Welcome to the <strong className="text-pink-500">Product Section</strong>
          </h1>

          {/* Navigation Links */}
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to="/product/create-product"
              className="text-gray-800 font-bold border-2 rounded-md px-4 py-2 uppercase hover:bg-gray-400 hover:text-fuchsia-950 my-2 inline-block"
            >
              Create Product
            </Link>
            <Link
              to="/product/get-product"
              className="text-gray-800 font-bold border-2 rounded-md px-4 py-2 uppercase hover:bg-gray-400 hover:text-fuchsia-950 my-2 inline-block"
            >
              Get Product
            </Link>
          </div>

          {/* Child Content */}
          <div className="w-full h-full mt-6">
            {children || (
              <p className="text-gray-600 text-lg mt-4">
                
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
