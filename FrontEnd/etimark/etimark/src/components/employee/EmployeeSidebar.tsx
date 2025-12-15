import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EtimarkLogo from "../../assets/etimark_logo.png";
import "./EmployeeSidebar.css";

const EmployeeSidebar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const name = localStorage.getItem("nombre") || "Empleado";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    try {
      logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    navigate("/", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <img src={EtimarkLogo} alt="ETIMARK" />
      </div>

      <div className="sidebar-user">
        <p>Bienvenido,</p>
        <h3>{name}</h3>
      </div>

      <nav className="sidebar-menu">
        <Link
          className={pathname === "/empleado/productos" ? "active" : ""}
          to="/empleado/productos"
        >
          Productos
        </Link>

        <Link
          className={pathname === "/empleado/pedidos" ? "active" : ""}
          to="/empleado/pedidos"
        >
          Pedidos
        </Link>

        <Link
          className={pathname === "/empleado/clientes" ? "active" : ""}
          to="/empleado/clientes"
        >
          Clientes
        </Link>
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </aside>
  );
};

export default EmployeeSidebar;
