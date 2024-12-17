// Card.js
import React from "react";
import cardImage from "../img/card.jfif"; // Import image

// Product details object
const cardProduct = {
  image: cardImage, 
};

const Card = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#4ba9e9] to-white">
      <div className="relative w-[300px] h-[380px] bg-black shadow-lg overflow-hidden transition-all duration-500 hover:w-[600px] flex">
        {/* Image Section */}
        <div className="relative flex justify-center items-center w-[300px] h-full bg-white z-10 overflow-hidden transition-transform duration-500">
          <img
            src={cardProduct.image} // Fixed image property
            className="max-w-[250px] transition-transform duration-500 hover:-rotate-[35deg] hover:-translate-x-5"
          />
        </div>
        {/* Details Section */}
        <div className="absolute left-0 w-[300px] h-full bg-[#4ba9e9] flex flex-col justify-center p-5 z-20 transition-all duration-500 hover:left-[300px]">
          <h3 className="text-white uppercase font-semibold text-xl leading-none">
            {cardProduct.name} <br />
            <span className="text-sm font-light normal-case opacity-85">
              Men's Shoe
            </span>
          </h3>
          <h4 className="text-white uppercase font-semibold text-sm mt-5 mb-2">
            Product Details
          </h4>
          <p className="text-white opacity-85 text-sm">{cardProduct.description}</p>
          <h4 className="text-white uppercase font-semibold text-sm mt-5">
            Size
          </h4>
          <ul className="flex gap-2 mt-2">
            {[36, 38, 40, 42, 44, 46].map((size) => (
              <li
                key={size}
                className="list-none text-white text-sm w-10 h-10 border-2 border-white flex justify-center items-center font-medium opacity-50 cursor-pointer transition-all duration-500 hover:bg-white hover:text-[#4ba9e9] hover:opacity-100"
              >
                {size}
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-white font-semibold text-2xl">
              <sup className="font-light">$</sup>
              {cardProduct.price}
            </h2>
            <a
              href="#"
              className="bg-white text-[#4ba9e9] px-5 py-2 text-sm uppercase font-medium"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
