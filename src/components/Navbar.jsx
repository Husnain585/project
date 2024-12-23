import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <header className="w-full absolute bg-white flex flex-wrap items-center justify-between px-6 py-4">
      {/* Logo */}
      <Link to="index" className="text-3xl px-9 font-extrabold text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
      <span className="absolute left-16 top-14  w-36 h-1 text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent"></span>
        My E-Store
      </Link>

      {/* Navigation Menu */}
      <ul className="flex space-x-6">
        <li>
          <Link
            href="index"
            className="text-blue-500 font-semibold hover:text-[#61A4Ad]" to="/index"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
          to="for-you"
            className="text-blue-500 font-semibold hover:text-[#61A4Ad]"
          >
            ForYou
          </Link>
        </li>
        <li>
          <Link
            to="product"
            className="text-blue-500 font-semibold hover:text-[#61A4Ad]"
          >
            product
          </Link>
        </li>
        <li>
          <Link
            to="admin"
            className="text-blue-500 font-semibold hover:text-[#61A4Ad]"
          >
            Admin
          </Link>
        </li>
        <li>
          <Link
          to="shopping"
            className="text-blue-500 font-semibold hover:text-[#61A4Ad]"
          >
            Shopping
          </Link>
        </li>
        <li>
          <Link
          to="about"
            className="text-blue-500 font-semibold hover:text-[#61A4Ad]"
          >
            About Us 
          </Link>
        </li>
        <li>
          <Link
          to="contact"
            className="text-blue-500 font-semibold hover:text-[#61A4Ad]"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border border-blue-700 text-gray-700 placeholder-blue-700   py-2 px-4 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-700"><FaSearch /></i> 
      </div>
    </header>
  );
};

export default Navbar;
