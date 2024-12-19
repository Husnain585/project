import React from "react";
import Img1 from "../img/feature_prod_01.jpg"
import Img2 from "../img/feature_prod_02.jpg"
import Img3 from "../img/feature_prod_03.jpg"

const FeaturedProducts = () => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto py-10 px-5">
        {/* Title Section */}
        <div className="text-center py-5">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Featured Product</h1>
            <p className="text-gray-600">
              Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <a href="shop-single.html">
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
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-gray-400 fas fa-star"></i></li>
                  <li><i className="text-gray-400 fas fa-star"></i></li>
                </ul>
                <span className="text-gray-500 font-semibold">$240.00</span>
              </div>
              {/* Product Info */}
              <a
                href="shop-single.html"
                className="block text-xl font-semibold text-gray-800 hover:text-gray-600 mb-2"
              >
                Gym Weight
              </a>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
              </p>
              <p className="text-gray-500 text-sm">Reviews (24)</p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <a href="shop-single.html">
              <img
                src={Img2}
                alt="Cloud Nike Shoes"
                className="w-full h-64 object-cover"
              />
            </a>
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <ul className="flex space-x-1">
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-gray-400 fas fa-star"></i></li>
                  <li><i className="text-gray-400 fas fa-star"></i></li>
                </ul>
                <span className="text-gray-500 font-semibold">$480.00</span>
              </div>
              <a
                href="shop-single.html"
                className="block text-xl font-semibold text-gray-800 hover:text-gray-600 mb-2"
              >
                Cloud Nike Shoes
              </a>
              <p className="text-gray-600 mb-4">
                Aenean gravida dignissim finibus. Nullam ipsum diam, posuere vitae pharetra sed, commodo ullamcorper.
              </p>
              <p className="text-gray-500 text-sm">Reviews (48)</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <a href="shop-single.html">
              <img
                src={Img3}
                alt="Summer Adidas Shoes"
                className="w-full h-64 object-cover"
              />
            </a>
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <ul className="flex space-x-1">
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                  <li><i className="text-yellow-500 fas fa-star"></i></li>
                </ul>
                <span className="text-gray-500 font-semibold">$360.00</span>
              </div>
              <a
                href="shop-single.html"
                className="block text-xl font-semibold text-gray-800 hover:text-gray-600 mb-2"
              >
                Summer Adidas Shoes
              </a>
              <p className="text-gray-600 mb-4">
                Curabitur ac mi sit amet diam luctus porta. Phasellus pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
              </p>
              <p className="text-gray-500 text-sm">Reviews (74)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
