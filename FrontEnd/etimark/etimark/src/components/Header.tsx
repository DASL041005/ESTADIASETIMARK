// src/components/Header.tsx
import React from 'react';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './Header.css';
import EtimarkLogo from '../assets/etimark_logo.png'; // ⬅️ Importa tu logo

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/iniciar-sesion');
  };

  const handleRegisterClick = () => {
    navigate('/crear-cuenta');
  };

  return (
    <header className="main-header">
      <div className="header-top">
        {/* Logo de ETIMARK */}
        <div className="logo" onClick={() => navigate('/')}>
          {/* ⬅️ Usamos la imagen del logo */}
          <img src={EtimarkLogo} alt="ETIMARK Logo" className="etimark-logo" />
        </div>

        {/* Barra de Búsqueda Central */}
        <div className="search-bar">
          <input type="text" placeholder="Buscar productos y más..." />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* Íconos y Acciones de Usuario */}
        <div className="user-actions">
          <button className="user-btn" onClick={handleRegisterClick}>
            <FaUser className="icon-margin" />
            Crear Cuenta
          </button>
          <button className="user-btn primary" onClick={handleLoginClick}> 
            <FaUser className="icon-margin" />
            Iniciar Sesión
          </button>
          <button className="cart-btn">
            <FaShoppingCart />
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;