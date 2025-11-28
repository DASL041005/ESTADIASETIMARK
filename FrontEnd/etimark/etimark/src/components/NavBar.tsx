// src/components/NavBar.tsx
import React from 'react';
import './NavBar.css';

interface NavItem {
  label: string;
  href: string;
  isActive: boolean; // Para simular el estado "Software" seleccionado
}

const navItems: NavItem[] = [
  { label: 'Software', href: '/software', isActive: true }, // Elemento seleccionado
  { label: 'Impresoras', href: '/impresoras', isActive: false },
  { label: 'Soporte', href: '/soporte', isActive: false },
  { label: 'Rollos', href: '/rollos', isActive: false },
  // Agrega más ítems aquí
];

const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`nav-item ${item.isActive ? 'active' : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;