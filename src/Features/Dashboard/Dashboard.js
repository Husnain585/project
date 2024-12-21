import React, { useEffect, useState } from "react";
import { FaUser, FaCogs, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "./dashboardService"; // Assuming you have a function to fetch dashboard data

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dashboard data when the component mounts
    const fetchData = async () => {
      try {
        const data = await getDashboardData(); // Replace with actual service function
        setUserData(data.user);
        setStats(data.stats);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Handle logout logic (remove token, redirect to login, etc.)
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (!userData || !stats) {
    return <div>Loading...</div>; // Show loading state if data isn't available
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 h-full p-4">
        <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaUser />
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700"
            >
              <FaCogs />
              Settings
            </a>
          </li>
          <li className="mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 w-full"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Welcome, {userData.name}!</h1>
          <div className="text-xl">
            <p>Account: {userData.email}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-700 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Total Projects</h3>
            <p className="text-4xl">{stats.totalProjects}</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Completed Tasks</h3>
            <p className="text-4xl">{stats.completedTasks}</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
            <p className="text-4xl">{stats.pendingTasks}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-700 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul>
            {stats.recentActivity.map((activity, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between">
                  <p className="text-lg">{activity.description}</p>
                  <span className="text-sm text-gray-400">
                    {activity.timestamp}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
