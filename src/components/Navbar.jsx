import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <header className="w-full absolute bg-white flex flex-wrap items-center justify-between px-6 py-4">
      {/* Logo */}
      <Link to="index" className="text-green-500 text-2xl px-9 font-semibold">
        My E-Store
      </Link>

      {/* Navigation Menu */}
      <ul className="flex space-x-6">
        <li>
          <Link
            href="index"
            className="text-gray-700 font-semibold hover:text-green-300" to="/index"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
          to="for-you"
            className="text-gray-700 font-semibold hover:text-green-300"
          >
            ForYou
          </Link>
        </li>
        <li>
          <Link
            to="admin"
            className="text-gray-700 font-semibold hover:text-green-300"
          >
            Admin
          </Link>
        </li>
        <li>
          <Link
          to="shopping"
            className="text-gray-700 font-semibold hover:text-green-300"
          >
            Shopping
          </Link>
        </li>
        <li>
          <Link
          to="about"
            className="text-gray-700 font-semibold hover:text-green-300"
          >
            About Us 
          </Link>
        </li>
        <li>
          <Link
          to="contact"
            className="text-gray-700 font-semibold hover:text-green-300"
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
          className="bg-transparent border border-gray-700 text-gray-700 placeholder-gray-700   py-2 px-4 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"><FaSearch /></i> 
      </div>
    </header>
  );
};

export default Navbar;
