import React, { useState, useEffect } from "react";
import Img1 from "../../Images/portfolio-header.jpg";
import Typed from "typed.js";

const Header = () => {
  useEffect(() => {
    const typed = new Typed(".type", {
      strings: [" Bedroom", "Living Room", "Backyard"],
      typeSpeed: 150,
      backSpeed: 220,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header
      className="relative h-[490px] w-full bg-cover bg-center shadow-md opacity-1"
      style={{ backgroundImage: `url(${Img1})` }}
    >
      <div className="w-full  absolute inset-0 flex items-center justify-center">
        <div className="py-4 px-6">
          <h1
            href="index.html"
            className="flex items-center justify-center text-2xl font-bold text-white"
          >
            Design your <a className="type "> </a>
          </h1>
        </div>
      </div>

      {/* Typed Text */}
      <div className="absolute bottom-4 left-4 text-3xl text-white">
        <span className="type"></span>
      </div>
    </header>
  );
};

export default Header;
