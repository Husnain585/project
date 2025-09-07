import React from "react";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Verify your email 📧
        </h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email. Please click the link to
          activate your account.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;
