import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <header className="w-full absolute bg-gray-900 flex flex-wrap items-center justify-between px-6 py-4">
      {/* Logo */}
      <a href="#" className="text-white text-xl font-semibold">
        
      </a>

      {/* Navigation Menu */}
      <ul className="flex space-x-6">
        <li>
          <Link
            href="#"
            className="text-white hover:text-yellow-300 transition-colors" to="/index"
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            About us
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            Latest 
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            My List
          </a>
        </li>
      </ul>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border border-white text-white placeholder-white py-2 px-4 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
      </div>
    </header>
  );
};

export default NavBar;
