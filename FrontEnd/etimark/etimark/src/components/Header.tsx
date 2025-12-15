import React, { useState } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import "./Header.css";
import EtimarkLogo from "../assets/etimark_logo.png";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isAuthenticated, userRole, logout } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    window.location.reload(); // 👈 solo si tu UI no actualiza inmediatamente
  };

  return (
    <>
      <header className="main-header">
        <div className="header-top">
          {/* LOGO */}
          <div className="logo" onClick={() => navigate("/")}>
            <img
              src={EtimarkLogo}
              alt="ETIMARK Logo"
              className="etimark-logo"
            />
          </div>

          {/* SEARCH */}
          <div className="search-bar">
            <input type="text" placeholder="Buscar productos y más..." />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

          {/* ACTIONS */}
          <div className="user-actions">
            {/* NO autenticado -> mostrar Crear / Iniciar */}
            {!isAuthenticated && (
              <>
                <button
                  className="user-btn"
                  onClick={() => navigate("/crear-cuenta")}
                >
                  <FaUser className="icon-margin" />
                  Crear Cuenta
                </button>

                <button
                  className="user-btn primary"
                  onClick={() => navigate("/iniciar-sesion")}
                >
                  <FaUser className="icon-margin" />
                  Iniciar Sesión
                </button>
              </>
            )}

            {/* Autenticado -> mostrar Cerrar sesión (y opcionalmente rol) */}
                        {/* 🔸Si está autenticado -> mostrar usuario + logout */}
            {isAuthenticated && (
              <>
                <span className="user-role-badge">
                  {userRole === "CLIENTE" && "Cliente"}
                  {userRole === "EMPLEADO" && "Empleado"}
                  {userRole === "ADMIN" && "Administrador"}
                </span>

                <button className="user-btn logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt className="icon-margin" />
                  Cerrar Sesión
                </button>
              </>
            )}


            {/* Carrito (siempre visible) */}
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart />
              <span className="cart-count">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer del carrito (componente debe existir) */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
