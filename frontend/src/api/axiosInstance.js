import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://giftmanish52.onrender.com/api",
});

export default axiosInstance;