import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-700">User Stats</h2>
            <p className="text-lg text-gray-500">Overview of user activities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-700">Revenue</h2>
            <p className="text-lg text-gray-500">Overview of the revenue this month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-700">Settings</h2>
            <p className="text-lg text-gray-500">Manage application settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
