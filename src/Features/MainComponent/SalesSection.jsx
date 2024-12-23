import React from "react";
import { Link } from "react-router-dom";

const SaleSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl uppercase mb-8 text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-bold">
          Up to 75% Off
        </h2>
        <p className="text-blue-500 text-lg mb-12 max-w-3xl mx-auto">
          Don't miss the chance to grab the best deals of the season. Explore our exclusive sale now!
        </p>
        <Link
        to="/shopping"
        className="bg-[#61A4Ad] hover:bg-blue-500 px-8 py-4 text-white text-lg font-bold uppercase rounded shadow-md">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default SaleSection;
