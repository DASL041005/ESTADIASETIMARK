// src/services/api.ts
import axios from "axios";

// 🔹 Asegúrate que tu backend usa este prefijo:
// Si tu backend no usa /api, cámbialo a: http://localhost:3000
export const API_URL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // evita problemas con cookies
});

// 🔹 Interceptor para agregar token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor para manejar expiración del token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠ Token expirado.");

      // Limpia localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Redirige a login
      window.location.href = "/iniciar-sesion";
    }

    return Promise.reject(error);
  }
);
