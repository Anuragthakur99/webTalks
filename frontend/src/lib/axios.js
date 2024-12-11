import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api"  // Local dev API
    : "https://webtalks-backend.onrender.com/api", // Production API
  withCredentials: true, // Ensure credentials (cookies) are sent with requests
});
