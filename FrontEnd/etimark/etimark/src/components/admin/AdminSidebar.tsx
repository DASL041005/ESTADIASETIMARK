// src/components/admin/AdminSidebar.tsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // <-- ruta relativa (ajusta si tu archivo está en otro lugar)
import EtimarkLogo from "../../assets/etimark_logo.png";
import "./AdminSidebar.css";

const AdminSidebar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Si tu AuthContext mantiene el nombre del usuario sería mejor usarlo desde ahí.
  // Mientras tanto leemos el nombre desde localStorage (asegúrate de guardar 'nombre' al hacer login).
  const adminName = localStorage.getItem("nombre") || "Administrador";

  // Si useAuth exporta logout lo usamos para limpiar estado además del localStorage
  const { logout } = useAuth();

  const handleLogout = () => {
    // limpiar token/nombre
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");

    // limpiar estado auth (si useAuth.logout existe)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try { logout(); } catch (e) { /* noop si no existe */ }

    // redirigir a home (no a login)
    navigate("/", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={EtimarkLogo} alt="ETIMARK Logo" className="etimark-logo" />
      </div>

      {/* Nombre del admin */}
      <div className="sidebar-user">
        <p>Bienvenido,</p>
        <h3>{adminName}</h3>
      </div>

      {/* Menú */}
      <nav className="sidebar-menu">
        <Link className={pathname === "/admin/" ? "active" : ""} to="AdminDashboard">
          Dashboard
        </Link>

        <Link className={pathname === "/admin/productos" ? "active" : ""} to="/admin/productos">
          Productos
        </Link>

        <Link className={pathname === "/admin/empleados" ? "active" : ""} to="/admin/empleados">
          Empleados
        </Link>

        <Link className={pathname === "/admin/clientes" ? "active" : ""} to="/admin/clientes">
          Clientes
        </Link>
      </nav>

      {/* Botón salir */}
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </aside>
  );
};

export default AdminSidebar;
