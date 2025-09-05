import axios from "axios";
import config from "../config/config";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});

// 🔹 Request interceptor: attach token if available
axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem(config.storageKeys.authToken);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response interceptor: handle errors globally
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status === 401) {
      // Unauthorized → auto logout
      localStorage.removeItem(config.storageKeys.authToken);
      toast.error("Session expired. Please login again.");
      // optional: reload page to reset context
      window.location.href = "/login";
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    } else {
      // show backend message if present
      toast.error(data?.message || "Something went wrong.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
