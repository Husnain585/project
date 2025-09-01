import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-100 py-6 mt-10"
    >
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <div className="flex justify-center space-x-6 mb-3">
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link to="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
