import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Features/Auth/LoginForm";
import Signup from "../Features/Auth/signupForm";

const AuthLayout = () => {
  const [auth, setAuth] = useState("login"); // Default is 'login' view

  return (
    <div className="">
      <div className="">
        {/* Logo */}
        

        {/* Main Content (Login or Signup form) */}
        <div className="text-white">
          {auth === "login" && <Login setAuth={setAuth} />}
          {auth === "signup" && <Signup setAuth={setAuth} />}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
