import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,  // e.g., "http://localhost:3000/api"
  withCredentials: true,       // allow cookies
});

export default axiosInstance;
