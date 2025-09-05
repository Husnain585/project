import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});


export default axiosInstance;
