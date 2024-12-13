import React, { Children } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Product = ({ children }) => {
    const navigate = useNavigate();
  return (
    <>
    <div className='w-full h-full flex flex-col p-4 '>
    <h1 className='font-semibold w-2/6 text-2xl '>Product Page</h1>
    <div className="w-full h-full ">   
    <div className="w-full h-1/6 pt-4 flex gap-3 ">
    <Link className='bg-gray-950 h-12 text-white py-2 text-sm px-3 rounded-md' to="/product/create-product">Create Product</Link>
    <Link className='bg-gray-950 h-12 text-white py-2 text-sm px-3 rounded-md' to="/product/get-product">Get Product</Link>
    </div>
    <div className="w-full h-5/6">
        {children}
    </div>
    </div>
    </div>

      </>
  )
};

export default Product;
