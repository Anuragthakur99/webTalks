import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api" // Local backend
    : "https://webtalks-backend.onrender.com", // Deployed backend
  withCredentials: true, // Allow sending cookies
});
