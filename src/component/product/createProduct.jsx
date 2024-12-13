import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CreateProduct = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [cPassword, setCPassword] = useState("")
const [username, setUsername] = useState("")
const [description, setDesc] = useState("")

const productCreate = async () => {
  const { data } = await axios.post("http://localhost:3000/product/create", {
      name,
      description
  } ,{
    withCredentials: true,
  });
  if(Object.values(data?.data).length > 0 ){
    alert("product created successfully");
    console.log("success");
    return  Navigate("product/get-product");
    console.log("navigate");
  }
  else{
    alert(data.error);
  }
}

  return (
    <>
      <div className="w-5/6 h-6/ p-4 relative top-[-30px]">
      <div className="5/6 h-3/6 relative top-[-10px]">
      <div className="w-5/6">
        <h1 className="font-semibold text-lg  text-gray-600 py-2">Create Product</h1>
        <div className="w-32 h-32 bg-slate-500 flex gap-x-2justify-center items-center cursor-pointer">
          <p className="text-4xl text-white relative left-24 top-12">+</p>
        </div>
      </div>
      </div>
        <div className="w-full h-5/6 flex flex-col">
        <div className=" flex flex-row gap-4 p-2 h-6/6 w-full ">
          {/* <div className="w-1/2 h-full bg-white flex flex-col">
          <label className="text-lg text-gray-500">Name</label>
          <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text" name="name" placeholder="Enter your Name" required className="p-2 bg-gray-200 w-72 focus:outline-none " />
          <label className="text-lg text-gray-500">Password</label>
          <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password" placeholder="Enter your Password" required className="p-2 bg-gray-200 w-72 focus:outline-none" name="password" id="" />
          <label className="text-lg text-gray-500">Confirm Password</label>
          <input
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
          type="password" placeholder="Confirm Your Password" required className="p-2 bg-gray-200 w-72 focus:outline-none" name="cpassword" />
          </div> */}
          <div className="w-1/2 h-full bg-white flex flex-col">
          <label className="text-lg text-gray-500">Name</label>
          <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text" name="name" placeholder="Enter your Name" required className="p-2 bg-gray-200 w-72 focus:outline-none" />
          <label className="text-lg text-gray-500">Description</label>
          <input 
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          type="email" name="description" placeholder="Enter your Description" required className="p-2 bg-gray-200 w-72 focus:outline-none" />
          <button
          onClick={productCreate}
          disabled={!(name && description)}
          type="submit" className="border-2 bg-gray-800 text-center text-white py-3 px-8 w-40 mt-4 font-semibold cursor-pointer rounded-md
          disabled:bg-gray-400 disabled:text-gray-800
          ">CreateProduct</button>
          </div>
        </div>
        </div>
      </div>

      </>
  )
};

export default CreateProduct;
