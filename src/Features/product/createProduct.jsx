import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [cartId, setCartId] = useState("");
  const [description, setDesc] = useState("");
  const navigate = useNavigate();
  const imageUpload = useRef();

  const productCreate = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/product/create",
      {
        name,
        description,
        vendorId,
        cartId  
      },
      {
        withCredentials: true,
      }
    );
    if (Object.values(data.data).length > 0) {
      alert("Product created successfully");
      console.log("success");
      return navigate("product/get");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      {/* Particle Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent mix-blend-overlay" />
      </div>

      {/* Glassmorphic Container */}
      <div className="container h-auto top-5 relative z-10 bg-black/10 backdrop-blur-md rounded-s-full rounded-e-full shadow-xl p-10 border border-white/40">
        <h1 className="text-4xl font-bold capitalize mb-8 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text drop-shadow-lg text-center">
          Create Product
        </h1>

        {/* Form and Image Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 w-36 h-36 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 hover:border-gray-600"
              onClick={() => imageUpload.current.click()}
            >
              <span className="text-sm text-gray-500">Add Picture</span>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                ref={imageUpload}
                onChange={(e) => {
                  const avatarFiles = e.target.files[0];
                  const imageURL = URL.createObjectURL(avatarFiles);
                  console.log(imageURL);
                }}
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col gap-6 md:w-3/6">
            <div>
              <label className="text-gray-700 font-semibold text-lg">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Product Name"
                className="w-full p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-700 font-semibold text-lg">Vendor ID</label>
              <input
                onChange={(e) => setVendorId(e.target.value)}
                type="text"
                placeholder="Enter Vendor ID"
                className="w-full p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-700 font-semibold text-lg">Cart ID</label>
              <input
                onChange={(e) => setCartId(e.target.value)}
                type="text"
                placeholder="Enter Cart ID"
                className="w-full p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-700 font-semibold text-lg">Description</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter Product Description"
                className="w-full p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              onClick={() => {
                productCreate();
              }}
              disabled={!(name && description)}
              className="w-2/6 text-center relative top-[-60px] left-40 bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
