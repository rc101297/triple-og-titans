import axios from "axios";

console.log(import.meta.env.VITE_FITNESS_APP_API);

const api = axios.create({
  baseURL: import.meta.env.VITE_FITNESS_APP_API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
