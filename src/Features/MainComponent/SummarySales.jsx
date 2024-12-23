import React from "react";
import saleImage from "../../Images/home.jpg"; // Replace with your product image path

const SummarySales = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto flex flex-wrap items-center">
        {/* Text Section */}
        <div className="w-full md:w-6/12 px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Sexy Women Floral Embroidery
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Limited-time offer on our best-selling floral embroidery dress. Grab yours before it's gone!
          </p>
          {/* Countdown Timer */}
          <div className="flex justify-start space-x-6 mb-6">
            <div className="text-center">
              <span className="block text-4xl font-bold text-red-600">157</span>
              <span className="text-gray-600">Days</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-red-600">13</span>
              <span className="text-gray-600">Hours</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-red-600">7</span>
              <span className="text-gray-600">Minutes</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-red-600">32</span>
              <span className="text-gray-600">Seconds</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600 mb-4">
            $420.00 <span className="text-gray-500 line-through">$670.00</span>
          </p>
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 text-white text-lg font-bold uppercase rounded shadow-md">
            Add to Cart
          </button>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-6/12 px-4">
          <img
            src={saleImage}
            alt="Product"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SummarySales;
