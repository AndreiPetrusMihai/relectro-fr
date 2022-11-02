import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
