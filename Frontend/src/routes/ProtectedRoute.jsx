import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { user, loadingUser, token } = useContext(GlobalContext);

  // Still checking token → show loader
  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If token exists but user is still null → wait
  if (!loadingUser && !user && !token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;
