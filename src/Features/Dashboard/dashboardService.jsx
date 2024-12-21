// dashboardService.js
import axios from "axios";

export const getDashboardData = async () => {
  try {
    const response = await axios.get("/api/dashboard");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching dashboard data");
  }
};
