import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-3xl">
        Our application is designed to provide users with a seamless experience. We focus on delivering high-quality services and features that meet your needs. Our team is dedicated to building innovative solutions and continually improving our platform.
      </p>
      <p className="text-lg text-gray-700">
        If you have any questions, don't hesitate to <span className="text-blue-500 hover:underline">contact us</span>.
      </p>
    </div>
  );
};

export default About;
