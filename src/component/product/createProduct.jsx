import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateProduct = () => {
const [name, setName] = useState("")
const [vendorId, setVendorId] = useState("")
const [description, setDesc] = useState("")
const navigate = useNavigate();
const [productImage, setProdImage] = useState("");
const imageUpload = useRef();

const productCreate = async () => {
  const { data } = await axios.post("http://localhost:3000/product/create", {
      name,
      description,
      vendorId
  } ,{
    withCredentials: true,
  });
  if(Object.values(data.data).length > 0 ){
    alert("product created successfully");
    console.log("success");
    return  navigate("product/get-product");
  }
  else{
    alert(data.error);
  }
}

  return (
    <>
      <div className="flex justify-center items-center">
      <div className="w-full">
      <div className="w-full h-[300px] items-center flex justify-start flex-col ml-48 ">
        <h1 className="font-semibold text-lg   text-gray-600 py-2">Create Product</h1>
        <div className="flex justify-center items-center ">
          <div className="rounded-full bg-slate-500 w-32 h-32"
          onChange={(e) => {
            imageUpload.current.click()
          }}
          >
          <input className="w-24 relative top-10" 
            onChange={(e) => {
              const avatarFiles = e.target.files[0];
              const imageURL = URL.createObjectURL(avatarFiles);
              console.log(imageURL);
            }}
            type="file" 
            accept="image/*"
            multiple
            ref={imageUpload}
            name="name"
            required   
            />
            </div>
            <span className="absolute bottom-[170px] text-gray-600 font-semibold">Add Picture</span>
        </div>
      </div>
      </div>
        <div className="w-full ">
        <div className=" flex flex-row gap-4 p-2 h-6/6 w-1/2 ">
          
          <div className="w-72 h-full  flex  items-start flex-col">
          <label className="text-lg text-gray-600 font-semibold">Name</label>
          <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text" name="name" placeholder="Enter your Name" required className="p-2 bg-gray-200 w-72 focus:outline-none" />
          <label className="text-lg text-gray-600 font-semibold">VendorId</label>
          <input
          onChange={(e) => {
            setVendorId(e.target.value);
          }}
          type="text" name="vendor" placeholder="Enter your Vendor" required className="p-2 bg-gray-200 w-72 focus:outline-none" />
          <label className="text-lg text-gray-600 font-semibold">Description</label>
          <input 
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          type="email" name="description" placeholder="Enter your Description" required className="p-2 bg-gray-200 w-72 focus:outline-none" />
          <button
          onClick={()=> {
            {productCreate}
            navigate("/product/get-product")
          }}
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
