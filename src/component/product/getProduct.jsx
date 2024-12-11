import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetProduct = () => {
  const [data, setData] = useState([]);
  const getAllUser = async () => {
    try {
      console.log("check")
      const { data } = await axios.get("http://localhost:3000/users/get-all", {
        withCredentials: true,
      });
      console.log(data);

      if (data.length > 0) {
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
      <div className="-w-full h-full bg-red-800 relative top-16 p-2">
        {data.length > 0 ?
          (<>
            {data.map((user, Index) => {
              return (
                <div
                  key={index}
                  className="w-1/3 h-2/6 bg-gray-100 rounded-md flex justify-between flex-col">
                  <div className="">
                    <p className=' text-gray-500 text-normal font-normal'>{user.userId}</p>
                    <p className=' text-gray-500 text-normal font-normal'>{user.username}</p>
                    <p className=' text-gray-500 text-normal font-normal'>{user.name}</p>
                    <p className=' text-gray-500 text-normal font-normal'>{user.email}</p>
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