import React from "react";
import { FaLocationDot,  FaPhone} from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";

const ContactSection = () => {
  return (
    <div className="h-screen relative top-10  bg-gray-300 flex items-center justify-center p-6">
      <div className="bg-gray-300 text-blue-500 rounded-lg  w-full  p-8">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h3 className="text-red-500 text-xl font-semibold">Hire Me</h3>
          <h2 className="text-blue-500 text-3xl font-bold">
            Contact Me to get <br className="hidden lg:block" />
            Work Done
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Contact Info Section */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full lg:w-1/2">
            <ul className="space-y-6">
              {/* Call Me */}
              <li className="flex items-center space-x-4">
                <span className="icon_design">
                  <FaPhone className="w-8 h-8" />
                </span>
                <div>
                  <h5 className="text-gray-800 font-semibold text-lg">Call Me</h5>
                  <p className="text-gray-600">+92 321 5132841</p>
                </div>
              </li>

              {/* Email Me */}
              <li className="flex items-center space-x-4">
                <span className="icon_design">
                  <FaMailBulk className="w-8 h-8" />
                </span>
                <div>
                  <h5 className="text-gray-800 font-semibold text-lg">Email Me</h5>
                  <p className="text-gray-600">Husnain7t9@gmail.com</p>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-center space-x-4">
                <span className="icon_design">
                  <FaLocationDot className="w-8 h-8" />
                </span>
                <div>
                  <h5 className="text-gray-800 font-semibold text-lg">Address</h5>
                  <p className="text-gray-600">Lahore, Pakistan</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form Section */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full lg:w-1/2">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <input
                  type="text"
                  className="form-control bg-gray-300 text-gray-800 placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  autoComplete="off"
                />
                {/* Email */}
                <input
                  type="email"
                  className="form-control bg-gray-300 text-gray-800 placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Phone */}
                <input
                  type="number"
                  className="form-control bg-gray-300 text-gray-800 placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Phone"
                  autoComplete="off"
                />
                {/* Subject */}
                <input
                  type="text"
                  className="form-control bg-gray-300 text-gray-800 placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Subject"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4">
                {/* Message */}
                <textarea
                  rows="6"
                  className="form-control bg-gray-300 text-gray-800 placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="Your Message here..."
                ></textarea>
              </div>
              {/* Submit Button */}
              <button className="bg-blue-600 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-md w-full md:w-auto">
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
