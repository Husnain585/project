"use client";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
  ];

  const socialIcons = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
          ></path>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
          ></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-100  py-8 mt-10"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Brand Logo */}
        <div className="mb-6 flex items-center justify-center">
          <span className="text-gray-900 dark:text-black text-2xl font-bold">
            MyShop
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mb-6">
          <ul className="flex flex-wrap justify-center gap-6 text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-4">
          {socialIcons.map((icon) => (
            <a
              key={icon.name}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.name}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              {icon.svg}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
