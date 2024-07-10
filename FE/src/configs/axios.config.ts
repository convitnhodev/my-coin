import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

export default axiosInstance;
