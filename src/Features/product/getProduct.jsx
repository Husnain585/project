import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetProduct = () => {
  const [data, setData] = useState([]);
  const getAllUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/product/get-all", {
        withCredentials: true,
      });
      if (data.data.length > 0) {
        setData(data.data); 
      }
      console.log(data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
        console.error("Response:", error.response?.data);
        console.error("Request:", error.request);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  }
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="relative top-20 w-full h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 flex flex-wrap gap-2 p-2">
  {data.length > 0 ? (
    <>
      {data.map((user, Index) => {
        return (
          <div
            key={Index}
            className="w-full md:w-[48%] lg:w-[32%] lg:h-[43%] h-auto rounded-md flex justify-center bg-gray-700 items-center p-4">
            <div className="text-center">
              <h6 className='text-gray-300 text-2xl font-normal mb-2'>Product details</h6>
              <p className='text-white font-normal'>Product Name: {user.name}</p>
              <p className='text-white font-normal'>Product Description: {user.description}</p>
              <p className='text-white font-normal'>ProductId: {user.productId}</p>
            </div>
          </div>
        );
      })}
          </>
          ) : (
            <>
              <div>{""} <p>No Product Exsist </p> {""}</div>
            </>)}

      </div>
    </>)
}
export default GetProduct;


