import React from "react";
import { Link } from "react-router-dom";
import Img1 from "../img/category_img_01.jpg"
import Img2 from "../img/category_img_02.jpg"
import Img3 from "../img/category_img_03.jpg"

const CategoriesOfTheMonth = () => {
  return (
    <section className="container mx-auto py-10">
      {/* Title Section */}
      <div className="text-center pt-5">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Categories of The Month</h1>
          <p className="text-gray-600">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {/* Category 1 */}
        <div className="text-center">
          <a href="#">
            <img
              src={Img1}
              alt="Watches"
              className="rounded-full border w-48 h-48 mx-auto"
            />
          </a>
          <h5 className="text-lg font-medium mt-5 mb-3">Watches</h5>
          <p>
            <a href="#" className="btn btn-success bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Go Shop
            </a>
          </p>
        </div>

        {/* Category 2 */}
        <div className="text-center">
          <a >
            <img
              src={Img2}
              alt="Shoes"
              className="rounded-full border w-48 h-48 mx-auto"
            />
          </a>
          <h5 className="text-lg font-medium mt-5 mb-3">Shoes</h5>
          <p>
            <Link  className="btn btn-success bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            to="/shop"
            >
              Go Shop
            </Link>
          </p>
        </div>

        {/* Category 3 */}
        <div className="text-center">
          <a href="#">
            <img
              src={Img3}
              alt="Accessories"
              className="rounded-full border w-48 h-48 mx-auto"
            />
          </a>
          <h5 className="text-lg font-medium mt-5 mb-3">Accessories</h5>
          <p>
            <a href="#" className="btn btn-success bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Go Shop
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoriesOfTheMonth;
