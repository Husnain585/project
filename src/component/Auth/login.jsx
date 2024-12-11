import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center transform relative top-[100px] rounded-lg min-screen bg-gray-800">
      {/* Container with Custom Shadow */}
      <div
        className="relative w-80 min-h-[400px] flex justify-center items-center bg-gray-800 rounded-2xl p-6"
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
            Log In
          </a>

          {/* Username Field */}
          <div className="mb-4">
            <span className="block text-white uppercase text-sm tracking-wide mb-2 border-l-4 pl-2 border-white">
              Username
            </span>
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <span className="block text-white uppercase text-sm tracking-wide mb-2 border-l-4 pl-2 border-white">
              Password
            </span>
            <div className="relative flex items-center">
              <input
                type="password"
                className="w-full ml-2 p-2 bg-gray-700 text-white rounded-xl text-sm shadow-inner focus:outline-none"
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <label className="flex items-center text-white text-sm tracking-wide mb-4">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>

          {/* Submit Button */}
          <div className="mb-4">
            <input
              type="submit"
              value="LogIn"
              className="w-full p-2 bg-blue-500 text-white font-semibold uppercase rounded-xl tracking-wide shadow-md hover:brightness-110 cursor-pointer"
              onClick={() => {
                navigate("/index")
              }}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="  flex gap-10">

            <button
              className="block text-center text-white uppercase text-sm tracking-wide hover:underline"
              onClick={() => {
                setAuth("signup")
              }}
            >
              Forgot password
            </button>
            <button
              
              className="block text-center text-white uppercase text-sm tracking-wide hover:underline"
              onClick={() => {
                setAuth("signup")
              }}

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
