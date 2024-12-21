import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import Login from "./LoginForm";

const Signup = ({ setAuth }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form fields
    if (!name.trim() || !password.trim() || !email.trim() || !conPassword.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== conPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/users/create", {
        name,
        username,
        password,
        email,
      });
      console.log(data);
      if(data.status === 200) {
            navigate("/index")
        if(data.error){
          alert("username must be quinue username already takken")
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage(error.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="flex justify-center items-center transform relative top-4 rounded-lg min-screen bg-gray-800">
      {/* Container with Custom Shadow */}
      <div
        className="relative w-80 min-h-[500px] flex justify-center items-center bg-gray-800 rounded-2xl p-6"
        style={{
          boxShadow: `
            25px 25px 75px rgba(0, 0, 0, 0.25),
            10px 10px 70px rgba(0, 0, 0, 0.25),
            inset 5px 5px 10px rgba(0, 0, 0, 0.5),
            inset 5px 5px 20px rgba(0, 0, 0, 0.2),
            inset -5px -5px 15px rgba(0, 0, 0, 0.75)`,
        }}
      >
        <form className="w-full">
          <a className="text-white font-bold text-2xl text-center uppercase tracking-wide mb-6">
            Sign Up
          </a>

          {/* Username Field */}
          <div className="mb-4">
            <span className="flex text-white uppercase text-sm tracking-wide m-2 gap-x-1 border-l-4 pl-2 border-white">
              <i>
                <FaUser />
              </i>
              Name
            </span>
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* Username Field */}
          <div className="mb-4">
            <span className="flex text-white uppercase text-sm tracking-wide m-2 gap-x-1 border-l-4 pl-2 border-white">
              <i>
                <FaUser />
              </i>
              Username
            </span>
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
                placeholder="Enter your NameUser"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <span className="flex gap-x-1 text-white uppercase text-sm tracking-wide m-2 border-l-4 pl-2 border-white">
              <i>
                <IoMailSharp />
              </i>
              Email
            </span>
            <div className="relative flex items-center">
              <input
                type="email"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <span className="flex gap-x-1 text-white uppercase text-sm tracking-wide m-2 border-l-4 pl-2 border-white">
              <i>
                <FaLock />
              </i>
              Password
            </span>
            <div className="relative flex items-center">
              <input
                type="password"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <span className="flex gap-x-1 text-white uppercase text-sm tracking-wide m-2 border-l-4 pl-2 border-white">
              <i>
                <FaLock />
              </i>
              Confirm Password
            </span>
            <div className="relative flex items-center">
              <input
                type="password"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
                placeholder="Confirm your password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-semibold uppercase rounded-xl tracking-wide shadow-md hover:brightness-110 cursor-pointer"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mb-4 text-center text-red-500 font-medium text-sm">
              {message}
            </div>
          )}

          {/* Login Link */}
          <div className="flex justify-center">
            <p className="text-white text-sm tracking-wide">
              Already have an account?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setAuth("login")}
              >
                Log In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
