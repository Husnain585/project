import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find Your Next Favorite Gadget
          </h1>
          <p className="mt-4 text-white/90">
            Quality tech, fair prices, fast shipping. Start exploring our curated
            selection of top products.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/products"
              className="bg-white text-blue-700 font-semibold px-5 py-3 rounded-xl shadow hover:translate-y-[-1px] transition"
            >
              Shop Now
            </Link>
            <Link
              to="/categories"
              className="border border-white/70 text-white px-5 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Browse Categories
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/20">
            <img
              src="https://picsum.photos/seed/hero-products/1200/800"
              alt="Featured products"
              className="w-full h-[320px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
