import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white  py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h4 className="text-blue-500 text-lg font-semibold mb-4 relative">
              Company
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-blue-300"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="/shopping"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Our product
                </a>
              </li>
              <li>
                <a
                  href="/for-you"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Buy
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Get Help Section */}
          <div>
            <h4 className="text-blue-500 text-lg font-semibold mb-4 relative">
              Get Help
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-blue-300"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-gray-900 pl-2 "
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Order status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Payment options
                </a>
              </li>
            </ul>
          </div>

          {/* Online Shop Section */}
          <div>
            <h4 className="text-blue-500 text-lg font-semibold mb-4 relative">
              Online Shop
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-blue-300"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Watch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Bag
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Shoes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-[#61A4Ad] pl-2 "
                >
                  Dress
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h4 className="text-blue-500 text-lg font-semibold mb-4 relative">
              Follow Us
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-blue-300"></span>
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61555560105429"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-700 text-white "
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.x.com/husnain7t9/"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#000029] text-white "
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/husnain7t9/"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/husnain7t9/"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#0a66c2] text-white"
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
