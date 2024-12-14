import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetProduct = () => {
  const [data, setData] = useState([]);
  const getAllUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/product/get-all", {
        withCredentials: true,
      });
      console.log(data.data)
      if (data.data.length > 0) {
        setData(data.data);
      }
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
      <div className=" w-[99%] h-[100%] scrollbar-thumb-blue-500 scrollbar-track-gray-300 gap-y-3 overflow-visible flex flex-wrap overflow-y-scroll scrollbar-thin  gap-x-2 p-2">
        {data.length > 0 ?
          (<>
            {data.map((user, Index) => {
              return (
                <div
                  key={Index}
                  className="w-[32%] h-[28%]  rounded-md flex justify-center bg-gray-700 items-center">
                  <div className="">
                    <h6 className='text-gray-300 text-2xl flex justify-center items-center font-normal'>Product details</h6>
                    <p className=' text-white text-normal flex justify-center items-center font-normal'> product Name:  {user.name}</p>
                    <p className=' text-white text-normal flex justify-center items-center font-normal'>Product Description:  {user.description}</p>
                    <p className=' text-white text-normal flex justify-center items-center font-normal '>ProductId: {user.productId}</p>
                  </div>
                </div>
              )
            })}
          </>
          ) : (
            <>
              <div>{""} <p>No User Exsist </p> {""}</div>
            </>)}

      </div>

    </>)
}
export default GetProduct;