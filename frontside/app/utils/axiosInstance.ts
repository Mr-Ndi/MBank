import axios from "axios";

const api = axios.create({
  baseURL: "http://172.17.20.110:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
