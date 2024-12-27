import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsEye } from "react-icons/bs";
import { GoEyeClosed } from "react-icons/go";

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // for Password EyeIcon state
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<BsEye />);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!username.trim() || !password.trim()) {
      setMessage("Please fill in both username and password.");
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      console.log(data);
      if (data.status === 200) {
        const token = data.data.token;
        localStorage.setItem("authToken", token);
        if (token === token) {
          navigate("/index");
          setMessage("Successfully logged in");
        }
      } else {
        setMessage("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred while logging in. Please try again.");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<GoEyeClosed />);
    } else {
      setType("password");
      setIcon(<BsEye />);
    }
  };

  return (
    <div className="flex justify-center items-center transform relative top-[100px] rounded-lg min-screen bg-gray-800">
      <div
        className="relative w-80 min-h-[400px] flex justify-center items-center bg-gray-800 rounded-2xl p-6"
        style={{
          boxShadow: `
            25px 25px 75px rgba(0, 0, 0, 0.25),
            10px 10px 70px rgba(0, 0, 0, 0.25),
            inset 5px 5px 10px rgba(0, 0, 0, 0.5),
            inset -5px -5px 15px rgba(0, 0, 0, 0.75)`,
        }}
      >
        <form className="w-full">
          <a className="text-white font-bold text-2xl text-center uppercase tracking-wide mb-6">
            Log In
          </a>

          {/* Username Field */}
          <div className="mb-4">
            <span className="flex m-2 gap-x-1 text-white uppercase text-sm tracking-wide mb-2 border-l-4 pl-2 border-white">
              <i>
                <FaUser />
              </i>
              Username
            </span>
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <span className="flex m-2 gap-x-1 text-white uppercase text-sm tracking-wide border-l-4 pl-2 border-white">
              <i>
                <FaLock />
              </i>
              Password
            </span>
            <div className="relative flex items-center">
              <input
                type={type} // Bind to state
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div
                className="absolute right-3 cursor-pointer text-white"
                onClick={handleToggle}
              >
                {icon} 
              </div>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <label className="flex items-center text-white text-sm tracking-wide mb-4">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-semibold uppercase rounded-xl tracking-wide shadow-md hover:brightness-110 cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}

          {/* Forgot Password and Signup Links */}
          <div className="flex gap-10">
            <button
              type="button"
              className="block text-center text-white uppercase text-sm tracking-wide hover:underline"
              // Replace with appropriate functionality
            >
              Forgot password
            </button>
            <button
              type="button"
              className="block text-center text-white uppercase text-sm tracking-wide hover:underline"
              onClick={() => setAuth("signup")}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
