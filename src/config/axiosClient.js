import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:4000/api/v1",
  baseURL: "https://ojt-tracker-api.onrender.com/api/v1",
  
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
