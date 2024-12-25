import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-r from-blue-200 to-blue-500 py-24 px-8">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Title Section with Animation */}
        <h2 className="text-6xl font-extrabold text-blue-600 mb-16 opacity-0 animate__animated animate__fadeIn animate__delay-1s animate__slow">
          About Us
        </h2>

        {/* Description Section with Fade-in Animation */}
        <p className="text-xl text-gray-800 leading-relaxed mb-16 max-w-3xl mx-auto opacity-0 animate__animated animate__fadeIn animate__delay-1s animate__slower">
          Welcome to <span className="text-blue-600 font-semibold">[Your E-Commerce Store]</span>! Our mission is to redefine your online shopping experience with a blend of quality, convenience, and a customer-centric approach. 
          Whether you’re here for the latest trends, timeless classics, or everyday essentials, we’ve got you covered with our curated selection of top-notch products. Our platform is designed to provide you with the best shopping experience, 
          ensuring that each purchase is not only easy but also delightful.
        </p>

        {/* Content Cards Section with Slide-up Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 animate__animated animate__fadeInUp animate__delay-2s">
          {/* Mission Card */}
          <div className="bg-white bg-opacity-25 backdrop-blur-xl p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-opacity-30 hover:translate-y-2">
            <h3 className="text-3xl font-bold text-blue-600 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              At <span className="text-blue-600 font-semibold">[Your E-Commerce Store]</span>, our mission is simple: to make shopping an enjoyable experience for everyone. 
              We believe in providing access to high-quality, trendy products at affordable prices, delivered right to your door. From seamless browsing to easy checkouts, we’ve built our platform to ensure your experience is nothing short of excellent.
            </p>
            <p className="text-lg text-gray-200 mt-4 leading-relaxed">
              With our broad range of products, we aim to cater to your every need, whether you're looking for the latest gadgets, fashion, or everyday essentials. Our service doesn't stop at the sale — we are committed to making sure you are satisfied every step of the way.
            </p>
          </div>

          {/* Why Choose Us Card */}
          <div className="bg-white bg-opacity-25 backdrop-blur-xl p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-opacity-30 hover:translate-y-2">
            <h3 className="text-3xl font-bold text-blue-600 mb-6">Why Choose Us</h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              There are plenty of options when it comes to online shopping, so why choose <span className="text-blue-600 font-semibold">[Your E-Commerce Store]</span>? 
              We stand out because of our commitment to offering quality products, affordability, and exceptional customer service. Our goal is to provide a convenient shopping experience that exceeds expectations.
            </p>
            <p className="text-lg text-gray-200 mt-4 leading-relaxed">
              We’ve built a loyal community of customers by continuously offering competitive prices, curated collections, and a user-friendly experience. From fast shipping to secure payment options, we ensure your shopping experience is both safe and enjoyable.
            </p>
          </div>

          {/* Our Values Card */}
          <div className="bg-white bg-opacity-25 backdrop-blur-xl p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-opacity-30 hover:translate-y-2">
            <h3 className="text-3xl font-bold text-blue-600 mb-6">Our Values</h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              Integrity, innovation, and inclusivity form the core of our values. We believe in offering an honest, transparent, and inclusive shopping experience for all our customers. 
              Our commitment to these values ensures that we are constantly improving and evolving to meet your needs.
            </p>
            <p className="text-lg text-gray-200 mt-4 leading-relaxed">
              Our mission is also built on sustainability, making sure that we continue to evolve to meet the environmental needs of the future. We carefully source products that adhere to eco-friendly practices, making it easier for you to make informed, sustainable choices when shopping with us.
            </p>
          </div>
        </div>

        {/* Image Section with Fade-in and Zoom */}
        <div className="mt-16 opacity-0 animate__animated animate__fadeIn animate__delay-3s">
          <img
            src="https://via.placeholder.com/800x500"
            alt="About us visual"
            className="rounded-3xl shadow-2xl mx-auto transform hover:scale-110 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Final Section Paragraph with Fade-in */}
        <p className="text-lg text-gray-800 mt-12 max-w-3xl mx-auto opacity-0 animate__animated animate__fadeIn animate__delay-4s">
          Our team is passionate about bringing you a seamless experience that combines convenience, quality, and a personal touch. Whether you're a first-time shopper or a regular customer, we strive to exceed your expectations. 
          We continuously seek ways to innovate, improve, and grow, ensuring that you always have access to the best products and services.
        </p>

        {/* CTA Button Section with Smooth Hover Transition */}
        <div className="mt-12">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white text-lg font-semibold py-4 px-14 rounded-full shadow-xl hover:bg-blue-700 transform hover:scale-110 transition-all duration-500 ease-in-out hover:shadow-2xl"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
