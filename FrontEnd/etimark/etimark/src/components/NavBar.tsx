// src/components/NavBar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Software", href: "/software" },
  { label: "Impresoras", href: "/impresoras" },
  { label: "Soporte", href: "/soporte" },
  { label: "Rollos", href: "/rollos" },
];

const NavBar: React.FC = () => {
  const location = useLocation(); // <-- detecta el path actual

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.label}
              to={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
