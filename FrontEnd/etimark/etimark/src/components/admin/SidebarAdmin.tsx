import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EtimarkLogo from "../../assets/etimark_logo.png";
import "./sidebarAdmin.css";

const SidebarAdmin: React.FC = () => {
  const navigate = useNavigate();
  const nombre = localStorage.getItem("nombre") || "Administrador";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    navigate("/"); // Vuelve al home principal
  };

  return (
    <aside className="sidebar-admin">
      <div className="sidebar-logo">
        <img src={EtimarkLogo} alt="Logo" />
        <h3>Bienvenido, {nombre}</h3>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/admin" end className="menu-link">Dashboard</NavLink>
        <NavLink to="/admin/pedidos" className="menu-link">Pedidos</NavLink>
        <NavLink to="/admin/empleados" className="menu-link">Empleados</NavLink>
        <NavLink to="/admin/clientes" className="menu-link">Clientes</NavLink>
      </nav>

      <button className="logout-button" onClick={logout}>
        Cerrar sesión
      </button>
    </aside>
  );
};

export default SidebarAdmin;
