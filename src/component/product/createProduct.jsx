import { useState } from "react";

const CreateProduct = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [cPassword, setcPassword] = useState("")
const [username, setUsername] = useState("")

const accessProduct = ( ) => {
  console.log(name);
  console.log(username);
  console.log(email);
  console.log(password);
  console.log(cPassword);
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
          <div className="w-1/2 h-full bg-white flex flex-col">
          <label htmlFor="" className="text-lg text-gray-500">Name</label>
          <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text" placeholder="Enter your Product" required className="p-2 bg-gray-200 w-72 focus:outline-none " id="" />
          <label htmlFor="" className="text-lg text-gray-500">Password</label>
          <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password" placeholder="Enter your Password" required className="p-2 bg-gray-200 w-72 focus:outline-none " id="" />
          <label htmlFor="" className="text-lg text-gray-500">Confirm Password</label>
          <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password" placeholder="Enter your Product" required className="p-2 bg-gray-200 w-72 focus:outline-none " id="" />
          </div>
          <div className="w-1/2 h-full bg-white flex flex-col">
          <label htmlFor="" className="text-lg text-gray-500">Username</label>
          <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text" placeholder="Enter your Product" required className="p-2 bg-gray-200 w-72 focus:outline-none " id="" />
          <label htmlFor="" className="text-lg text-gray-500">Email</label>
          <input 
          onChange={(e) => {
            console.log(e.target.value)
            email(e.target.value)
          }}
          type="email" placeholder="Enter your Product" required className="p-2 bg-gray-200 w-72 focus:outline-none " id="" />
          <button 
          onClick={(setEmail)}
          disabled={!(name && email && password && cPassword && email)}
          className="border-2 bg-gray-800 text-center text-white py-3 px-8 w-40 mt-4 font-semibold cursor-pointer">CreateProduct</button>
          </div>
        </div>
        </div>
      </div>

      </>
  )
};

export default CreateProduct;
