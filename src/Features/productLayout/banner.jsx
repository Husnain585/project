import React, { useState } from "react";
import productImage from "../../Images/banner_img_01.jpg"
import productImag1 from "../../Images/banner_img_02.jpg"
import productImag2 from "../../Images/banner_img_03.jpg"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const BannerHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: productImage,
      title: "Welcome to My E-Store",
      subtitle: "Your One-Stop Shop",
      description:
        "Discover a wide range of products tailored to meet your daily needs. Shop now and experience the best!",
    },
    {
      id: 2,
      image: productImag1,
      title: "Exclusive Offers",
      subtitle: "Unbeatable Prices",
      description:
        "Take advantage of our exclusive offers and unbeatable prices. Shop with confidence and save big!",
    },
    {
      id: 3,
      image: productImag2,
      title: "Quality Guaranteed",
      subtitle: "Shop with Confidence",
      description:
        "We guarantee the quality of our products. Shop with confidence and enjoy a seamless shopping experience.",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Carousel Content */}
      <div className="relative h-full overflow-hidden">
        <div className="flex h-full transition-transform duration-700 ease-in-out transform"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
            >
              <div className="container mx-auto max-w-screen-lg px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-2 items-center h-full">
                <div>
                  <h1 className="text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                    {slide.title}
                  </h1>
                  <h3 className="text-2xl text-blue-500 font-semibold mb-4">{slide.subtitle}</h3>
                  <p className="text-blue-500 mb-4">{slide.description}</p>
                </div>
                <div>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        aria-label="Previous slide"
      >
        <FaArrowAltCircleLeft/> 
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        aria-label="Next slide"
      >
         <FaArrowAltCircleRight/>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerHero;
