import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/product"
    : "/product";

export const apiReq = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
