import axios from "axios";

const api = axios.create({
  // Koyeb
  // baseURL: "https://stupid-manda-kemeth-4d0dea7c.koyeb.app/",
  // Render
  baseURL: "https://mbank-d.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
