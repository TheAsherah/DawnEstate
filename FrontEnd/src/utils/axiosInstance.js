import axios from "axios";
import { checkTokenExpiry } from "../utils/checkTokenExpiry";
import { logout } from "../redux/slices/adminSlice";
import store from "../redux/store";
// http://localhost:5000
// https://backend-dawn.vercel.app
const axiosInstance = axios.create({
  baseURL: "https://backend-dawn.vercel.app",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (!checkTokenExpiry(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        store.dispatch(logout());
      }
    }

    return config;
  },
  (error) => {
    console.error("Error intercepting request:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
