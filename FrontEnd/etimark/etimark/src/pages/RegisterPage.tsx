// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import "./RegisterPage.css";
import EtimarkLogo from "../assets/etimark_logo.png";
import { api } from "../services/api"; // axios instance con baseURL
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const [razonSocial, setRazonSocial] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/clientes", {
        nombre: razonSocial,
        correo: email,
        telefono: phone,
        direccion: address,
        contrasena: password, // si tu backend lo utiliza
        tipo_cliente: "Empresa"
      });

      console.log("Cuenta creada:", response.data);

      alert("Cuenta creada exitosamente");
      navigate("/login");

    } catch (error) {
      // ============ MANEJO DE ERROR CORRECTO ============
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);

        if (error.response?.status === 409) {
          alert("Este correo ya está registrado");
          return;
        }

        alert("Error del servidor al crear la cuenta");
        return;
      }

      console.error("Error desconocido:", error);
      alert("Ocurrió un error inesperado");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        
        {/* Panel izquierdo */}
        <div className="register-info-panel panel-left">
          <div className="logo-placeholder">
            <img src={EtimarkLogo} alt="ETIMARK Logo" className="etimark-logo-small" />
          </div>

          <p>
            Crea tu cuenta empresarial para acceder a precios especiales,
            seguimiento avanzado de pedidos y facturación automatizada.
          </p>

          <ul>
            <li>✅ Precios al por mayor.</li>
            <li>✅ Facturación simplificada.</li>
            <li>✅ Soporte técnico prioritario.</li>
          </ul>
        </div>

        {/* Panel derecho: formulario */}
        <div className="register-form-panel panel-right">
          <form onSubmit={handleSubmit} className="register-form">
            <h3>Registro de Cuenta</h3>

            <label htmlFor="razonSocial">Razón Social</label>
            <input
              id="razonSocial"
              type="text"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              placeholder="Ej. ETIMARK S.A. de C.V."
              required
            />

            <label htmlFor="correo">Correo Electrónico</label>
            <input
              id="correo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@empresa.com"
              required
            />

            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(+52) 55 1234 5678"
              required
            />

            <label htmlFor="direccion">Dirección Fiscal / Envío</label>
            <input
              id="direccion"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, Número, Colonia, C.P."
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
            />

            <button type="submit" className="register-button">
              Crear Cuenta
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
