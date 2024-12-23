import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import bgImg from "../../Images/harper-sunday-tBKYocAkzRU-unsplash.jpg";

const WhyTrustUs = () => {
  const slides = [
    {
      title: "Quality and Elegance",
      subtitle: "Crafted to meet your expectations with style and substance.",
      content:
        "Discover a seamless blend of quality and elegance. Our designs are thoughtfully crafted to bring sophistication and comfort to your space, ensuring every detail exudes excellence.",
    },
    {
      title: "Tailored to Perfection",
      subtitle: "Custom solutions that fit your unique preferences.",
      content:
        "Every project is approached with a commitment to tailoring solutions that fit your lifestyle. We focus on every detail, delivering personalized designs that suit your individual needs.",
    },
    {
      title: "Sustainable Practices",
      subtitle: "Creating spaces while caring for our planet.",
      content:
        "We integrate eco-friendly materials and practices in our designs to ensure a sustainable future. Our solutions blend modern aesthetics with environmentally conscious choices.",
    },
    {
      title: "Exceptional Customer Care",
      subtitle: "Your satisfaction is our top priority.",
      content:
        "From the first consultation to the final reveal, we are dedicated to ensuring your experience is nothing short of extraordinary. We value your trust and work tirelessly to exceed expectations.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section id="why-trust-us" className="why-trust-us py-16 bg-gray-100">
      <div className="container mx-auto px-4" data-aos="fade-up">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
            Why Trust Us
          </h2>
        </div>

        {/* Slide Content */}
        <div className="flex flex-wrap items-center bg-white shadow-lg rounded-md overflow-hidden">
          {/* Background Image */}
          <div
            className="w-full xl:w-5/12 h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImg})` }}
          ></div>

          {/* Slide Text */}
          <div className="w-full xl:w-7/12 flex flex-col justify-center py-10 px-8 bg-gradient-to-r from-gray-50 via-white to-gray-100">
            <h3 className="text-3xl font-bold mb-2 text-blue-600">
              {slides[currentIndex].title}
            </h3>
            <h4 className="text-lg italic mb-4 text-gray-600">
              {slides[currentIndex].subtitle}
            </h4>
            <p className="text-gray-800 leading-relaxed">{slides[currentIndex].content}</p>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevSlide}
                className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
