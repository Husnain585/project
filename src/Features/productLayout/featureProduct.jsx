import React from "react";
import Img1 from "../../Images/nike.jpeg"
import Img2 from "../../Images/feature_prod_02.jpg"
import Img3 from "../../Images/feature_prod_03.jpg"
import { FaCoins, FaRupeeSign, FaStar } from "react-icons/fa6";

const FeaturedProducts = () => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto py-10 px-5">
        {/* Title Section */}
        <div className="text-center py-5">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">Featured Product</h1>
            <p className="text-blue-500">
              Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <a>
              <img
                src={Img1}
                alt="Gym Weight"
                className="w-full h-64 object-cover"
              />
            </a>
            <div className="p-5">
              {/* Rating and Price */}
              <div className="flex justify-between items-center mb-4">
                <ul className="flex space-x-1">
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-gray-400"></i><FaStar /></li>
                </ul>
                <span className="text-blue-500 font-semibold"><FaRupeeSign className="relative top-5 right-4"/> 1800.00</span>
              </div>
              {/* Product Info */}
              <a
                className="block text-xl font-semibold text-blue-500 hover:text-gray-600 mb-2"
              >
                Nike Sneakers
              </a>
              <p className="text-blue-400 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
              </p>
              <p className="text-blue-400 text-sm">Reviews <span className="text-emerald-400">(24)</span></p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <a>
              <img
                src={Img2}
                alt="Cloud Nike Shoes"
                className="w-full h-64 object-cover"
              />
            </a>
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
              <ul className="flex space-x-1">
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-gray-400"></i><FaStar /></li>
                  <li><i className="text-gray-400"></i><FaStar /></li>
                </ul>
                <span className="text-blue-500 font-semibold"> <FaRupeeSign className="relative top-5 right-4"/> 1480.00</span>
              </div>
              <a
                href="shop-single.html"
                className="block text-xl font-semibold text-blue-500 hover:text-gray-600 mb-2"
              >
                Tudor Watch
              </a>
              <p className="text-blue-400 mb-4">
                Aenean gravida dignissim finibus. Nullam ipsum diam, posuere vitae pharetra sed, commodo ullamcorper.
              </p>
              <p className="text-blue-400 text-sm">Reviews <span className="text-emerald-400">(48)</span></p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <a>
              <img
                src={Img3}
                alt="Summer Adidas Shoes"
                className="w-full h-64 object-cover"
              />
            </a>
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
              <ul className="flex space-x-1">
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-yellow-500 "> <FaStar /> </i></li>
                  <li><i className="text-gray-400"></i><FaStar /></li>
                </ul>
                <span className="text-blue-500 font-semibold"><FaRupeeSign className="relative top-5 right-4"/> 4360.00</span>
              </div>
              <a
                href="shop-single.html"
                className="block text-xl font-semibold text-blue-500 hover:text-gray-600 mb-2"
              >
                Canon R6 II
              </a>
              <p className="text-blue-400 mb-4">
                Curabitur ac mi sit amet diam luctus porta. Phasellus pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
              </p>
              <p className="text-blue-400 text-sm">Reviews <span className="text-emerald-600">(74)</span> </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
