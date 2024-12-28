import React, { useEffect } from "react";
import Img1 from "../../Images/portfolio-header.jpg";
import Typed from "typed.js";
import { Link } from "react-router-dom";

const Banner = () => {
  useEffect(() => {
    const typed = new Typed(".type", {
      strings: ["Comfort For U", "Best Quality For U", "Luxury For U"],
      typeSpeed: 150,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header
      className="relative h-[490px] w-full bg-cover bg-center shadow-lg"
      style={{ backgroundImage: `url(${Img1})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>

      {/* Central Content */}
      <div className="relative flex items-center justify-center h-full text-center">
        <div className="px-6 py-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-md">
            Our Products <span className="type text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"></span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-300 max-w-2xl mx-auto leading-relaxed">
            Create stunning spaces that inspire creativity and relaxation.
          </p>
          <Link 
          to="/shopping"
          className="relative top-6 px-6 py-3 bg-[#a8e9b8aa] text-white font-semibold rounded-full hover:bg-[#61A4Ad] shadow-lg hover:shadow-xl transition-all">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Bottom Text with Decorations */}
      <div className="absolute bottom-8 left-4 right-4 text-center">
        <span className="type text-2xl md:text-3xl text-[#FBBF24] font-semibold drop-shadow-md"></span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-4 border-[#FBBF24] rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-[#FBBF24] rounded-full animate-pulse"></div>
    </header>
  );
};

export default Banner;