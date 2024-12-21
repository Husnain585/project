import React from "react";
import { Link } from "react-router-dom";
import { FaDashboard, FaUser, FaCogs, FaSignOutAlt } from "react-icons/fa";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <ul>
          <li className="mb-4">
            <Link to="/admin/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
              <FaDashboard />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/users" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
              <FaUser />
              Users
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/settings" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
              <FaCogs />
              Settings
            </Link>
          </li>
          <li className="mb-4">
            <button className="flex items-center gap-2 p-2 w-full hover:bg-gray-700 rounded-md">
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
