import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  // baseURL: "https://ojttracker.site/api/v1",
  // baseURL: "https://ojt-tracker-api.onrender.com/api/v1",
  // baseURL: "http://147.79.67.139:4000/api/v1",
  
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
