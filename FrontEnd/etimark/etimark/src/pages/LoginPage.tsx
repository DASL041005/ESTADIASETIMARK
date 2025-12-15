import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import EtimarkLogo from '../assets/etimark_logo.png';

import { api } from '../services/api';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext"; // ← IMPORTANTE

interface JwtPayload {
  rol: "CLIENTE" | "EMPLEADO" | "ADMIN";
  nombre?: string;
  correo?: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth(); // ← IMPORTANTE

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", {
        correo: email,
        contrasena: password
      });

      const { token } = response.data;

      // 🔥 GUARDAR EN AUTH CONTEXT (no solo en localStorage)
      login(token);

      const decoded = jwtDecode<JwtPayload>(token);
      const rol = decoded.rol;

      // 🔥 REDIRIGIR POR ROL
      if (rol === "CLIENTE") navigate("/rollos");
      else if (rol === "EMPLEADO") navigate("/empleado/pedidos");
      else if (rol === "ADMIN") navigate("/admin/dashboard");
      else alert("Rol desconocido");

    } catch (error: unknown) {
      console.error("Error Login:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) alert("Usuario no encontrado");
        else if (error.response?.status === 401) alert("Contraseña incorrecta");
        else alert("Error al iniciar sesión");
      } else {
        alert("Error inesperado");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-info-panel panel-left">
          <div className="logo-placeholder">
            <img src={EtimarkLogo} alt="ETIMARK Logo" className="etimark-logo-small" />
          </div>
          <p>
            Bienvenido de nuevo. Accede a tu cuenta para gestionar tus pedidos,
            ver tu historial de compras y acceder a ofertas exclusivas.
          </p>
        </div>

        <div className="login-form-panel panel-right">
          <form onSubmit={handleSubmit} className="login-form">
            <h3>Iniciar Sesión</h3>

            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@etimark.com"
              required
            />

            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />

            <a href="#" className="forgot-password">Olvidé mi contraseña</a>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
