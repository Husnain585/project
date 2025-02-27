import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 relative">
              Company
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-pink-500"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Our services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Affiliated program
                </a>
              </li>
            </ul>
          </div>

          {/* Get Help Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 relative">
              Get Help
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-pink-500"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Order status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Payment options
                </a>
              </li>
            </ul>
          </div>

          {/* Online Shop Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 relative">
              Online Shop
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-pink-500"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Watch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Bag
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Shoes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 pl-2"
                >
                  Dress
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 relative">
              Follow Us
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-pink-500"></span>
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61555560105429"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.x.com/husnain7t9/"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/husnain7t9/"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/husnain7t9/"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
