import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// Default config for the axios instance
const axiosParams = {
  // Set different base URL based on the environment
  // baseURL: 'http://104.248.148.17:3000',
  baseURL: 'https://tech-self-english-server.vercel.app',
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

// Main api function
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  };
};

export default api(axiosInstance);
