import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to My App</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is the home page of our application. Explore the features, learn more, and get started!
      </p>
      <div className="flex gap-6">
        <Link
          to="/about"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Learn More About Us
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Home;



