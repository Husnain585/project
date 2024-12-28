import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div className="w-full bg-white flex items-center justify-between px-6 py-4 shadow-md">
      {/* Logo */}
      <Link
        to="/index"
        className="text-3xl  font-extrabold text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"
      >
        My E-Store
      </Link>

      {/* Hamburger Menu for Small Screens */}
      <button
        className="text-blue-500 text-2xl md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-lg md:shadow-none md:static md:w-auto md:flex md:items-center`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6">
          <li>
            <Link
              to="/index"
              className="block px-4 py-2 text-blue-500 font-semibold hover:text-[#61A4Ad]"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/for-you"
              className="block px-4 py-2 text-blue-500 font-semibold hover:text-[#61A4Ad]"
            >
              For You
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="block px-4 py-2 text-blue-500 font-semibold hover:text-[#61A4Ad]"
              >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="block px-4 py-2 text-blue-500 font-semibold hover:text-[#61A4Ad]"
              >
              Admin
            </Link>
          </li>
          <li>
            <Link
              to="/shopping"
              className="block px-4 py-2 text-blue-500 font-semibold hover:text-[#61A4Ad]"
            >
              Shopping
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block px-4 py-2 text-blue-500 font-semibold hover:text-[#61A4Ad]"
              >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 text-blue-500 font-semibold hover:text-[#61A4Ad]"
              >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search Bar */}
      <div className="relative mt-4 md:mt-0">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border border-blue-700 text-gray-700 placeholder-blue-700 py-2 px-4 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" />
      </div>
    </div>
          </>
  );
};

export default Navbar;
