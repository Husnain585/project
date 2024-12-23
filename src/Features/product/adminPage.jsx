import React from "react";
import { FaBeer, FaHackerNewsSquare, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaArrowTrendUp, FaMessage, FaRegSquareCaretLeft } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { FaHandHolding } from "react-icons/fa6";
import { FaGift} from "react-icons/fa6";
import { FaRegChartBar } from "react-icons/fa6";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-green-100 via-green-200 to-green-300 shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-200 flex  text-center text-lg font-bold text-green-700 uppercase">
          <i className="fas fa-user-secret mr-2 relative top-1"><FaUser/></i>Husnain Raza
        </div>
        <nav className="mt-4">
        <a
            href="/admin"
            className="py-3 px-4 text-gray-500 flex hover:bg-green-50 hover:text-green-600 transition-all "
          >
            <i className="fas fa-chart-line mr-2 text-gray-400   group-hover:text-green-600"><FaRegChartBar /></i>DashBoard
          </a>
          <a
            href="/shopping"
            className="py-3 px-4 text-gray-500 flex hover:bg-green-50 hover:text-green-600 transition-all "
          >
            <i className="fas fa-chart-line mr-2 text-gray-400   group-hover:text-green-600"><FaGift /></i>Product
          </a>
          <a
            href="/admin"
            className="py-3 px-4 text-gray-500 flex hover:bg-green-50 hover:text-green-600 transition-all "
          >
            <i className="fas fa-chart-line mr-2 text-gray-400   group-hover:text-green-600"><FaChartLine /></i>Analytics
          </a>
          <a
            href="/admin"
            className="py-3 px-4 text-gray-500 flex hover:bg-green-50 hover:text-green-600 transition-all "
          >
            <i className="fas fa-chart-line mr-2 text-gray-400   group-hover:text-green-600"><FaRegSquareCaretLeft /></i>Report
          </a>
          
          <a
            href="/admin"
            className="py-3 px-4 text-gray-500 flex hover:bg-green-50 hover:text-green-600 transition-all "
          >
            <i className="fas fa-chart-line mr-2 text-gray-400   group-hover:text-green-600"><FaMessage /></i>Chat
          </a>
          <a
            href="/admin"
            className="py-3 px-4 text-gray-500 flex hover:bg-green-50 hover:text-green-600 transition-all "
          >
            <i className="fas fa-chart-line mr-2 text-gray-400   group-hover:text-green-600"><FaList /></i>MyList
          </a>
          <a
            href="/"
            className="py-3 px-4 text-gray-500 flex hover:bg-green-50 hover:text-green-600 transition-all "
          >
            <i className="fas fa-chart-line mr-2 text-gray-400   group-hover:text-green-600"><FaSignOutAlt/></i>Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 shadow-md flex justify-between items-center p-4">
          <div className="flex items-center">
            <button
              className="text-gray-700 focus:outline-none focus:text-green-700"
              id="menu-toggle"
            >
              <i className="fas fa-bars relative bg-red-100"><FaRegChartBar/></i>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 ml-4 hidden md:block">
                
              Dashboard
            </h2>
          </div>
          <div className="relative">
            <button
              className="text-gray-700 focus:outline-none flex items-center"
              id="user-menu"
            >
              <i className="fas fa-user mr-2"></i>Husnain
              <i className="fas fa-chevron-down ml-2"></i>
            </button>
            <div className="hidden" id="dropdown">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 bg-gradient-to-r from-green-100 via-green-200 to-green-300 p-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 shadow rounded flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-700">720</h3>
                <p className="text-gray-500">Products</p>
              </div>
              <i className="fas fa-gift text-4xl text-green-500 relative right-24">< FaGift/></i>
            </div>
            <div className="bg-white p-4 shadow rounded flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-700">4920</h3>
                <p className="text-gray-500">Sales</p>
              </div>
              <i className="fas fa-hand-holding-usd text-4xl text-green-500 relative right-24"><FaHandHolding /></i>
            </div>
            <div className="bg-white p-4 shadow rounded flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-700">3899</h3>
                <p className="text-gray-500">Delivery</p>
              </div>
              <i className="fas fa-truck text-4xl text-green-500 relative right-24"><FaTruck/></i>
            </div>
            <div className="bg-white p-4 shadow rounded flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-700">25%</h3>
                <p className="text-gray-500">Increase</p>
              </div>
              <i className="fas fa-chart-line text-4xl text-green-500 relative right-24"><FaArrowTrendUp /></i>
            </div>
          </div>

          {/* Recent Delivery */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Deliveries</h3>
            <table className="w-full bg-white shadow rounded">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-4">#</th>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">1</td>
                  <td className="p-4">#1234</td>
                  <td className="p-4">Gul Ahmad</td>
                  <td className="p-4 text-green-600">Delivered</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">2</td>
                  <td className="p-4">#5678</td>
                  <td className="p-4">Nishat Linen</td>
                  <td className="p-4 text-yellow-600">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
  );
}
export default AdminDashboard;
