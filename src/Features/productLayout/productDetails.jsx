import React, { useState } from 'react';

// Import images from the src folder
import productImage from '../../Images/image.png';
import coinsImage from '../../Images/Coins.png';

// Sample Product Data
const product = {
  name: 'T-Shirt LD02',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias necessitatibus ratione consectetur architecto accusamus iste assumenda velit molestiae reiciendis facere',
  image: productImage,  // Imported image
  price: '100 ~ 200',
  children: [
    { color: '#bfb1a4', size: 'M', price: 100 },
    { color: '#bfb1a4', size: 'L', price: 120 },
    { color: '#bfb1a4', size: 'XL', price: 170 },
    { color: '#9c2f46', size: 'M', price: 140 },
    { color: '#9c2f46', size: 'L', price: 120 },
    { color: '#9c2f46', size: 'XL', price: 150 },
  ],
};

const ProductDetail = () => {
  const [option, setOption] = useState({
    size: null,
    color: null,
});

  // Initialize unique colors and sizes
  const colors = Array.from(new Set(product.children.map((item) => item.color)));
  const sizes = Array.from(new Set(product.children.map((item) => item.size)));

  // Get the price based on selected color and size
  const getPrice = () => {
    if (!option.size || !option.color) {
      return product.price;
    }
    const selectedProduct = product.children.find(
      (child) => child.size === option.size && child.color === option.color
    );
    return selectedProduct ? selectedProduct.price : product.price;
  };

  // Handle the color and size selection
  const handleSelection = (type, value) => {
    setOption((prevOption) => {
      return {
        ...prevOption,
        [type]: prevOption[type] === value ? null : value,
      };
    });
  };

return (
    <main className="bg-gray-100 w-[90vw] max-w-screen-lg mx-auto mt-12 p-10 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div>
          {/* Imported image */}
          <img src={product.image} alt={product.name} className="w-full" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-medium text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">{product.name}</h2>
          <p className="text-sm font-poppins text-blue-500 font-light">{product.description}</p>

          {/* Colors */}
          <p>
            <b className='text-blue-500'>Colors</b>
          </p>
          <ul className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {colors.map((color) => (
              <li
                key={color}
                onClick={() => handleSelection('color', color)}
                className={`w-12 h-12 rounded-full cursor-pointer transition-shadow duration-300 ${
                  option.color === color
                    ? 'border-4 border-white shadow-xl'
                    : 'bg-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </ul>

          {/* Sizes */}
          <p>
            <b>Sizes</b>
          </p>
          <ul className="grid grid-cols-3 gap-4">
            {sizes.map((size) => (
              <li
                key={size}
                onClick={() => handleSelection('size', size)}
                className={`cursor-pointer py-2 px-4 text-center rounded-lg border transition-all duration-300 ${
                  option.size === size
                    ? 'bg-[#61A4Ad] text-white border-blue-300'
                    : 'bg-gray-200'
                }`}
              >
                {size}
              </li>
            ))}
          </ul>

          {/* Price Section */}
          <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
            <img src={coinsImage} alt="Coins" className="w-8" /> {/* Imported image */}
            <span>{getPrice()}</span>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#61A4Ad] text-white rounded-lg font-bold text-sm transition-colors hover:bg-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
