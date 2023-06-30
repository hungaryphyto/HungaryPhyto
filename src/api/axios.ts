import axios, { AxiosInstance } from "axios";

const apiURL: string = import.meta.env.VITE_REACT_APP_API_URL || "";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiURL,
});

export default axiosInstance;

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});